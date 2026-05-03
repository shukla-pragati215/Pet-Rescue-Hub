import mongoose from "mongoose";

const lostFoundPetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    animal: { type: String, required: true },
    breed: { type: String, required: true },
    status: { type: String, enum: ["Lost", "Found"], required: true },
    color: { type: String },
    location: { type: String, required: true },
    lastSeen: { type: String }, // optional
    description: { type: String },
    image: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("LostFoundPet", lostFoundPetSchema);
