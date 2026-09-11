import "server-only";

import nodemailer from "nodemailer";

type EmailInput = {
  subject: string;
  html: string;
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatFieldValue(value: unknown): string {
  if (Array.isArray(value)) return value.length ? escapeHtml(value.join(", ")) : "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (value === undefined || value === null || value === "") return "—";
  return escapeHtml(String(value)).replace(/\n/g, "<br>");
}

/** Renders a label/value list as an HTML table so every submitted field is visible in the notification email. */
export function renderFieldsHtml(fields: Array<[string, unknown]>): string {
  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 16px 4px 0;color:#555;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(label)}</strong></td><td style="padding:4px 0;">${formatFieldValue(value)}</td></tr>`
    )
    .join("");

  return `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}

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
    await transporter.sendMail({ from, to, subject: input.subject, html: input.html, attachments: input.attachments });
    return { sent: true };
  } catch (error) {
    console.error("Admin email delivery failed", error);
    return { sent: false, reason: "Email delivery failed." };
  }
}
