import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { BookingForm } from "@/components/BookingForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Request a photography or cinematography session with Vanna Noun. Pick a date and share your details.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="Let's shoot"
        title="Book a session"
        subtitle="Choose a date, tell me a little about the project, and I'll follow up by email to confirm the details."
      />

      <div className="mt-12">
        <BookingForm />
      </div>

      <p className="mt-10 text-sm text-muted">
        Would rather just talk it through? Email me at{" "}
        <a href={`mailto:${siteConfig.email}`} className="text-teal-glow hover:underline">
          {siteConfig.email}
        </a>{" "}
        or use the{" "}
        <Link href="/contact" className="text-teal-glow hover:underline">contact form</Link>.
      </p>
    </div>
  );
}
