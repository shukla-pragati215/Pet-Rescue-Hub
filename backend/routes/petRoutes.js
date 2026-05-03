import express from "express";
import Pet from "../models/Pet.js";

const router = express.Router();

// Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search pets
router.get("/search", async (req, res) => {
  const { location, breed } = req.query;

  try {
    const pets = await Pet.find({
      location: { $regex: location || "", $options: "i" },
      breed: { $regex: breed || "", $options: "i" },
    });

    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;   // ✅ MOST IMPORTANT LINE
