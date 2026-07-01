import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const nav = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-2xl text-cream">{siteConfig.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-teal-glow/80">
              {siteConfig.brand}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.tagline} {siteConfig.location}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Explore
            </span>
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm text-cream-dim transition-colors hover:text-orange"
              >
                {n.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Connect
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm text-cream-dim transition-colors hover:text-orange"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-dim transition-colors hover:text-orange"
            >
              Instagram ↗
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cream-dim transition-colors hover:text-orange"
            >
              YouTube ↗
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.
          </p>
          <p className="text-muted/70">Shot on the warm/cool line: teal &amp; orange.</p>
        </div>
      </div>
    </footer>
  );
}
