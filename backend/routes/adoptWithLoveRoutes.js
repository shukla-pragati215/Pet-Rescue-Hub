import express from "express";
import AdoptWithLove from "../models/AdoptWithLove.js";

const router = express.Router();

// GET content
router.get("/", async (req, res) => {
  try {
    const data = await AdoptWithLove.findOne();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST (only once – admin/testing)
router.post("/", async (req, res) => {
  try {
    const content = new AdoptWithLove(req.body);
    await content.save();
    res.status(201).json({ message: "Content saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving content" });
  }
});

export default router;
