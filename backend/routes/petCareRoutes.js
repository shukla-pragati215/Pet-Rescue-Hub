import express from "express";
import PetCare from "../models/PetCare.js";

const router = express.Router();

// ✅ Get all pet care tips
router.get("/", async (req, res) => {
  try {
    const tips = await PetCare.find();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch pet care data" });
  }
});

// ✅ Add pet care tip (for testing / admin)
router.post("/", async (req, res) => {
  try {
    const newTip = new PetCare(req.body);
    await newTip.save();
    res.status(201).json(newTip);
  } catch (error) {
    res.status(400).json({ message: "Failed to add pet care tip" });
  }
});

export default router;
