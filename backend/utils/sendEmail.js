import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

const sendEmail = async ({ to, subject, html }) => {
  if (!to) {
    throw new Error("No recipient email provided");
  }

  const info = await transporter.sendMail({
    from: `"Pet Rescue Hub" <${process.env.EMAIL_USER}>`,
    to: to.trim(),
    subject: subject,
    html: html,
  });

  console.log("✅ Email sent:", info.messageId);
};

export default sendEmail;