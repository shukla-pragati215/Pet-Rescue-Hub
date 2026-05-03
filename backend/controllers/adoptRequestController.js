import AdoptRequest from "../models/AdoptRequest.js";
import sendEmail from "../utils/sendEmail.js";

/* ===============================
   CREATE ADOPTION REQUEST
================================ */
export const createAdoptRequest = async (req, res) => {
  try {
    const { fullName, email, phone, address, petPreference, reason, userId } =
      req.body;

    console.log("Incoming Adopt Request:", req.body);

    if (!fullName || !email || !phone || !address || !petPreference || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const cleanName = String(fullName).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();
    const cleanAddress = String(address).trim();
    const cleanPetPreference = String(petPreference).trim();
    const cleanReason = String(reason).trim();

    const doc = await AdoptRequest.create({
      userId: userId || null,
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      address: cleanAddress,
      petPreference: cleanPetPreference,
      reason: cleanReason,
      status: "Pending",
    });

    console.log("Saved adopt request:", doc);
    console.log("Generated applicationId:", doc.applicationId);

    try {
      await sendEmail({
        to: cleanEmail,
        subject: `✅ Application Received — ${doc.applicationId || "PRH-ID"}`,
       html: `
  <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
      
      <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8); padding:28px 24px; text-align:center; color:#ffffff;">
        <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
        <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
          Adoption Application Update
        </p>
      </div>

      <div style="padding:32px 24px; color:#1f2937;">
        <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
          Thanks, ${doc.fullName}! 🎉
        </h2>

        <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
          Your adoption application has been received successfully.
        </p>

        <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
          <p style="margin:0 0 10px; font-size:18px; color:#111827;">
            <strong>Application ID:</strong> ${doc.applicationId || "N/A"}
          </p>
          <p style="margin:0; font-size:18px; color:#111827;">
            <strong>Current Status:</strong> ${doc.status}
          </p>
        </div>

        <h3 style="margin:26px 0 12px; font-size:24px; color:#111827;">
          What happens next?
        </h3>

        <ul style="padding-left:24px; margin:0 0 24px; font-size:17px; line-height:1.9; color:#374151;">
          <li>Our team will review your details</li>
          <li>We may contact you for verification</li>
          <li>You’ll receive an email when your status changes</li>
        </ul>

        <p style="font-size:17px; line-height:1.7; margin:0 0 8px;">
          If you have any questions, reply to this email.
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
    } catch (mailErr) {
      console.error("Email sending failed:", mailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully. Confirmation email sent.",
      data: {
        id: doc._id,
        applicationId: doc.applicationId,
        status: doc.status,
      },
    });
  } catch (error) {
    console.error("createAdoptRequest error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting adoption request",
    });
  }
};

/* ===============================
   GET ALL ADOPTION REQUESTS
================================ */
export const getAllAdoptRequests = async (req, res) => {
  try {
    const requests = await AdoptRequest.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (error) {
    console.error("Fetch adoption requests error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch adoption requests",
    });
  }
};

/* ===============================
   UPDATE ADOPTION REQUEST STATUS
================================ */
export const updateAdoptRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Under Review", "Approved", "Rejected"];

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

    const request = await AdoptRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Adoption request not found",
      });
    }

    request.status = status;
    await request.save();

    if (request.email) {
      try {
        if (status === "Approved") {
          await sendEmail({
            to: request.email,
            subject: `🎉 Adoption Request Approved — ${request.applicationId || "PRH-ID"}`,
            html: `
  <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
      
      <div style="background:linear-gradient(135deg,#16a34a,#15803d); padding:28px 24px; text-align:center; color:#ffffff;">
        <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
        <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
          Adoption Request Approved
        </p>
      </div>

      <div style="padding:32px 24px; color:#1f2937;">
        <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
          Congratulations, ${request.fullName}! 🎉
        </h2>

        <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
          Your adoption request has been <strong>approved</strong>.
        </p>

        <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
          <p style="margin:0 0 10px; font-size:18px; color:#111827;">
            <strong>Application ID:</strong> ${request.applicationId || "N/A"}
          </p>
          <p style="margin:0 0 10px; font-size:18px; color:#111827;">
            <strong>Pet Preference:</strong> ${request.petPreference}
          </p>
          <p style="margin:0; font-size:18px; color:#111827;">
            <strong>Status:</strong> ${request.status}
          </p>
        </div>

        <p style="font-size:17px; line-height:1.7; margin:0 0 16px;">
          Our team will contact you soon for the next steps of the adoption process.
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

        if (status === "Rejected") {
          await sendEmail({
            to: request.email,
            subject: `Adoption Request Update — ${request.applicationId || "PRH-ID"}`,
           html: `
  <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, sans-serif;">
    <div style="max-width:600px; margin:30px auto; background:#ffffff; border-radius:18px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
      
      <div style="background:linear-gradient(135deg,#f59e0b,#d97706); padding:28px 24px; text-align:center; color:#ffffff;">
        <h1 style="margin:0; font-size:28px;">Pet Rescue Hub 🐾</h1>
        <p style="margin:8px 0 0; font-size:15px; opacity:0.95;">
          Application Under Review
        </p>
      </div>

      <div style="padding:32px 24px; color:#1f2937;">
        <h2 style="margin:0 0 14px; font-size:28px; color:#111827;">
          Hello, ${request.fullName}
        </h2>

        <p style="font-size:17px; line-height:1.7; margin:0 0 20px;">
          Your adoption request is currently <strong>under review</strong>.
        </p>

        <div style="background:#f3f4f6; border-radius:16px; padding:20px; margin:22px 0;">
          <p style="margin:0 0 10px; font-size:18px; color:#111827;">
            <strong>Application ID:</strong> ${request.applicationId || "N/A"}
          </p>
          <p style="margin:0 0 10px; font-size:18px; color:#111827;">
            <strong>Pet Preference:</strong> ${request.petPreference}
          </p>
          <p style="margin:0; font-size:18px; color:#111827;">
            <strong>Status:</strong> ${request.status}
          </p>
        </div>

        <p style="font-size:17px; line-height:1.7; margin:0 0 16px;">
          We will update you once the review process is completed.
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

        if (status === "Under Review") {
          await sendEmail({
            to: request.email,
            subject: `Application Under Review — ${request.applicationId || "PRH-ID"}`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color:#222; max-width:600px; margin:auto; padding:20px;">
                <h2 style="color:#f59e0b; margin:0 0 10px;">Application Under Review</h2>
                <p>Hello <b>${request.fullName}</b>,</p>
                <p>Your adoption request is currently <b>under review</b>.</p>

                <div style="background:#f6f7fb; padding:14px; border-radius:10px; margin:16px 0;">
                  <p style="margin:0;"><b>Application ID:</b> ${request.applicationId || "N/A"}</p>
                  <p style="margin:6px 0 0;"><b>Pet Preference:</b> ${request.petPreference}</p>
                  <p style="margin:6px 0 0;"><b>Status:</b> ${request.status}</p>
                </div>

                <p>We will update you once the review process is completed.</p>

                <p style="margin-top:16px;">
                  Regards,<br />
                  <b>Pet Rescue Hub Team</b>
                </p>
              </div>
            `,
          });
        }
      } catch (mailErr) {
        console.error("Status email error:", mailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Adoption request ${status.toLowerCase()} successfully`,
      data: request,
    });
  } catch (error) {
    console.error("Update adoption request status error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};