# UI_SPEC.md — Sukwana Mweemba & Partners
## Visual Design Specification v1.1

> **This is the single source of truth for all visual decisions.**  
> All CSS must derive from these values. Never override or deviate without updating this document first.

---

## 1. Colour Palette

All colours are defined as CSS custom properties in `variables.css`.

| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Burnt Rose | `#854d4f` | `--colour-primary` | Primary brand, headings, nav logo, CTA backgrounds |
| Deep Rose | `#824e4e` | `--colour-primary-dark` | Hover states, secondary text, active states |
| Pale Sky | `#b8d0db` | `--colour-accent` | Accent highlights, timeline progress bar, button borders |
| Bright Snow | `#f7f9f9` | `--colour-bg` | Page background, card backgrounds |
| Silver | `#c6c5c2` | `--colour-border` | Dividers, grid gaps, input borders |
| Dark | `#2a2a2a` | `--colour-text` | Body copy, paragraph text |
| White | `#ffffff` | `--colour-white` | Text on dark backgrounds, modal overlays |
| Overlay | `rgba(42,42,42,0.75)` | `--colour-overlay` | Modal backdrop, dark overlays |
| Accent Tint | `rgba(184, 208, 219, 0.12)` | `--colour-accent-tint` | Resting background wash for Notable Endeavors cards |
| Nav Glass (light) | `rgba(247, 249, 249, 0.85)` | `--nav-bg-light` | Nav background over `data-nav-theme="light"` sections — see §6 Navigation |
| Nav Glass (dark) | `rgba(133, 77, 79, 0.55)` | `--nav-bg-dark` | Nav background over `data-nav-theme="dark"` sections — see §6 Navigation |
| Gold *(provisional)* | `#d4a24a` | *(none — inline literal in the nav SVG, not yet tokenised)* | Nav pillar logo mark **only**. **Provisional, pending final logo resolution** — do not treat as a locked brand token or reuse it elsewhere. |

### Colour Usage Rules

- **Primary on white:** Burnt Rose `#854d4f` — always passes 4.5:1 contrast on `--colour-bg`
- **Body text on white:** Dark `#2a2a2a` — do not lighten below `#555555` for body text
- **Never use Pale Sky as text colour on white** — it fails contrast. Use it only as background or decorative element.
- **Timeline section background:** `--colour-primary` (Burnt Rose) with `--colour-white` text
- **CTA / Booking bar background:** `--colour-accent` (Pale Sky) with `--colour-primary` text

---

## 2. Typography

### Font Families

```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

Google Fonts import (in `<head>` of `index.html`):
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&family=Playfair+Display:ital,wght@0,400;0,900;1,400&display=swap" rel="stylesheet">
```

### Type Scale

| Token | Size | Font | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `--text-hero` | `clamp(3rem, 8vw, 6rem)` | Display | 900 | 0.9 | Hero headline |
| `--text-h1` | `clamp(2.5rem, 5vw, 4rem)` | Display | 900 | 1.0 | Section hero titles |
| `--text-h2` | `clamp(1.8rem, 3vw, 2.5rem)` | Display | 900 | 1.1 | Section headings |
| `--text-h3` | `1.5rem` | Display | 400 italic | 1.2 | Card titles, modal headings |
| `--text-year` | `clamp(5rem, 9vw, 9rem)` | Display | 900 | 1 | Timeline year numerals |
| `--text-body` | `1rem` | Body | 300 | 1.6 | Body copy paragraphs |
| `--text-body-md` | `1rem` | Body | 500 | 1.6 | Emphasis within body |
| `--text-label` | `0.75rem` | Body | 700 | 1.4 | Nav links, button text, labels |
| `--text-caption` | `0.7rem` | Body | 300 | 1.5 | Location labels, sub-captions |

### Typography Rules

