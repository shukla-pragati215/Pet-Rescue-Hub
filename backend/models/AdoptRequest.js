import mongoose from "mongoose";

const adoptRequestSchema = new mongoose.Schema(
  {
    applicationId: {
      type: String,
      unique: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    petPreference: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Under Review", "Approved", "Rejected"],
      default: "Pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

adoptRequestSchema.pre("save", function (next) {
  if (!this.applicationId) {
    const random = Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    this.applicationId = `PRH-${y}${m}${d}-${random}`;
  }
  next();
});

export default mongoose.model("AdoptRequest", adoptRequestSchema);