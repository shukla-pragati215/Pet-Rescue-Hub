import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    breed: {
      type: String,
      trim: true,
    },

    // ✅ STRING so you can store "2 years", "3 months"
    age: {
      type: String,
      trim: true,
    }, // ✅ COMMA ADDED

    gender: {
      type: String,
      enum: ["Male", "Female", "Not Specified"], // added option
      default: "Not Specified",
    },

    location: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/007/319/933/non_2x/pet-adoption-logo-template-vector.jpg",
    },

    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Available", "Adopted"],
      default: "Available",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pet", petSchema);
