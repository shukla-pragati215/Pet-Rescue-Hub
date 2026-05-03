import express from "express";
import LostFoundPet from "../models/LostFoundPet.js";

const router = express.Router();

/**
 * GET all pets
 */
router.get("/", async (req, res) => {
  try {
    const pets = await LostFoundPet.find().sort({ createdAt: -1 });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET single pet by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST → Report lost/found pet
 */
router.post("/", async (req, res) => {
  try {
    const pet = new LostFoundPet(req.body);
    await pet.save();
    res.status(201).json({ success: true, message: "Pet reported successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
