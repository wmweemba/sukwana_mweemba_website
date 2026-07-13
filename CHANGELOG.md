# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow `MAJOR.MINOR.PATCH` — while pre-launch, all releases are `0.x.0`.

---

## [Unreleased]

### feat — favicon suite (SM monogram)

The site previously shipped no favicon at all. Added a full icon set derived
from the existing nav wordmark's brand colours rather than a new asset —
`assets/icons/` was empty except a `.gitkeep`.

#### Added
- `assets/icons/favicon.svg` — source icon: a rounded-square badge
  (`--colour-primary` `#854d4f` background) with an "SM" monogram set in
  Georgia/Playfair Display serif at `--colour-bg` `#f7f9f9`, echoing the
  `.logo` wordmark's Burnt Rose-on-Snow palette while pulling the serif from
  the site's `--font-display` token instead of the wordmark's `--font-body`,
  for a mark that reads clearly at 16px.
- `assets/icons/favicon.ico` (16/32/48 multi-size), `favicon-16.png`,
  `favicon-32.png`, `favicon-48.png`, `favicon-192.png`, `favicon-512.png`,
  `apple-touch-icon.png` (180×180) — rasterised from the SVG source (macOS
  `qlmanage` thumbnailer; ICO packed with Pillow) since the project takes no
  build/image-processing dependencies beyond the existing one-time
  `optimise-images.js` script.
- `assets/icons/site.webmanifest` — `name`/`short_name`, 192/512 PNG icons,
  `theme_color: #854d4f`, `background_color: #f7f9f9`, `display: standalone`.
- `index.html` `<head>` — favicon `<link>` set (ico, svg, 32px/16px png,
  apple-touch-icon, manifest) added after the canonical tag, plus
  `<meta name="theme-color" content="#854d4f">`.

#### Removed
- `assets/icons/.gitkeep` — directory no longer empty.

---

### fix — team modal blank left column + mobile testimonials scroll-snap carousel

#### Fixed — team profile modal blank left column (`css/layout.css`)

When scrolling past the secondary portrait inside the team profile modals, the
left column of `.modal-lower` was blank for the remaining height of the bio text.
Root cause: `.modal-lower` used a two-column grid (`1fr 1.5fr`) with
`align-items: start` at all viewport sizes. The secondary image's `aspect-ratio: 2/3`
gave it a fixed height shorter than the bio column, leaving the left side empty below.

- **Mobile (base)**: `.modal-lower` is now a single-column grid. The secondary
  portrait is hidden (`display: none`) — the full-width hero portrait at the top of the
  modal already shows the partner; the bio text is now full-width and unobstructed.
- **Tablet+ (768px+)**: The two-column grid is restored, but `align-items` is changed
  from `start` to `stretch`, and `aspect-ratio` is unset on `.modal-secondary-image`.
  The secondary image now stretches to fill the exact height of the bio column (the
  taller cell drives the row height; `object-fit: cover` keeps it crisp) — no blank
  left side at any scroll depth, on any viewport.

#### Changed — mobile testimonials: marquee → scroll-snap carousel (`css/layout.css`, `index.html`, `css/animations.css`)

The previous mobile testimonials were a CSS infinite-marquee animation (auto-advancing,
non-interactive horizontal scroll via `translateX`). The experience showed partial cards
mid-transition and gave the user no clear affordance for navigating between quotes.

Replaced with a CSS scroll-snap carousel — no JS added:

- **`.testimonials-mobile`** changed from `display: block; overflow: hidden` to a
  proper horizontal scroll container (`overflow-x: scroll; scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch; scrollbar-width: none`).
- **`.marquee-track`** stripped of `width: max-content` and `animation: marquee 30s
  linear infinite`; now a plain flex row with `gap: var(--space-4)`.
- **`.testimonial-card`** gains `scroll-snap-align: start` and a responsive width
  (`min(280px, calc(100vw - var(--space-8)))`) so each card fills most of the viewport
  and snaps cleanly into place on swipe. `margin-right` removed in favour of parent `gap`.
- **`index.html`** — the duplicate `aria-hidden` card set (Set 2, required for the
  seamless loop trick) removed. Only the original three cards remain.
- **`css/animations.css`** — the now-orphaned `.marquee-track { animation: none !important }`
  reduced-motion override removed from the `@media (prefers-reduced-motion: reduce)`
  block (no animation to stop; the universal `animation-duration: 0.01ms` rule suffices).

---

### docs — UI_SPEC.md batch update (one-time authorised write)

Documentation-only pass bringing `UI_SPEC.md` back in line with what is already
live, after several features shipped ahead of the spec. Authorised as an
explicit, one-time exception to the standing "never write to UI_SPEC.md" rule;
the spec was rewritten against the actual current implementation
(`index.html`, `main.js`, `layout.css`, `components.css`, `animations.css`,
`variables.css`), not from memory. No code changed.

- **§10 Reduced Motion** — replaced the old illustrative example with the
  reveal standard now in use: visible-by-default resting state, hidden-start +
  entrance layered only inside `@media (prefers-reduced-motion: no-preference)`,
  triggered by IntersectionObserver `.visible` / `.active`. Documented why the
  old `opacity: 0` + reduce-override pattern is deprecated (import-order made
  the override unreliable) and the actual global reduce block.
- **§6 Hero** — rewritten against the shipped hero migration: `--colour-primary`
  background (not `--colour-bg`), real headline size/colour, eyebrow / divider /
  tagline, both CTA button styles + hover, "1992" stamp, noise overlay, pillar
  watermark, scroll indicator, and the staggered `fadeUp` entrance.
- **§6 Navigation** — documented the adaptive theme: `data-nav-theme` mapping,
  `--nav-bg-light` / `--nav-bg-dark`, `.nav-on-dark` / `.nav-on-light` behaviour,
  IntersectionObserver-driven, composes independently with `.scrolled`, logo
  mark excluded.
- **§6 Team** — documented `.modal-scroll-cue` (sticky bottom-pinned chevron +
  scrim, `.scrolled` fade, overflow auto-suppression, `no-preference`-gated bob).
- **§1 Palette** — added `--nav-bg-light` / `--nav-bg-dark` rows and the gold
  `#d4a24a` nav-mark colour, the latter flagged **provisional** (inline literal,
  pending final logo resolution — not a locked token).
- **§9 Animation Catalogue** — corrected the dead `slideUp` row to the actual
  `fadeUp`; added `markDrift` and `scrollCueBob`.

### feat — team profile modal: scroll cue (bobbing chevron + scrim)

On open, the partner profile modal filled its viewport with the tall hero
portrait, giving no signal that the name, second portrait and bio sat below the
fold. Added a subtle, self-dismissing scroll affordance.

#### Added
- **`.modal-scroll-cue`** in each of the three profile modals (`index.html`) —
  a down-chevron SVG + an uppercase "Scroll" label, marked `aria-hidden="true"`
  (decorative). Inserted as the last child of `.modal-content`.
- **`layout.css`** — the cue is `position: sticky; bottom: 0`, pinned to the
  bottom edge of the scrollable `.modal-content`. A negative `margin-top`
  (`-var(--space-12)`) cancels its own height so it overlays the content above
  rather than adding a trailing gap. Dark→transparent scrim
  (`linear-gradient(to top, var(--colour-overlay), transparent)`) keeps the
  white chevron/label legible over any portrait. `pointer-events: none` so it
  never blocks scroll or interaction. `.modal-content.scrolled .modal-scroll-cue`
  fades it out over `--duration-base`.
- **`animations.css`** — new `scrollCueBob` keyframe (gentle `translateY`,
  transform-only), applied to the chevron only inside
  `@media (prefers-reduced-motion: no-preference)` — matching this codebase's
  convention of opting animations in rather than overriding them off.
- **`modal.js`** — on open, resets `scrollTop` and shows the cue only when the
  content actually overflows (`scrollHeight > clientHeight + 16`), so a short
  profile never shows a false signal. A passive scroll listener adds `.scrolled`
  once the user scrolls past 16px, hiding the cue one-way (re-resolved on each
  reopen, so scrolling back to the top doesn't re-nag).

#### Accessibility / performance
- Animates only `transform` / `opacity`; no layout properties. Token-driven, no
  inline styles. Under `prefers-reduced-motion: reduce` the bob never starts and
  the fade collapses to instant via the universal duration rule.

### feat — adaptive nav theme (light-on-dark / dark-on-light by section)

The fixed nav bar now swaps its colour theme based on which section sits
directly behind it, so the wordmark and location label stay legible over both
the dark Burnt Rose sections and the light Snow sections. This is independent
of, and composes with, the existing `.scrolled` class — `.scrolled` still
governs blur/shadow intensity by scroll position and is untouched.

#### Added
- **`data-nav-theme` attributes** on every top-level section + the footer:
  - `dark` → `#hero`, `#evolution`, `#excellence`, `#footer`
  - `light` → `#endeavors`, `#services`, `#team`, `#testimonials`, `#contact`
  - Mapping verified against each section's actual rendered background before
    applying — zero mismatches. (`#evolution` is Burnt Rose via `components.css`,
    so `dark` is correct; an initial audit that only read `layout.css` briefly
    flagged it as a false positive — confirmed a non-issue, no change made.)
- **`--nav-bg-dark`** token (`rgba(133, 77, 79, 0.55)`, Burnt Rose 55%) in
  `variables.css`, and the existing light nav glass value promoted to a named
  token **`--nav-bg-light`** (`rgba(247, 249, 249, 0.85)`).
- **`.nav-on-dark` / `.nav-on-light`** rules in `layout.css` (mutually
  exclusive). `nav-on-dark`: background → `--nav-bg-dark`, wordmark + location
  label → `--colour-white`. `nav-on-light`: background → `--nav-bg-light`,
  wordmark/location label → their existing colours. `background-color`
  transitions over `--duration-base` on `#nav`; `color` transitions over
  `--duration-base` on `.logo` / `.location-label`.
- **`initNavTheme()`** in `main.js` — a single `IntersectionObserver` watching
  a 1px detection band at the nav's lower edge (`nav.offsetHeight`, read at
  runtime — not hardcoded). The intersecting section's `data-nav-theme` drives
  the class toggle. Resolves the correct theme on initial load with no scroll
  event; rebuilt on debounced resize since `rootMargin` is fixed at creation.

#### Unchanged (intentionally)
- The gold pillar mark (`.nav-brand-mark`) keeps its colour in both themes.
- Under `prefers-reduced-motion: reduce`, the classes still toggle and the
  colours still apply — the universal `transition-duration: 0.01ms` collapse
  rule makes the swap instant rather than fading. No special-case override
  added; confirmed not broken.

### css — reduced-motion audit closeout: dead `animation: none` overrides made authoritative

Closes out the reduced-motion audit. The previous pass fixed the `opacity: 0`
resting-state cases (structural — inverted to visible-by-default); this pass
handles the remaining, different-shaped category: specific
`@media (prefers-reduced-motion: reduce)` overrides meant to fully stop a
continuously-running animation that were dead because a later-imported rule
re-asserts the animation at equal specificity. No "default state" to invert
here — the right tool is `!important`, which CLAUDE.md §7 permits for
reduced-motion overrides.

