import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

dotenv.config();

// =====================
// SEND OTP FUNCTION
// =====================
const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP transporter verified");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code for Verification",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    });

    console.log(`✅ OTP sent successfully to ${email}: ${info.response}`);
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    throw new Error("Email sending failed");
  }
};

// =====================
// REGISTER
// =====================
export const register = async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;
    console.log("📨 Register request received for:", email);

    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        // User exists but not verified → resend OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendOTP(email, otp);
        return res.status(200).json({ message: "OTP resent to email." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      contact,
      isVerified: false,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    console.log("💾 User saved to DB:", email);

    await sendOTP(email, otp);
    console.log("📨 OTP sent to user");

    res.status(201).json({ message: "Registration successful. OTP sent to email." });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "Server error during registration.", error: error.message });
  }
};

// =====================
// VERIFY OTP
// =====================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (Date.now() > user.otpExpires) return res.status(400).json({ message: "OTP expired" });

    // Compare as strings after trimming to avoid type issues
    if (user.otp.toString().trim() !== otp.toString().trim())
      return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    res.status(500).json({ message: "Server error during OTP verification", error: error.message });
  }
};

// =====================
// LOGIN
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    if (!user.isVerified) return res.status(400).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

// =====================
// GET PROFILE
// =====================
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // set by authMiddleware
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      isVerified: user.isVerified,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error fetching profile", error: err.message });
  }
};
