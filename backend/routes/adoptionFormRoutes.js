import express from "express";
import {
  createAdoptionForm,
  getAllAdoptionForms,
  updateAdoptionFormStatus,
  deleteAdoptionForm,
} from "../controllers/adoptionFormController.js";

const router = express.Router();

/* User submits form */
router.post("/", createAdoptionForm);

/* Admin fetches all forms */
router.get("/", getAllAdoptionForms);

/* Admin updates status */
router.put("/:id", updateAdoptionFormStatus);

/* Admin deletes form */
router.delete("/:id", deleteAdoptionForm);

export default router;