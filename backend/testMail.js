import "dotenv/config";
import { sendEmailNodemailer } from "./utils/sendEmailNodemailer.js";

await sendEmailNodemailer({
  to: process.env.EMAIL_USER,
  subject: "ShelfShare Test",
  html: "<h2>Nodemailer is working! 🎉</h2>",
});

process.exit();