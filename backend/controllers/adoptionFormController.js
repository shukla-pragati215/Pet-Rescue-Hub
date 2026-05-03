import AdoptionForm from "../models/AdoptionForm.js";
import sendEmail from "../utils/sendEmail.js";

/* ===============================
   CREATE ADOPTION FORM
================================ */
export const createAdoptionForm = async (req, res) => {
  try {
    const {
      petId,
      petName,
      petType,
      petAge,
      petBreed,
      petImage,
      name,
      email,
      address,
      message,
    } = req.body;

    console.log("Adoption form body:", req.body);

    if (!petId || !petName || !name || !email || !address) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const newForm = await AdoptionForm.create({
      petId,
      petName,
      petType: petType || "",
      petAge: petAge || "",
      petBreed: petBreed || "",
      petImage: petImage || "",
      name,
      email,
      address,
      message: message || "",
      status: "Pending",
    });

    // ✅ EMAIL TO USER
    try {
      await sendEmail({
        to: email,
        subject: "Adoption Request Received - Pet Rescue Hub",
        html: `
          <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
            <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
              
              <!-- HEADER -->
              <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8); padding:28px 24px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                <p style="margin:8px 0 0; font-size:15px;">Adoption Request Confirmation</p>
              </div>

              <!-- BODY -->
              <div style="padding:32px 24px; color:#1f2937;">
                <h2 style="margin:0 0 14px; font-size:26px; color:#111827;">
                  Hello, ${name} 👋
                </h2>

                <p style="font-size:16px; line-height:1.7;">
                  Your adoption request for <strong>${petName}</strong> has been submitted successfully.
                </p>

                <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
                  <p><strong>Pet:</strong> ${petName}</p>
                  <p><strong>Status:</strong> Pending</p>
                </div>

                <h3 style="margin-top:20px;">📋 Your Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Message:</strong> ${message || "N/A"}</p>

                <h3 style="margin-top:20px;">What happens next?</h3>
                <ul style="padding-left:20px;">
                  <li>Our team will review your request</li>
                  <li>We may contact you via email</li>
                  <li>You will receive updates soon</li>
                </ul>

                <p style="margin-top:20px;">
                  Thank you for helping rescue animals ❤️
                </p>

                <p><strong>Pet Rescue Hub Team</strong></p>
              </div>

              <!-- FOOTER -->
              <div style="border-top:1px solid #e5e7eb; padding:18px; text-align:center; font-size:13px; color:#6b7280;">
                This is an automated email from Pet Rescue Hub
              </div>
            </div>
          </div>
        `,
      });
    } catch (mailErr) {
      console.log("Email failed:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Adoption request submitted successfully",
      data: newForm,
    });
  } catch (error) {
    console.error("Adoption form error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
/* ===============================
   GET ALL ADOPTION FORMS
================================ */
export const getAllAdoptionForms = async (req, res) => {
  try {
    const forms = await AdoptionForm.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.error("Fetch adoption forms error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch adoption forms",
    });
  }
};

/* ===============================
   UPDATE ADOPTION FORM STATUS
================================ */
export const updateAdoptionFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const form = await AdoptionForm.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Adoption form not found",
      });
    }

    form.status = status;
    await form.save();

    // ✅ Send status email to user
    if (form.email) {
      try {
        await sendEmail({
          to: form.email,
          subject: `Adoption Request ${status} - Pet Rescue Hub`,
          html: `
            <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
              <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
                
                <div style="background:linear-gradient(135deg,${
                  status === "Approved" ? "#16a34a,#15803d" : status === "Rejected" ? "#dc2626,#b91c1c" : "#2563eb,#1d4ed8"
                }); padding:28px 24px; text-align:center; color:#ffffff;">
                  <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                  <p style="margin:8px 0 0; font-size:15px;">Adoption Request Update</p>
                </div>

                <div style="padding:32px 24px; color:#1f2937;">
                  <h2 style="margin:0 0 14px; font-size:26px; color:#111827;">
                    Hello, ${form.name} 👋
                  </h2>

                  <p style="font-size:16px; line-height:1.7;">
                    Your adoption request for <strong>${form.petName}</strong> has been
                    <strong> ${status}</strong>.
                  </p>

                  <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
                    <p style="margin:0 0 8px;"><strong>Pet:</strong> ${form.petName}</p>
                    <p style="margin:0;"><strong>Status:</strong> ${form.status}</p>
                  </div>

                  ${
                    status === "Approved"
                      ? `<p style="font-size:16px; line-height:1.7;">Congratulations! Our team will contact you soon for the next steps.</p>`
                      : status === "Rejected"
                      ? `<p style="font-size:16px; line-height:1.7;">We are sorry to inform you that your request could not be approved at this time. You may apply again in the future.</p>`
                      : `<p style="font-size:16px; line-height:1.7;">Your request is still under review.</p>`
                  }

                  <p style="margin-top:20px;"><strong>Pet Rescue Hub Team</strong></p>
                </div>

                <div style="border-top:1px solid #e5e7eb; padding:18px; text-align:center; font-size:13px; color:#6b7280;">
                  This is an automated email from Pet Rescue Hub
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.log("Adoption status email failed:", mailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Adoption form ${status.toLowerCase()} successfully`,
      data: form,
    });
  } catch (error) {
    console.error("Update adoption form status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

/* ===============================
   DELETE ADOPTION FORM
================================ */
export const deleteAdoptionForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedForm = await AdoptionForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return res.status(404).json({
        success: false,
        message: "Adoption form not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Adoption form deleted successfully",
    });
  } catch (error) {
    console.error("Delete adoption form error:", error);
    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};