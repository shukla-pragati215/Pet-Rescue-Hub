import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: String, required: true },
  breed: { type: String, required: true },
  image: { type: String, required: true }
});

// Prevent OverwriteModelError
const Animal = mongoose.models.Animal || mongoose.model("Animal", animalSchema);

export default Animal;
