import mongoose from "mongoose";

const adoptWithLoveSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    cards: [
      {
        icon: String,
        text: String
      }
    ]
  },
  { timestamps: true }
);

const AdoptWithLove = mongoose.model(
  "AdoptWithLove",
  adoptWithLoveSchema
);

export default AdoptWithLove;
