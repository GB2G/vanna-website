"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { ButtonLink } from "./ui/Button";
import { ApertureIcon } from "./ui/Viewfinder";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <ApertureIcon className="h-5 w-5 shrink-0 text-teal-glow transition-transform duration-700 ease-out group-hover:rotate-90" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight text-cream">
              {siteConfig.name}
            </span>
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-teal-glow/80 transition-colors group-hover:text-orange">
              {siteConfig.brand}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-cream" : "text-muted hover:text-cream"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gradient-to-r from-teal-glow to-orange" />
                )}
              </Link>
            );
          })}
          <ButtonLink href="/book" variant="primary" className="px-5 py-2.5">
            Book a session
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream md:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`grid overflow-hidden transition-all duration-400 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-1 px-5 pb-6 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base text-cream-dim hover:bg-surface-2 hover:text-cream"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/book" variant="primary" className="mt-3">
              Book a session
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
