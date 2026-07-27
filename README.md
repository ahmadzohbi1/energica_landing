# Energica — Next.js export

This is a Next.js (Pages Router) conversion of the Energica Holding HTML site.

## Structure
- `pages/` — one route per subsidiary (`/`, `/power-solutions`, `/steel`, `/power-generations`, `/constructions`, `/facilities`, `/store`). Each page's unique markup/CSS was extracted from the original HTML and is rendered via `dangerouslySetInnerHTML` for 1:1 visual fidelity, wrapped in real `Nav`/`Footer` React components.
- `components/Nav.js`, `components/Footer.js` — real React components (using `next/link`) replacing the old hand-rolled DOM injection (`partials.js`). Mega dropdown and mobile drawer are now React state instead of manual class toggling.
- `components/Tweaks.js` — the tweaks panel (page jumper, density, per-page brand color), persisted to `localStorage`, mounted once in `_app.js` so it survives client-side navigation.
- `lib/useRevealAndCounters.js` — reproduces the scroll fade-in + animated counters via `IntersectionObserver`, re-run per page.
- `styles/globals.css` — the shared design system (was `assets/base.css`).

## Why `dangerouslySetInnerHTML` for page bodies
The original design has heavy bespoke inline SVG illustrations and inline styles per section. Rather than hand-translate thousands of lines of JSX (risking transcription errors), each page's unique content is injected as static HTML — identical output, verified against the source. If you want true idiomatic JSX (mapped data → components) going forward, treat this as the reference to refactor from, section by section — it's the same recommendation as any HTML→React handoff.

## Run it
```
cd nextjs-export
npm install
npm run dev
```

## Known gaps / next steps
- Contact/quote forms use plain `onSubmit` inline handlers from the original HTML (client-side only, no real submission wired up).
- Images are all inline placeholder SVGs (per the original design) — swap with real assets/photos when available.
- Consider migrating to the App Router + Server Components if you want RSC benefits; this Pages Router version was chosen for the simplest equivalent to the original static multi-page structure.
