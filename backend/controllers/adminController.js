import User from "../models/user.js";
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
   GET ALL USERS
================================ */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   BLOCK / UNBLOCK USER
================================ */
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body;

    if (!["Active", "Blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (status === "Blocked" && !reason?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Block reason required",
      });
    }

    user.status = status;

    if (status === "Blocked") {
      user.blockedReason = reason.trim();
      user.blockedAt = new Date();
    } else {
      user.blockedReason = "";
      user.blockedAt = null;
    }

    await user.save();

    /* ===============================
       SEND EMAIL
    ================================ */
    try {
      if (status === "Blocked") {
        await transporter.sendMail({
          from: `"Pet Rescue Hub" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Your Account Has Been Blocked - Pet Rescue Hub",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
              <div style="max-width: 600px; margin: auto; background: #fff; border: 1px solid #eee; border-radius: 10px; padding: 30px;">
                <h2 style="color: #dc2626; margin-bottom: 10px;">Account Blocked</h2>
                <p>Hello <b>${user.name}</b>,</p>
                <p>Your account on <b>Pet Rescue Hub</b> has been blocked by the admin.</p>
                <p><b>Reason:</b> ${reason}</p>
                <p>If you think this action was taken by mistake, please contact support/admin.</p>
                <br/>
                <p>Regards,<br/><b>Pet Rescue Hub Team</b></p>
              </div>
            </div>
          `,
        });
      }

      if (status === "Active") {
        await transporter.sendMail({
          from: `"Pet Rescue Hub" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Your Account Has Been Unblocked - Pet Rescue Hub",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
              <div style="max-width: 600px; margin: auto; background: #fff; border: 1px solid #eee; border-radius: 10px; padding: 30px;">
                <h2 style="color: #16a34a; margin-bottom: 10px;">Account Unblocked</h2>
                <p>Hello <b>${user.name}</b>,</p>
                <p>Your account on <b>Pet Rescue Hub</b> has been reactivated.</p>
                <p>You can now log in and continue using the platform.</p>
                <br/>
                <p>Regards,<br/><b>Pet Rescue Hub Team</b></p>
              </div>
            </div>
          `,
        });
      }
    } catch (mailError) {
      console.error("Email sending failed:", mailError.message);
    }

    return res.status(200).json({
      success: true,
      message: `User ${status === "Blocked" ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    console.error("Update status error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   DELETE USER
================================ */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};