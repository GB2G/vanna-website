"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { siteConfig } from "@/lib/siteConfig";
import { bookingSchema } from "@/lib/validation";
import { Button } from "./ui/Button";
import { ViewfinderCorners } from "./ui/Viewfinder";

const field =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-cream placeholder:text-muted/70 transition-colors focus:border-teal-glow focus:outline-none";
const label = "mb-1.5 block text-sm text-cream-dim";

// On the GitHub Pages static export the email API isn't available; show a
// preview notice instead of attempting a request that can't succeed.
const IS_STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

type Status = "idle" | "submitting" | "success" | "error" | "preview";

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>();
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
      phone: String(data.get("phone") ?? ""),
      sessionType: String(data.get("sessionType") ?? ""),
      timeSlot: String(data.get("timeSlot") ?? ""),
      message: String(data.get("message") ?? ""),
      date: date ? date.toISOString() : "",
    };

    const parsed = bookingSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        if (v && v[0]) fieldErrors[k] = v[0];
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    if (IS_STATIC) {
      setStatus("preview");
      return;
    }
    setStatus("submitting");

    try {
      const res = await fetch("/api/book", {
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
      setDate(undefined);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "preview") {
    return (
      <div className="grain rounded-3xl border border-line bg-surface p-10 text-center">
        <h3 className="font-display text-2xl text-cream">This is a preview site</h3>
        <p className="mx-auto mt-3 max-w-md text-cream-dim">
          The live booking form isn&apos;t connected on this preview deployment. To
          request a session, email me directly and I&apos;ll get you booked in.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Session booking request")}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold via-orange to-orange-deep px-6 py-3 text-sm font-medium text-ink"
        >
          Email {siteConfig.email}
        </a>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 block w-full text-sm text-muted hover:text-cream"
        >
          Back to form
        </button>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="grain rounded-3xl border border-line bg-surface p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange text-ink">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-2xl text-cream">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-cream-dim">
          Thanks! I&apos;ll be in touch soon to confirm your session. If it&apos;s
          urgent, email me directly at{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-teal-glow hover:underline">
            {siteConfig.email}
          </a>
          .
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Book another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
      {/* Details */}
      <div className="order-2 grid gap-5 lg:order-1">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={label}>Name</label>
            <input id="name" name="name" className={field} placeholder="Your name" />
            {errors.name && <p className="mt-1 text-xs text-orange">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className={label}>Email</label>
            <input id="email" name="email" type="email" className={field} placeholder="you@email.com" />
            {errors.email && <p className="mt-1 text-xs text-orange">{errors.email}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={label}>Phone <span className="text-muted">(optional)</span></label>
            <input id="phone" name="phone" className={field} placeholder="+1 …" />
          </div>
          <div>
            <label htmlFor="sessionType" className={label}>Session type</label>
            <select id="sessionType" name="sessionType" defaultValue="" className={field}>
              <option value="" disabled>Choose…</option>
              {siteConfig.sessionTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.sessionType && <p className="mt-1 text-xs text-orange">{errors.sessionType}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="timeSlot" className={label}>Preferred time</label>
          <select id="timeSlot" name="timeSlot" defaultValue="" className={field}>
            <option value="" disabled>Choose…</option>
            {siteConfig.timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.timeSlot && <p className="mt-1 text-xs text-orange">{errors.timeSlot}</p>}
        </div>

        <div>
          <label htmlFor="message" className={label}>Tell me about your project <span className="text-muted">(optional)</span></label>
          <textarea id="message" name="message" rows={4} className={`${field} resize-none`} placeholder="Location, vibe, references, anything…" />
        </div>

        {serverError && (
          <p className="rounded-lg border border-orange/40 bg-orange/10 px-4 py-3 text-sm text-amber">
            {serverError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Request this date"}
          </Button>
          <p className="text-xs text-muted">
            No payment now. I&apos;ll confirm availability by email.
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="order-1 lg:order-2">
        <label className={label}>Pick a date</label>
        <div className="grain relative inline-block rounded-2xl border border-line bg-surface p-4">
          <ViewfinderCorners tone="teal" className="m-1.5 opacity-50" />
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
            weekStartsOn={1}
          />
        </div>
        <p className="mt-2 text-sm text-cream-dim">
          {date
            ? date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "No date selected yet."}
        </p>
        {errors.date && <p className="mt-1 text-xs text-orange">{errors.date}</p>}
      </div>
    </form>
  );
}
