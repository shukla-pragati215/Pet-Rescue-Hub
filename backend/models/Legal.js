import mongoose from "mongoose";

const legalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Legal Notice",
    },
    content: [
      {
        heading: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Legal", legalSchema);
