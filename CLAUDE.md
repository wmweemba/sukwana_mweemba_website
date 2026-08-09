# CLAUDE.md — Sukwana Mweemba & Partners Website

## Project Overview

A single-page, multi-section scrolling website for **Sukwana Mweemba & Partners**, a 32-year-old Lusaka law firm. The goal is a fast, lightweight, visually distinguished website that outclasses every other law firm site in Zambia through intentional scroll animations and refined design.

**Client:** Sukwana Mweemba & Partners — Advocates and Commissioners for Oaths  
**Location:** No. 9 Katopola Road, Rhodes Park, Lusaka  
**Contact:** kasongo@sukwanamweemba.com | theophilus@sukwanamweemba.com  
**Phone:** +260 764 242 506 | Landline: 0211 257 220  
**Stack:** Vanilla HTML5, CSS3, ES6+ JavaScript — NO frameworks, NO build tools  
**Deployment:** Coolify (single static frontend service)

---

## Project Structure

```
sukwana_mweemba_website/
├── index.html              ← Single entry point. All sections live here.
├── CLAUDE.md               ← This file. Read before every session.
├── docs/
│   └── UI_SPEC.md          ← Source of truth for ALL visual decisions.
├── assets/
│   ├── images/             ← WebP only. Optimised before use.
│   └── icons/              ← SVG only. Inline where possible.
├── css/
│   ├── main.css            ← Imports all partials in correct order.
│   ├── variables.css       ← ALL CSS custom properties defined here.
│   ├── animations.css      ← Keyframes, transitions, scroll effects.
│   ├── layout.css          ← Page structure, grid, section spacing.
│   └── components.css      ← Nav, cards, modals, buttons, forms.
├── js/
│   ├── main.js             ← Init, scroll listeners, shared utilities.
│   ├── timeline.js         ← Evolution section scroll-linked animation.
│   ├── testimonials.js     ← Desktop typewriter + mobile marquee logic.
│   └── modal.js            ← Team member modal open/close/trap focus.
├── tests/
│   ├── visual.spec.js      ← Playwright screenshot suite (3 viewports).
│   └── animations.spec.js  ← Playwright scroll + class assertion tests.
└── scripts/
    └── optimise-images.js  ← One-time Node script for WebP conversion.
```

---

## Absolute Rules — Never Break These

1. **No frameworks.** No React, Vue, jQuery, GSAP, or any external JS library. Vanilla only. Exception: Google Fonts CDN link is allowed.
2. **No inline styles.** All styling goes through CSS files. Never write `style=""` attributes in HTML.
3. **CSS custom properties only.** Never hardcode a colour, font, or spacing value. All values come from `variables.css`. If a value is not in `variables.css`, add it there first.
4. **One CSS file loads.** `main.css` imports all partials using `@import`. `index.html` only links to `main.css`.
5. **WebP images only.** Never reference `.jpg` or `.png` files directly. Use `<picture>` with WebP source and jpg/png fallback.
6. **No layout properties in animations.** Never animate `width`, `height`, `top`, `left`, `margin`, or `padding` via CSS transitions or keyframes — these trigger layout recalculation on every frame. Only animate `transform` and `opacity` for performance. Exception: setting `element.style.height` directly inside a `requestAnimationFrame` callback is acceptable for scroll-driven progress bars where no CSS transition is applied.
7. **Always include `prefers-reduced-motion`.** Every animation must have a corresponding `@media (prefers-reduced-motion: reduce)` override that disables or reduces it.
8. **Mobile first.** Write base styles for mobile, use `min-width` media queries to scale up. Never use `max-width` queries as the primary breakpoint.
9. **Semantic HTML.** Use correct elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`. No `<div>` where a semantic element exists.
10. **Every section needs an `id`.** All sections must have an `id` attribute for anchor navigation and JS targeting.
11. **No ES Modules.** This site is served over `file://` during local development with no dev server — `<script type="module">` fails under `file://` due to CORS. Use the IIFE module pattern instead: each JS file exposes a single `init()` via an IIFE, and `main.js` calls all inits after `DOMContentLoaded`.

---

## Page Sections (Scroll Order)

| # | Section ID | Description |
|---|-----------|-------------|
| 1 | `#nav` | Fixed glassmorphism navigation bar |
| 2 | `#hero` | Full-viewport hero with slide-up headline |
| 3 | `#evolution` | Scroll-linked timeline (1992, 2010, 2017) |
| 4 | `#endeavors` | Notable client ledger grid with hover states |
| 5 | `#services` | Five practice area cards |
| 6 | `#excellence` | Service delivery standards (48hr, confidentiality) |
| 7 | `#team` | Partner cards → modal + gallery |
| 8 | `#testimonials` | Desktop: typewriter scroll-lock. Mobile: marquee |
| 9 | `#contact` | CTA bar + contact details + Google Maps embed |
| 10 | `#footer` | Address, emails, phone, copyright |

---

## Animation Behaviour Rules