- **H1 appears once per page** — in the hero section only
- **Playfair Display** is reserved for headings, section titles, timeline years, and the hero statement. Never use it for body copy or UI labels.
- **Inter 300** for all body paragraphs — the lightness creates contrast against bold headings
- **Letter spacing:** Navigation and button labels use `letter-spacing: 0.15em` with `text-transform: uppercase`
- **Italic Playfair** (`font-style: italic; font-weight: 400`) is used for the hero subtitle line ("Proven Legacy.")

---

## 3. Spacing System

Based on a `0.5rem` (8px) base unit.

```css
--space-1:  0.5rem;   /*  8px — tight internal padding */
--space-2:  1rem;     /* 16px — component padding */
--space-3:  1.5rem;   /* 24px — small gaps */
--space-4:  2rem;     /* 32px — medium gaps */
--space-6:  3rem;     /* 48px — section sub-spacing */
--space-8:  4rem;     /* 64px — component spacing */
--space-12: 6rem;     /* 96px — section internal padding (mobile) */
--space-16: 8rem;     /* 128px — section internal padding (tablet+) */
--space-24: 12rem;    /* 192px — hero vertical rhythm, timeline gaps */
```

### Section Padding Convention
- **Mobile:** `padding: var(--space-12) var(--space-4)`
- **Tablet (≥ 768px):** `padding: var(--space-16) 5%`
- **Desktop (≥ 1200px):** `padding: var(--space-16) var(--space-8)` with `max-width: 1200px; margin: 0 auto`

---

## 4. Transitions & Easing

```css
--ease-weighted:  cubic-bezier(0.23, 1, 0.32, 1);   /* Primary — weighted deceleration */
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);      /* Secondary — material standard */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring — modal open, card pop */

--duration-fast:   0.2s;   /* Hover states, focus rings */
--duration-base:   0.4s;   /* Button transitions, nav changes */
--duration-slow:   0.8s;   /* Section reveals, timeline items */
--duration-hero:   1.2s;   /* Hero entrance animation */
--duration-type:   0.05s;  /* Per-character typewriter interval */

--transition-base: all var(--duration-base) var(--ease-smooth);
--transition-slow: all var(--duration-slow) var(--ease-weighted);
```

---

## 5. Borders & Shadows

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   16px;
--radius-full: 9999px;

--border-thin:   1px solid var(--colour-border);
--border-medium: 2px solid var(--colour-border);

--shadow-card:  0 2px 20px rgba(42, 42, 42, 0.08);
--shadow-modal: 0 20px 60px rgba(42, 42, 42, 0.25);
--shadow-glow:  0 0 15px rgba(184, 208, 219, 0.5);   /* Pale Sky glow on timeline bar */
```

---

## 6. Component Specifications

### Navigation

- `position: fixed`, full width, `z-index: var(--z-nav)` (1000), `display: flex`, `justify-content: space-between`
- Base background: `var(--nav-bg-light)` with `backdrop-filter: blur(12px)`
- Bottom border: `var(--border-thin)`; padding `1.5rem 5%`
- Wordmark (`.logo`): Inter 700, `--text-label`, `letter-spacing: 0.25em`, uppercase
- Location label (`.location-label`): Inter 300, `--text-caption` (0.7rem), `opacity: 0.8`
- Pillar logo mark (`.nav-brand-mark`): inline SVG, gold `#d4a24a` (provisional — see §1)

**Scroll state — `.scrolled`** (added by `main.js` when `scrollY > 80px`)
- Increases blur to `20px` and adds `var(--shadow-card)`. Governs **blur/shadow only**.

**Adaptive theme — `.nav-on-light` / `.nav-on-dark`**

The nav recolours to stay legible over whatever section sits directly behind it.

- Every top-level `<section>` and the `<footer>` carries a `data-nav-theme` attribute:
  - `dark` → `#hero`, `#evolution`, `#excellence`, `#footer`
  - `light` → `#endeavors`, `#services`, `#team`, `#testimonials`, `#contact`
