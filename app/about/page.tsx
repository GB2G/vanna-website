import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ViewfinderCorners } from "@/components/ui/Viewfinder";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vanna Noun: cinematographer, videographer, and photographer specializing in branding, music videos, and documentaries.",
};

const approach = [
  {
    title: "Cozy",
    body: "Sessions that feel relaxed and human. Good light, good company, the kind of set where people forget the camera is there.",
  },
  {
    title: "Contrasty",
    body: "Real depth in every frame. Bright, golden highlights held against rich, inky shadow, the drama that gives an image weight.",
  },
  {
    title: "Complementary",
    body: "The warm/cool balance of Vision3. Orange and teal working with each other, so the color feels intentional, not filtered.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="grain relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
            <Image
              src="/vanna-avatar.jpg"
              alt="Portrait of Vanna Noun"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <ViewfinderCorners tone="teal" className="m-3 opacity-70" />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70"
            >
              Portrait · 85mm · ƒ/2.0
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <SectionHeading
              eyebrow={`${siteConfig.role} · ${siteConfig.brand}`}
              title="Aesthetic beauty, crafted storytelling."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-cream-dim">
              <p>
                I&apos;m Vanna Noun, a cinematographer, videographer, and
                photographer working under the name Renoun Creation. I specialize in
                branding, music videos, and documentaries: work built on aesthetic
                beauty and crafted storytelling.
              </p>
              <p>
                My style is heavily cinéma vérité: real moments over staged ones,
                with framing, composition, and emotion considered in every single
                frame. A background in communications shapes how I tell stories: with
                intention and meaning, always keeping your story at the center.
              </p>
              <p>
                If you&apos;re looking for a creator who cares as much about how
                something feels as how it looks, I&apos;d love to hear about your next
                project.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/book">Book a session</ButtonLink>
              <ButtonLink href="/portfolio" variant="outline">
                See the work
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Style pull-quote */}
      <Reveal>
        <figure className="grain relative mt-24 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-teal-deep/40 via-surface to-orange-deep/25 px-6 py-14 text-center sm:px-12">
          <span className="font-display text-6xl leading-none text-orange/40">“</span>
          <blockquote className="mx-auto -mt-6 max-w-3xl font-display text-2xl italic leading-snug text-cream sm:text-3xl">
            Framing, composition, and emotion, considered in every frame. My job
            is to tell your story in a way that&apos;s meaningful, beautiful, and
            unmistakably yours.
          </blockquote>
          <figcaption className="mt-6 text-xs uppercase tracking-[0.3em] text-teal-glow">
            The Renoun approach
          </figcaption>
        </figure>
      </Reveal>

      {/* Three C's */}
      <section className="mt-24">
        <SectionHeading
          eyebrow="The aesthetic"
          title="Three words I shoot by"
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <div className="grain h-full rounded-2xl border border-line bg-surface p-8">
                <span
                  className={`font-display text-4xl ${
                    i === 0
                      ? "text-orange"
                      : i === 1
                        ? "text-gold"
                        : "text-teal-glow"
                  }`}
                >
                  {a.title}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-cream-dim">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
