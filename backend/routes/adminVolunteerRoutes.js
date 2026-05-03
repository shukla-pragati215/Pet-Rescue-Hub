import express from "express";
import {
  getVolunteers,
  updateVolunteerStatus,
  deleteVolunteer,
} from "../controllers/volunteerController.js";

const router = express.Router();

// GET all volunteers for admin panel
router.get("/", getVolunteers);

// UPDATE volunteer status
router.put("/:id", updateVolunteerStatus);

// DELETE volunteer
router.delete("/:id", deleteVolunteer);

export default router;