import express from "express";
import AdoptRequest from "../models/AdoptRequest.js";
import User from "../models/user.js";
import Donation from "../models/Donation.js";

import { adminSignup, adminLogin } from "../controllers/adminAuthController.js";
import {
  getAllUsers,
  updateUserStatus,
  deleteUser,
} from "../controllers/adminController.js";

import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

/* =================================
   ADMIN AUTH ROUTES
================================= */

// Admin signup
router.post("/signup", adminSignup);

// Admin login
router.post("/login", adminLogin);


/* =================================
   USERS MANAGEMENT (ADMIN ONLY)
================================= */

// Get all users
router.get("/users", adminAuth, getAllUsers);

// Block / Unblock user
router.put("/users/:id/status", adminAuth, updateUserStatus);
// Delete user
router.delete("/users/:id", adminAuth, deleteUser);


/* =================================
   DASHBOARD STATS (ADMIN ONLY)
================================= */

// Total adoptions count
router.get("/adoptions/count", adminAuth, async (req, res) => {
  try {
    const count = await AdoptRequest.countDocuments();

    res.json({
      success: true,
      count,
    });
  } catch (err) {
    console.error("Adoption Count Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch adoption count",
    });
  }
});

// Total users count
router.get("/users/count", adminAuth, async (req, res) => {
  try {
    const count = await User.countDocuments();

    res.json({
      success: true,
      count,
    });
  } catch (err) {
    console.error("Users Count Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users count",
    });
  }
});

// Total donations amount
router.get("/donations/count", adminAuth, async (req, res) => {
  try {
    const result = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;

    res.json({
      success: true,
      count: totalAmount,
    });
  } catch (err) {
    console.error("Donation Count Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch donation total",
    });
  }
});

export default router;