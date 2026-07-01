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
): Photo => ({
  id,
  src: `https://picsum.photos/seed/${seed}/${dim(ratio)}`,
  alt,
  category,
  ratio,
  featured,
});

export const photos: Photo[] = [
  p("1", "vanna-portrait-a", "Portrait", "portrait", "Portrait bathed in golden window light", true),
  p("2", "vanna-cine-a", "Cinematic", "landscape", "Cinematic still: warm subject against deep teal shadow", true),
  p("3", "vanna-land-a", "Landscape", "landscape", "Sun-drenched landscape at golden hour", true),
  p("4", "vanna-portrait-b", "Portrait", "square", "Close portrait with soft amber highlights"),
  p("5", "vanna-cine-b", "Cinematic", "portrait", "Moody cinematic frame, teal and orange contrast", true),
  p("6", "vanna-event-a", "Event", "landscape", "Candid event moment in warm ambient light"),
  p("7", "vanna-land-b", "Landscape", "portrait", "Misty forest with cool cyan depth"),
  p("8", "vanna-portrait-c", "Portrait", "portrait", "Environmental portrait, natural window glow", true),
  p("9", "vanna-cine-c", "Cinematic", "landscape", "Night scene, neon warmth against cyan"),
  p("10", "vanna-event-b", "Event", "square", "Celebration captured with cozy warmth"),
  p("11", "vanna-land-c", "Landscape", "landscape", "Coastline at dusk, teal water and amber sky"),
  p("12", "vanna-portrait-d", "Portrait", "square", "Studio portrait with directional warm key light"),
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
