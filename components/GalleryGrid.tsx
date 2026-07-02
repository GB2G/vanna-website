"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  photoCategories,
  type Photo,
  type PhotoCategory,
} from "@/lib/portfolio";
import { ViewfinderCorners } from "./ui/Viewfinder";

type Filter = "All" | PhotoCategory;

interface Props {
  photos: Photo[];
  showFilter?: boolean;
}

export function GalleryGrid({ photos, showFilter = true }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? photos : photos.filter((p) => p.category === filter)),
    [photos, filter],
  );

  const close = useCallback(() => setActiveIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActiveIndex((i) =>
        i === null ? i : (i + dir + visible.length) % visible.length,
      ),
    [visible.length],
  );

  // Keyboard controls for the lightbox.
  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, step]);

  const filters: Filter[] = ["All", ...photoCategories];
  const active = activeIndex !== null ? visible[activeIndex] : null;

  return (
    <div>
      {showFilter && (
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                filter === f
                  ? "border-orange bg-orange/15 text-cream"
                  : "border-line text-muted hover:border-teal/60 hover:text-cream"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Masonry via CSS columns */}
      <div className="[column-fill:_balance] gap-4 columns-1 sm:columns-2 lg:columns-3">
        {visible.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`View ${photo.alt}`}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line bg-surface"
          >
            <div className="relative">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.ratio === "landscape" ? 1200 : photo.ratio === "square" ? 900 : 800}
                height={photo.ratio === "landscape" ? 800 : photo.ratio === "square" ? 900 : 1100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="p-4 text-left text-sm text-cream">
                  <span className="block text-xs uppercase tracking-[0.2em] text-teal-glow">
                    {photo.category}
                  </span>
                  {photo.alt}
                  {photo.exif && (
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-cream/60">
                      {photo.exif}
                    </span>
                  )}
                </span>
              </span>
              <ViewfinderCorners
                tone="orange"
                className="m-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-line text-cream hover:bg-surface-2"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line text-cream hover:bg-surface-2 sm:left-6"
          >
            ‹
          </button>
          <figure
            className="relative max-h-[85vh] w-auto max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={active.src}
                alt={active.alt}
                width={1200}
                height={1200}
                sizes="90vw"
                className="max-h-[80vh] w-auto rounded-lg object-contain"
              />
              <ViewfinderCorners tone="teal" className="-m-3 opacity-80" />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.25em] text-cream/70">
              <span className="text-teal-glow">
                FRAME {String((activeIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(visible.length).padStart(2, "0")}
              </span>
              <span>{active.category}</span>
              {active.exif && <span>{active.exif}</span>}
              <span className="mt-1 w-full text-center font-sans text-xs normal-case tracking-normal text-muted">
                {active.alt}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line text-cream hover:bg-surface-2 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
