import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,          // ✅ ek email = ek account
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,          // minimum password length
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },

    blockedReason: {
      type: String,
      default: "",
    },

    blockedAt: {
      type: Date,
      default: null,
    },

    // OTP for forgot password
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

/* ===============================
   AUTO LOWERCASE EMAIL
================================ */
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.trim().toLowerCase();
  }
  next();
});

/* ===============================
   JSON RESPONSE CLEANER
   (hide password)
================================ */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.otp;
  delete user.otpExpiry;
  return user;
};

// ✅ Prevent OverwriteModelError
export default mongoose.models.User || mongoose.model("User", userSchema);