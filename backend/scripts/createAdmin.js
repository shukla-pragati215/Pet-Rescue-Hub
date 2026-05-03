import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import connectDB from "../config/db.js";

await connectDB();

const hashedPassword = await bcrypt.hash("admin123", 10);

await User.create({
  name: "Admin",
  email: "admin@gmail.com",
  phone: "9999999999",
  password: hashedPassword,
  role: "admin",
  status: "Active",
});

console.log("✅ Admin created");
process.exit();
