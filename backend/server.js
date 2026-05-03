import dotenv from "dotenv";
dotenv.config();   // 👈 SABSE UPAR

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import fs from "fs";
// --------------------
// Load environment variables and connect DB
// --------------------
dotenv.config();
connectDB();

const app = express();

// --------------------
// Middlewares
// --------------------
app.use(cors());
app.use(express.json()); // body-parser inbuilt

// --------------------
// User/API Routes
// --------------------
import authRoutes from "./routes/authRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import petRoutes from "./routes/petRoutes.js";
import adoptRequestRoutes from "./routes/adoptRequestRoutes.js";
import interestRequestRoutes from "./routes/interestRequestRoutes.js";
import lostFoundRoutes from "./routes/lostFoundRoutes.js";
import petCareRoutes from "./routes/petCareRoutes.js";
import hygieneRoutes from "./routes/hygieneRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adoptionFormRoutes from "./routes/adoptionFormRoutes.js";
import adoptWithLoveRoutes from "./routes/adoptWithLoveRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import cookieRoutes from "./routes/cookieRoutes.js";
import cookieNoticeRoutes from "./routes/cookieNoticeRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import legalRoutes from "./routes/legalRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import nearbyShopRoutes from "./routes/nearbyShopRoutes.js";

// --------------------
// Attach API routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/adopt", adoptionRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/adopt-requests", adoptRequestRoutes);
app.use("/api/interest", interestRequestRoutes);
app.use("/api/lost-found", lostFoundRoutes);
app.use("/api/petcare", petCareRoutes);
app.use("/api/hygiene", hygieneRoutes);
app.use("/api/exercise", exerciseRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/adoption-form", adoptionFormRoutes);
app.use("/api/adopt-with-love", adoptWithLoveRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/cookies", cookieRoutes);
app.use("/api/cookie-notice", cookieNoticeRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/legal", legalRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/interest", interestRoutes);
app.use("/api/nearby-shops", nearbyShopRoutes);
app.use("/uploads", express.static("uploads"));
// --------------------
// Admin Routes
// --------------------
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminUserRoutes from "./routes/adminUserRoutes.js";
import adoptRoutesAdmin from "./routes/adoptRoutes.js";
import adminVolunteerRoutes from "./routes/adminVolunteerRoutes.js";
import adoptRoutes from "./routes/adoptRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminDonationRoutes from "./routes/adminDonationRoutes.js";
import adminPetRoutes from "./routes/adminPetRoutes.js";

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/adopt", adoptRoutesAdmin);
app.use("/api/admin/volunteers", adminVolunteerRoutes);
app.use("/api", adoptRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/donations", adminDonationRoutes);
app.use("/api/admin/pets", adminPetRoutes);
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
// --------------------
// Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

// --------------------
// Error Handling Middleware (catch unknown routes)
// --------------------
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
