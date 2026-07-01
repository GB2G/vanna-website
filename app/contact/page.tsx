import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vanna Noun / Renoun Creation.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        {/* Left: details */}
        <div>
          <SectionHeading
            eyebrow="Say hello"
            title="Get in touch"
            subtitle="For bookings, collaborations, or just to talk light and color."
          />

          <div className="mt-8 space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted">Email</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1 block font-display text-xl text-cream transition-colors hover:text-orange"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              <ButtonLink href={siteConfig.socials.instagram} variant="outline" className="px-5 py-2.5" target="_blank" rel="noopener noreferrer">
                Instagram ↗
              </ButtonLink>
              <ButtonLink href={siteConfig.socials.youtube} variant="outline" className="px-5 py-2.5" target="_blank" rel="noopener noreferrer">
                YouTube ↗
              </ButtonLink>
            </div>

            <div className="grain rounded-2xl border border-line bg-surface p-6">
              <p className="font-display text-lg text-cream">Ready to lock a date?</p>
              <p className="mt-2 text-sm text-cream-dim">
                Skip the back-and-forth and request a session directly.
              </p>
              <ButtonLink href="/book" className="mt-4">
                Book a session
              </ButtonLink>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="grain rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
