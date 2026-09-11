import "server-only";

import nodemailer from "nodemailer";

type EmailInput = {
  subject: string;
  html: string;
};

export async function notifyAdmin(input: EmailInput) {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_APP_PASSWORD;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.FROM_EMAIL || user;

  if (!user || !password || !to) {
    return { sent: false, reason: "Email delivery is unavailable." };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass: password }
  });

  try {
    await transporter.sendMail({ from, to, subject: input.subject, html: input.html });
    return { sent: true };
  } catch (error) {
    console.error("Admin email delivery failed", error);
    return { sent: false, reason: "Email delivery failed." };
  }
}
