# Wanderstay

Wanderstay is a boutique stays and experiences booking site. It lists a small, hand-picked
collection of houses across Europe and North Africa — coastal escapes, mountain retreats, design
stays and off-grid cabins — with a full browse, book and manage-your-trips flow.

## Features

- **Home** — search by destination, dates and guests, featured houses, value props and testimonials
- **Destinations** — filter by region, price range and trip type, with sorting and result counts
- **House detail** — gallery, amenities, host profile, reviews and a sticky booking widget with a
  live fee breakdown
- **Checkout** — two-step guest details and payment forms with inline validation and an order
  summary sidebar
- **Confirmation** — booking reference, stay summary and what happens next
- **My Trips** — upcoming, past and cancelled bookings with status badges and toasts
- **About** and **FAQ**

## Getting started

```bash
npm install && npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000) and redirects to
`/en`.

## Languages

The site ships in English with German, French, Spanish, Italian, Portuguese and
Arabic wired up. Locale is always in the URL (`/de/destinations`), handled by
`src/proxy.ts`. Arabic sets `dir="rtl"` and the layout mirrors.

Message catalogs live in `messages/{locale}.json`. English is the source; any key
missing from a target locale falls back to English rather than showing a raw key,
so a partially translated locale still renders.

Adding user-visible text means adding it to `messages/en.json` in the same change.
The rules — which API to use in server vs client components, how to write plurals,
what not to wrap — are in [`.agents/globalize-rules.md`](.agents/globalize-rules.md).

```bash
npm run i18n:check
```

Reports how much of each locale is translated. It fails only on stale keys — keys
left in a target after being removed from the source. Untranslated keys are
expected and only warn.

## Screenshots

TODO — add screenshots of the home page, a house detail page and the checkout flow.

## Stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- Plus Jakarta Sans, self-hosted via `next/font`

All imagery is generated in-app as layered SVG, so there are no external asset requests and the
site renders offline. Property, host and booking data lives in `src/data` as JSON.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run i18n:check` | Validate message catalogs |

## Project structure

```
messages/       message catalogs, one JSON file per locale
src/
  app/[locale]/ routes (home, destinations, checkout, confirmation, trips, about, faq)
  components/   UI components, including the SVG scenery system
  data/         destination and booking JSON
  i18n/         routing, request config and locale-aware navigation
  lib/          data access, pricing, formatting and shared config
  proxy.ts      locale negotiation and redirects
```

Property content in `src/data` — descriptions, host bios, guest reviews — is data
rather than UI copy and is not part of the message catalogs.
