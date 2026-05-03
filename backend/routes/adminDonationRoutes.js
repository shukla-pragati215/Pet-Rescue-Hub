import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// ✅ Donation Count
router.get("/count", async (req, res) => {
  try {
    const total = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json({
      count: total[0]?.totalAmount || 0,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
