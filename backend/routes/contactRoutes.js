import express from "express";
import Contact from "../models/ContactModel.js";

const router = express.Router();

/* ---------- POST : Save contact message ---------- */
router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

/* ---------- GET : All contact messages ---------- */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
