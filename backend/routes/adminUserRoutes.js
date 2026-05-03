import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  updateUserStatus,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

// GET all users
router.get("/", adminAuth, getAllUsers);

// PUT block/unblock
router.put("/:id/status", adminAuth, updateUserStatus);

// DELETE user
router.delete("/:id", adminAuth, deleteUser);

export default router;