import express from "express";
import { getExerciseData } from "../controllers/exerciseController.js";

const router = express.Router();

router.get("/", getExerciseData);

export default router;
