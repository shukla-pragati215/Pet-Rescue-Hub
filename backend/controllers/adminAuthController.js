import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

// 🔐 Strong password rule
// Minimum 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// 🔐 ADMIN SIGNUP
export const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    // 🔐 Strong password validation
    if (!strongPasswordRegex.test(trimmedPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const existingAdmin = await Admin.findOne({ email: trimmedEmail });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);

    const admin = await Admin.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      success: true,
      message: "Admin signup successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin signup error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// 🔐 ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const admin = await Admin.findOne({ email: trimmedEmail });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(trimmedPassword, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// 🔹 FORGOT PASSWORD (Send OTP)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    const admin = await Admin.findOne({ email: trimmedEmail });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    admin.otp = otp;
    admin.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await admin.save();

   await sendEmail({
  to: trimmedEmail,
  subject: "Password Reset OTP",
  html: `Your OTP is ${otp}`,
});

    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error) {
    console.error("Admin forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// 🔹 RESET PASSWORD (Verify OTP + Update Password)
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP and new password are required",
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.trim();
    const trimmedNewPassword = newPassword.trim();

    // 🔐 Strong password validation
    if (!strongPasswordRegex.test(trimmedNewPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain minimum 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const admin = await Admin.findOne({ email: trimmedEmail });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Admin not found",
      });
    }

    if (!admin.otp || !admin.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP not requested",
      });
    }

    if (admin.otp !== trimmedOtp || admin.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(trimmedNewPassword, 10);
    admin.password = hashedPassword;

    admin.otp = undefined;
    admin.otpExpiry = undefined;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Admin reset password error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};