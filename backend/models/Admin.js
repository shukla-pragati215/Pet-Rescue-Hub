import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: String,
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true,
}, 
   password: String,
    role: { type: String, default: "admin" },

    // OTP fields
    otp: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);