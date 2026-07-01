import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { sendNotification, escapeHtml } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const b = parsed.data;
  const prettyDate = new Date(b.date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#12181b">
      <h2 style="margin:0 0 12px">New booking request</h2>
      <table style="border-collapse:collapse">
        ${row("Name", escapeHtml(b.name))}
        ${row("Email", escapeHtml(b.email))}
        ${b.phone ? row("Phone", escapeHtml(b.phone)) : ""}
        ${row("Session", escapeHtml(b.sessionType))}
        ${row("Preferred date", escapeHtml(prettyDate))}
        ${row("Preferred time", escapeHtml(b.timeSlot))}
        ${b.message ? row("Message", escapeHtml(b.message)) : ""}
      </table>
      <p style="margin-top:16px;color:#6b7280;font-size:12px">
        Sent from ${siteConfig.brand} website · reply to reach ${escapeHtml(b.name)}.
      </p>
    </div>`;

  const result = await sendNotification({
    subject: `New booking · ${b.sessionType} · ${prettyDate}`,
    html,
    replyTo: b.email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Couldn't send right now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#6b7280;vertical-align:top">${label}</td>
    <td style="padding:6px 0;font-weight:600">${value}</td>
  </tr>`;
}
