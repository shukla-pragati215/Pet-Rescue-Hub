import mongoose from "mongoose";

const adminDonationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const AdminDonation = mongoose.model("AdminDonation", adminDonationSchema);

export default AdminDonation;
