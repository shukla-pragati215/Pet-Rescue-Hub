import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  userName: String,
  email: String,
  message: String,
}, { timestamps: true });

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionSchema);

export default AdoptionRequest;   // ✅
