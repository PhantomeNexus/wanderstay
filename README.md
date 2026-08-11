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

The site runs at [http://localhost:3000](http://localhost:3000).

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

## Project structure

```
src/
  app/          routes (home, destinations, checkout, confirmation, trips, about, faq)
  components/   UI components, including the SVG scenery system
  data/         destination and booking JSON
  lib/          data access, pricing, formatting and shared config
```
