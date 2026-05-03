import express from "express";
import Health from "../models/Health.js";

const router = express.Router();

// GET health data
router.get("/", async (req, res) => {
  try {
    let health = await Health.findOne();

    // Agar DB me data nahi hai to fallback data bhej do
    if (!health) {
      return res.json({
        title: "Pet Health",
        subtitle: "Preventive care and medical check-ups for pets",
        whyCare:
          "Regular health check-ups, vaccinations, and preventive care ensure your pet stays healthy, happy, and lives a longer life.",
        preventiveCare: [
          "💉 Timely vaccinations to prevent diseases",
          "🧪 Regular deworming to keep them parasite-free",
          "🐾 Flea and tick prevention treatments",
          "🥩 Balanced diet for strong immunity",
          "🏥 Annual vet check-ups",
        ],
        commonIssues: [
          "🐶 Dogs – Obesity, ear infections, arthritis",
          "🐱 Cats – Dental disease, kidney problems, obesity",
          "🐇 Rabbits – Digestive issues, overgrown teeth",
          "🐦 Birds – Feather plucking, respiratory infections",
        ],
        schedule: [
          {
            ageGroup: "Puppies/Kittens",
            frequency: "Every 3–4 weeks until 16 weeks old",
          },
          {
            ageGroup: "Adult Pets",
            frequency: "Once a year",
          },
          {
            ageGroup: "Senior Pets",
            frequency: "Twice a year",
          },
        ],
        videos: [
          {
            title: "Dog Grooming Basics",
            youtubeId: "3GIbxJJMbCw",
          },
          {
            title: "Pet First Aid Tips",
            youtubeId: "eOY_qUSw2WA",
          },
        ],
      });
    }

    res.json(health);
  } catch (error) {
    console.error("Health route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;