#### Fixed (in `animations.css` reduce block, verified via CDP computed styles)
- `.marquee-track { animation: none !important; }` — was beaten by
  `layout.css` `animation: marquee 30s linear infinite`. Under reduce the
  track now sits at its natural resting `transform` (`none`) instead of being
  snapped to the `translateX(-50%)` end state by the universal
  `animation-duration: 0.01ms` / `iteration-count: 1` collapse rule.
- `.typewriter-cursor { animation: none !important; }` — was beaten by
  `components.css` `animation: typewriterCursor 1s step-end infinite`. Cursor
  no longer blinks under reduce (`animationName: none`, `opacity: 1`).
- `html { scroll-behavior: auto !important; }` — **sibling found during the
  scan**: same shape, beaten by `layout.css` `html { scroll-behavior: smooth }`
  (later import, equal `0,0,1` specificity). Smooth scrolling was still active
  under reduced motion; now correctly forced to `auto`.

#### Scan result
The rest of the reduce block is clear: the universal `*, *::before, *::after`
rule already uses `!important`; the `.typewriter-cursor` `opacity: 1` is not
overridden by any later rule (no cascade loss); the explanatory comment block
declares no rules. No further instances of this category remain.

### css — reveal-animation visibility audit: same fix applied site-wide

Audited every scroll-reveal section for the hero's failure mode — content
with an `opacity: 0` resting state whose only path to visibility is an
animation/transition completing, with the `prefers-reduced-motion: reduce`
override dead because `components.css`/`layout.css` are `@import`-ed after
`animations.css` and re-assert `opacity: 0` at equal specificity. Each was
verified by CDP-inspecting computed opacity under emulated `reduce` (below-
the-fold, no scroll), not by reading CSS.

