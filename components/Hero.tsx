import Image from "next/image";
import { ButtonLink } from "./ui/Button";
import { HeroTitle } from "./HeroTitle";
import { RecBadge, ViewfinderCorners } from "./ui/Viewfinder";
import { siteConfig } from "@/lib/siteConfig";
import { featuredPhotos } from "@/lib/portfolio";

/**
 * Full-frame cinematic hero: the viewport becomes the camera's viewfinder.
 * A set of his graded frames cross-fades full-bleed behind an anamorphic
 * letterbox and a camera HUD (REC, exposure readouts, focus reticle, rule of
 * thirds), with the typewriter title set like a film title card, lower-left.
 * The viewfinder framing is the one signature; everything else stays quiet.
 * All motion is CSS-driven and disabled under prefers-reduced-motion (the first
 * frame keeps base opacity so the backdrop still shows).
 */

const HUD = "font-mono text-[10px] uppercase tracking-[0.25em] text-cream/55";

export function Hero() {
  const frames = featuredPhotos.slice(0, 3);

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden">
      {/* Backdrop: cross-fading graded frames */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink">
        {frames.map((f, i) => (
          <div
            key={f.id}
            className={`hero-cross absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
            style={{ animationDelay: `${i * -8}s` }}
          >
            <Image
              src={f.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Color grade: cool shadows lower-left, warm highlight upper-right */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-deep/70 via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-bl from-orange/25 via-transparent to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(10,13,15,0.72)_100%)]" />
        {/* Legibility scrims: strong at the bottom (title) and a touch at the top (nav) */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />
      </div>

      {/* Viewfinder HUD, framed within the viewport */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-3 z-20 top-[clamp(74px,12vh,120px)] bottom-[clamp(58px,9vh,96px)] sm:inset-x-6"
      >
        <ViewfinderCorners tone="cream" className="opacity-70" />

        {/* Rule-of-thirds grid */}
        <span className="absolute inset-y-0 left-1/3 hidden w-px bg-cream/[0.06] lg:block" />
        <span className="absolute inset-y-0 left-2/3 hidden w-px bg-cream/[0.06] lg:block" />
        <span className="absolute inset-x-0 top-1/3 hidden h-px bg-cream/[0.06] lg:block" />
        <span className="absolute inset-x-0 top-2/3 hidden h-px bg-cream/[0.06] lg:block" />

        {/* Center focus reticle */}
        <span className="vf-breathe absolute left-1/2 top-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 lg:block">
          <span className="absolute inset-0 rounded-md border border-teal-glow/30" />
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-teal-glow/50" />
          <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-teal-glow/50" />
          <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-teal-glow/50" />
          <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-teal-glow/50" />
        </span>

        {/* Corner readouts */}
        <div className="absolute left-1 top-1 flex items-center gap-3 sm:left-2 sm:top-2">
          <RecBadge />
          <span className={`hidden sm:inline ${HUD}`}>A · 4K 24FPS</span>
        </div>
        <span className={`absolute right-1 top-1 hidden sm:right-2 sm:top-2 sm:inline ${HUD}`}>
          ISO 800 · ƒ/1.8
        </span>
        <span className={`absolute bottom-1 left-1 hidden sm:bottom-2 sm:left-2 sm:inline ${HUD}`}>
          WB 5600K
        </span>
        <span className={`absolute bottom-1 right-1 hidden sm:bottom-2 sm:right-2 sm:inline ${HUD}`}>
          TC 00:00:24:12
        </span>
      </div>

      {/* Content: title card, lower-left */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end gap-10 px-5 pb-[clamp(72px,11vh,120px)] pt-[22vh] sm:px-8">
        <div className="max-w-3xl [text-shadow:0_2px_30px_rgba(10,13,15,0.6)]">
          <HeroTitle />
          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-cream/85 [animation-delay:1100ms]">
            {siteConfig.intro}
          </p>
          <div className="reveal mt-8 flex flex-wrap items-center gap-4 [animation-delay:1300ms]">
            <ButtonLink href="/book">Book a session</ButtonLink>
            <ButtonLink href="/portfolio" variant="outline">
              View the work
            </ButtonLink>
          </div>
        </div>

        {/* Slate credit line, the subject-true replacement for a stats row */}
        <div className="reveal flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-cream/10 pt-4 [animation-delay:1600ms]">
          <span className={HUD}>{siteConfig.role}</span>
          <span className="text-cream/25">/</span>
          <span className={HUD}>{siteConfig.brand}</span>
          <span className="text-cream/25">/</span>
          <span className={HUD}>Available worldwide</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="reveal absolute bottom-[clamp(18px,5vh,60px)] left-1/2 z-30 -translate-x-1/2 [animation-delay:1900ms]"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-cream/25 pt-1.5">
          <span className="hero-scroll-dot block h-1.5 w-1.5 rounded-full bg-gradient-to-b from-teal-glow to-orange" />
        </div>
      </div>
    </section>
  );
}
