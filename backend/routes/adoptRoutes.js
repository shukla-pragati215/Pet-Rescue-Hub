import express from "express";
import AdoptRequest from "../models/AdoptRequest.js";

const router = express.Router();

// GET all adoption requests (admin)
router.get("/adopt-requests", async (req, res) => {
  try {
    const requests = await AdoptRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST new adoption request (from frontend form)
router.post("/adopt-request", async (req, res) => {
  try {
    const newRequest = new AdoptRequest(req.body);
    await newRequest.save();
    res.status(201).json({ success: true, message: "Request submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PUT update status (admin)
router.put("/adopt-request/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const request = await AdoptRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    res.json({ success: true, data: request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
