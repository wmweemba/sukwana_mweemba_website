/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — MAIN JS ENTRY POINT
   Initialises all modules and wires shared scroll behaviour.
   No frameworks. No inline styles. All visual state via CSS classes.
   ============================================================ */

'use strict';

/* ----------------------------------------------------------
   NAV SCROLL STATE
   Adds/removes .scrolled on #nav when window.scrollY crosses 80px.
   Uses requestAnimationFrame to throttle the scroll handler.
   ---------------------------------------------------------- */
(function initNavScroll() {
  const nav       = document.getElementById('nav');
  const THRESHOLD = 80;
  let   rafPending = false;

  function updateNavState() {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    rafPending = false;
  }

  window.addEventListener('scroll', function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateNavState);
    }
  }, { passive: true });

  /* Resolve correct state on page load (e.g. browser restores scroll position) */
  updateNavState();
}());

/* ----------------------------------------------------------
   SCROLL-TO-TOP BUTTON
   Shows #scroll-top once the user has scrolled past the full
   hero height. Uses requestAnimationFrame throttling.
   ---------------------------------------------------------- */
(function initScrollTop() {
  var btn  = document.getElementById('scroll-top');
  var hero = document.getElementById('hero');
  if (!btn || !hero) return;

  var rafPending = false;

  function updateVisibility() {
    if (window.scrollY > hero.offsetHeight) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    rafPending = false;
  }

  window.addEventListener('scroll', function () {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateVisibility);
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  });

  updateVisibility(); /* resolve initial state on load */
}());

/* ----------------------------------------------------------
   MODULE INIT
   Called once the DOM is fully parsed.
   Stubs are replaced when each module file is built.
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function init() {
  if (typeof Timeline !== 'undefined')     Timeline.init();
  if (typeof Testimonials !== 'undefined') Testimonials.init();
  if (typeof Modal !== 'undefined')        Modal.init();
  if (typeof Endeavors !== 'undefined')    Endeavors.init();

  /* ----------------------------------------------------------
     GENERAL REVEAL OBSERVER
     Adds .visible to .ledger-card and .service-card elements
     when they enter the viewport at threshold 0.15.
     Unobserves each element after it triggers (one-shot).
     ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.ledger-card, .service-card, .excellence-card, .partner-card, .contact-block, .footer-brand').forEach(function(el) {
    revealObserver.observe(el);
  });
});
