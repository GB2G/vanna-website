import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { featuredPhotos } from "@/lib/portfolio";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Vanna Noun — director of photography and photographer behind Renoun Creation.",
};

const approach = [
  {
    title: "Cozy",
    body: "Sessions that feel relaxed and human. Good light, good company — the kind of set where people forget the camera is there.",
  },
  {
    title: "Contrasty",
    body: "Real depth in every frame. Bright, golden highlights held against rich, inky shadow — the drama that gives an image weight.",
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
              src={featuredPhotos[0].src}
              alt="Portrait of Vanna Noun"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <SectionHeading
              eyebrow={`${siteConfig.role} · ${siteConfig.brand}`}
              title="I chase the warm/cool line for a living."
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-cream-dim">
              <p>
                I&apos;m Vanna Noun — a photographer and director of photography
                working under the name Renoun Creation. I fell for the look of
                film: the way Kodak Vision3 renders golden skin tones and lets the
                shadows fall into deep, honest cyan.
              </p>
              <p>
                Whether it&apos;s a portrait, a brand film, or a music video, I&apos;m
                after the same feeling — images that are cinematic and cozy at the
                same time. Contrasty enough to hold your eye, warm enough to feel
                like home.
              </p>
              <p>
                Based wherever the work takes me, and always happy to travel for the
                right story.
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
