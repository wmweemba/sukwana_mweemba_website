# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow `MAJOR.MINOR.PATCH` — while pre-launch, all releases are `0.x.0`.

---

## [Unreleased]

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

[Unreleased]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/your-org/sukwana-mweemba-website/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/your-org/sukwana-mweemba-website/releases/tag/v0.1.0
