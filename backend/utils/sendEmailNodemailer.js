import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailNodemailer = async ({
  to,
  subject,
  html,
}) => {
  try {
    const info = await transporter.sendMail({
      from: `"ShelfShare" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.response);

    return true;

  } catch (err) {

    console.error("Nodemailer Error:", err.message);

    return false;

  }
};