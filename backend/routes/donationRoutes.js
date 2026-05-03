import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// CREATE DONATION
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, amount, purpose } = req.body;

    if (!name || !email || !phone || !amount || !purpose) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const donation = new Donation({
      name,
      email,
      phone,
      amount,
      purpose,
    });

    await donation.save();

    res.status(201).json({
      message: "Donation successful ❤️ Thank you!",
      data: donation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL DONATIONS (admin / viva)
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
