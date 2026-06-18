# UI_SPEC.md — Sukwana Mweemba & Partners
## Visual Design Specification v1.0

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

- `position: fixed`, full width, `z-index: 1000`
- Background: `rgba(247, 249, 249, 0.85)` with `backdrop-filter: blur(12px)`
- Bottom border: `var(--border-thin)`
- Padding: `1.5rem 5%`
- Logo: Inter 700, `letter-spacing: 0.25em`, uppercase, `--colour-primary`
- Location label: Inter 300, `0.7rem`, `--colour-primary-dark`, `opacity: 0.8`
- On scroll past 80px: add `.scrolled` class — increase blur to `20px`, add subtle `box-shadow`

### Hero Section

- Full viewport height (`100vh`), centred content
- Background: `--colour-bg`
- Headline: `--text-hero`, `--colour-primary`, `font-weight: 900`
- Subtitle line ("Proven Legacy."): `font-style: italic`, `font-weight: 400`, `--colour-accent`
- Subtitle text shadow: `1px 1px 0px var(--colour-border)`
- Entrance: `translateY(50px) → translateY(0)`, `opacity: 0 → 1`, `var(--duration-hero)`, `var(--ease-weighted)`
- Scroll indicator: `position: absolute`, `bottom: 40px`, Inter 700, `0.7rem`, uppercase, `letter-spacing: 0.2em`, pulse animation

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
- Modal: centred, max-width `640px`, `--shadow-modal`, `--radius-lg`
- Modal opens at `scale(0.95) → scale(1)`, `opacity: 0 → 1`, `var(--ease-spring)`
- Gallery strip: horizontal scroll, thumbnails `120px × 120px`, `--radius-sm`

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
| `slideUp` | Page load | `translateY(50px) → 0` + `opacity` | `var(--duration-hero)` | `var(--ease-weighted)` |
| `sectionReveal` | IntersectionObserver | `translateY(40px) → 0` + `opacity` | `var(--duration-slow)` | `ease-out` |
| `timelineItem` | IntersectionObserver | `translateY(100px) → 0` + `opacity` | `var(--duration-slow)` | `var(--ease-weighted)` |
| `progressBar` | Scroll event | Height % relative to section scroll | `0.1s linear` | linear |
| `typewriter` | Scroll-lock active | Characters append one by one | `var(--duration-type)` per char | step |
| `marquee` | CSS only | `translateX(0) → translateX(-50%)` | `30s linear infinite` | linear |
| `modalOpen` | Click | `scale(0.95) → 1` + `opacity` | `var(--duration-base)` | `var(--ease-spring)` |
| `pulse` | CSS only | `opacity: 0.4 → 1 → 0.4` | `2s infinite` | ease-in-out |
| `cardHover` | CSS hover | `translateY(-4px)` + shadow increase | `var(--duration-fast)` | `var(--ease-smooth)` |
| `ledgerBriefReveal` | CSS hover / `:focus-visible` / `.active` | `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)` | `var(--duration-slow)` | `var(--ease-weighted)` |

> **Note:** `clip-path` does not trigger layout reflow and is therefore performance-safe despite not being literally `transform` or `opacity`. This is a documented, approved exception specific to `.ledger-brief` — not a general license to use `clip-path` elsewhere without similarly documenting it here first.

---

## 10. Reduced Motion Overrides

Every animation must have a corresponding reduced-motion rule:

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all transforms and opacity transitions */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Marquee stops */
  .testimonial-track { animation: none; }
  /* Timeline items appear immediately */
  .timeline-item { opacity: 1; transform: none; }
}
```

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
