import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendNotification, escapeHtml } from "@/lib/email";
import { siteConfig } from "@/lib/siteConfig";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const c = parsed.data;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#12181b">
      <h2 style="margin:0 0 12px">New message from the website</h2>
      <p><strong>${escapeHtml(c.name)}</strong> &lt;${escapeHtml(c.email)}&gt;</p>
      <p style="white-space:pre-wrap;line-height:1.6">${escapeHtml(c.message)}</p>
      <p style="margin-top:16px;color:#6b7280;font-size:12px">
        Sent from ${siteConfig.brand} website.
      </p>
    </div>`;

  const result = await sendNotification({
    subject: `New message from ${c.name}`,
    html,
    replyTo: c.email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Couldn't send right now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: result.delivered });
}
