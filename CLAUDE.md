# CLAUDE.md

Marketing landing page for an on-premise AI product. One page, seven
scroll-snapping sections. Built from a Claude Design handoff — **fidelity to
that design is the point of this repo**, so treat layout values as spec, not
as taste.

## Workflow

**Every change goes through its own branch and a pull request.** Nothing is
committed or pushed directly to `main` — not a one-line colour fix, not a
typo. `main` is the production branch: Netlify deploys every push to it.

```bash
git checkout main && git pull
git checkout -b design/economics-figure-size
# …make the change
npm run build                                   # must pass before pushing
git push -u origin design/economics-figure-size
# then open a PR against main
```

Branch names are short and kebab-case, prefixed by the kind of change:
`design/` for visual fidelity work, `feat/` for new behaviour, `fix/` for
bugs, `docs/` for documentation, `chore/` for tooling and config.

Netlify builds a deploy preview per PR (the default for Git-connected
sites), so review a visual change on the preview URL, not only on a local
screenshot.

**Content and style changes go in separate PRs, even when requested
together.** Copy (headline wording, body text, labels, numbers) and layout
or visual changes (spacing, size, colour, breakpoints) review differently
and can land independently — don't bundle them because they touch the same
section. If a batch of feedback mixes both, split it into a `content/…`
branch and one or more `design/…` branches rather than one PR that does
everything.

## Design source of truth

- `design/HANDOFF.md` — the written spec.
- `design/Private AI Landing v2.dc.html` — the visual reference the spec
  describes. **It does not render standalone**: it needs `support.js` and a
  `_ds/nocturne-…` bundle that were never part of the handoff. Read it as
  source, don't try to open it in a browser or diff against it visually.

Where the two disagree, the HTML wins — `HANDOFF.md` says the HTML is "the
live/current version of the design".

Two disagreements are already resolved this way. Don't "fix" them back
without asking:

| | HANDOFF.md says | HTML says | We follow |
|---|---|---|---|
| Mobile reflow breakpoint | ≤720px | ≤1000px | 1000px |
| Economics grid | 2×2, 2 cols on mobile | 4 cols, 1 col ≤1000px | 4 / 1 |
| Delivery number column | 56px | 50px | 50px |

## Section map

Section names from the design survive verbatim in `data-screen-label` and in
filenames, so feedback like "in Economics the figure is too big" maps
straight to a file.

| Design name | Files |
|---|---|
| Hero | `src/sections/Hero.tsx` + `.module.css` |
| 01 — The premise | `src/sections/Qualifier.*` |
| 02 — The bill | `src/sections/Consequences.*` |
| 03 — The work | `src/sections/Mechanism.*` |
| 04 — The economics | `src/sections/Economics.*` |
| 05 — Delivery | `src/sections/Delivery.*` |
| Estimate form | `src/sections/Estimate.*` |
| Fixed header | `src/components/SiteHeader.*` |
| Right-hand dot rail | `src/components/SectionNav.*` |
| Background grid lines | `src/components/BackgroundGrid.*` |

Section order lives in `src/sections/sections.ts` and drives both the rail
and the observer — add a section there and in `App.tsx`, not just one.

## Styling conventions

Plain CSS. No UI kit, no CSS-in-JS, no Tailwind — don't introduce one.

- **Colour, type, radii, rhythm live in `src/styles/tokens.css`** as custom
  properties. A colour or font change is one line there and propagates. Do
  not hardcode `#3ee0b0` or `#eceeed` in a component.
- **One CSS Module per component.** Component-local styles go there.
- **`src/styles/global.css` owns the slide frame** (`.slides`, `.slide`, the
  kicker) because the responsive rules key off `data-screen-label`.
- **Sections do not set their own padding.** They set `--slide-gap` and
  `--slide-pad-bottom` on their module class; `.slide` consumes them. This
  keeps the header offset in one place — it is why there is no `!important`
  anywhere. Keep it that way.

### Breakpoints

- **≥1001px** — every slide is exactly `100svh` and scroll-snaps.
- **≤1000px** — slides become `height: auto; min-height: 100svh` and flow.
  Economics and Consequences are exceptions: they stay locked to one screen
  and compress instead of growing.
- **≤720px** — slides reserve `--rail-gutter` on the right so copy never
  runs under the dot rail; the header wordmark centres; the hero reflows.

## Commands

```bash
npm install
npm run dev         # dev server
npm run build       # typecheck + production build to dist/
npm run preview     # serve the production build on :4173
npm run typecheck   # types only
```

There is no test suite and no linter configured. `npm run build` (which runs
`tsc -b` first) is the gate.

## Verifying a visual change

Layout regressions here do not show up in a type error, so check the real
render before claiming a change works.

Playwright is **not** a project dependency; use a system install if present.
In sandboxed environments behind a TLS-intercepting proxy, pass
`--ignore-certificate-errors` or the Google Fonts stylesheet is blocked and
you will screenshot fallback fonts and misjudge the typography.

```js
const browser = await chromium.launch({ args: ['--ignore-certificate-errors'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
// jump to slide i without waiting on smooth scroll:
await page.evaluate((i) => {
  document.querySelector('.slides').scrollTo({
    top: document.querySelectorAll('.slide')[i].offsetTop, behavior: 'auto',
  })
}, i)
```

Check both 1440×900 and 390×844, and assert no section clips:
`el.scrollHeight > el.clientHeight` must be false for every `.slide`.

## Deploy

Netlify, config fully in `netlify.toml` (build command, publish dir, Node 22,
cache headers). `main` is the default and production branch; pushes deploy.

There is deliberately **no SPA catch-all redirect** — the page has no
client-side router, so unknown paths should keep returning a real 404.

## Known gap

The estimate form has **no backend**. `handleSubmit` in
`src/sections/Estimate.tsx` sets local state and swaps the helper microcopy,
which is exactly what the design specifies. Wire an endpoint there before
treating the form as functional.
