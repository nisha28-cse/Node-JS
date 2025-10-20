import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const sendTest = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP verified");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "anotheremail@gmail.com",  // test email different from sender
      subject: "Test OTP Email",
      text: "This is a test email for OTP delivery",
    });

    console.log("✅ Test email sent:", info.response);
  } catch (err) {
    console.error(err);
  }
};

sendTest();
