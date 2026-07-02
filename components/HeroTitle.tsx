"use client";

import { useEffect, useState } from "react";

/**
 * Typewriter hero title. The full title is rendered once, invisibly, as a
 * "sizer" so the layout box reserves its final size up front, meaning nothing
 * below it reflows while the visible copy types character by character on top.
 * The accent words keep their shimmering gradient, and the whole title is
 * exposed to assistive tech / crawlers via aria-label. Typing is skipped under
 * prefers-reduced-motion (the full title shows immediately).
 */

const ACCENT =
  "hero-accent bg-gradient-to-r from-teal-glow via-gold to-orange bg-clip-text text-transparent italic";

// Each line is a plain leading part plus a trailing accent (gradient) part.
const L1_PLAIN = "Light that feels ";
const L1_ACCENT = "cozy,";
const L2_PLAIN = "Frames that feel ";
const L2_ACCENT = "cinematic.";

const LINE1_LEN = L1_PLAIN.length + L1_ACCENT.length;
const TOTAL = LINE1_LEN + L2_PLAIN.length + L2_ACCENT.length;
const FULL_LABEL = `${L1_PLAIN}${L1_ACCENT} ${L2_PLAIN}${L2_ACCENT}`;

const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n));

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="hero-caret ml-1 inline-block h-[0.78em] w-[3px] translate-y-[0.04em] rounded-full bg-gradient-to-b from-teal-glow to-orange align-middle"
    />
  );
}

function TypedLine({
  plain,
  accent,
  revealed,
  caret,
}: {
  plain: string;
  accent: string;
  revealed: number;
  caret: boolean;
}) {
  const plainShown = plain.slice(0, clamp(revealed, plain.length));
  const accentShown = accent.slice(0, clamp(revealed - plain.length, accent.length));
  return (
    <span className="block">
      {plainShown}
      {accentShown && <span className={ACCENT}>{accentShown}</span>}
      {caret && <Caret />}
    </span>
  );
}

export function HeroTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(TOTAL);
      return;
    }

    let current = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      current += 1;
      setCount(current);
      if (current >= TOTAL) return;
      // Pause a beat at the line break; light jitter otherwise for a human feel.
      const atBreak = current === LINE1_LEN;
      const delay = atBreak ? 360 : 45 + Math.random() * 35;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, []);

  const line1Revealed = Math.min(count, LINE1_LEN);
  const line2Revealed = Math.max(0, count - LINE1_LEN);
  // The caret follows the typing cursor, then disappears once the title is done.
  const done = count >= TOTAL;
  const caretOnLine1 = !done && count < LINE1_LEN;
  const caretOnLine2 = !done && count >= LINE1_LEN;

  return (
    <h1
      aria-label={FULL_LABEL}
      className="relative mt-6 pb-1 font-display text-5xl leading-[1.15] text-cream sm:text-6xl md:text-7xl"
    >
      {/* Sizer: full title, invisible, reserves the final layout box */}
      <span aria-hidden="true" className="invisible block">
        <span className="block">
          {L1_PLAIN}
          <span className={ACCENT}>{L1_ACCENT}</span>
        </span>
        <span className="block">
          {L2_PLAIN}
          <span className={ACCENT}>{L2_ACCENT}</span>
        </span>
      </span>

      {/* Visible typed copy overlaid on the sizer */}
      <span aria-hidden="true" className="absolute inset-0 block">
        <TypedLine
          plain={L1_PLAIN}
          accent={L1_ACCENT}
          revealed={line1Revealed}
          caret={caretOnLine1}
        />
        <TypedLine
          plain={L2_PLAIN}
          accent={L2_ACCENT}
          revealed={line2Revealed}
          caret={caretOnLine2}
        />
      </span>
    </h1>
  );
}
