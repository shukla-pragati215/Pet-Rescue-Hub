import mongoose from "mongoose";

const cookiePreferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // login user id / email bhi rakh sakte ho
    },
    analytics: {
      type: Boolean,
      default: true,
    },
    marketing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CookiePreference", cookiePreferenceSchema);
