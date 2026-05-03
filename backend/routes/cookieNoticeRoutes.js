import express from "express";
import CookieNotice from "../models/CookieNotice.js";

const router = express.Router();

// ACCEPT cookies notice
router.post("/accept", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const notice = await CookieNotice.findOneAndUpdate(
      { userId },
      {
        accepted: true,
        acceptedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      message: "Cookies notice accepted ✅",
      data: notice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// CHECK if accepted
router.get("/:userId", async (req, res) => {
  try {
    const notice = await CookieNotice.findOne({
      userId: req.params.userId,
    });

    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
