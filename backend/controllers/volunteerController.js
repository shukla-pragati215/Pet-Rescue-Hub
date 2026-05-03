import Volunteer from "../models/Volunteer.js";
import sendEmail from "../utils/sendEmail.js";

/* ===============================
   APPLY AS VOLUNTEER
================================ */
export const applyVolunteer = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    const newVolunteer = new Volunteer({
      name: cleanName,
      email: cleanEmail,
      status: "New",
    });

    await newVolunteer.save();

    // ✅ Confirmation email
    try {
      await sendEmail({
        to: cleanEmail,
        subject: "Volunteer Application Received - Pet Rescue Hub",
        html: `
          <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
            <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
              
              <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8); padding:28px 24px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
                  Volunteer Application Received
                </p>
              </div>

              <div style="padding:32px 24px; color:#1f2937;">
                <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
                  Thanks, ${cleanName}! 🎉
                </h2>

                <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
                  Your volunteer application has been received successfully.
                </p>

                <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
                  <p style="margin:0 0 10px; font-size:18px; color:#111827;">
                    <strong>Name:</strong> ${cleanName}
                  </p>
                  <p style="margin:0; font-size:18px; color:#111827;">
                    <strong>Status:</strong> New
                  </p>
                </div>

                <h3 style="margin:26px 0 12px; font-size:24px; color:#111827;">
                  What happens next?
                </h3>

                <ul style="padding-left:24px; margin:0 0 24px; font-size:17px; line-height:1.9; color:#374151;">
                  <li>Our team will review your request</li>
                  <li>We may contact you through email</li>
                  <li>You will receive updates when your request status changes</li>
                </ul>

                <p style="font-size:17px; line-height:1.7; margin:0 0 8px;">
                  Thank you for supporting rescued animals. ❤️
                </p>

                <p style="font-size:18px; font-weight:700; margin:0;">
                  Pet Rescue Hub Team
                </p>
              </div>

              <div style="border-top:1px solid #e5e7eb; padding:18px 24px; color:#6b7280; font-size:14px; text-align:center;">
                This is an automated email from Pet Rescue Hub.
              </div>
            </div>
          </div>
        `,
      });
    } catch (mailError) {
      console.log("Volunteer confirmation email failed:", mailError.message);
    }

    return res.status(201).json({
      success: true,
      message:
        "Volunteer application submitted successfully. A confirmation email has been sent.",
      data: newVolunteer,
    });
  } catch (error) {
    console.error("Volunteer apply error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   GET ALL VOLUNTEERS
================================ */
export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: volunteers,
    });
  } catch (error) {
    console.error("Fetch volunteers error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   UPDATE VOLUNTEER STATUS
================================ */
export const updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["New", "Contacted", "Closed"];

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

    const volunteer = await Volunteer.findById(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer request not found",
      });
    }

    volunteer.status = status;
    await volunteer.save();

    // ✅ Send email on status update
    if (volunteer.email) {
      try {
        if (status === "Contacted") {
          await sendEmail({
            to: volunteer.email,
            subject: "Volunteer Request Contacted - Pet Rescue Hub",
            html: `
              <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
                <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
                  
                  <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8); padding:28px 24px; text-align:center; color:#ffffff;">
                    <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                    <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
                      Volunteer Request Update
                    </p>
                  </div>

                  <div style="padding:32px 24px; color:#1f2937;">
                    <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
                      Hello, ${volunteer.name} 👋
                    </h2>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
                      Thank you for your interest in volunteering with <strong>Pet Rescue Hub</strong>.
                    </p>

                    <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
                      <p style="margin:0 0 10px; font-size:18px; color:#111827;">
                        <strong>Status:</strong> Contacted
                      </p>
                      <p style="margin:0; font-size:17px; color:#111827;">
                        Our team has reviewed your request and may contact you soon.
                      </p>
                    </div>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 16px;">
                      Please keep checking your email for further updates.
                    </p>

                    <p style="font-size:18px; font-weight:700; margin:0;">
                      Pet Rescue Hub Team
                    </p>
                  </div>

                  <div style="border-top:1px solid #e5e7eb; padding:18px 24px; color:#6b7280; font-size:14px; text-align:center;">
                    This is an automated email from Pet Rescue Hub.
                  </div>
                </div>
              </div>
            `,
          });
        }

        if (status === "Closed") {
          await sendEmail({
            to: volunteer.email,
            subject: "Volunteer Request Closed - Pet Rescue Hub",
            html: `
              <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
                <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
                  
                  <div style="background:linear-gradient(135deg,#dc2626,#b91c1c); padding:28px 24px; text-align:center; color:#ffffff;">
                    <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                    <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
                      Volunteer Request Closed
                    </p>
                  </div>

                  <div style="padding:32px 24px; color:#1f2937;">
                    <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
                      Hello, ${volunteer.name}
                    </h2>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
                      Your volunteer request has been marked as <strong>Closed</strong>.
                    </p>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 16px;">
                      Thank you for your interest in helping Pet Rescue Hub.
                    </p>

                    <p style="font-size:18px; font-weight:700; margin:0;">
                      Pet Rescue Hub Team
                    </p>
                  </div>

                  <div style="border-top:1px solid #e5e7eb; padding:18px 24px; color:#6b7280; font-size:14px; text-align:center;">
                    This is an automated email from Pet Rescue Hub.
                  </div>
                </div>
              </div>
            `,
          });
        }

        if (status === "New") {
          await sendEmail({
            to: volunteer.email,
            subject: "Volunteer Request Reopened - Pet Rescue Hub",
            html: `
              <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
                <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
                  
                  <div style="background:linear-gradient(135deg,#f59e0b,#d97706); padding:28px 24px; text-align:center; color:#ffffff;">
                    <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
                    <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
                      Volunteer Request Reopened
                    </p>
                  </div>

                  <div style="padding:32px 24px; color:#1f2937;">
                    <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
                      Hello, ${volunteer.name}
                    </h2>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
                      Your volunteer request has been moved back to <strong>New</strong> status.
                    </p>

                    <p style="font-size:17px; line-height:1.7; margin:0 0 16px;">
                      Our team may review it again shortly.
                    </p>

                    <p style="font-size:18px; font-weight:700; margin:0;">
                      Pet Rescue Hub Team
                    </p>
                  </div>

                  <div style="border-top:1px solid #e5e7eb; padding:18px 24px; color:#6b7280; font-size:14px; text-align:center;">
                    This is an automated email from Pet Rescue Hub.
                  </div>
                </div>
              </div>
            `,
          });
        }
      } catch (mailError) {
        console.error("Volunteer status email failed:", mailError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Volunteer status updated to ${status}`,
      data: volunteer,
    });
  } catch (error) {
    console.error("Update volunteer status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ===============================
   DELETE VOLUNTEER
================================ */
export const deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    const volunteer = await Volunteer.findByIdAndDelete(id);

    if (!volunteer) {
      return res.status(404).json({
        success: false,
        message: "Volunteer request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Volunteer request deleted successfully",
    });
  } catch (error) {
    console.error("Delete volunteer error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};