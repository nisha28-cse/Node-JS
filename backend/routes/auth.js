import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, contact } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, contact });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
