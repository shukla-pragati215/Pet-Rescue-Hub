import express from "express";
import {
  applyVolunteer,
  getVolunteers,
} from "../controllers/volunteerController.js";

const router = express.Router();

router.post("/apply", applyVolunteer);
router.get("/", getVolunteers);

export default router;
