import mongoose from "mongoose";

const dietChartSchema = new mongoose.Schema({
  meal: String,
  food: String,
  qty: String,
});

const breedSchema = new mongoose.Schema({
  key: String,          // labrador, persian, african grey
  name: String,
  diet: [String],
  portion: String,
  notes: String,
  chart: [dietChartSchema],
});

const nutritionSchema = new mongoose.Schema({
  species: {
    type: String,       // dogs, cats, birds
    required: true,
  },
  image: String,        // 🐶 🐱 🦜
  generic: {
    foods: [String],
    tips: [String],
    chart: [dietChartSchema],
  },
  breeds: [breedSchema],
}, { timestamps: true });

export default mongoose.model("Nutrition", nutritionSchema);
