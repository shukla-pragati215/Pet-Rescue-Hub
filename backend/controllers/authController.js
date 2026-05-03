import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/* ===============================
   EMAIL TRANSPORTER
================================ */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ===============================
   PASSWORD VALIDATION REGEX
   Minimum 8 chars, 1 uppercase,
   1 lowercase, 1 number,
   1 special character
================================ */
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

/* ===============================
   SIGNUP
   ONE EMAIL = ONE ACCOUNT
================================ */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Strong password validation
    if (!strongPasswordRegex.test(trimmedPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    // Same email se dubara signup allowed nahi
    const userExists = await User.findOne({ email: trimmedEmail });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    await User.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      status: "Active",
      blockedReason: "",
      blockedAt: null,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Mongo duplicate key error handle
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   LOGIN
   BLOCKED USER CAN'T LOGIN
================================ */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if ((user.status || "").trim().toLowerCase() === "blocked") {
      return res.status(403).json({
        success: false,
        message: `Your account has been blocked. Reason: ${
          user.blockedReason || "Contact admin"
        }`,
      });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        blockedReason: user.blockedReason,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   FORGOT PASSWORD (SEND OTP)
================================ */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await user.save();

    await transporter.sendMail({
      from: `"Pet Rescue Hub" <${process.env.EMAIL_USER}>`,
      to: trimmedEmail,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
          <h2 style="color:#2563eb;">Password Reset OTP</h2>
          <p>Hello <b>${user.name}</b>,</p>
          <p>Your OTP for resetting your password is:</p>
          <h1 style="color:#2563eb; letter-spacing: 2px;">${otp}</h1>
          <p>This OTP will expire in <b>10 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p>— Pet Rescue Hub Team</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

/* ===============================
   RESET PASSWORD
================================ */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.trim();
    const trimmedPassword = newPassword.trim();

    if (!strongPasswordRegex.test(trimmedPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "New password must contain minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const user = await User.findOne({ email: trimmedEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not requested",
      });
    }

    if (user.otp !== trimmedOtp || new Date(user.otpExpiry) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};