import express from "express";
import Adoption from "../models/Adoption.js";

const router = express.Router();

// User submits adoption request
router.post("/", async (req, res) => {
  const { petName, adopterName, contactEmail } = req.body;

  const adoption = await Adoption.create({
    petName,
    adopterName,
    contactEmail
  });

  res.status(201).json({
    message: "Adoption request submitted",
    adoption
  });
});

export default router;
