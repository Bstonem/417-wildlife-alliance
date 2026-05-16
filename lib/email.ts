import "server-only";

import { Resend } from "resend";

type EmailInput = {
  subject: string;
  html: string;
};

export async function notifyAdmin(input: EmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  const from = process.env.FROM_EMAIL || "417 Wildlife Alliance <hello@example.org>";

  if (!apiKey || !to) {
    return { sent: false, reason: "Email delivery is unavailable." };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: input.subject,
    html: input.html
  });

  if (error) {
    console.error("Admin email delivery failed", error);
    return { sent: false, reason: "Email delivery failed." };
  }

  return { sent: true };
}
