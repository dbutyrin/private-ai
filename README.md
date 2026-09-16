# Private AI — landing page

Single-page marketing site for an on-premise AI product sold to SMBs. Seven
sections presented as a vertical, scroll-snapping "slide" deck with a fixed
dot-rail for jumping between them.

Built from the Claude Design handoff in [`design/`](design/) —
`design/HANDOFF.md` is the written spec and `design/Private AI Landing v2.dc.html`
is the visual reference it describes. Both are the source of truth for copy,
colour, type and spacing.

## Stack

React 19 + TypeScript + Vite. Styling is plain CSS: design tokens as custom
properties in `src/styles/tokens.css`, the shared slide frame in
`src/styles/global.css`, and a CSS Module per component. No UI or CSS
framework — the design is bespoke enough that one would only get in the way.

## Getting started

```bash
npm install
npm run dev        # dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
npm run typecheck  # types only
```

Fonts (Inter Tight, IBM Plex Mono) are loaded from Google Fonts in
`index.html`.

## Layout

```
src/
  App.tsx                  composes the deck
  hooks/useSlideDeck.ts    active-slide tracking + imperative goTo
  components/
    Slide.tsx              the shared <section> frame
    SiteHeader.tsx         fixed top bar
    SectionNav.tsx         fixed right-hand dot rail
    BackgroundGrid.tsx     decorative fixed grid lines
  sections/
    sections.ts            the ordered section list
    Hero / Qualifier / Consequences / Mechanism /
    Economics / Delivery / Estimate
  styles/
    tokens.css             colours, type, radii, rhythm
    global.css             resets + the .slide / .slides frame
```

### How the slide frame works

Every section renders through `<Slide>`, which applies the global `.slide`
class and a `data-screen-label`. Sections differ only by two custom
properties their own module sets — `--slide-gap` and `--slide-pad-bottom` —
so padding and the header offset stay defined in one place.

`useSlideDeck` watches the slides with an `IntersectionObserver` (threshold
0.5) to drive the active dot, and scrolls the container by `offsetTop` rather
than using `scrollIntoView`, which is the reliable path on iOS Safari. It
honours `prefers-reduced-motion`.

### Responsive behaviour

- **≥1001px** — every slide is exactly `100svh` and snaps.
- **≤1000px** — slides become `height: auto; min-height: 100svh` and flow.
  Economics and Consequences are the exceptions: they stay locked to one
  screen and compress their contents instead of growing.
- **≤720px** — slides reserve a right-hand gutter so copy never runs under
  the nav rail, the header wordmark centres, and the hero re-flows.

## Deploy (Netlify)

`netlify.toml` holds the whole build config — build command, publish
directory, Node version and cache headers — so nothing needs setting in the
Netlify UI.

Connect the repository once (Netlify → *Add new site* → *Import an existing
project* → GitHub → `dbutyrin/private-ai`) and accept the detected settings;
every push to the production branch then deploys, and pull requests get
deploy previews.

For a one-off deploy without connecting the repo:

```bash
npm i -g netlify-cli
netlify deploy --build            # draft URL
netlify deploy --build --prod     # production
```

There is no SPA catch-all redirect on purpose: the page has no client-side
router, so unknown paths should keep returning a real 404 rather than
rendering the landing page.

## Known gap

The estimate form has **no backend**. Submitting sets local state and swaps
the helper microcopy, exactly as the design specifies. Post
`{ teamSize, email, phone }` from `handleSubmit` in
`src/sections/Estimate.tsx` once an endpoint exists.
