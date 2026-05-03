import mongoose from "mongoose";

const adoptionFormSchema = new mongoose.Schema(
  {
    petId: {
      type: Number,
      required: true,
    },
    petName: {
      type: String,
      required: true,
      trim: true,
    },
    petType: {
      type: String,
      default: "",
      trim: true,
    },
    petAge: {
      type: String,
      default: "",
      trim: true,
    },
    petBreed: {
      type: String,
      default: "",
      trim: true,
    },
    petImage: {
      type: String,
      default: "",
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AdoptionForm", adoptionFormSchema);