# Handoff: Private AI Landing Page

## Overview
Single-page marketing site for an on-premise/private AI product sold to SMBs. Dark, technical tone; seven sections presented as a vertical, snap-scrolling "slide" experience with dot navigation (desktop) and a normal centered flow on mobile.

## About the Design Files
The bundled file (`Private AI Landing v2.dc.html`) is a **design reference built in HTML** — a working prototype showing intended look, copy, layout and interaction, not production code to copy verbatim. The task is to **recreate this design in the target codebase's existing framework** (React, Vue, etc.) using its own component patterns — or pick a suitable framework if none exists yet.

## Fidelity
**High-fidelity.** Colors, type, spacing and copy are final; recreate pixel-for-pixel using the target stack's own primitives.

## Structure
Vertical scroll-snap "slides," one per section, each `100svh` tall on desktop with a fixed top-left nav dot rail (right edge, vertically centered) for jumping between sections, plus up/down arrow buttons. On mobile (≤720px) slides become normal flowing sections (`height: auto`, centered content) instead of snap-locked full screens.

Fixed elements (persist across all sections):
- **Top header bar**: "Private AI / On-Premise" label, translucent blurred background, bottom border. `position: fixed; top: 0`.
- **Right-side nav rail**: prev-arrow (⇑), 7 dot buttons (one per section, active dot larger + outlined + accent fill), next-arrow (⇓). `position: fixed; right: ~24px; top: 50%`.

## Sections (in order)

### 1. Hero
- Headline (h1, ~34–84px clamp, weight 500, tight letter-spacing -0.04em): "Private AI used to be a large-enterprise privilege." / accent-colored second line "It isn't anymore."
- Body paragraph (~17–19px): contracts/data/leak copy.
- Button "How much does the solution cost?" — outlined accent button, links to section 7 (id `estimate`), left-aligned, sits in the same row as the paragraph (row layout, button right-aligned in its own column on desktop).

### 2. Qualifier ("01 — The premise")
- Kicker label, then headline: "Your team already pasted company data into public ChatGPT today..."
- Quieter closing line, right-aligned, monospace, top-bordered in accent: "If the honest answer is 'nothing sensitive, nothing regulated' — this page isn't for you."

### 3. Consequences ("02 — The bill")
- Headline: "You won't hear about the leak on the day it happens."
- 3-column grid (stacks to 1 column on mobile), numbered 01/02/03, each a short line (regulator letter / client question / claim).
- Line: "And what you pay for won't be the data. It will be the consequences."
- Large accent-colored closing statement: "So the question isn't how to ban AI... it's how to give them AI that doesn't carry your data out the door."

### 4. Mechanism ("03 — The work")
- Two-column contrast, divided by a vertical accent border on the right column:
  - "Sounds like" (dim text) — months of work, servers, IT department, stalled integration.
  - "Actually is" (full-bright text, accent-bordered) — plug in the box; we handle model selection/config/document connection remotely.

### 5. Economics ("04 — The economics")
- Bordered 2×2 grid (equal-height cells via `grid-auto-rows: 1fr`), each cell: big number/label top, small caption + description bottom.
  - $0 — Per month in tokens — runs on your hardware, no meter.
  - One time setup — Not a subscription — low entry price sized to team.
  - 256K — Tokens of context — full contract/report in one piece.
  - Dozens — Of people at once — concurrent use without slowdown.
- On mobile: 2-column grid, min-height per cell.

### 6. Delivery ("05 — Delivery")
- 4 numbered rows (01–04), each: number, bold row title, description. Row grid: `56px | title col | description col`.
  1. Connected to your documents from day one.
  2. We pick and configure the model remotely.
  3. Three to four days from box to first real answer.
  4. We move you onto better models as they ship.

### 7. Estimate form (`id="estimate"`)
- Two-column layout: left — headline "Want to know what this would cost you specifically?"; right — form.
- Form: team-size segmented buttons (Up to 5 / 5–10 / 10+, single-select, active state = accent border+fill+text), email input (required), phone input (optional), submit button "Get my number", helper text "No call from a salesperson. Just the answer." (swaps to a confirmation string on submit).
- Footer row below: "Runs on your hardware" / "Nothing leaves your network".

## Interactions & Behavior
- **Scroll-snap navigation** (desktop/tablet ≥721px): `.slides` container is `overflow-y: auto; scroll-snap-type: y mandatory`; each `.slide` is `scroll-snap-align: start`.
- **Active-section tracking**: `IntersectionObserver` (threshold 0.5) on each slide sets `active` index → drives which dot is enlarged/outlined.
- **Dot/arrow nav**: clicking a dot or arrow scrolls the corresponding slide into view via `element.scrollIntoView({behavior:'smooth'})` (or `scrollTo` with computed `offsetTop` — used for iOS Safari reliability).
- **Team-size picker**: 3 mutually-exclusive toggle buttons, local component state.
- **Form submit**: prevents default, sets a `sent` boolean that swaps the helper microcopy; no real network call wired up (needs backend integration).
- **Mobile**: no scroll-snap; sections flow normally, vertically centered content, nav rail still fixed on the right, right-padding added to slides so content doesn't collide with the dot rail.
- Respect `prefers-reduced-motion: reduce` — smooth-scroll behavior disabled.

## Design Tokens
- **Background**: `#060708` (near-black)
- **Text**: `#eceeed` (primary), various opacities (`rgba(236,238,237, 0.42–0.84)`) for secondary/tertiary text
- **Accent**: `#3ee0b0` (green-cyan), hover `#6fecc9`, tint fills `rgba(62,224,176, 0.035–0.18)`
- **Borders**: `rgba(236,238,237,0.12–0.18)`
- **Fonts**: Headings/body — "Inter Tight" (weights 400/500); labels/mono/numbers — "IBM Plex Mono" (400/500)
- **Radius**: 8–10px on buttons/cards/inputs
- **Background grid texture**: repeating 1px vertical lines every 25% width, faint (`rgba(236,238,237,0.05)`), masked to fade at top/bottom via `mask-image: linear-gradient`

## Assets
No images/icons — text and layout only. One decorative fixed full-viewport grid-line background (CSS gradient, no image asset).

## Files
- `Private AI Landing v2.dc.html` — the live/current version of the design (this is the one to reference; treat any other file of a similar name in the project as an earlier draft, superseded).
