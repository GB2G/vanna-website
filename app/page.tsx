import Image from "next/image";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/GalleryGrid";
import { VideoEmbed } from "@/components/VideoEmbed";
import { featuredPhotos, films } from "@/lib/portfolio";
import { siteConfig } from "@/lib/siteConfig";

const services = [
  {
    title: "Photography",
    body: "Portraits, brands, and stories told in a single frame — warm skin tones, honest light, a cozy sense of place.",
    tone: "from-orange/20 to-transparent",
  },
  {
    title: "Cinematography",
    body: "Films, commercials, and music videos shot with a filmic eye — deep cyan shadows, motion that breathes.",
    tone: "from-teal/25 to-transparent",
  },
  {
    title: "Color & finish",
    body: "The Vision3 warm/cool grade that ties it all together — contrasty, complementary, never over-cooked.",
    tone: "from-gold/20 to-transparent",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Featured work */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Selected frames"
            title="A look through the lens"
            subtitle="A handful of favorites — the full portfolio lives one click away."
          />
        </Reveal>
        <div className="mt-10">
          <GalleryGrid photos={featuredPhotos} showFilter={false} />
        </div>
        <div className="mt-10">
          <ButtonLink href="/portfolio" variant="outline">
            See the full portfolio
          </ButtonLink>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="From first light to final grade"
            align="center"
            className="mb-12"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="grain relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-8">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.tone}`}
                />
                <div className="relative">
                  <span className="font-display text-sm text-teal-glow">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-cream">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Cinematography reel */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="In motion"
            title="Cinematography"
            subtitle="Placeholder reels from @renouncreation — real uploads drop straight in."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {films.slice(0, 2).map((film, i) => (
            <Reveal key={film.id} delay={i * 100}>
              <VideoEmbed film={film} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-surface/60 p-8 sm:p-12 md:grid-cols-2">
          <Reveal>
            <div className="grain relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
              <Image
                src={featuredPhotos[4]?.src ?? featuredPhotos[0].src}
                alt="Vanna Noun on location"
                fill
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <SectionHeading
                eyebrow="The eye behind Renoun"
                title="Hi, I'm Vanna."
              />
              <p className="mt-5 text-base leading-relaxed text-cream-dim">
                I&apos;m a director of photography and photographer drawn to the warm,
                contrasty look of film. My work lives on the line between warm and
                cool — golden light on skin, deep teal in the shadows — for images
                that feel cinematic and cozy at once.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <ButtonLink href="/about" variant="outline">
                  More about me
                </ButtonLink>
                <ButtonLink href="/book">Let&apos;s work together</ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grain relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-teal-deep/40 via-surface to-orange-deep/30 p-10 text-center sm:p-16">
          <h2 className="font-display text-3xl text-cream sm:text-5xl">
            Let&apos;s make something with soul.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-dim">
            Tell me about your project or pick a date — I&apos;ll take care of the light.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/book">Book a session</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Or just say hi
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-teal-glow underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
