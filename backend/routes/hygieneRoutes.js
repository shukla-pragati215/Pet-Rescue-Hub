import express from "express";
import Hygiene from "../models/Hygiene.js";

const router = express.Router();

// GET hygiene data
router.get("/", async (req, res) => {
  try {
    const data = await Hygiene.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
