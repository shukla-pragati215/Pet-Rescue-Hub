import mongoose from "mongoose";

const cookieNoticeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    acceptedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ❗ overwrite error se bachne ke liye
const CookieNotice =
  mongoose.models.CookieNotice ||
  mongoose.model("CookieNotice", cookieNoticeSchema);

export default CookieNotice;
