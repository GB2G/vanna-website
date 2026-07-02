/**
 * Portfolio content: PLACEHOLDERS.
 *
 * To publish Vanna's real work, replace `src` with hosted image URLs (or files
 * dropped in /public, referenced as "/my-photo.jpg") and swap the YouTube IDs.
 * Everything the galleries render is driven from this file; no component edits
 * needed to change the content.
 */

export type PhotoCategory = "Portrait" | "Cinematic" | "Landscape" | "Event";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  /** Aspect ratio hint for the masonry layout. */
  ratio: "portrait" | "landscape" | "square";
  featured?: boolean;
  /** Camera HUD readout, e.g. "ƒ/1.8 · 1/250 · ISO 100 · 35mm" */
  exif?: string;
}

// Seeded placeholder photos (photographic, guaranteed to resolve).
// Aspect ratios are varied so the masonry grid feels editorial.
const dim = (ratio: Photo["ratio"]) =>
  ratio === "portrait" ? "800/1100" : ratio === "landscape" ? "1200/800" : "900/900";

const p = (
  id: string,
  seed: string,
  category: PhotoCategory,
  ratio: Photo["ratio"],
  alt: string,
  featured = false,
  exif?: string,
): Photo => ({
  id,
  src: `https://picsum.photos/seed/${seed}/${dim(ratio)}`,
  alt,
  category,
  ratio,
  featured,
  exif,
});

export const photos: Photo[] = [
  p("1", "vanna-portrait-a", "Portrait", "portrait", "Portrait bathed in golden window light", true, "ƒ/1.8 · 1/200 · ISO 100 · 85mm"),
  p("2", "vanna-cine-a", "Cinematic", "landscape", "Cinematic still: warm subject against deep teal shadow", true, "ƒ/2.8 · 1/125 · ISO 400 · 50mm"),
  p("3", "vanna-land-a", "Landscape", "landscape", "Sun-drenched landscape at golden hour", true, "ƒ/8 · 1/500 · ISO 100 · 24mm"),
  p("4", "vanna-portrait-b", "Portrait", "square", "Close portrait with soft amber highlights", false, "ƒ/1.8 · 1/320 · ISO 100 · 85mm"),
  p("5", "vanna-cine-b", "Cinematic", "portrait", "Moody cinematic frame, teal and orange contrast", true, "ƒ/2 · 1/60 · ISO 800 · 35mm"),
  p("6", "vanna-event-a", "Event", "landscape", "Candid event moment in warm ambient light", false, "ƒ/2.8 · 1/250 · ISO 400 · 35mm"),
  p("7", "vanna-land-b", "Landscape", "portrait", "Misty forest with cool cyan depth", false, "ƒ/8 · 1/250 · ISO 200 · 24mm"),
  p("8", "vanna-portrait-c", "Portrait", "portrait", "Environmental portrait, natural window glow", true, "ƒ/1.4 · 1/400 · ISO 100 · 85mm"),
  p("9", "vanna-cine-c", "Cinematic", "landscape", "Night scene, neon warmth against cyan", false, "ƒ/1.8 · 1/60 · ISO 3200 · 35mm"),
  p("10", "vanna-event-b", "Event", "square", "Celebration captured with cozy warmth", false, "ƒ/2.8 · 1/160 · ISO 640 · 50mm"),
  p("11", "vanna-land-c", "Landscape", "landscape", "Coastline at dusk, teal water and amber sky", false, "ƒ/8 · 1/2000 · ISO 100 · 24mm"),
  p("12", "vanna-portrait-d", "Portrait", "square", "Studio portrait with directional warm key light", false, "ƒ/2 · 1/200 · ISO 200 · 85mm"),
];

export const featuredPhotos = photos.filter((ph) => ph.featured);

export const photoCategories: PhotoCategory[] = [
  "Portrait",
  "Cinematic",
  "Landscape",
  "Event",
];

export interface Film {
  id: string;
  /** YouTube video ID. */
  youtubeId: string;
  title: string;
  role: string;
  /** True for vertical YouTube Shorts (9:16), false/undefined for 16:9. */
  vertical?: boolean;
  /** Small tag shown on the card (e.g. a stat or format). */
  meta?: string;
}

// Real content scraped from https://youtube.com/@renouncreation (2 Shorts).
// When Vanna posts long-form films, add them here with `vertical: false`.
export const films: Film[] = [
  {
    id: "f1",
    youtubeId: "vWpocovjzsM",
    title: "Enjoy everything around you while you can",
    role: "Cinematography · shot on Fuji X-T3",
    vertical: true,
  },
  {
    id: "f2",
    youtubeId: "g59g-GYPmhU",
    title: "It’s kinda easy when you’re listening to the G-Dub sound",
    role: "Cinematography",
    vertical: true,
  },
];
