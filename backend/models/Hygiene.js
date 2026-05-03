import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
});

const serviceSchema = new mongoose.Schema({
  service: String,
  price: Number,
});

const hygieneSchema = new mongoose.Schema({
  tips: [String],

  schedule: [
    {
      activity: String,
      frequency: String,
    },
  ],

  services: [serviceSchema],

  products: [productSchema],
});

const Hygiene = mongoose.model("Hygiene", hygieneSchema);
export default Hygiene;
