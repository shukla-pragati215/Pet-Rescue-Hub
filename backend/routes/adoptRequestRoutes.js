import express from "express";
import {
  createAdoptRequest,
  updateAdoptRequestStatus,
  getAllAdoptRequests,
} from "../controllers/adoptRequestController.js";

const router = express.Router();
router.post("/", createAdoptRequest);
router.get("/", getAllAdoptRequests);
router.put("/:id/status", updateAdoptRequestStatus);
export default router;
