/**
 * Pure presentational photography-motif primitives: viewfinder corner
 * brackets, a blinking REC badge, and an aperture icon. Hook-free so these
 * can be dropped into server or client components alike.
 */

const TONE_BORDER: Record<"teal" | "orange" | "cream", string> = {
  teal: "border-teal-glow/50",
  orange: "border-orange/70",
  cream: "border-cream/30",
};

export function ViewfinderCorners({
  tone = "teal",
  className = "",
}: {
  tone?: "teal" | "orange" | "cream";
  className?: string;
}) {
  const border = TONE_BORDER[tone];
  return (
    <span aria-hidden="true" className={"pointer-events-none absolute inset-0 " + className}>
      <span className={`absolute left-0 top-0 h-4 w-4 rounded-tl-sm border-l-2 border-t-2 ${border}`} />
      <span className={`absolute right-0 top-0 h-4 w-4 rounded-tr-sm border-r-2 border-t-2 ${border}`} />
      <span className={`absolute bottom-0 left-0 h-4 w-4 rounded-bl-sm border-b-2 border-l-2 ${border}`} />
      <span className={`absolute bottom-0 right-0 h-4 w-4 rounded-br-sm border-b-2 border-r-2 ${border}`} />
    </span>
  );
}

export function RecBadge({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/80 ${className}`}
    >
      <span className="vf-blink h-1.5 w-1.5 rounded-full bg-[#ff5a3c] shadow-[0_0_8px_rgba(255,90,60,0.8)]" />
      REC
    </span>
  );
}

export function ApertureIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m14.31 8 5.74 9.94" />
      <path d="M9.69 8h11.48" />
      <path d="m7.38 12 5.74-9.94" />
      <path d="M9.69 16 3.95 6.06" />
      <path d="M14.31 16H2.83" />
      <path d="m16.62 12-5.74 9.94" />
    </svg>
  );
}
