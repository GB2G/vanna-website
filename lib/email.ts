import { Resend } from "resend";
import { siteConfig } from "./siteConfig";

/**
 * Thin wrapper around Resend for the booking + contact forms.
 *
 * Designed to degrade gracefully: if RESEND_API_KEY is not set (e.g. in local
 * dev before an account exists), we log the payload and return a clear
 * "not configured" result instead of throwing — so the site stays usable.
 *
 * To go live: create a Resend account, verify a sending domain (or use the
 * shared onboarding@resend.dev address for testing), then set in .env.local:
 *   RESEND_API_KEY=...
 *   RESEND_FROM="Renoun Creation <onboarding@resend.dev>"
 *   BOOKING_TO_EMAIL=imrsteelo@gmail.com
 */

const apiKey = process.env.RESEND_API_KEY;
const fromAddress =
  process.env.RESEND_FROM || "Renoun Creation <onboarding@resend.dev>";
const toAddress = process.env.BOOKING_TO_EMAIL || siteConfig.email;

export type SendResult =
  | { ok: true; delivered: true }
  | { ok: true; delivered: false; reason: "not-configured" }
  | { ok: false; error: string };

interface SendArgs {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendNotification({
  subject,
  html,
  replyTo,
}: SendArgs): Promise<SendResult> {
  if (!apiKey) {
    // Not configured yet — surface the payload in dev logs so nothing is lost.
    console.warn(
      "[email] RESEND_API_KEY missing — skipping send. Would have sent:",
      { to: toAddress, subject, replyTo },
    );
    return { ok: true, delivered: false, reason: "not-configured" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true, delivered: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[email] send failed:", message);
    return { ok: false, error: message };
  }
}

/** Small helper to escape user input before embedding in the email HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
