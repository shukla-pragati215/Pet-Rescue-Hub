import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    whyCare: String,
    preventiveCare: [String],
    commonIssues: [String],

    schedule: [
      {
        ageGroup: String,
        frequency: String,
      },
    ],

    videos: [
      {
        title: String,
        youtubeId: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Health", healthSchema);