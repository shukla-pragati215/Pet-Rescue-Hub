import express from "express";
import multer from "multer";
import {
  getAllPetsAdmin,
  addPetAdmin,
  updatePetAdmin,
  deletePetAdmin,
} from "../controllers/adminPetController.js";

const router = express.Router();


// STORAGE CONFIG
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({ storage });


// ROUTES
router.get("/", getAllPetsAdmin);

// ⭐ IMAGE FIELD NAME MUST MATCH FRONTEND
router.post("/", upload.single("image"), addPetAdmin);
router.put("/:id", upload.single("image"), updatePetAdmin);


router.delete("/:id", deletePetAdmin);

export default router;
