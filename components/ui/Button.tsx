import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "text-ink bg-gradient-to-r from-gold via-orange to-orange-deep shadow-[0_8px_30px_-8px_rgba(249,115,22,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(249,115,22,0.75)] hover:-translate-y-0.5",
  outline:
    "text-cream border border-teal/60 hover:border-teal-glow hover:bg-teal/10 hover:-translate-y-0.5",
  ghost: "text-cream-dim hover:text-cream hover:bg-surface-2",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  children,
  className = "",
  href,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
