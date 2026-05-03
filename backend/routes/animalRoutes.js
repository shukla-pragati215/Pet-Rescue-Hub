import express from "express";
import {
  getAllAnimals,
  getAnimalById,
  addAnimal,
  deleteAnimal
} from "../controllers/animalController.js";

const router = express.Router();

router.get("/", getAllAnimals);
router.get("/:id", getAnimalById);
router.post("/", addAnimal);
router.delete("/:id", deleteAnimal);

export default router;
