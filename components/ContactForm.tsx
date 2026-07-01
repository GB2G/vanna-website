"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { contactSchema } from "@/lib/validation";
import { Button } from "./ui/Button";

const field =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-cream placeholder:text-muted/70 transition-colors focus:border-teal-glow focus:outline-none";
const label = "mb-1.5 block text-sm text-cream-dim";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v && v[0]) fieldErrors[k] = v[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="grain rounded-3xl border border-line bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal-glow text-ink">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl text-cream">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-cream-dim">
          Thanks for reaching out — I&apos;ll reply as soon as I can.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>Name</label>
          <input id="c-name" name="name" className={field} placeholder="Your name" />
          {errors.name && <p className="mt-1 text-xs text-orange">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className={label}>Email</label>
          <input id="c-email" name="email" type="email" className={field} placeholder="you@email.com" />
          {errors.email && <p className="mt-1 text-xs text-orange">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-message" className={label}>Message</label>
        <textarea id="c-message" name="message" rows={5} className={`${field} resize-none`} placeholder="What's on your mind?" />
        {errors.message && <p className="mt-1 text-xs text-orange">{errors.message}</p>}
      </div>

      {serverError && (
        <p className="rounded-lg border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-amber">
          {serverError}
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
