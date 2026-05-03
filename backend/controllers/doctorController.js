import Doctor from "../models/Doctor.js";

/* =========================
   GET ALL DOCTORS
========================= */
export const getDoctors = async (req, res) => {
  try {
    const { petType, location } = req.query;

    let filter = {};

    if (petType && petType !== "All") {
      filter.$or = [{ petType }, { petType: "All" }];
    }

    if (location && location !== "All") {
      filter.location = { $regex: location, $options: "i" };
    }

    const doctors = await Doctor.find(filter).sort({ createdAt: -1 });

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

/* =========================
   GET SINGLE DOCTOR
========================= */
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error("Get doctor by id error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor",
    });
  }
};

/* =========================
   CREATE DOCTOR
========================= */
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      speciality,
      experience,
      location,
      petType,
      rating,
      recommended,
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    if (
      !name ||
      !speciality ||
      !experience ||
      !location ||
      !petType ||
      rating === undefined ||
      rating === "" ||
      !image
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const doctor = await Doctor.create({
      name,
      speciality,
      experience,
      location,
      petType,
      rating: Number(rating),
      image,
      recommended: recommended === "true" || recommended === true,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    console.error("Create doctor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add doctor",
    });
  }
};

/* =========================
   UPDATE DOCTOR
========================= */
export const updateDoctor = async (req, res) => {
  try {
    const {
      name,
      speciality,
      experience,
      location,
      petType,
      rating,
      recommended,
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (name !== undefined) doctor.name = name;
    if (speciality !== undefined) doctor.speciality = speciality;
    if (experience !== undefined) doctor.experience = experience;
    if (location !== undefined) doctor.location = location;
    if (petType !== undefined) doctor.petType = petType;
    if (rating !== undefined && rating !== "") doctor.rating = Number(rating);

    if (req.file) {
      doctor.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined && req.body.image !== "") {
      doctor.image = req.body.image;
    }

    if (recommended !== undefined) {
      doctor.recommended = recommended === "true" || recommended === true;
    }

    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Update doctor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update doctor",
    });
  }
};

/* =========================
   DELETE DOCTOR
========================= */
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Delete doctor error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor",
    });
  }
};