import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

(async () => {
  try {
    console.log("Testing SMTP with:", process.env.EMAIL_USER);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // verify connection configuration
    await transporter.verify();
    console.log("SMTP verification successful ✅");

    // send a test message
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // send to yourself for test
      subject: "Test email from Node (SMTP verify)",
      text: "This is a test. If you receive it, SMTP works.",
    });

    console.log("Test email sent:", info.response);
  } catch (err) {
    console.error("SMTP test error:", err);
  }
})();
