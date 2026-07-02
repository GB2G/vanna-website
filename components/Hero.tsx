import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import { RecBadge, ViewfinderCorners } from "./ui/Viewfinder";
import { siteConfig } from "@/lib/siteConfig";
import { featuredPhotos } from "@/lib/portfolio";

/**
 * Animated hero: staggered word reveal with a shimmering gradient on the
 * accent words, Ken Burns drift + gentle float on the photo cluster, drifting
 * light orbs behind everything, and a scroll cue. All animation is CSS-driven
 * (see "Hero animations" in globals.css) and is disabled globally under
 * prefers-reduced-motion.
 */

// Headline split into words so each can animate in with its own delay.
// `accent` words get the animated teal-to-orange shimmer.
const LINE_ONE: { text: string; accent?: boolean }[] = [
  { text: "Light" },
  { text: "that" },
  { text: "feels" },
  { text: "cozy,", accent: true },
];
const LINE_TWO: { text: string; accent?: boolean }[] = [
  { text: "Frames" },
  { text: "that" },
  { text: "feel" },
  { text: "cinematic.", accent: true },
];

const STAGGER_MS = 110;

function HeadlineWord({
  word,
  index,
}: {
  word: { text: string; accent?: boolean };
  index: number;
}) {
  return (
    <span
      className={`hero-word mr-[0.28em] ${
        word.accent
          ? "hero-accent bg-gradient-to-r from-teal-glow via-gold to-orange bg-clip-text text-transparent italic"
          : ""
      }`}
      style={{ "--word-delay": `${index * STAGGER_MS}ms` } as React.CSSProperties}
    >
      {word.text}
    </span>
  );
}

export function Hero() {
  const [a, b, c] = featuredPhotos;
  const words = [...LINE_ONE, ...LINE_TWO];

  return (
    <section className="relative overflow-hidden">
      {/* Drifting light orbs */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-orb left-[-8%] top-[5%] h-72 w-72 bg-teal/25" />
        <div
          className="hero-orb right-[-6%] top-[20%] h-80 w-80 bg-orange/20"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="hero-orb bottom-[-20%] left-[30%] h-96 w-96 bg-teal-deep/40"
          style={{ animationDelay: "-11s" }}
        />
      </div>

      {/* Viewfinder / camera HUD overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 z-0 sm:inset-6">
        <ViewfinderCorners tone="cream" className="opacity-70" />

        {/* Rule-of-thirds grid */}
        <span className="absolute inset-y-0 left-1/3 hidden w-px bg-cream/[0.05] lg:block" />
        <span className="absolute inset-y-0 left-2/3 hidden w-px bg-cream/[0.05] lg:block" />
        <span className="absolute inset-x-0 top-1/3 hidden h-px bg-cream/[0.05] lg:block" />
        <span className="absolute inset-x-0 top-2/3 hidden h-px bg-cream/[0.05] lg:block" />

        {/* Center focus reticle */}
        <span className="vf-breathe absolute left-1/2 top-1/2 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 lg:block">
          <span className="absolute inset-0 rounded-md border border-teal-glow/30" />
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-teal-glow/50" />
          <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-teal-glow/50" />
          <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-teal-glow/50" />
          <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-teal-glow/50" />
        </span>

        {/* HUD readouts */}
        <div className="absolute left-2 top-2 flex items-center gap-3 sm:left-4 sm:top-4">
          <RecBadge />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:inline">
            A · 4K 24FPS
          </span>
        </div>
        <span className="absolute right-2 top-2 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:right-4 sm:top-4 sm:inline">
          ISO 800 · ƒ/1.8
        </span>
        <span className="absolute bottom-2 left-2 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:bottom-4 sm:left-4 sm:inline">
          WB 5600K
        </span>
        <span className="absolute bottom-2 right-2 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 sm:bottom-4 sm:right-4 sm:inline">
          TC 00:00:24:12
        </span>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Copy */}
        <div>
          <h1 className="mt-6 pb-1 font-display text-5xl leading-[1.15] text-cream sm:text-6xl md:text-7xl">
            {LINE_ONE.map((w, i) => (
              <HeadlineWord key={w.text} word={w} index={i} />
            ))}
            <br className="hidden sm:block" />
            {LINE_TWO.map((w, i) => (
              <HeadlineWord key={w.text} word={w} index={LINE_ONE.length + i} />
            ))}
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-cream-dim"
            style={{ animationDelay: `${words.length * STAGGER_MS + 100}ms` }}
          >
            {siteConfig.intro}
          </p>
          <div
            className="reveal mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: `${words.length * STAGGER_MS + 250}ms` }}
          >
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
            ].map((s, i) => (
              <div
                key={s.k}
                className="reveal"
                style={{
                  animationDelay: `${words.length * STAGGER_MS + 400 + i * 150}ms`,
                }}
              >
                <dt className="font-display text-xl text-cream">{s.k}</dt>
                <dd className="text-xs uppercase tracking-[0.2em] text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image cluster */}
        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 lg:max-w-none">
          {/* Decorative slow-spinning dashed ring behind the cluster */}
          <div
            aria-hidden="true"
            className="hero-spin absolute -right-10 -top-10 h-44 w-44 rounded-full border border-dashed border-teal-glow/25"
          />

          <div className="reveal col-span-1 mt-8 [animation-delay:200ms]">
            <div className="hero-float grain relative aspect-[3/4] overflow-hidden rounded-2xl border border-line shadow-[0_20px_60px_-20px_rgba(45,212,191,0.25)]">
              {a && (
                <Image
                  src={a.src}
                  alt={a.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 45vw, 25vw"
                  className="hero-kenburns object-cover"
                />
              )}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="reveal [animation-delay:350ms]">
              <div className="hero-float-late grain relative aspect-[4/3] overflow-hidden rounded-2xl border border-line shadow-[0_20px_60px_-20px_rgba(249,115,22,0.3)]">
                {b && (
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 45vw, 25vw"
                    className="hero-kenburns-alt object-cover"
                  />
                )}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              </div>
            </div>
            <div className="reveal [animation-delay:500ms]">
              <div className="hero-float grain relative aspect-square overflow-hidden rounded-2xl border border-line shadow-[0_20px_60px_-20px_rgba(45,212,191,0.25)]">
                {c && (
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 1024px) 45vw, 25vw"
                    className="hero-kenburns object-cover"
                  />
                )}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="reveal mb-4 flex justify-center [animation-delay:1800ms]"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-line pt-2">
          <span className="hero-scroll-dot block h-1.5 w-1.5 rounded-full bg-gradient-to-b from-teal-glow to-orange" />
        </div>
      </div>
    </section>
  );
}
