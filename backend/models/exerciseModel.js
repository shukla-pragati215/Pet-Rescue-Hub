import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,

  types: [String],

  schedule: [
    {
      petType: String,
      exercise: String,
      duration: String,
    }
  ],

}, { timestamps: true });

export default mongoose.model("Exercise", exerciseSchema);
