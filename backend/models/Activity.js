import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },

  action: {
    type: String,
    required: true,
  },

  target: {
    type: String, // Pet name / User email etc
  },

}, { timestamps: true });

export default mongoose.model("Activity", activitySchema);
