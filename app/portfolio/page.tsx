import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { VideoEmbed } from "@/components/VideoEmbed";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { photos, films } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Photography and cinematography by Vanna Noun — cinematic teal & orange, cozy and contrasty.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="The work"
        title="Portfolio"
        subtitle="Placeholder imagery for now — Vanna's real photography and films slot straight into this layout."
      />

      {/* Photography */}
      <section className="mt-12">
        <h3 className="mb-6 font-display text-2xl text-cream">Photography</h3>
        <GalleryGrid photos={photos} />
      </section>

      {/* Cinematography */}
      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h3 className="font-display text-2xl text-cream">Cinematography</h3>
          <span className="text-xs uppercase tracking-[0.2em] text-teal-glow/80">
            @renouncreation
          </span>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {films.map((film, i) => (
            <Reveal key={film.id} delay={(i % 2) * 100}>
              <VideoEmbed film={film} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
