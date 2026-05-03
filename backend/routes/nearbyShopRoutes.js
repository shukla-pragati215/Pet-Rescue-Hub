import express from "express";
import { getNearbyPetShops } from "../controllers/nearbyShopController.js";

const router = express.Router();

router.get("/", getNearbyPetShops);

export default router;