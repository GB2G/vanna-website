/**
 * Central site configuration: the single place to edit contact details,
 * social links, and the session types offered in the booking form.
 */

export const siteConfig = {
  name: "Vanna Noun",
  brand: "Renoun Creation",
  role: "Director of Photography",
  tagline: "Cozy, contrasty, complementary.",
  intro:
    "Cinematographer, videographer, and photographer crafting branding, music videos, and documentaries, driven by aesthetic beauty and honest, cinéma-vérité storytelling.",
  location: "Available for travel · based worldwide",
  email: "imrsteelo@gmail.com",

  socials: {
    instagram: "https://www.instagram.com/vannanoun.dop/",
    youtube: "https://www.youtube.com/@renouncreation",
  },

  // Options shown in the booking form's "session type" selector.
  sessionTypes: [
    "Portrait session",
    "Cinematography / video",
    "Event coverage",
    "Brand / commercial",
    "Music video",
    "Other (tell me more)",
  ],

  // Rough time windows offered on the booking form.
  timeSlots: [
    "Morning (8am to 12pm)",
    "Midday (12pm to 4pm)",
    "Golden hour (4pm to sunset)",
    "Evening / night",
    "Flexible",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
