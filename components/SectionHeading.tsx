import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: Props) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start";
  return (
    <div className={`flex flex-col ${alignment} max-w-2xl ${className}`}>
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-teal-glow">
          <span className="h-px w-6 bg-gradient-to-r from-teal-glow to-orange" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl text-cream">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}
