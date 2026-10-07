import express from "express";
import bcrypt from "bcryptjs";
import User from "../Model/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "No user with that email" });
    }

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    user.resetToken = await bcrypt.hash(resetToken, 10);
    await user.save();

    const resetLink = `${
      process.env.FRONTEND_URL || "http://localhost:8080"
    }/reset-password/${resetToken}`;

    const mailTransporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_API_KEY,
      },
    });

    await mailTransporter.sendMail({
      from: process.env.MAIL_FROM || "ghugareonkar132@gmail.com",
      to: user.email,
      subject: "Password reset request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });

    res.status(200).json({
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword) {
      return res.status(400).json({
        message: "Reset token and password are required",
      });
    }

    const verifiedToken = jwt.verify(resetToken, JWT_SECRET);
    const user = await User.findById(verifiedToken.id);

    if (!user || !user.resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const isTokenMatched = await bcrypt.compare(
      resetToken,
      user.resetToken
    );

    if (!isTokenMatched) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});

export default router;
