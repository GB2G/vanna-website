"use client";

import Image from "next/image";
import { useState } from "react";
import type { Film } from "@/lib/portfolio";

/**
 * Lite YouTube facade — shows the thumbnail and only loads the heavy iframe
 * after the user clicks play. Keeps the portfolio fast.
 */
export function VideoEmbed({ film }: { film: Film }) {
  const [playing, setPlaying] = useState(false);
  // Shorts have a vertical "oardefault" thumbnail; standard videos use hqdefault.
  const thumb = film.vertical
    ? `https://i.ytimg.com/vi/${film.youtubeId}/oardefault.jpg`
    : `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`;
  const tag = film.meta ?? (film.vertical ? "Short" : "Film");

  return (
    <figure
      className={`group grain overflow-hidden rounded-2xl border border-line bg-surface ${
        film.vertical ? "mx-auto w-full max-w-[320px]" : ""
      }`}
    >
      <div className={`relative ${film.vertical ? "aspect-[9/16]" : "aspect-video"}`}>
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0`}
            title={film.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${film.title}`}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <Image
              src={thumb}
              alt={film.title}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-gold to-orange text-ink shadow-[0_10px_40px_-6px_rgba(249,115,22,0.7)] transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="flex items-end justify-between gap-4 p-5">
        <div>
          <h3 className="font-display text-lg text-cream">{film.title}</h3>
          <p className="mt-1 text-sm text-muted">{film.role}</p>
        </div>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-teal-glow/80">
          {tag}
        </span>
      </figcaption>
    </figure>
  );
}
