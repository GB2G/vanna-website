# Vanna Noun — Renoun Creation

Portfolio + booking site for **Vanna Noun**, Director of Photography.
Photography & cinematography, styled around a **Kodak Vision3 teal & orange** cinematic palette —
cozy, contrasty, complementary.

Built with **Next.js (App Router) + Tailwind CSS v4 + TypeScript**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Project map

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home — hero, featured gallery, services, cinematography, about teaser, CTA |
| `app/portfolio/page.tsx` | Filterable photo grid + cinematography (YouTube) |
| `app/about/page.tsx` | Bio + the three C's (cozy / contrasty / complementary) |
| `app/book/page.tsx` | Booking form with calendar date picker |
| `app/contact/page.tsx` | Contact form + social links |
| `app/api/book`, `app/api/contact` | Form endpoints → email via Resend |
| `lib/siteConfig.ts` | **Edit here:** name, email, socials, session types, time slots |
| `lib/portfolio.ts` | **Edit here:** photos + cinematography videos |
| `app/globals.css` | Theme tokens (colors, fonts) |

## Swapping in real content

- **Photos** — edit `lib/portfolio.ts`. Replace each `src` with a hosted image URL or drop files in
  `public/` and reference them as `/my-photo.jpg`. Add hosts to `next.config.ts` `remotePatterns`
  if using a new domain. (Current placeholders come from picsum.photos.)
- **Videos** — in the `films` array, replace `youtubeId` with real IDs from
  [@renouncreation](https://www.youtube.com/@renouncreation).
- **Contact / socials / session types** — all in `lib/siteConfig.ts`.

## Enabling booking + contact emails

Forms already work — until a Resend key is set, submissions are validated and **logged** server-side
(and the visitor still sees a success message) instead of being emailed.

To go live:

1. Create a free account at [resend.com](https://resend.com) and grab an API key.
2. Copy `.env.example` → `.env.local` and fill in:
   ```
   RESEND_API_KEY=re_...
   RESEND_FROM="Renoun Creation <onboarding@resend.dev>"
   BOOKING_TO_EMAIL=imrsteelo@gmail.com
   ```
   `onboarding@resend.dev` works for testing; for production, verify a sending domain in Resend and
   use an address on it.
3. Restart `npm run dev`. Booking + contact submissions now email `BOOKING_TO_EMAIL`.

## Deploying

Deploy to [Vercel](https://vercel.com): import the repo, add the same env vars in project settings.