#### Fixed — confirmed broken (computed `opacity: 0` under reduce at rest)
Inverted to the hero pattern: resting state fully visible (`opacity: 1`,
`transform: none`); the hidden-start + entrance moved into
`@media (prefers-reduced-motion: no-preference)`; the existing
IntersectionObserver `.visible`/`.active` trigger unchanged.
- `.ledger-card` (#endeavors) — page-load reveal only; the hover/tap
  stamp-wipe on `.ledger-brief` was left untouched.
- `.service-card` (#services)
- `.excellence-card` (#excellence)
- `.partner-card` (#team)
- `.contact-block` (#contact)
- `.footer-brand` (footer)
- `.timeline-chapter` (#evolution) — standardised for the same dead-override
  reason. It was not *visibly* broken: timeline.js `setAllActive()` adds
  `.active` to every chapter under reduce, masking it via JS. The inversion
  makes the reduced-motion path CSS-only (visible even if that JS never runs).

#### Verified already fine — no change
- Hero — fixed in the prior pass (already uses this pattern).
- Testimonials — both modes confirmed under reduce: section heading has no
  reveal dependency (always visible); desktop typewriter swaps to
  `renderStatic()` (three static quotes, visible); mobile marquee cards stay
  `opacity: 1`. No `opacity: 0` resting state anywhere in the section.
- Modal overlay/content and `#scroll-top` — `opacity: 0` is intentional
  (hidden until click / scroll past hero), not a scroll-reveal; left as-is.

#### Notes / flagged (not changed this pass)
- JS-dependency risk (separate, lower severity): after this fix the
  `no-preference` (motion) path still relies on `main.js`/`timeline.js`
  running to add `.visible`/`.active`. If JS fails entirely, motion users'
  content would stay hidden. The reduced-motion path is now CSS-only and
  unaffected. Flagged, not engineered around.
- The reduce block's `.marquee-track { animation: none }` and
  `.typewriter-cursor { animation: none }` are dead from the same cascade
  trap, but harmless — the universal `animation-duration: 0.01ms !important` /
  `iteration-count: 1` rule already neutralises the motion and no content
  visibility depends on them. Left for the same future cleanup.
- UI_SPEC batch queue: the "visible by default, hidden-start + animation as an
  opt-in enhancement under `prefers-reduced-motion: no-preference`" pattern
  should become the documented standard for all reveal animations, replacing
  the fragile `opacity: 0` resting-state approach (§9/§10). Not written here.

### index.html — hero visibility fix + hero→Evolution seam

#### Fixed
- Hero content (eyebrow, headline, divider, tagline, both CTAs) could render
  as a blank Burnt Rose stage. Root cause: the elements' resting state was
  `opacity: 0`, with the `fadeUp` animation's `forwards` fill the *only* path
  to visibility — so any context where that animation didn't run to completion
  (a `prefers-reduced-motion` browser, an animation-blocking extension, or
  simply viewing during the up-to-1.3s staggered delay) left them stuck
  invisible. The reduced-motion fallback previously added in `animations.css`
  was itself dead, since `components.css` is `@import`ed later at equal
  specificity and re-asserted `opacity: 0`.
- Fix: the resting state is now fully visible; the hidden-start + `fadeUp`
  entrance is opt-in under `@media (prefers-reduced-motion: no-preference)`.
  Motion-OK users get the identical approved staggered entrance; everyone else
  sees the hero immediately. Verified via DevTools (CDP): no-preference →
  `fadeUp` plays and settles to `opacity: 1`; reduce → `animation: none`,
  `opacity: 1` on load. The redundant hero block in the `animations.css`
  reduced-motion override was removed.

#### Added
- `.section-seam` at the top of `#evolution` — a centred Pale Sky hairline +
  small diamond node reusing the hero divider's visual language, marking the
  hero → Evolution transition where both sections share the Burnt Rose ground.

### index.html — hero-option3 migrated in as the production hero

#### Added
- Production `#hero` rebuilt from the approved `hero-option3.html` preview:
  Burnt Rose stage with a fractal-noise texture overlay, top-left
  architectural accent rules + bottom-right echo, a ghosted drifting pillar
  watermark, a "1992" founding stamp, the eyebrow → headline → divider →
  tagline → dual-CTA copy stack, and a pulsing scroll indicator. The
  placeholder hero (light headline + single "Explore the Firm" link) is gone.
- Nav brand group: the gold masked-pillar SVG mark now sits beside the
  "S.M & Partners" wordmark in the shared `<nav>`, wrapped in a `.nav-brand`
  anchor linking to the top of the page. Applies site-wide, not hero-only.
- New keyframes `fadeUp` (staggered hero entrance) and `markDrift` (pillar
  watermark drift) added to `animations.css`. `pulse` was reused, not
  duplicated.

#### Changed
- CSS migrated out of the preview's inline `<style>` block and split across
  the modular partials per the architecture: keyframes → `animations.css`;
  hero box structure, noise overlay, accent rules and pillar-watermark
  positioning → `layout.css`; eyebrow, title, divider, tagline, buttons and
  the "1992" stamp → `components.css`. No inline `style=""` in `index.html`.
  Existing custom properties (`--colour-primary/-accent/-white`, the font and
  easing tokens, `--duration-*`, `--text-label`, `--z-base/-card`) are
  referenced rather than redefined.
- Placeholder `href="#"` links wired to real section anchors: "Schedule a
  Consultation" → `#contact`; "Explore the Firm" and the scroll indicator →
  `#evolution`; nav brand → `#hero` (top of page).
- Hero CTA buttons namespaced as `.hero-btn-primary` / `.hero-btn-ghost` to
  avoid colliding with the contact section's existing `.btn-primary`, which
  is a visually different button on light ground.
- `.scroll-indicator` and `.hero-title` restyled in place for the now-dark
  hero (white/Pale Sky on Burnt Rose instead of Burnt Rose on Bright Snow).
- Preview's desktop-first `max-width: 768px` rules rewritten mobile-first
  (`min-width: 768px`) per the project's mobile-first rule.

#### Accessibility
- Both hero CTAs and the `.nav-brand` link have visible `:focus-visible`
  outlines. The global `prefers-reduced-motion` override already neutralises
  `fadeUp`/`pulse`/`markDrift`; explicit hero fallbacks were added to pin the
  entrance elements to their resting state and stop the pillar drift.

#### Notes
- `hero-option1/2/3.html` standalone previews left untouched. `UI_SPEC.md`
  not modified this pass — hero-introduced values not yet documented there
  (button treatment, divider, stamp opacity, noise overlay, gold `#d4a24a`)
  are flagged for a follow-up batch update.

### hero-option3.html — gold pillar logo mark in nav

#### Added
- Inline gold SVG pillar mark added beside the text wordmark in the nav,
  wrapped in a flex container. Standalone preview file only; CLAUDE.md's
  no-inline-styles rule does not apply here.

#### Changed
- Eyebrow text updated to "Advocates, Notaries Public & Commissioners for
  Oaths"; the separate practice-area tagline line was removed.
- Pillar mark geometry reworked twice based on a reference logo image: first
  pass mirrored the diagonal stroke for left/right symmetry, then the
  construction was rebuilt entirely — the shaft is now a single solid gold
  fill with a thin zigzag crack cut out via an SVG `<mask>` (vertical →
  diagonal → vertical), matching the reference's solid-fill-with-crack
  structure instead of the original thin-rails-plus-stroke approach. The
  mask approach lets the nav's blurred/translucent background show through
  the crack correctly.

### Notable Endeavors — full section overhaul summary + UI_SPEC.md documentation

Summary of the complete Notable Endeavors rework across recent commits:

#### Changed
- Client roster updated: Zambia Sugar Plc, Banc ABC Zambia, and First National
  Bank Zambia Limited removed; ZDA-Henan Guoji and Meanwood Finance Corporation
  Limited added; one-line work descriptions added for all eight clients.
- Hover interaction replaced the old flat colour-shift with a "document stamp
  wipe": an underline expands and the description reveals via `clip-path`.
- Grid moved to `repeat(4, 1fr)` on desktop so the eight cards form two even
  rows; the old shared-gridline (`gap: 2px` + `--colour-border` background)
  technique was dropped in favour of `gap: var(--space-3)` with each card
  carrying its own border.
- Ghost numerals (`01`–`08`) added to each card using the timeline section's
  stroke technique.
- Card hover/active/focus-visible state changed to a Burnt Rose
  (`--colour-primary`) background with `--colour-white` text, pairing with
  the existing Pale Sky underline and numeral the same way the timeline
  section pairs Burnt Rose backgrounds with Pale Sky accents.
- `docs/UI_SPEC.md` updated to document all of the above as the source of
  truth: new `--colour-accent-tint` row in the Colour Palette table, a
  rewritten "Ledger Grid (Notable Endeavors)" section reflecting the actual
  implemented rest/hover states, and a new Animation Catalogue row + note
  for the `.ledger-brief` `clip-path` reveal.

#### Note
- An animated line-canvas background (ported from `hero-option1.html`) was
  briefly added behind this section and then removed after visual review —
  the section keeps its plain `--colour-bg` background. `UI_SPEC.md` reflects
  the current, canvas-free implementation.

### Notable Endeavors — remove architectural line canvas

#### Removed
- `js/endeavors-lines.js` deleted along with its `<script>` tag and init call
  in `js/main.js`. `<canvas id="endeavors-line-canvas">` removed from
  `index.html`. Associated `#endeavors-line-canvas` rules removed from
  `css/layout.css` (positioning, `#endeavors` `relative`/`overflow: hidden`,
  the `z-index: 2` raises on `.section-header`/`.ledger-grid`) and
  `css/animations.css` (reduced-motion override). The diagonal line pattern
  behind the ledger cards was visually unwanted; the section reverts to its
  plain `--colour-bg` background.

### Notable Endeavors — ghost numerals, accent tint/border, and architectural line canvas

#### Added
- `index.html` — ghost numeral (`01`–`08`, stroked outline style matching the
  timeline year numerals) added as the first child of each `.ledger-card`, in
  card order. `<canvas id="endeavors-line-canvas">` added as the first child
  of `#endeavors`.
- `css/variables.css` — `--colour-accent-tint` and `--colour-accent-tint-hover`
  added for the new ledger card background treatment.
- `css/components.css` — `.ledger-num` ghost numeral styling; `.ledger-card`
  given a `--colour-accent-tint` background with a `--colour-primary` left
  border (matching the existing `.service-card` pattern), transitioning to
  `--colour-accent-tint-hover` on hover/active/focus-visible.
- `js/endeavors-lines.js` — architectural line canvas ported from
  `hero-option1.html` (same nine line configs, colours, opacities, line
  widths, and drift animation) as a section-wide animated background for
  `#endeavors`, retargeted to size off the section's own height rather than
  the hero's `100vh`. Gated by an `IntersectionObserver` that cancels the
  `requestAnimationFrame` loop while the section is off-screen and restarts
  it on re-entry, since this section sits well down the page and shouldn't
  burn CPU/battery while unseen.

#### Changed
- `css/layout.css` — `#endeavors` given `position: relative` and
  `overflow: hidden` to host the canvas; canvas positioned absolute/inset 0
  behind the content; `.section-header` and `.ledger-grid` raised to
  `z-index: 2` to render above it. `.ledger-grid` gap changed from the old
  shared 2px gridline technique (`gap: 2px` + `background: var(--colour-border)`)
  to `gap: var(--space-3)`, since each card now carries its own border and the
  shared dividers were redundant.
- `css/animations.css` — `#endeavors-line-canvas { display: none; }` added to
  the existing `prefers-reduced-motion: reduce` block, mirroring the same
  rule for `#line-canvas` in `hero-option1.html`.

### Notable Endeavors — content update and document stamp wipe interaction

#### Changed
- `index.html` — Notable Endeavors content updated: Zambia Sugar Plc, Banc ABC
  Zambia, and First National Bank Zambia Limited removed; ZDA-Henan Guoji and
  Meanwood Finance Corporation Limited added; one-line work descriptions added
  for all eight remaining clients. Each `.ledger-card` restructured to include
  a name wrapper, underline element, and description paragraph.
- `css/components.css` — replaced the `.ledger-card:hover` background-colour
  shift with a document stamp wipe: an underline scales in from the left and
  the description paragraph reveals via `clip-path`, on hover, focus-visible,
  and `.active` (touch/keyboard) state.
- `css/layout.css` — `.ledger-grid` desktop columns changed from
  `repeat(3, 1fr)` to `repeat(4, 1fr)` so the eight cards form two even rows.
- `js/main.js` — wired up the new `Endeavors` module on init.

#### Added
- `js/endeavors.js` — toggles `.active` on `.ledger-card` on click and on
  Enter/Space keydown, giving touch and keyboard users the same stamp wipe
  reveal as `:hover`.

#### Note
- `clip-path` on `.ledger-brief` is a deliberate, approved exception to the
  transform/opacity-only animation rule, pending a `UI_SPEC.md` update once
  this section is verified.

### hero-option2 — split screen with hero_image10, clean layout

#### Added
- `assets/images/hero_image10.jpg` — portrait-oriented group photo of all three
  partners, placed as source image.
- `assets/images/hero_image10.webp` — converted from `hero_image10.jpg` (3600×2401
  source) using Sharp at 85% quality, `fit: inside`, 1200×800px output, 52.9KB.

#### Changed
- `hero-option2.html` — reverted from experimental L-shape grid layout back to clean
  `45fr 55fr` split screen (`height: 100vh`, single row). Stats returned to left text
  panel. Image panel switched from `hero_image9` to `hero_image10`; `object-fit: cover;
  object-position: center center` frames all three partners correctly with the
  portrait-oriented source. Burnt Rose overlay (0.65/0.45/0.70) retained.

---

### Hero image WebP conversion and hero-option2 integration

#### Added
- `assets/images/hero_image9.webp` — converted from `hero_image9.jpg` (608KB source)
  using Sharp at 85% quality, resized to 960×1080px (`fit: cover`). Output: 46.2KB.
  Original JPG retained as `<picture>` fallback.

#### Changed
- `hero-option2.html` `.hero-image-wrap` — `.hero-image-placeholder` gradient div
  and `.photo-note` element replaced with a `<picture>` element using
  `hero_image9.webp` as the WebP source and `hero_image9.jpg` as the fallback
  `<img>` (`loading="eager"`, `width="960"`, `height="1080"`). `.hero-right picture img`
  CSS rule added to the file's `<style>` block (`width: 100%; height: 100%;
  object-fit: cover; object-position: center`). `.photo-note` and
  `.hero-image-placeholder` CSS rules removed.

---

### Hero variant preview pages for client review

#### Added
- `hero-option1.html`, `hero-option2.html`, `hero-option3.html` — project root.
  Three standalone hero variant preview pages committed for client review.
  Accessible at `/hero-option1`, `/hero-option2`, `/hero-option3` on the Coolify
  deployment. No changes to `index.html` or any CSS/JS files.

---

### SEO & AI search visibility — robots.txt, sitemap, llms.txt, canonical, Twitter cards, schema patch

#### Added
- `robots.txt` — project root. Allows all general crawlers unrestricted access (`User-agent: *
  Allow: /`). Named `Allow: /` directives for six known AI crawlers: GPTBot (OpenAI),
  ClaudeBot (Anthropic), PerplexityBot, GoogleOther (Google AI), Amazonbot, Applebot.
  `Sitemap:` directive pointing to `https://sukwanamweemba.com/sitemap.xml`. Comment
  header identifying the file and its last-updated date (2026-06-03).
- `sitemap.xml` — project root. Standard `urlset` schema
  (`http://www.sitemaps.org/schemas/sitemap/0.9`). Single `<url>` entry:
  `<loc>https://sukwanamweemba.com/</loc>`, `<lastmod>2026-06-03</lastmod>`,
  `<changefreq>monthly</changefreq>`, `<priority>1.0</priority>`.
- `llms.txt` — project root. Plain-language structured summary for AI language model
  crawlers. Covers firm overview, five practice areas with descriptions, notable client
  list, full contact details, and service standards (2-business-day turnaround,
  confidentiality). Follows the `# Title / > tagline / prose / ## sections` convention.
- `assets/images/og-cover-placeholder.md` — reminder file documenting the required
  `og-cover.webp` (1200×630px, <200KB), how to generate it from a live site screenshot,
  and content guidance for legibility at link-preview thumbnail size. To be deleted once
  the real image is committed.
- `index.html` `<head>` — `<link rel="canonical" href="https://sukwanamweemba.com/" />`
  added immediately after the Open Graph block.
- `index.html` `<head>` — four Twitter/X Card meta tags added immediately after the
  canonical tag: `twitter:card` (`summary_large_image`), `twitter:title`,
  `twitter:description` ("Established 1992. Advocates and Commissioners for Oaths
  specialising in Conveyancing, Commercial Litigation, and Advisory Services in Lusaka,
  Zambia."), `twitter:image` (`assets/images/og-cover.webp`).

#### Changed
- `index.html` `<head>` Schema.org JSON-LD `LegalService` — `"email"` array second
  address updated from `theophilus@sukwanamweemba.com` to `info@sukwanamweemba.com`,
  consistent with the contact section change made in v0.15.0.

---

## [0.16.0] — 2026-06-03

### Feature — inline SVG icons for Services and Excellence sections

#### Changed
- `css/components.css` `.service-icon` — removed placeholder `background-color: var(--colour-accent)`
  and `border-radius: var(--radius-sm)` rules; replaced with `color: var(--colour-accent)` so
  the inline SVG stroke inherits the Pale Sky colour via `currentColor`.
- `css/components.css` `.excellence-icon` — added new rule `color: var(--colour-accent)` so
  excellence SVG icons inherit the same Pale Sky stroke colour via `currentColor`. (The
  `width`/`height` rules remain in `layout.css`.)
- `index.html` `#services` — all five `.service-icon` divs now contain inline SVGs
  (`width="32" height="32"`, `viewBox="0 0 32 32"`, `fill="none"`, `stroke="currentColor"`,
  `stroke-width="1.5"`, `stroke-linecap="round"`, `stroke-linejoin="round"`,
  `aria-hidden="true"`, `focusable="false"`). Assignments:
  - Conveyancing: house outline (roof polyline + walls rect + door rect) with a small key
    (circle head + shaft line + tooth line) positioned below.
  - Dispute Resolution: scales of justice — vertical pole, horizontal beam, two U-shaped
    pan arcs (quadratic paths), base line.
  - Legal Drafting: document rectangle + three ruled lines + diagonal closed-path pen/nib
    shape overlapping the document edge.
  - Advisory Services: rounded speech-bubble path with centred tail + lightbulb circle
    + lightbulb stem line inside the bubble.
  - Company Secretarial: shield path (peak top, curved sides, pointed base) + polyline
    checkmark inside.
- `index.html` `#excellence` — all four `.excellence-icon` divs now contain inline SVGs
  using the same attribute set as the service icons. Assignments:
  - Turnaround Time: clock — circle face + minute hand (to 12) + hour hand (to 3).
  - Periodic Updates: bell — dome path + horizontal rim line + clapper arc + hang stem.
  - Confidentiality: padlock — body rect + shackle arc path + keyhole circle + keyhole slot.
  - Transparent Billing: document rect + two full-width item lines + one short item line
    + one full-width total line.

---

## [0.15.0] — 2026-06-03

### Content — partner bio update, services copy edits, gallery removal, contact email update

#### Changed
- `index.html` `#modal-theophilus` `.modal-bio` — replaced four-paragraph bio with the
  client-approved three-paragraph bio. New text covers: call to the Bar in 2016 (LLB,
  University of South Africa, 2013), tenure at First National Bank Zambia Limited
  2013–2018 (legal advice to Board, Board Committees, and litigation conduct), private
  practice litigation clients (Syngenta Zambia Limited, Richmond Finance Limited, York
  Farms Limited), LLM in Corporate and Commercial Law from ZCAS University (September
  2024, Merit), and professional inspiration from Lord Jonathan Sumption.
- `index.html` `#team` `.section-header` — removed subtitle paragraph ("The advocates
  and legal minds behind three decades of pristine counsel in Zambia.") leaving the
  `<h2>` as the sole content of the section header.
- `index.html` `#contact` `.contact-block` "Email Us" — second email address changed
  from `theophilus@sukwanamweemba.com` to `info@sukwanamweemba.com`; corresponding
  `.contact-label` changed from "Associate" to "General Enquiries".
- `index.html` `#services` `.service-card` "Company Secretarial" — description changed
  from "Company formation and incorporation" to "Company registration".
- `index.html` `#services` `.service-card` "Dispute Resolution" — description changed
  from "debt collection and foreclosures" to "debt collection services".
- `index.html` `#services` `.service-card` "Legal Drafting" — removed ", and deeds of
  assignment" from the end of the description; sentence now ends at "tenancy and lease
  agreements."
- `index.html` `#excellence` `.excellence-card` "Periodic Updates" — description
  replaced with: "We provide scheduled upates on all matters under our attention,
  however, remain open to continued client interactions."

#### Removed
- `index.html` `#team` `.team-gallery` — entire gallery strip removed, including the
  `.gallery-track` wrapper and all 6 `<figure>` / `<picture>` / `<img>` elements
  (`_19A8879`, `_19A8887`, `_19A8901`, `_19A8915`, `_19A8922`, `_19A8931`).

---

## [0.14.1] — 2026-05-27

### Content — Theophilus main profile image swapped to theophilus3

#### Changed
- `index.html` `#team` `.partner-card[data-partner="theophilus"]` `.partner-card-image`
  `<picture>` — `<source srcset>` updated from `theophilus1.webp` to `theophilus3.webp`;
  `<img src>` updated from `theophilus1.jpg` to `theophilus3.jpg`.
- `index.html` `#modal-theophilus` `.modal-hero-image` `<picture>` — same swap applied
  to the modal hero portrait (`theophilus1` → `theophilus3`). The secondary image in
  `.modal-secondary-image` (`theophilus2`) is unchanged.

---

## [0.14.0] — 2026-05-27

### UI polish — hero headline, nav anchor links, scroll indicator link, scroll-to-top button

#### Added
- `index.html` `<body>` — new `<button id="scroll-top" aria-label="Back to top">` element
  placed after `</footer>` and before the JS module `<script>` tags. Contains an inline
  SVG upward chevron (`stroke="currentColor"`, `aria-hidden="true"`, `focusable="false"`)
  that inherits its white colour from the button's `color` property — no inline styles.
- `css/layout.css` `#scroll-top` — structural rules: `position: fixed`, `bottom: 2rem`,
  `right: 2rem`, `z-index: var(--z-sticky)`, `width/height: 48px`, `border: none`,
  `border-radius: 0` (sharp corners per authority aesthetic), `padding: 0`. Default state:
  `opacity: 0; pointer-events: none; transform: translateY(20px)`. `.visible` state:
  `opacity: 1; pointer-events: auto; transform: translateY(0)`.
- `css/components.css` `#scroll-top` — visual rules: `background-color: --colour-primary`,
  `color: --colour-white`, `display: flex; align-items: center; justify-content: center`.
  `transition` declaration placed here (not in `layout.css`) so it is the single winning
  declaration in the cascade: `opacity`, `transform`, and `background-color` each at
  `--duration-base --ease-smooth`. `#scroll-top:hover` transitions `background-color` to
  `--colour-primary-dark`. `#scroll-top:focus-visible` adds a 2px `--colour-accent`
  outline at 2px offset.
- `css/layout.css` `html` — `scroll-behavior: smooth` added so all anchor links (`#hero`,
  `#evolution`, `#contact`, `#team`, etc.) scroll smoothly. Overridden to `auto` in the
  reduced-motion block in `animations.css`.
- `js/main.js` `initScrollTop` IIFE — RAF-throttled `scroll` listener toggles `.visible`
  on `#scroll-top` when `window.scrollY > hero.offsetHeight` (hero's rendered height, read
  live each frame). `click` handler calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
  with a runtime `prefers-reduced-motion` check that substitutes `behavior: 'auto'` when
  the user has requested reduced motion. `updateVisibility()` called once on init to
  resolve state on page load / browser scroll restoration.

#### Changed
- `index.html` `#hero` `<h1 class="hero-title">` — first text node changed from
  "Pristine Counsel." to "Sukwana Mweemba &amp; Partners". The `<span>` on the second
  line ("Proven Legacy." — italic Playfair 400, `--colour-accent`) is unchanged.
- `index.html` `#nav` `.logo` — element changed from `<span>` to
  `<a href="#hero" class="logo">`. Links to the hero section (effectively the page top);
  smooth scroll from `html { scroll-behavior: smooth }`. Visually identical — same font,
  weight, letter-spacing, colour, uppercase.
- `index.html` `#nav` `.location-label` — element changed from `<span>` to
  `<a href="#contact" class="location-label">`. Links to the contact section.
  Visually identical to the former span.
- `index.html` `#hero` `.scroll-indicator` — element changed from `<div>` to
  `<a href="#evolution" class="scroll-indicator" aria-label="Scroll to Our Evolution section">`.
  Pulse animation, colour, and absolute positioning are preserved. Keyboard-navigable.
- `css/components.css` `.logo`, `.location-label`, `.scroll-indicator` — added
  `text-decoration: none` to each rule so the `<a>` elements render identically to the
  former `<span>` / `<div>`. Added `:focus-visible` rings (`2px solid --colour-accent`,
  3–4px offset) to all three for keyboard accessibility.
- `css/animations.css` reduced-motion block — added `html { scroll-behavior: auto }` to
  disable CSS-driven smooth scroll for users who prefer reduced motion. The blanket
  `transition-duration: 0.01ms !important` rule already neutralises `#scroll-top`'s
  opacity/transform/background-color transitions.

---

## [0.13.0] — 2026-05-27

### Evolution section — timeline restructure, progress bar fix, active year highlighting

#### Added
- `index.html` `#evolution` `.timeline-items` — replaced 3 `.timeline-item` divs with
  3 `.timeline-chapter` divs. Each chapter contains a `.timeline-year` anchor numeral
  and a `.timeline-chapter-body` div holding an `<h3>` chapter title and 1–3
  `.timeline-entry` children. Each `.timeline-entry` has a `<span class="timeline-entry-year">`
  label and a `<p>` body. Chapter content (verbatim from firm profile):
  - Chapter 1 "The Founding Years" (anchor 1992): entry 1992 — firm established with
    Mr. Charles Muponda and Mr. Justice Chashi as first Partners; entry 2004 —
    Mr. William Smith Mweemba joined as Partner after 19+ years at Barclays Bank
    Zambia Plc (now Absa Bank Zambia Plc).
  - Chapter 2 "The Judicial Era" (anchor 2010): entry 2010 — Mr. Justice Chashi
    appointed High Court Judge, Mr. Sukwana Lukangaba joined as Associate; entry
    2013 — Mr. Sukwana Lukangaba became Partner; entry 2014 — Mr. William S. Mweemba
    appointed High Court Judge.
  - Chapter 3 "The Modern Firm" (anchor 2017): entry 2017 — Mrs. Kasongo
    Mweemba-Chileshe appointed Partner; entry 2020 — Firm renamed Sukwana Mweemba
    and Partners under her leadership as Managing Partner.
- `css/layout.css` — `.timeline-entry` (`margin-bottom: --space-3`; last-child
  `margin-bottom: 0`) and `.timeline-chapter-body` padding rules (mobile:
  `padding-left: 50px` to clear the rail; desktop: `width: 40%; padding-left: 0`).
- `css/components.css` — `.timeline-chapter-body h3` (Playfair Display 400, 2rem,
  `--colour-white`, `--space-4` margin-bottom — extra space above first entry);
  `.timeline-entry-year` (Inter 700, `--text-label`, `--colour-accent`,
  `letter-spacing: 0.1em`, `display: block`, `--space-1` margin-bottom);
  `.timeline-entry p` (Inter 300, `--text-body`, line-height 1.6, opacity 0.9).
- `css/components.css` — `.timeline-year` gains `transition: color --duration-slow
  --ease-weighted, opacity --duration-slow --ease-weighted` for the active-year
  light-up effect. `.timeline-year.active-year` sets `color: var(--colour-accent)`,
  `-webkit-text-stroke: 0px transparent`, `opacity: 1` — the year numeral transitions
  from an outlined ghost at 0.4 opacity to a solid Pale Sky fill at full opacity as
  the progress bar enters that chapter's vertical range. Exactly one chapter is active
  at a time; `.active-year` is removed when the bar moves into the next chapter.
- `js/timeline.js` — `updateActiveChapters(percent)` function: iterates over all
  `.timeline-chapter` nodes, computes each chapter's vertical range within the track
  via live `getBoundingClientRect` (positions relative to `.timeline-track`), converts
  to progress percentages, and calls `classList.add/remove('active-year')` on each
  chapter's `.timeline-year`. Called on every RAF tick after `progressBar.style.height`
  is set. `setAllActive()` (reduced-motion path) now also applies `.active-year` to all
  chapter year elements immediately.

#### Changed
- `js/timeline.js` — `updateProgress()` progress bar calculation fixed. Old formula
  divided `scrolled` by `sectionHeight`, causing the bar to reach 100 % when
  `window.scrollY = sectionTop + sectionHeight` (section top at viewport bottom) — a
  full viewport-height early. New formula divides by
  `Math.max(sectionHeight − window.innerHeight, 1)`, so 100 % is reached when the
  section's bottom edge aligns with the viewport bottom, meaning the user has scrolled
  through the entire section. `window.innerHeight` is read on each RAF tick so the
  value stays correct after browser resize.
- `js/timeline.js` — DOM query updated: `document.querySelectorAll('.timeline-item')`
  → `document.querySelectorAll('.timeline-chapter')`. `var items` private variable
  renamed `chapters`. `var track` added (caches `.timeline-track` reference for use in
  `updateActiveChapters`). `IntersectionObserver` now observes `.timeline-chapter`
  elements and adds `.active` to each on intersection as before.
- `css/layout.css` — all `.timeline-item` selectors renamed `.timeline-chapter`;
  all `.timeline-content` selectors renamed `.timeline-chapter-body`; desktop
  nth-child alternating rules updated to `.timeline-items .timeline-chapter:nth-child(even)`
  and `.timeline-items .timeline-chapter:nth-child(even) .timeline-chapter-body`;
  desktop `align-items` on `.timeline-chapter` changed from `center` to `flex-start`
  so the year numeral aligns with the top of multi-entry chapter bodies rather than
  floating to the vertical midpoint.
- `css/animations.css` — reduced-motion block selector updated:
  `.timeline-item { opacity: 1; transform: none }` → `.timeline-chapter { … }`.
  Comment on the `timelineItem` keyframe updated to reference `.timeline-chapter`.
  The blanket `transition-duration: 0.01ms !important` rule already covers
  `.timeline-year`, so `.active-year` snaps instantly under reduced motion without
  an additional explicit override.

---

## [0.12.0] — 2026-05-25

### Content — updated partner bios for Kasongo Mweemba-Chileshe and Theophilus Gausi

#### Changed
- `index.html` `#modal-kasongo` `.modal-bio` — replaced two-paragraph bio with a
  four-paragraph bio covering Kasongo Myra Mweemba-Chileshe's academic background
  (LLB and BJuris, University of Namibia; dissertation published by Lap Lambert
  Publishing House 2010), her career history at the firm (joined October 2011,
  appointed Partner April 2017), practice areas (conveyancing, civil litigation,
  family law, employment law, ADR, company secretarial, commercial transactions),
  professional memberships (Advocate of the Superior Courts of Zambia, Associate
  Member of the Chartered Institute of Arbitrators, LAZ), the 2013 Bank of Zambia
  financial sector laws harmonisation engagement, and the firm's commitment to equal
  service for every client.
- `index.html` `#modal-theophilus` `.modal-bio` — replaced two-paragraph bio with a
  four-paragraph bio covering Theophilus Tukwayo Gausi's call to the Zambian Bar in
  2016 (LLB, University of South Africa), banking law background at First National
  Bank Zambia Limited, private practice litigation clients (Syngenta Zambia Limited,
  Richmond Finance Limited, York Farms Limited), September 2024 LLM in Corporate and
  Commercial Law from ZCAS University (graduated with Merit), and professional
  inspiration from Lord Jonathan Sumption.

---

## [0.11.0] — 2026-05-18

### Gallery strip — real images, footer year fix, developer credit

#### Added
- `assets/images/` — 6 new gallery WebP images generated from raw JPG source files
  (`_19A8879.webp` 26KB, `_19A8887.webp` 21KB, `_19A8901.webp` 48KB,
  `_19A8915.webp` 20KB, `_19A8922.webp` 16KB, `_19A8931.webp` 19KB).
  All well under the 50KB gallery thumbnail budget. Source JPGs also committed
  as `<picture>` fallbacks.
- `index.html` `#team` `.gallery-track` — replaced 6 Picsum placeholder `<img>` tags
  with 6 `<figure>` elements each wrapping a `<picture>` with WebP `<source>` and
  JPG fallback `<img>` (`width="400" height="400" loading="lazy"`). Descriptive `alt`
  text and matching `<figcaption class="visually-hidden">` on each figure.
- `index.html` `#footer` `.footer-bottom` — added third `<p class="footer-credit">`
  reading "Designed and Powered by Nexus Consulting Services" with an `<a>` linking to
  `https://mynexusgroup.com` (`target="_blank" rel="noopener noreferrer"`).
- `css/components.css` — `.footer-credit a` rule: `--colour-accent` colour,
  no underline, `opacity` transition on hover (matches `.footer-contact a` pattern
  from the spec).

#### Changed
- `scripts/optimise-images.js` — `getConfig()` updated with a new leading branch:
  filenames starting with `_` (raw camera exports) now receive gallery thumbnail
  config (`width: 400, height: 400, quality: 82, limitKB: 50, fit: 'cover'`).
  Without this guard `_19A8901` and `_19A8931` (both ending in `1`) would have been
  misclassified as primary portrait images (600×700) and produced portrait-cropped
  WebPs unsuitable for the square gallery strip. The `fit` property is now part of
  the config object and passed through to the `sharp().resize()` call, replacing the
  previous hardcoded `fit: 'inside'`.
- `index.html` `#footer` `.footer-bottom` — copyright year corrected from 2024 to 2026.

---

## [0.10.1] — 2026-05-17

### Bug fix — partner card overlay stuck open after modal close

#### Fixed
- `js/modal.js` — `closeModal()` previously called `activeTrigger.focus()` to
  return focus to the `.partner-card-trigger` button after dismissing a modal.
  Because that button now lives inside `.partner-card-overlay` (which is visually
  hidden via `transform: translateY(100%)`), Chrome overrides the transform to
  expose the focused element, leaving the overlay stuck in the fully-open state
  for as long as the button holds focus. Fixed by focusing the parent
  `<article class="partner-card">` element instead: it is already on-screen,
  carries no transform, and requires no browser override. `preventScroll: true`
  is passed to avoid any unintended page jump. A `(card || activeTrigger)` guard
  ensures the old behaviour is preserved as a fallback if `closest()` returns null.
  `init()` now calls `card.setAttribute('tabindex', '-1')` on each `.partner-card`
  so the `<article>` element is programmatically focusable; `tabindex="-1"` keeps
  it out of the natural Tab order so keyboard users are not interrupted while
  browsing the page.

---

## [0.10.0] — 2026-05-15

### Team section — real images, static modals, modal layout

#### Added
- `scripts/optimise-images.js` — new ESM Node script (uses `sharp`) that reads all
  `.jpg` / `.png` source files from `assets/images/`, converts each to WebP, and logs
  input size, output size, and savings percentage. `*1` images (primary card) are
  capped at 600×700 px, quality 82, 150 KB limit; `*2` and `*3` images (modal gallery)
  are capped at 800×600 px, quality 80, 100 KB limit. `fit: 'inside'` preserves the
  original aspect ratio without enlargement. Source JPGs are left untouched.
- `package.json` — new file (`type: "module"`, `sharp ^0.34.5` devDependency) added
  to support the one-time image optimisation script.
- `assets/images/` — 9 WebP partner images generated by running
  `node scripts/optimise-images.js`: `kasongo1.webp` (22 KB, 97.7% smaller),
  `kasongo2.webp` (18 KB), `kasongo3.webp` (17 KB), `sukwana1.webp` (21 KB),
  `sukwana2.webp` (14 KB), `sukwana3.webp` (14 KB), `theophilus1.webp` (18 KB),
  `theophilus2.webp` (13 KB), `theophilus3.webp` (16 KB). All well under budget.
  Source JPGs (kasongo1–3, sukwana1–3, theophilus1–3) also committed as `<picture>`
  fallbacks.
- `index.html` `#team` `.team-grid` — replaced 3 `<div class="team-card" data-member>`
  placeholders (Picsum images, no `<picture>`) with 3 `<article class="partner-card"
  data-partner>` elements. Each article contains: `.partner-card-image` div wrapping
  a `<picture>` with WebP `<source>` + jpg fallback `<img>` (`width="467" height="700"
  loading="lazy"`); `.partner-card-overlay` div (h3 + title p + `.partner-card-trigger`
  button — all three stacked in flex column); `.partner-card-trigger` `<button>`
  with `aria-label="View [Name]'s profile"`, `aria-expanded="false"`,
  `aria-controls="modal-[id]"`. Partner titles corrected: Sukwana Lukangaba is
  "Partner" (was "Managing Partner" in placeholder).
- `index.html` `#team` — replaced single shared `#team-modal` (JS-populated) with
  three fully static modals: `#modal-kasongo`, `#modal-sukwana`, `#modal-theophilus`.
  Each modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to
  its own partner name `<h3>`, `aria-hidden="true"` by default, and class `modal`.
  Internal structure: `.modal-header` flex row containing `.modal-close` button
  (SVG × icon, `aria-label="Close [Name]'s profile"`); `.modal-hero-image` div with
  `<picture>` for the `*1` image (full-width tall portrait); `.modal-lower` two-column
  grid containing `.modal-secondary-image` (left, `<picture>` for `*2` image) and
  `.modal-body` (right, h3 id, `.modal-title` p, `.modal-rule` div, `.modal-bio` div
  with two `<p>` children — full multi-paragraph bio copy per partner).
- Full bio copy in each modal sourced from original firm profile: Kasongo (joined
  March 2012, appointed Managing Partner April 2017; Law Association of Zambia
  member, all-courts admission); Sukwana (joined 1 October 2010, five years civil
  service as Legal Aid Counsel / Parliamentary Counsel / Assistant Senior State
  Advocate, made partner December 2013); Theophilus (joined January 2020, Legal
  Officer at First National Bank Zambia February 2013–March 2018, helped establish
  FNB Zambia Legal Department).
- `css/components.css` — `.gallery-strip` styles (flex row, `overflow-x: auto`,
  `scrollbar-width: thin`, webkit scrollbar styling, `picture` children 120×120 px
  `border-radius: --radius-sm` with `object-fit: cover`; hover `scale(1.05)` on img).

#### Changed
- `css/layout.css` — comprehensive team section overhaul:
  - All `.team-card*` selectors renamed to `.partner-card*` throughout
    (`.partner-card`, `.partner-card-image`, `.partner-card-overlay`,
    `.partner-card-trigger`).
  - `#team-modal` selector replaced with generic `.modal` class. Modal visibility
    changed from `display: none / flex` (required inline `style=` attribute in JS,
    violating CLAUDE.md rule #2) to `visibility: hidden; pointer-events: none` /
    `visibility: visible; pointer-events: auto` — purely CSS-class-driven.
  - `.modal-overlay` gains `opacity: 0` default + `transition: opacity
    --duration-base --ease-smooth` and `.modal.open .modal-overlay { opacity: 1 }`
    fade-in rule.
  - `.partner-card-image` gains `position: relative` and its `<picture>` child
    switches from `display: block; height: 100%` to `position: absolute; inset: 0`.
    Root cause fix: `height: 100%` on a `<picture>` does not resolve when the parent's
    height is determined via `aspect-ratio` alone (browser treats it as an indefinite
    height for percentage resolution); `position: absolute; inset: 0` fills the
    container correctly regardless of how parent height is computed. Same fix applied
    to modal image containers.
  - `.partner-card` gains `border-radius: var(--radius-lg)`. Existing `overflow:
    hidden` clips the absolutely-positioned image and overlay to the rounded shape.
  - `.partner-card-overlay` changed from plain block to `display: flex;
    flex-direction: column; gap: var(--space-2)` so name, title, and "View Profile"
    button stack cleanly without overlapping. `.partner-card-trigger` removed from
    independent absolute position (`position: absolute; bottom; right; opacity: 0`)
    and moved inside `.partner-card-overlay` as `align-self: flex-start` flex child.
  - Stale `.modal-images`, `.modal-image-primary`, `.modal-image-secondary` rules
    (from the old single shared modal) removed.
  - `.modal-close` changed from `position: absolute; top; right` to in-flow flex
    item inside new `.modal-header { display: flex; justify-content: flex-end }`.
    Eliminates overlap between close button and the image grid, which previously
    caused the secondary image's hover state to intercept pointer events and block
    the button click.
  - `.modal-hero-image` — full-width portrait container, `aspect-ratio: 4/5`,
    `overflow: hidden`, `picture` child `position: absolute; inset: 0`, `img`
    `object-fit: cover; object-position: top center`. At 640 px modal width this
    yields an 800 px tall image frame, showing ~83% of the 2:3 source portrait
    (head to shin — reveals court gowns and official attire).
  - `.modal-lower` — two-column grid (`1fr 1.5fr`, `gap: --space-4`,
    `align-items: start`, `padding: --space-4`) containing `.modal-secondary-image`
    and `.modal-body`.
  - `.modal-secondary-image` — portrait container `aspect-ratio: 2/3`,
    `border-radius: --radius-sm`, `picture` and `img` filled via `position: absolute;
    inset: 0`, `object-position: top center`.
  - `.modal-body` padding set to `0` (padding now owned by `.modal-lower`).
  - `.modal-bio` changed from single `<p>` with `white-space: pre-line` to
    `<div class="modal-bio">` containing `<p>` children; CSS updated to target
    `.modal-bio p` with `margin-bottom: var(--space-3)` and `last-child { margin-bottom: 0 }`.
- `css/components.css` — `.partner-card-overlay h3` and `.partner-card-overlay p`
  renamed from `.team-card-overlay` equivalents.
- `js/modal.js` — complete rewrite. Old approach: single shared modal populated
  dynamically via JS with `modal.style.display` inline styles. New approach: three
  fully static modals; JS only opens / closes by toggling `.open` class and managing
  `aria-hidden` + `aria-expanded`. No inline styles anywhere. `openModal(modalEl,
  triggerEl)` adds `.open`, removes `aria-hidden`, sets `aria-expanded="true"`,
  focuses `.modal-close` after 50 ms. `closeModal()` removes `.open`, restores
  `aria-hidden="true"`, returns focus to trigger. `trapFocus()` cycles Tab /
  Shift+Tab within the open modal. Event listeners on `.partner-card-trigger`
  (stopPropagation, opens modal by `data-partner` → `#modal-[id]`), `.partner-card`
  (whole-card mobile tap), `.modal-close` (one per modal), `.modal-overlay` (one
  per modal), `document keydown` (Escape + Tab).
- `js/main.js` — reveal observer selector updated: `.team-card` → `.partner-card`.

---

## [0.9.0] — 2026-05-15

### Contact & Footer sections

#### Added
- `index.html` `#contact` — replaced placeholder `<h2>` with two-part structure.
  Part A: `.cta-bar` div containing `<h2 id="contact-heading">` "Secure your legal
  standing." (preserves `aria-labelledby` reference on the section), a `<p>` with
  the 2-business-day / confidentiality copy, and a `.cta-actions` div with two
  anchors — `.btn-primary` (`href="mailto:kasongo@sukwanamweemba.com"`, "Schedule a
  Consultation") and `.btn-secondary` (`href="tel:+260764242506"`, "Call Us Now").
  Part B: `.contact-grid` div with four `.contact-block` children — "Visit Us"
  (address element with 4 `<p>` lines: No. 9 Katopola Road, Off Great East Road,
  Rhodes Park Lusaka, Zambia), "Call Us" (mobile `+260 764 242 506` with `.contact-label`
  "Mobile", landline `0211 257 220` with `.contact-label` "Landline"), "Email Us"
  (`kasongo@sukwanamweemba.com` with `.contact-label` "Managing Partner",
  `theophilus@sukwanamweemba.com` with `.contact-label` "Associate"), "Office Hours"
  (Monday–Friday, 08:00–17:00 CAT, `.contact-label` "Central Africa Time (UTC+2)").
  Followed by a `.contact-map` div containing an `<iframe>` with the real Google Maps
  embed for the firm's Rhodes Park address (coordinates −15.402990, 28.303048),
  `width="100%"`, `height="300"`, `allowfullscreen`, `loading="lazy"`,
  `referrerpolicy="no-referrer-when-downgrade"`, descriptive `title` attribute —
  no inline `style` attribute (border rule lives in `components.css`).
- `index.html` `#footer` — replaced placeholder `<h2>` with `.footer-grid` div
  containing four columns: `.footer-brand` (`<p class="footer-logo">` "S.M & Partners",
  p "Advocates and Commissioners for Oaths", p "Established 1992"); `.footer-links`
  "Practice Areas" (`<h4>`, `<nav aria-label="Footer practice areas">` with `<ul>`
  of 5 `<li><a href="#services">` links: Conveyancing, Dispute Resolution, Legal
  Drafting, Advisory Services, Company Secretarial); `.footer-links` "The Firm"
  (`<h4>`, `<nav aria-label="Footer firm links">` with `<ul>` of 5 `<li>` links:
  Our History → `#evolution`, Meet the Team → `#team`, Our Standards → `#excellence`,
  Notable Clients → `#endeavors`, Testimonials → `#testimonials`); `.footer-contact`
  (`<h4>` "Contact", p "No. 9 Katopola Road, Rhodes Park", p with `tel:` anchor,
  p with `mailto:` anchor for Managing Partner). Followed by `.footer-bottom` div
  with two `<p>` elements: copyright line and "Advocates and Commissioners for Oaths
  — Lusaka, Zambia".
- `css/layout.css` — `#contact` section (`background-color: --colour-bg`, no
  section-level padding — sub-elements own their spacing); `.contact-grid` mobile-first
  grid (`1fr` → `repeat(2, 1fr)` at 768px → `repeat(4, 1fr)` at 1024px, `--space-8`
  gap, `max-width: 1200px; margin: 0 auto; padding: --space-16 5%`); `.contact-map`
  (`margin-top: --space-8`, `padding: 0` for full-bleed map); `#footer`
  (`background-color: --colour-text` — dark `#2a2a2a` bg); `.footer-grid` identical
  responsive grid to `.contact-grid` (`1fr` → 2 → 4 cols); `.footer-bottom` (flex,
  `justify-content: space-between`, `align-items: center`, `flex-wrap: wrap`,
  `gap: --space-3`, `max-width: 1200px; margin: 0 auto; padding: --space-6 5%`,
  `border-top: 1px solid rgba(255,255,255,0.1)`; stacks to `flex-direction: column;
  text-align: center` on mobile, resets to `row; text-align: left` at 1024px+).
- `css/components.css` — `.cta-bar` (`background-color: --colour-accent`,
  `text-align: center`, `padding: --space-16 5%`); `.cta-bar h2` (Playfair Display
  900, `clamp(1.8rem, 3vw, 2.5rem)`, `--colour-primary`); `.cta-bar p` (Inter 300,
  `--text-body`, `--colour-primary`, opacity 0.85, `--space-2` margin-top);
  `.cta-actions` (flex, `--space-4` gap, centred, flex-wrap wrap, `--space-6`
  margin-top); `.btn-primary` (`display: inline-block`, `--colour-primary` bg,
  `--colour-white` text, `padding: 18px 45px`, Inter 700, 0.8rem, uppercase,
  letter-spacing 0.15em, `border: none`, `border-radius: 0`, `--transition-base`;
  hover: `--colour-primary-dark` bg, `scale(1.04)`; focus-visible: 2px
  `--colour-primary` outline, 3px offset); `.btn-secondary` (transparent bg,
  `border: 2px solid --colour-primary`, `--colour-primary` text, `padding: 16px 45px`,
  same typography as primary, `border-radius: 0`; hover: `--colour-primary` bg,
  `--colour-white` text, `scale(1.04)`; focus-visible: matching ring); `.contact-block`
  (initial opacity 0 + translateY(40px), `.visible` transition `--duration-slow ease-out`;
  `nth-child(2/3/4)` stagger delays 0.1s / 0.2s / 0.3s); `.contact-block h3`
  (Playfair Display 400, 1.2rem, `--colour-primary`, `--space-3` margin-bottom);
  `.contact-block address` (`font-style: normal`); `.contact-block p` (Inter 300,
  0.95rem, `--colour-text`, line-height 1.6, `--space-1` margin-bottom);
  `.contact-block a` (`--colour-primary`, no underline; hover: `--colour-primary-dark`,
  underline); `.contact-label` (Inter 300, 0.75rem, `--colour-text`, opacity 0.6,
  `--space-2` margin-bottom); `.contact-map iframe` (display block, 100% width,
  300px height, `border: none`, `filter: grayscale(30%)`); `#footer` colour
  `rgba(255,255,255,0.7)` as base text; `.footer-brand` (initial opacity 0 +
  translateY(40px), `.visible` transition); `.footer-logo` (Playfair Display 400,
  1.2rem, `--colour-white`, opacity 1, letter-spacing 0.2em, uppercase,
  `--space-2` margin-bottom); `.footer-brand p` (Inter 300, 0.85rem, line-height 1.6);
  `.footer-links h4`, `.footer-contact h4` (Inter 700, 0.75rem, uppercase,
  letter-spacing 0.15em, `--colour-white`, opacity 1, `--space-3` margin-bottom);
  `.footer-links ul` (list-style none, no padding/margin); `.footer-links li`
  (`--space-1` margin-bottom); `.footer-links a` (Inter 300, 0.85rem, `--colour-white`,
  opacity 0.7, no underline; hover: `--colour-accent`, opacity 1);
  `.footer-contact p` (Inter 300, 0.85rem, `--space-1` margin-bottom);
  `.footer-contact a` (`--colour-accent`, no underline; hover: opacity 0.8);
  `.footer-bottom p` (Inter 300, 0.75rem, opacity 0.5).

#### Changed
- `js/main.js` — reveal observer selector extended to also observe `.contact-block`
  and `.footer-brand`, so both animate in (opacity 0 → 1, translateY(40px) → 0)
  when entering the viewport.
- `index.html` `.contact-map iframe` — replaced placeholder approximate coordinates
  with the verified Google Maps embed URL for Sukwana Mweemba & Partners (place ID
  `0x19408b004f5d8297:0x6c597ace87d593cb`, coordinates −15.402990, 28.303048).

---

## [0.8.0] — 2026-05-15

### Testimonials section

#### Added
- `index.html` `#testimonials` — replaced placeholder `<h2>` with full two-mode
  structure: shared `.testimonials-header` (h2 + intro p "Trusted by individuals
  and institutions across Zambia.") as the first child of the section; a
  `.testimonials-desktop` wrapper containing `.typewriter-stage` (with
  `.typewriter-quote` holding `.typewriter-text` + blinking `.typewriter-cursor`,
  `.typewriter-attribution` holding `.attribution-name` + `.attribution-role`,
  and `.typewriter-progress` with 3 `.progress-dot` buttons indexed 0–2 and
  aria-labelled "Testimonial N"); a `.testimonials-mobile` wrapper containing a
  `.marquee-track` with 6 `.testimonial-card` articles (2 identical sets of 3
  for seamless loop — the duplicate set carries `aria-hidden="true"` so screen
  readers do not read each quote twice). Each card has a `<blockquote>` and a
  `<footer>` with `.attribution-name` + `.attribution-role`. Three testimonials
  authored: David Phiri (Lusaka Property Holdings), Mutale Banda (Copperbelt
  Logistics Ltd), Christine Zulu (Zambian Financial Services Group). Section's
  `aria-labelledby="testimonials-heading"` now resolves to the visible shared
  h2. Legacy `.testimonials-mobile-header` div retained in DOM with `display:none`
  globally — superseded by `.testimonials-header`.
- `css/layout.css` — `#testimonials` section (position relative, padding per spec
  convention: mobile `--space-12 --space-4`, tablet `--space-16 5%`, wide `--space-16
  --space-8` with max-width 1200px centred); `.testimonials-header` (text-align
  center, `padding: --space-8 --space-4 0`, `margin-bottom: --space-6`) with h2
  (Playfair Display 900, `--text-h2`, `--colour-primary`, line-height 1.1) and
  p (Inter 300, `--colour-text`, opacity 0.8, `margin-top: --space-2`);
  `.testimonials-mobile-header` globally hidden; mobile-first `.testimonials-desktop
  { display: none }` and `.testimonials-mobile { display: block; overflow: hidden }`;
  `.marquee-track` (flex, `width: max-content`, `padding: --space-4 0`, `animation:
  marquee 30s linear infinite`, hover pauses animation); `.testimonial-card`
  (280px wide, `flex-shrink: 0`, `margin-right: --space-4` rather than `gap` so
  `translateX(-50%)` lands on a clean loop boundary, padding `--space-6`, bg
  `--colour-bg`, `border-top: 3px solid --colour-accent`, `--radius-md`,
  `--shadow-card`); `.testimonial-card blockquote` (Playfair Display italic 400,
  1rem, line-height 1.6, `--colour-primary`, `margin: 0 0 --space-3 0`);
  `.testimonial-card footer` (flex column, 2px gap); card `.attribution-name`
  (Inter 700, 0.85rem) and `.attribution-role` (Inter 300, 0.8rem, opacity 0.7);
  desktop (1024px+) overrides: `#testimonials { min-height: 200vh }` to give the
  sticky child enough scroll distance to complete the typewriter cycle,
  `.testimonials-mobile { display: none }`, `.testimonials-desktop` becomes
  `position: sticky; top: 0; height: 100vh; display: flex; align-items: center;
  justify-content: center`; `.typewriter-stage` (max-width 800px, centred,
  `padding: --space-8`, text-align center); `.typewriter-quote` (relative,
  `margin-bottom: --space-6`); `.typewriter-attribution` (opacity 0 → 1 on
  `.visible`, `--space-4` margin-top, transition `--duration-base` `--ease-smooth`);
  `.typewriter-progress` (flex, `--space-3` gap, centred, `--space-6` margin-top);
  `.progress-dot` (8×8px, `--radius-full`, no border, padding 0, bg `--colour-border`,
  cursor pointer, transition `--duration-base` `--ease-smooth`); `.progress-dot.active`
  (bg `--colour-primary`); `.progress-dot:focus-visible` (2px `--colour-accent` ring,
  3px offset).
- `css/components.css` — `.typewriter-text` (Playfair Display italic 400,
  `clamp(1.5rem, 3vw, 2.2rem)`, line-height 1.5, `--colour-primary`);
  `.typewriter-cursor` (`margin-left: 2px`, Inter 300, `--colour-accent`,
  `animation: typewriterCursor 1s step-end infinite`); `.typewriter-attribution
  .attribution-name` (block, Inter 700, 0.95rem, `--colour-text`);
  `.typewriter-attribution .attribution-role` (block, Inter 300, 0.85rem,
  `--colour-text`, opacity 0.7, `margin-top: 2px`); reduced-motion static
  fallback styles `.typewriter-quote-static` (margin-bottom `--space-6`, last
  child none) and `.typewriter-quote-static blockquote` (Playfair Display italic
  400, `clamp(1.25rem, 2.5vw, 1.8rem)`, line-height 1.5, `--colour-primary`,
  `margin: 0 0 --space-3 0`).
- `css/animations.css` — `typewriterCursor` keyframe (hard step at 50%:
  `opacity: 1 → 0`, 1s infinite) for the blinking cursor; reduced-motion block
  now sets `.typewriter-cursor { animation: none; opacity: 1 }`.
- `js/testimonials.js` — full `Testimonials` IIFE module (previously empty file):
  `TESTIMONIALS` data array (3 quotes with name + role); constants `DESKTOP_BP`
  (1024), `TYPE_INTERVAL` (40 ms/char), `HOLD_AFTER` (2500 ms), `RESIZE_DEBOUNCE`
  (250 ms); `getMode()` (desktop vs mobile by viewport width); `prefersReducedMotion()`
  matchMedia check; `clearTimers()` (cancels both `typeTimeout` and `advanceTimeout`);
  `updateDots(index)` (toggles `.active` per dot); `typeWriter(text, onComplete)`
  (appends one character every 40 ms via chained `setTimeout`); `playTestimonial(index)`
  (clears timers, resets attribution, updates dots, types quote, on completion
  populates name+role, adds `.visible` to attribution, holds 2500 ms, advances to
  next index modulo length); `renderStatic()` (reduced-motion fallback — replaces
  `.typewriter-stage` innerHTML with three static `.typewriter-quote-static` blocks);
  `initTypewriter()` (resolves DOM refs, returns early on reduced motion after
  rendering static, otherwise sets up one-shot `IntersectionObserver` at threshold
  0.3 on `#testimonials` to trigger first play, and click handlers on each
  `.progress-dot` for jump-to-index); `teardownTypewriter()` (clears timers,
  disconnects observer, resets text/attribution/dots, nulls cached refs);
  `setupForMode()` (desktop → init typewriter, mobile → no-op since pure CSS);
  `handleResize()` (250 ms debounced — if mode crossed the 1024 px boundary,
  teardown and re-setup); idempotent `init()` exposed publicly that calls
  `setupForMode()` and attaches a passive resize listener.

#### Fixed
- `css/animations.css` — reduced-motion block previously referenced a non-existent
  `.testimonial-track` selector; now correctly stops the marquee at `.marquee-track`.
  Inline doc comment for the `marquee` keyframe updated to match the implemented
  selector.

---

## [0.7.0] — 2026-05-14

### Standard of Excellence & Team sections

#### Added
- `index.html` `#excellence` — replaced placeholder `<h2>` with `.section-header`
  (h2 + intro p) and an `.excellence-grid` of 4 `.excellence-card` divs. Each card
  contains `.excellence-icon` (SVG placeholder), h3, `.excellence-rule` accent line,
  and a description p. Pillars: Turnaround Time (2 business days), Periodic Updates,
  Confidentiality, Transparent Billing.
- `index.html` `#team` — replaced placeholder `<h2>` with `.section-header` (h2 + p),
  a `.team-grid` of 3 `.team-card` divs (Kasongo Mweemba-Chileshe, Sukwana Lukangaba,
  Theophilus Gausi), a shared `#team-modal` dialog, and a `.team-gallery` strip of
  6 gallery figures. Each `.team-card` contains `.team-card-image`, `.team-card-overlay`
  (h3 + p), and a `.team-card-trigger` button. Modal contains `.modal-overlay`,
  `.modal-content` (close button, `.modal-images` with primary + secondary slots,
  `.modal-body` with h3, `.modal-title`, `.modal-rule`, `.modal-bio`). All card and
  gallery images use Picsum placeholder URLs (seeded for consistency) pending
  production assets; placeholder structure is WebP-ready — swapping to real images
  requires only updating `src` values and re-wrapping in `<picture>` elements.
- `css/variables.css` — `--colour-primary-overlay: rgba(133, 77, 79, 0.85)` for the
  team card hover gradient.
- `css/layout.css` — `#excellence` section (full-width `--colour-primary` bg,
  `--colour-white` text, section padding per spec convention); `.excellence-grid`
  (1fr mobile → `repeat(2, 1fr)` tablet, `--space-8` gap, `max-width: 1200px`
  centred); `.excellence-card` (flex column, `--space-3` gap, initial opacity 0 +
  translateY(40px), `.visible` transition); `.excellence-icon` (40×40px placeholder);
  `.excellence-rule` (40px × 2px, `--colour-accent` bg, `--space-1` margin-top,
  flex-shrink 0); stagger delays on cards 2–4; `#team` section (bg `--colour-bg`,
  padding per spec); `.team-grid` (1fr mobile → `repeat(2, 1fr)` tablet → `repeat(3, 1fr)`
  desktop, `--space-6` gap, `max-width: 1100px`); lone last-card tablet centering
  via `.team-card:last-child:nth-child(odd)` (`grid-column: 1/-1`, `justify-self: center`,
  `width: 50%`) reset to `auto` at desktop; `.team-card` (position relative, overflow
  hidden, cursor pointer, opacity 0 + translateY(40px) initial, `.visible` transition,
  `aspect-ratio: 3/4` at 1024px+); nth-child stagger delays (0.1s, 0.2s); `.team-card-image`
  (`aspect-ratio: 3/4` mobile → `aspect-ratio: unset; height: 100%` desktop);
  `.team-card-overlay` (position absolute, bottom 0, gradient from transparent to
  `--colour-primary-overlay`, `translateY(100%)` default → `translateY(0)` on hover,
  `--transition-slow`); `.team-card-trigger` (position absolute bottom-right, transparent
  bg, 1px white border, opacity 0 → 1 on hover, Inter 700 uppercase, focus-visible
  ring `--colour-accent`); full modal layout (`#team-modal` position fixed inset 0
  z-index `--z-modal`, display none → flex on `.open`; `.modal-overlay` absolute
  inset 0 `--colour-overlay`; `.modal-content` position relative, max-width 640px,
  `--radius-lg`, `--shadow-modal`, max-height 90vh overflow-y auto, opacity 0 +
  scale(0.95) → opacity 1 + scale(1) on `.open`, transition `--duration-base`
  `--ease-spring`; `.modal-close` absolute top-right, hover `--colour-primary`;
  `.modal-images` 2-col grid `--space-2` gap; `.modal-image-primary/secondary`
  aspect-ratio 4/3, `--colour-border` bg, overflow hidden; secondary opacity 0.4 →
  1 on hover; `.modal-body` padding 0 `--space-4 --space-4`; `.modal-body h3`
  Playfair Display 400 `--text-h3` `--colour-primary`; `.modal-title` Inter 500
  0.9rem opacity 0.7; `.modal-rule` 40×2px `--colour-accent`; `.modal-bio` Inter 300
  0.95rem line-height 1.7 `white-space: pre-line`); `.team-gallery` (padding
  `--space-12` top, centred); `.gallery-track` (flex, `--space-3` gap, overflow-x auto,
  scrollbar hidden webkit / thin firefox); gallery `figure` (200×200px flex-shrink 0,
  `--radius-sm`, `scale(1.03)` on hover).
- `css/components.css` — `#excellence .section-header h2/p` white overrides (section
  sits on `--colour-primary` bg); `.excellence-card h3` (Playfair Display 400, 1.2rem,
  `--colour-white`); `.excellence-card p` (Inter 300, opacity 0.9); `.team-card-overlay
  h3` (Inter 700, `--text-body-md`, `--colour-white`); `.team-card-overlay p`
  (Inter 300, `--colour-white`, opacity 0.9).
- `js/modal.js` — full `Modal` IIFE module: `PARTNERS` data object with all three
  partners (Kasongo Mweemba-Chileshe, Sukwana Lukangaba, Theophilus Gausi) including
  full multi-paragraph bios and Picsum placeholder image URLs; `buildPicture()` helper
  (detects full URLs vs local basenames; URL → plain `<img>`, basename → `<picture>`
  with WebP source + jpg fallback); `populateModal()`; `openModal()` (sets display
  flex, RAF → `.open` class, 50ms setTimeout → `closeBtn.focus()`, aria-expanded);
  `closeModal()` (removes `.open`, 400ms timeout → `display: none`, returns focus to
  trigger); `trapFocus()` (Tab/Shift+Tab cycles within `.modal-content`); `onKeyDown()`
  (Escape + Tab); event listeners on all `.team-card-trigger` (stopPropagation),
  `.team-card` (mobile tap), `.modal-close`, `.modal-overlay`, `document keydown`.

#### Changed
- `js/main.js` — reveal observer selector extended from `.ledger-card, .service-card`
  to also observe `.excellence-card` and `.team-card`.

---

## [0.6.0] — 2026-05-14

### Notable Endeavors & Services sections

#### Added
- `index.html` `#endeavors` — replaced placeholder `<h2>` with `.section-header`
  containing `<h2 id="endeavors-heading">` and a `.ledger-grid` of 9 `.ledger-card`
  divs (Bank of Zambia, Zambia National Commercial Bank Plc, Barclays Bank Zambia Plc,
  Stanbic Bank Zambia Limited, Banc ABC Zambia, Eco Bank Limited, Zambia National
  Building Society, Zambia Sugar Plc, First National Bank Zambia Limited).
- `index.html` `#services` — replaced placeholder `<h2>` with `.section-header`
  (h2 + subtitle p) and a `.services-grid` of 5 `.service-card` divs, each containing
  a `.service-icon` placeholder, h3, and description p. Services: Conveyancing,
  Dispute Resolution, Legal Drafting, Advisory Services, Company Secretarial.
- `css/layout.css` — `#endeavors` section padding (mobile `--space-12 0`, tablet+
  `--space-16 0`; horizontal padding removed for full-bleed grid); `#endeavors .section-header`
  scoped horizontal padding (`--space-4` mobile, `5%` tablet+) to keep heading aligned
  with page content while grid bleeds to viewport edge; `.ledger-grid` base grid
  (`1fr` mobile → `repeat(2, 1fr)` tablet → `repeat(3, 1fr)` desktop, `2px` gap,
  `background-color: --colour-border`, `width: 100%`, `margin: 0`); `#services`
  section padding (same spec convention); `.section-header` centering rules
  (text-align center, `--space-8` margin-bottom); `.section-header p` max-width
  600px centered with `--space-2` top margin; `.services-grid` (`1fr` mobile →
  `repeat(2, 1fr)` tablet → `repeat(3, 1fr)` desktop, `--space-4` gap); both sections
  constrained to `max-width: 1200px; margin: 0 auto` at 1200px+.
- `css/components.css` — `.section-header h2` (Playfair Display 900, `--text-h2`,
  `--colour-primary`, line-height 1.1); `.section-header p` (Inter 300, `--colour-text`,
  opacity 0.8); `.ledger-card` (bg `--colour-bg`, padding 50px 20px, text-align center,
  `transition: --transition-slow`, cursor pointer, initial opacity 0 + translateY(40px));
  `.ledger-card.visible` (opacity 1, translateY(0)); `.ledger-card h3` (Inter 500, 1rem,
  letter-spacing 0.05em, `--colour-primary-dark`); `.ledger-card:hover` (bg `--colour-accent`,
  h3 colour `--colour-primary`); `.service-card` (bg `--colour-bg`, padding `--space-6`,
  border-left 3px solid `--colour-primary`, `--shadow-card`, `transition: --transition-base`,
  initial opacity 0 + translateY(40px)); `.service-card.visible` (opacity 1, translateY(0));
  `nth-child(2–5)` stagger delays (0.1s increments); `.service-card:hover` (border-left
  transitions to `--colour-accent`, translateY(-4px), `transition: --transition-base`
  resets stagger delay to 0 for hover-in); `.service-icon` (32×32px, `--colour-accent`
  bg, `--radius-sm`); `.service-card h3` (Playfair Display 400 italic, `--text-h3`,
  `--colour-primary`, `--space-2` margin-bottom); `.service-card p` (Inter 300, 0.9rem,
  `--colour-text`, line-height 1.6).
- `js/main.js` — general reveal `IntersectionObserver` (threshold 0.15) inside
  `DOMContentLoaded` that observes all `.ledger-card` and `.service-card` elements,
  adds `.visible` on intersection, then unobserves (one-shot per element).

---

## [0.5.0] — 2026-05-13

### Timeline fixes & rule clarification

#### Fixed
- `index.html` — wrapped the three `.timeline-item` divs in a new `.timeline-items`
  container. `.timeline-line` and `#timeline-progress` remain direct children of
  `.timeline-track`. `nth-child` counts now resolve against `.timeline-items` only,
  making the alternating layout immune to any future sibling elements added to
  `.timeline-track`.
- `css/layout.css` — updated alternating selectors from `.timeline-item:nth-child(even)`
  to `.timeline-items .timeline-item:nth-child(even)` (and matching `.timeline-content`
  rule). Alternation is unchanged: 1992 (child 1, odd) row, 2010 (child 2, even)
  row-reverse, 2017 (child 3, odd) row.

#### Changed
- `CLAUDE.md` — Rule 6 updated to clarify the `element.style.height` exception for
  scroll-driven progress bars set inside `requestAnimationFrame` callbacks, so future
  sessions do not re-flag the timeline progress bar as a violation.

---

## [0.4.0] — 2026-05-13

### Evolution (Timeline) section

#### Added
- `js/timeline.js` — `Timeline` IIFE module: caches DOM refs on init (`#evolution`,
  `#timeline-progress`, all `.timeline-item` nodes); `IntersectionObserver` with
  `threshold: 0.3` adds `.active` class to each `.timeline-item` on enter then
  unobserves; `requestAnimationFrame`-throttled scroll listener drives
  `#timeline-progress` height as a percentage of section scroll depth;
  `prefers-reduced-motion` check — if true, sets all items active immediately and
  skips the scroll listener entirely. Exposes `{ init }`.

#### Changed
- `index.html` `#evolution` — replaced placeholder `<h2>` with full timeline
  structure: visually-hidden `<h2 id="evolution-heading">` (preserves heading
  hierarchy and `aria-labelledby` reference); `.timeline-track` wrapper containing
  `.timeline-line` rail, `#timeline-progress` bar, and three `.timeline-item` divs
  (1992 / 2010 / 2017) each with `.timeline-year` and `.timeline-content` (h3 + p).
- `css/layout.css` — added `#evolution` section padding (mobile `--space-12`,
  tablet/desktop `--space-16`); `.timeline-track` (position relative, max-width
  1200px, centred); `.timeline-line` and `#timeline-progress` (position absolute,
  left 20px mobile → left 50% + translateX(-50%) desktop); `.timeline-item` mobile
  base (flex column, `--space-8` gap, opacity 0 + translateY(100px)); `.timeline-item.active`
  (opacity 1, translateY(0), transition via `--duration-slow` / `--ease-weighted`);
  desktop (1024px+) alternating row layout with `nth-child(even)` row-reverse;
  `.visually-hidden` utility class.
- `css/components.css` — added `#evolution` section colours (`--colour-primary` bg,
  `--colour-white` text); `.timeline-line` (`rgba(247,249,249,0.2)` background);
  `#timeline-progress` (`--colour-accent` background, `--shadow-glow` box-shadow);
  `.timeline-year` (Playfair Display 900, `--text-year`, transparent fill,
  `-webkit-text-stroke: 1px --colour-accent`, opacity 0.4); `.timeline-content h3`
  (Playfair Display 400, 2rem, `--colour-white`, `--space-2` margin-bottom);
  `.timeline-content p` (Inter 300, `--text-body`, opacity 0.9).

---

## [0.3.0] — 2026-05-13

### Navigation & Hero sections

#### Added
- `css/layout.css` — box-sizing reset, body base styles (font-family, background, colour,
  line-height, overflow-x hidden, font-smoothing); `#nav` fixed glassmorphism layout
  (flexbox space-between, 1.5rem 5% padding, rgba background, backdrop-filter blur 12px,
  border-bottom, z-index from variable scale); `#nav.scrolled` state (blur 20px,
  box-shadow); `#hero` 100vh flexbox centred layout with relative positioning.
- `css/components.css` — `.logo` (Inter 700, letter-spacing 0.25em, uppercase,
  `--colour-primary`); `.location-label` (Inter 300, 0.7rem, `--colour-primary-dark`,
  opacity 0.8); `.hero-title` (Playfair Display 900, `--text-hero`, `--colour-primary`,
  line-height 0.9, `slideUp` entrance animation); `.hero-title span` (italic weight 400,
  `--colour-accent`, text-shadow from spec); `.scroll-indicator` (absolute bottom 40px,
  Inter 700, 0.7rem, uppercase, letter-spacing 0.2em, `pulse` animation infinite).
- `js/main.js` — `DOMContentLoaded` listener that calls guarded stubs for
  `Timeline.init`, `Testimonials.init`, and `Modal.init`; IIFE nav scroll handler
  that toggles `.scrolled` on `#nav` at 80px threshold using `requestAnimationFrame`
  throttling and a passive scroll listener.

#### Changed
- `index.html` `#nav` — replaced placeholder `<h2>` with `.logo` span
  ("S.M & Partners") and `.location-label` span ("Rhodes Park, Lusaka").
- `index.html` `#hero` — replaced placeholder `<h1>` with `h1.hero-title` containing
  "Pristine Counsel." and a `<span>` for "Proven Legacy." (italic Playfair per spec);
  added `.scroll-indicator` div with text "Explore the Firm".

---

## [0.2.0] — 2026-05-13

### CSS foundation & HTML skeleton

#### Added
- `css/variables.css` — all CSS custom properties from UI_SPEC.md: 8 colour tokens,
  2 font-family tokens, 9-step type scale, 9 spacing tokens, 3 easing curves,
  5 duration tokens, 2 transition shorthands, 2 border tokens, 4 border-radius tokens,
  3 shadow tokens, 4 breakpoint reference tokens, 6 z-index levels.
- `css/animations.css` — 8 `@keyframes` blocks: `slideUp`, `sectionReveal`,
  `timelineItem`, `progressBar`, `pulse`, `marquee`, `modalOpen`, `cardHover`;
  full `prefers-reduced-motion` override block at bottom of file per WCAG 2.1 §2.3.3.
- `css/main.css` — 4 `@import` statements in correct load order: `variables.css`,
  `animations.css`, `layout.css`, `components.css`.

#### Changed
- `index.html` — replaced initial boilerplate with full production skeleton:
  SEO title and 157-character meta description (includes "law firm Lusaka",
  "conveyancing", "commercial litigation"); Open Graph block (`og:type`, `og:url`,
  `og:title`, `og:description`, `og:image`); `LegalService` Schema.org JSON-LD
  with firm name, telephone, email, founding date, address, areaServed, and
  5-item practice area `hasOfferCatalog`; Google Fonts preconnect + Inter/Playfair
  Display stylesheet link; single `<link>` to `css/main.css` (removed individual
  partial links); 10 section shells in scroll order (`#nav`, `#hero`, `#evolution`,
  `#endeavors`, `#services`, `#excellence`, `#team`, `#testimonials`, `#contact`,
  `#footer`) with semantic elements and `aria-labelledby` wiring; script tags for
  all 4 JS modules at end of `<body>`.

---

## [0.1.0] — 2026-05-13

### Project scaffold

#### Added
- `index.html` — HTML5 boilerplate with charset, viewport meta, placeholder
  `<link>` tags for all CSS partials, and `<script>` tags for all JS modules.
- `CLAUDE.md` — project brief, absolute rules, section map, animation behaviour
  rules, performance budget, SEO/schema requirements, accessibility requirements,
  testing workflow, and content reference index.
- `docs/UI_SPEC.md` — visual design specification v1.0: colour palette, typography,
  spacing system, transitions & easing, borders & shadows, component specifications,
  breakpoints, z-index scale, animation catalogue, reduced-motion overrides,
  image conventions, and design aesthetic summary.
- Directory structure: `assets/images/`, `assets/icons/`, `css/`, `js/`,
  `tests/`, `scripts/` with all named empty files per project spec.

---

[Unreleased]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.16.0...HEAD
[0.16.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.15.0...v0.16.0
[0.15.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.14.1...v0.15.0
[0.14.1]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.14.0...v0.14.1
[0.14.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.13.0...v0.14.0
[0.13.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.12.0...v0.13.0
[0.12.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/wmweemba/sukwana_mweemba_website/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/wmweemba/sukwana_mweemba_website/releases/tag/v0.1.0
