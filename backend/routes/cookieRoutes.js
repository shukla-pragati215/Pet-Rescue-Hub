import express from "express";
import CookiePreference from "../models/CookiePreference.js";

const router = express.Router();

// SAVE cookie preferences
router.post("/", async (req, res) => {
  try {
    const { userId, analytics, marketing } = req.body;

    const preference = new CookiePreference({
      userId,
      analytics,
      marketing,
    });

    await preference.save();

    res.status(201).json({
      message: "Cookie preferences saved successfully",
      data: preference,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET cookie preferences (optional)
router.get("/:userId", async (req, res) => {
  try {
    const pref = await CookiePreference.findOne({
      userId: req.params.userId,
    });

    res.json(pref);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
