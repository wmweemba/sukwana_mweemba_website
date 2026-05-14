# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow `MAJOR.MINOR.PATCH` — while pre-launch, all releases are `0.x.0`.

---

## [Unreleased]

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

[Unreleased]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.6.0...HEAD
[0.6.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/your-org/sukwana-mweemba-website/releases/tag/v0.1.0