### Timeline Section (`timeline.js`)
- Use `IntersectionObserver` with `threshold: 0.3` to trigger `.active` on each `.timeline-item`
- The progress bar (`#timeline-progress`) height is driven by `window.scrollY` relative to the section's `offsetTop`
- Milestone entrance: `opacity: 0 → 1`, `translateY(100px) → 0`, duration `0.8s`, easing `cubic-bezier(0.23, 1, 0.32, 1)`
- Alternate items left/right on desktop, stack vertically on mobile

### Testimonials Section (`testimonials.js`)
- **Desktop (min-width: 1024px):** Section is `position: sticky`. JS locks scroll while typewriter effect runs character by character. On completion, a `data-complete` attribute is set and the next scroll event releases the section.
- **Mobile (max-width: 1023px):** Pure CSS infinite horizontal marquee. No JS involvement. Use `animation: marquee 30s linear infinite` on a duplicated list of cards.
- Detect mode by checking `window.innerWidth` on init and on `resize` (debounced).

### Team Modal (`modal.js`)
- On partner card click: fade in overlay, scale up modal from `0.95` to `1`
- Trap focus inside modal while open (`Tab` key cycles within modal)
- Close on: overlay click, `Escape` key, close button click
- Second photo revealed inside modal via a CSS transition on hover/tap

### General Reveal Animations
- All sections use `IntersectionObserver` to add `.visible` class when entering viewport
- Default entrance: `opacity: 0 → 1`, `translateY(40px) → 0`, `0.6s ease-out`
- Stagger child elements using `animation-delay` increments of `0.1s`

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance (mobile) | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Total page weight | < 1.5MB |
| Individual image (hero/team) | < 150KB WebP |
| Individual image (thumbnail) | < 50KB WebP |
| JavaScript total | < 30KB unminified |
| CSS total | < 20KB unminified |

---

## SEO & Schema Requirements

- `<title>`: `Sukwana Mweemba & Partners | Advocates — Lusaka, Zambia`
- `<meta name="description">`: 150–160 characters, include "law firm Lusaka", "conveyancing", "commercial litigation"
- Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- Schema.org JSON-LD block in `<head>` typed as `LegalService`:
  - Include `name`, `url`, `telephone`, `email`, `address` (with `addressLocality: "Lusaka"`), `areaServed`, `hasOfferCatalog` listing the 5 practice areas
  - Reference template (keep values in sync with the firm facts below and `docs/UI_SPEC.md`):
    ```html
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "Sukwana Mweemba & Partners",
      "description": "Advocates and Commissioners for Oaths. Established 1992. Specialists in Conveyancing, Commercial Litigation, and Advisory Services in Lusaka, Zambia.",
      "url": "https://sukwanamweemba.com",
      "telephone": "+260764242506",
      "email": "kasongo@sukwanamweemba.com",
      "foundingDate": "1992",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 9 Katopola Road, Off Great East Road",
        "addressLocality": "Rhodes Park, Lusaka",
        "addressCountry": "ZM"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Zambia"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Legal Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Conveyancing" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dispute Resolution" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Legal Drafting" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Advisory Services" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Company Secretarial" } }
        ]
      }
    }
    </script>
    ```
- All images must have descriptive `alt` text
- Heading hierarchy must be correct: one `<h1>` per page, logical `<h2>` → `<h3>` nesting

---

## Accessibility Requirements

- Colour contrast ratio ≥ 4.5:1 for all body text
- All interactive elements must be keyboard navigable
- Focus states must be visible (never `outline: none` without a custom replacement)
- Modal must trap focus and return focus to trigger element on close
- Marquee animation must pause on `prefers-reduced-motion`
- All form elements (if added later) must have associated `<label>` elements

---

## Testing Workflow

After each significant build session, run Playwright tests:

```bash
npx playwright test tests/visual.spec.js      # Screenshot 3 viewports
npx playwright test tests/animations.spec.js  # Scroll behaviour assertions
```

Screenshots save to `/tests/screenshots/`. Review before committing.

---

## Content Reference Files

| File | Purpose |
|------|---------|
| `docs/UI_SPEC.md` | Colours, typography, spacing, component patterns |
| Firm Profile PDF | Source of truth for all copy, client names, dates, services |

**Key firm facts to use verbatim:**
- Founded: 1992 (as Mweemba Chashi and Partners)
- Managing Partner: Mrs. Kasongo Mweemba-Chileshe (since April 2017)
- Associate: Mr. Theophilus Gausi (since January 2020)
- Turnaround time: 2 business days standard
- Address: No. 9 Katopola Road, Off Great East Road, Rhodes Park, Lusaka

---

## What NOT to Do

- Do not install npm packages or create a `package.json` (except for the one-time image optimisation script and Playwright)
- Do not create a bundler config (no Webpack, Vite, Parcel)
- Do not use CSS preprocessors (no Sass, Less)
- Do not add a CMS or backend
- Do not modify `UI_SPEC.md` — read it, never write to it
- Do not use `localStorage` or `sessionStorage`
- Do not add cookie banners or tracking scripts
