import express from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", upload.single("image"), createDoctor);
router.put("/:id", upload.single("image"), updateDoctor);
router.delete("/:id", deleteDoctor);

export default router;