import mongoose from "mongoose";

const petCareSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true, // Nutrition, Hygiene, Exercise, Health
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PetCare", petCareSchema);
