import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import { siteConfig } from "@/lib/siteConfig";
import { featuredPhotos } from "@/lib/portfolio";

export function Hero() {
  const [a, b, c] = featuredPhotos;

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Copy */}
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-teal-glow">
            {siteConfig.role} · {siteConfig.brand}
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-cream sm:text-6xl md:text-7xl">
            Light that feels{" "}
            <span className="bg-gradient-to-r from-teal-glow via-gold to-orange bg-clip-text text-transparent italic">
              cozy
            </span>
            , frames that feel{" "}
            <span className="bg-gradient-to-r from-orange via-gold to-teal-glow bg-clip-text text-transparent italic">
              cinematic
            </span>
            .
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            {siteConfig.intro}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/book">Book a session</ButtonLink>
            <ButtonLink href="/portfolio" variant="outline">
              View the work
            </ButtonLink>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { k: "Warm + cool", v: "Signature color" },
              { k: "Photo + motion", v: "Full production" },
              { k: "Community Driven", v: "Shooting within Canada" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="font-display text-xl text-cream">{s.k}</dt>
                <dd className="text-xs uppercase tracking-[0.2em] text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image cluster */}
        <div className="reveal relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 [animation-delay:150ms] lg:max-w-none">
          <div className="grain relative col-span-1 mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-line">
            {a && (
              <Image
                src={a.src}
                alt={a.alt}
                fill
                priority
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="grain relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              {b && (
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="object-cover"
                />
              )}
            </div>
            <div className="grain relative aspect-square overflow-hidden rounded-2xl border border-line">
              {c && (
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
