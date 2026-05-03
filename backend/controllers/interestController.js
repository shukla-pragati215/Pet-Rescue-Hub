import Interest from "../models/InterestRequest.js";
import sendEmail from "../utils/sendEmail.js";

export const createInterest = async (req, res) => {
  try {
    const { name, email, phone, petType, reason } = req.body;

    console.log("Incoming interest form:", req.body);

    // Required field validation
    if (!name || !email || !phone || !petType || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Trim and normalize values
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone.trim();
    const trimmedPetType = petType.trim().toLowerCase();
    const trimmedReason = reason.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedPetType ||
      !trimmedReason
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Indian mobile number validation
    // Must be exactly 10 digits and start with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(trimmedPhone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be a valid 10 digit Indian mobile number",
      });
    }

    const interest = await Interest.create({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      petType: trimmedPetType,
      reason: trimmedReason,
    });

    // ✅ User confirmation email
    await sendEmail({
      to: trimmedEmail,
      subject: "Interest Form Submitted - Pet Rescue Hub",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
          <h2 style="color:#2563eb;">Interest Form Received</h2>
          <p>Hello <b>${trimmedName}</b>,</p>
          <p>Thank you for showing interest in adopting a <b>${trimmedPetType}</b>.</p>
          <p>We have successfully received your form.</p>
          <p>Our team will review your request and contact you soon.</p>

          <br/>
          <p><b>Your submitted details:</b></p>
          <p><b>Name:</b> ${trimmedName}</p>
          <p><b>Email:</b> ${trimmedEmail}</p>
          <p><b>Phone:</b> ${trimmedPhone}</p>
          <p><b>Pet Type:</b> ${trimmedPetType}</p>
          <p><b>Reason:</b> ${trimmedReason}</p>

          <br/>
          <p>Regards,<br/>Pet Rescue Hub Team</p>
        </div>
      `,
    });

    // ✅ Admin email notification
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Interest Form Submitted",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
          <h2 style="color:#16a34a;">New Interest Form</h2>
          <p>A user has submitted a new interest form.</p>

          <p><b>Name:</b> ${trimmedName}</p>
          <p><b>Email:</b> ${trimmedEmail}</p>
          <p><b>Phone:</b> ${trimmedPhone}</p>
          <p><b>Pet Type:</b> ${trimmedPetType}</p>
          <p><b>Reason:</b> ${trimmedReason}</p>

          <br/>
          <p>Please contact this user for the next step.</p>
        </div>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Interest form submitted successfully",
      data: interest,
    });
  } catch (error) {
    console.error("Create interest error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};