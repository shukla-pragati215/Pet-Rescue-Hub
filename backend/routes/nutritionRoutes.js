import express from "express";
import Nutrition from "../models/Nutrition.js";

const router = express.Router();

/**
 * GET → all nutrition data
 * /api/nutrition
 */
router.get("/", async (req, res) => {
  try {
    const data = await Nutrition.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET → by species (dogs / cats / birds)
 * /api/nutrition/dogs
 */
router.get("/:species", async (req, res) => {
  try {
    const data = await Nutrition.findOne({ species: req.params.species });
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST → add nutrition data (admin use)
 */
router.post("/", async (req, res) => {
  try {
    const nutrition = new Nutrition(req.body);
    await nutrition.save();
    res.status(201).json({ success: true, message: "Nutrition data added" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