- A single `IntersectionObserver` in `main.js` watches a 1px detection band at the nav's lower edge (`rootMargin` derived from `nav.offsetHeight`, recomputed on resize). Whichever section sits in the band sets the theme. Resolved on initial page load — no scroll event required.
- `.nav-on-light`: background `var(--nav-bg-light)`; wordmark `--colour-primary`; location label `--colour-primary-dark` (their default colours).
- `.nav-on-dark`: background `var(--nav-bg-dark)`; wordmark **and** location label both `--colour-white`.
- `background-color` transitions over `--duration-base` on `#nav`; `color` over `--duration-base` on `.logo` / `.location-label`.
- The two classes are mutually exclusive and compose **independently** of `.scrolled` — no shared properties (theme owns background + text colour; `.scrolled` owns blur + shadow). One does not replace the other.
- **The gold pillar logo mark does not participate in the theme** — its colour is fixed in both `.nav-on-light` and `.nav-on-dark`.

### Hero Section

Full-viewport Burnt Rose stage (`min-height: 100vh`, centred copy) layered over several decorative elements. Mobile-first; padding and decorative scale step up at 768px.

- **Background:** `--colour-primary` (Burnt Rose) — **not** `--colour-bg`. `overflow: hidden`.
- **Noise overlay (`#hero::before`):** inline fractal-noise SVG (`feTurbulence`, `baseFrequency 0.9`, 4 octaves) tiled at `256px`, element `opacity: 0.6` (the SVG's own rect is `0.04`), `pointer-events: none` — a faint tooth over the flat rose.
- **Eyebrow (`.hero-eyebrow`):** Inter 700, `0.65rem`, `letter-spacing: 0.35em`, uppercase, `--colour-accent`.
- **Headline (`.hero-title`, the page's single `<h1>`):** Playfair Display 900, `clamp(2.4rem, 5vw, 4.8rem)`, `line-height: 0.93`, `--colour-white`. The two `<span>` lines ("Sukwana Mweemba" and "Proven Legacy.") are `font-style: italic`, weight 400, `--colour-accent`. `.hero-title-line1` is `white-space: nowrap`.
- **Divider (`.hero-divider`):** centred flex row — two Pale-Sky hairlines (`max-width: 80px`, `1px`) flanking a 5px diamond node (`.hero-divider-mark`, rotated 45°). The same hairline + diamond motif is reused by `.section-seam` at the hero → Evolution join.
- **Tagline (`.hero-tagline`):** Inter 300, `0.85rem`, `letter-spacing: 0.08em`, `line-height: 1.8`, Snow at reduced alpha.
- **CTA pair (`.hero-actions`):** stacked on mobile, switches to a row at 768px. Deliberately distinct from the light-ground contact-section buttons.
  - **Primary (`.hero-btn-primary`):** solid `--colour-white` background, `--colour-primary` text, Inter 700, `--text-label`, `letter-spacing: 0.15em`, uppercase, padding `0.85rem 1.8rem`, sharp corners. Hover: background → `--colour-accent`, `translateY(-2px)`.
  - **Ghost (`.hero-btn-ghost`):** transparent, `--colour-white` text, Inter 500, same padding, `1px` Snow-alpha border. Hover: border → `--colour-accent`, faint Pale-Sky background wash, `translateY(-2px)`.
- **Founding stamp (`.year-watermark`, "1992"):** Playfair 900, `clamp(4rem, 8vw, 8rem)`, outlined (`color: transparent`, `-webkit-text-stroke: 1px` Pale-Sky-alpha), bottom-left. Hidden on mobile; revealed at 768px+ where there's room. Decorative, `pointer-events: none`.
- **Pillar watermark (`.hero-mark`):** ghosted SVG pillar, bottom-right, `opacity: 0.08`, slow `markDrift` drift (20s, infinite alternate), `pointer-events: none`.
- **Scroll indicator (`.scroll-indicator`):** `position: absolute`, `bottom: 2.5rem`, horizontally centred (`left: 50%; transform: translateX(-50%)`), `z-index: var(--z-card)`, Inter 700, `0.62rem`, `letter-spacing: 0.3em`, uppercase, Snow at `0.5` alpha, `pulse` animation.

**Decorative opacity values.** The hero reuses a small set of translucent Pale Sky / Snow washes rather than minting one variable per number: Pale-Sky hairlines at `0.4` alpha (divider + seam), diamond marks at `0.7` opacity, top-left accent rules at `0.4` opacity. These remain inline literals; genuinely single-use values (watermark stroke `0.15`, pillar mark `0.08`, ghost border `0.35`) are intentionally **not** tokenised.

**Entrance (`fadeUp`, staggered).** The resting state above is fully visible. The hidden-start + staggered `fadeUp` (eyebrow `0.3s`, headline `0.5s` at `--duration-hero`, divider `1s`, tagline `1.1s`, actions `1.3s`) is layered **only** inside `@media (prefers-reduced-motion: no-preference)` — see §10 for the standard.

### Timeline Section

- Background: `--colour-primary` (Burnt Rose)
- Text: `--colour-white`
- Centre rail: `1px`, `rgba(247, 249, 249, 0.2)`
- Progress bar: `4px`, `--colour-accent`, `box-shadow: var(--shadow-glow)`, height driven by scroll %
- Year numerals: `--text-year`, `color: transparent`, `-webkit-text-stroke: 1px var(--colour-accent)`, `opacity: 0.4`
- Timeline item entrance: `translateY(100px) → 0`, `opacity: 0 → 1`, `var(--duration-slow)`, `var(--ease-weighted)`
- Alternating layout: odd items — year left, content right. Even items — year right, content left.
- Mobile: all items stack vertically, rail moves to left edge at `20px`

### Ledger Grid (Notable Endeavors)

- Section background: `--colour-bg` (plain — no canvas or imagery)
- Grid: `repeat(4, 1fr)` desktop (1024px+), `repeat(2, 1fr)` tablet (768px+), `1fr` mobile
- Gap: `var(--space-3)` (24px) — each card carries its own border, so there is no shared-gridline technique
- Eight cards total (Bank of Zambia, Zambia National Commercial Bank Plc, Barclays Bank Zambia Plc, Zambia National Building Society, Eco Bank Limited, Stanbic Bank Zambia Limited, ZDA-Henan Guoji, Meanwood Finance Corporation Limited)

**Card rest state**
- Background: `--colour-accent-tint`
- Border: `var(--border-thin)` (1px, `--colour-border`) with the left edge overridden to `3px solid var(--colour-primary)`
- Padding: `50px 20px`
- Ghost numeral (`01`–`08`, matching card order): absolute-positioned top-left (`top: var(--space-1)`, `left: var(--space-2)`), `var(--font-display)`, `3.5rem`, weight `900`, `color: transparent`, `-webkit-text-stroke: 1px var(--colour-accent)`, `opacity: 0.4` — same ghosted-stroke technique as the timeline year numerals
- Name (`h3`): Inter 500, `1rem`, `letter-spacing: 0.05em`, `--colour-primary-dark`
- Underline (`.ledger-underline`): `2px` tall, full width, `--colour-accent`, collapsed via `transform: scaleX(0)` from the left
- Description (`.ledger-brief`): clipped from view via `clip-path: inset(0 100% 0 0)` — present in the layout (no `display: none`/`height: 0`) so no other element shifts when it reveals

**Card hover / `.active` (touch-tap) / `:focus-visible` state — "document stamp wipe"**
- Background transitions to `--colour-primary` (Burnt Rose), `var(--duration-base)`
- Name and description text transition to `--colour-white`, `var(--duration-base)` `var(--ease-smooth)`
- Underline expands to `scaleX(1)`, `var(--duration-slow)` `var(--ease-weighted)`
- Description reveals via `clip-path: inset(0 0 0 0)`, `var(--duration-slow)` `var(--ease-weighted)` with a `0.1s` delay so the underline leads the wipe
- Underline and ghost numeral keep their resting Pale Sky colour (`--colour-accent`) in this state — it already reads clearly against Burnt Rose, matching the timeline section's existing Burnt Rose / Pale Sky pairing
- `.active` is toggled by `js/endeavors.js` on click and on `Enter`/`Space` keydown, giving touch and keyboard users the same reveal as `:hover`

### Services Section

- Background: `--colour-bg`
- Layout: `repeat(3, 1fr)` desktop, `repeat(2, 1fr)` tablet, `1fr` mobile
- Each card: left border `3px solid var(--colour-primary)`, padding `var(--space-6)`, `--shadow-card`
- Service icon: SVG, `32px`, `--colour-accent`
- Service title: `--text-h3`, `--colour-primary`
- Service description: Inter 300, `0.9rem`, `--colour-text`
- Card hover: border colour transitions to `--colour-accent`, slight `translateY(-4px)`

### Standard of Excellence Section

- Background: `--colour-primary`
- Text: `--colour-white`
- Layout: 2-column grid (desktop), stacked (mobile)
- Each pillar (Turnaround, Updates, Confidentiality, Billing): icon + heading + description
- Pillar heading: Playfair Display 400, `1.2rem`
- Accent line under heading: `2px solid var(--colour-accent)`, `width: 40px`

### Team Section

- Background: `--colour-bg`
- Partner cards: square-ish aspect ratio, overflow hidden
- Primary image: fills card, `object-fit: cover`
- Card overlay on hover: gradient from transparent to `rgba(133, 77, 79, 0.85)` rising from bottom
- Name + title appear on hover overlay: Inter 700 name, Inter 300 title
- Modal: centred, max-width `640px`, `--shadow-modal`, `--radius-lg`; `.modal-content` is the scroll container (`max-height: 90vh`, `overflow-y: auto`)
- Modal opens at `scale(0.95) → scale(1)`, `opacity: 0 → 1`, `var(--ease-spring)`
- Gallery strip: horizontal scroll, thumbnails `120px × 120px`, `--radius-sm`

**Modal scroll cue (`.modal-scroll-cue`)**

The tall hero portrait fills the modal viewport on open, leaving the name and bio below the fold with no signal that they're there. This cue provides a subtle, self-dismissing scroll affordance.

- A down-chevron SVG + an uppercase "Scroll" label, marked `aria-hidden="true"` (decorative), inserted as the **last child** of `.modal-content`.
- `position: sticky; bottom: 0` — pinned to the bottom edge of the scrollable `.modal-content`. A negative `margin-top` of `calc(-1 * var(--space-12))` cancels its own height so it overlays the content above rather than adding a trailing gap at the end of the scroll.
- **Scrim:** `linear-gradient(to top, var(--colour-overlay), transparent)` (reusing the existing `--colour-overlay` token) keeps the white chevron/label legible over any portrait. `pointer-events: none` so it never blocks scroll or interaction.
- **Fades out** (`opacity → 0` over `--duration-base`) once `.scrolled` is added to `.modal-content`. `modal.js` adds it on the first scroll past 16px — one-way, re-resolved on each reopen, so scrolling back to the top doesn't re-nag.
- **Auto-suppressed when content doesn't overflow:** on open, `modal.js` checks `scrollHeight > clientHeight + 16` and shows the cue only when there's something to scroll to.
- The chevron bob (`scrollCueBob`, **transform-only**) is gated under `@media (prefers-reduced-motion: no-preference)`. The cue's **own visibility is unconditional** — it still appears under reduced motion, just without the bob (and the fade collapses to instant via the global rule).

### Testimonials Section (Desktop — Typewriter)

- Background: `--colour-bg`
- Section is `position: sticky; top: 0` while active
- Quote: Playfair Display italic, `clamp(1.5rem, 3vw, 2.2rem)`, `--colour-primary`
- Cursor: blinking `|` character, `--colour-accent`
- Attribution: Inter 500, `0.9rem`, `--colour-text`, appears after quote completes
- Progress dots: one per testimonial, active dot fills with `--colour-primary`

### Testimonials Section (Mobile — Marquee)

- Single row of cards in infinite horizontal scroll
- Cards: `280px` wide, `--shadow-card`, `--radius-md`, padding `var(--space-6)`
- Quote text: Playfair Display italic, `1rem`
- Animation: `marquee 30s linear infinite`, pauses on hover
- Duplicate card list to ensure seamless loop

### CTA / Booking Bar

- Background: `--colour-accent` (Pale Sky)
- Text: `--colour-primary`
- Headline: Playfair Display 900, `clamp(1.8rem, 3vw, 2.5rem)`
- Sub-text: Inter 300, `1rem`, `opacity: 0.85`
- Button: background `--colour-primary`, text `--colour-white`, padding `18px 45px`, uppercase, `letter-spacing: 0.15em`, Inter 700, `0.8rem`
- Button hover: `scale(1.04)`, background `--colour-primary-dark`, `var(--transition-base)`
- Button: no border-radius (sharp corners reinforce authority aesthetic)

### Footer

- Background: `--colour-text` (Dark `#2a2a2a`)
- Text: `--colour-white` at `opacity: 0.7`
- Links: `--colour-accent` on hover
- Map embed: `height: 300px`, `border: none`, `filter: grayscale(30%)`
- Copyright: Inter 300, `0.75rem`, bottom of page

---

## 7. Breakpoints

```css
--bp-mobile:  375px;   /* Base — styles written for this first */
--bp-tablet:  768px;   /* @media (min-width: 768px) */
--bp-desktop: 1024px;  /* @media (min-width: 1024px) */
--bp-wide:    1200px;  /* @media (min-width: 1200px) — max content width */
```

---

## 8. Z-Index Scale

```css
--z-base:    1;
--z-card:    10;
--z-sticky:  50;
--z-nav:     1000;
--z-modal:   2000;
--z-overlay: 1999;
```

---

## 9. Animation Catalogue

| Name | Trigger | Effect | Duration | Easing |
|------|---------|--------|----------|--------|
| `fadeUp` | Page load (hero, staggered) | `translateY(20–50px) → 0` + `opacity 0 → 1` | `--duration-slow` / `--duration-hero` | `var(--ease-weighted)` |
| `sectionReveal` | IntersectionObserver | `translateY(40px) → 0` + `opacity` | `var(--duration-slow)` | `ease-out` |
| `timelineItem` | IntersectionObserver | `translateY(100px) → 0` + `opacity` | `var(--duration-slow)` | `var(--ease-weighted)` |
| `progressBar` | Scroll event | Height % relative to section scroll | `0.1s linear` | linear |
| `typewriter` | Scroll-lock active | Characters append one by one | `var(--duration-type)` per char | step |
| `marquee` | CSS only | `translateX(0) → translateX(-50%)` | `30s linear infinite` | linear |
| `modalOpen` | Click | `scale(0.95) → 1` + `opacity` | `var(--duration-base)` | `var(--ease-spring)` |
| `pulse` | CSS only | `opacity: 0.4 → 1 → 0.4` | `2s infinite` | ease-in-out |
| `markDrift` | CSS only | Slow positional drift of the hero pillar watermark | `20s infinite alternate` | ease-in-out |
| `cardHover` | CSS hover | `translateY(-4px)` + shadow increase | `var(--duration-fast)` | `var(--ease-smooth)` |
| `scrollCueBob` | CSS, no-preference only | Team-modal scroll-cue chevron bob `translateY(0 → 30% → 0)` | `1.6s infinite` | `var(--ease-smooth)` |
| `ledgerBriefReveal` | CSS hover / `:focus-visible` / `.active` | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | `var(--duration-slow)` | `var(--ease-weighted)` |

> **Note:** `clip-path` does not trigger layout reflow and is therefore performance-safe despite not being literally `transform` or `opacity`. This is a documented, approved exception specific to `.ledger-brief` — not a general license to use `clip-path` elsewhere without similarly documenting it here first.

---

## 10. Reduced Motion Standard

The site does **not** rely on a blanket reduced-motion override to switch animations off. It inverts the default so that motion is opt-in.

### The standard (reveal-on-load / reveal-on-scroll)

1. **Resting state is visible by default.** Every element that reveals on page load or on scroll-into-view sits at `opacity: 1; transform: none` **outside any media query**. Nothing is hidden in the base cascade.
2. **The hidden start + entrance is layered on top, only inside** `@media (prefers-reduced-motion: no-preference)`. That block sets the element's hidden start (`opacity: 0`, `translateY(...)`) and/or attaches the entrance animation.
3. **The reveal is triggered by IntersectionObserver-added classes** — `.visible` (general cards: `.partner-card`, `.excellence-card`, `.ledger-card`, `.service-card`, …) or `.active` (`.timeline-chapter`) — which set `opacity: 1; transform: none`. In motion-OK mode this transitions up from the hidden start; under reduced motion the hidden start never applied, so the class is a visual no-op and the element is simply already visible. The hero is the load-triggered variant (staggered `fadeUp`, gated the same way — see §6).

**Net effect:** a reduced-motion user — or *any* context where the entrance doesn't run (e.g. a cascade/import-order failure) — sees the fully rendered page, never a blank or stuck-hidden stage.

### Deprecated pattern — do not reintroduce

The earlier approach — resting at `opacity: 0` and adding a `@media (prefers-reduced-motion: reduce)` rule to force `opacity: 1` back — is **deprecated**. With partials imported in a fixed order, a later-imported rule at equal specificity could re-assert the hidden state, so the reduce override did not reliably win the cascade and elements could stay invisible. Visible-by-default removes that failure mode at the source.

### Global reduce block (`animations.css`, must remain last in the file)

A universal duration collapse, plus a few `!important` overrides for continuously-running animations that a later import re-asserts at equal specificity:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .marquee-track     { animation: none !important; }          /* mobile testimonials marquee */
  .typewriter-cursor { animation: none !important; opacity: 1; }
  html               { scroll-behavior: auto !important; }
}
```

`!important` is reserved for exactly this case (CLAUDE.md §7): stopping an animation that a later-imported rule re-asserts at equal specificity. Transform/opacity-only transitions added since (nav adaptive theme, modal scroll-cue fade) need **no** special-casing — the universal `transition-duration: 0.01ms` collapses them to instant automatically, which is why neither shipped with a bespoke reduce override.

---

## 11. Image Conventions

| Type | Format | Max Size | Dimensions | Loading |
|------|--------|----------|-----------|---------|
| Hero background (if used) | WebP | 200KB | 1920×1080 | `eager` + `fetchpriority="high"` |
| Partner primary photo | WebP | 150KB | 600×700 | `lazy` |
| Partner modal secondary photo | WebP | 100KB | 800×600 | `lazy` |
| Gallery thumbnails | WebP | 50KB | 400×400 | `lazy` |
| Client logos (if added) | SVG | 10KB | — | inline |

All `<img>` tags must include:
- Descriptive `alt` text (never empty for content images)
- `width` and `height` attributes (prevents layout shift)
- `loading="lazy"` (except hero)

---

## Design Aesthetic Summary

**The guiding principle:** This site should feel like it was designed for a prestigious London or Johannesburg firm — but rooted firmly in Lusaka. The aesthetic is **refined authority** — not cold, not corporate-generic. The Burnt Rose palette gives warmth and distinctiveness. The Playfair Display typography signals legacy and trust. The scroll animations signal modernity without being frivolous.

**One word:** *Gravitas.*

Every design decision should ask: does this add or subtract from the feeling of gravitas? If it subtracts — remove it.
