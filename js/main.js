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
   MODULE INIT
   Called once the DOM is fully parsed.
   Stubs are replaced when each module file is built.
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function init() {
  if (typeof Timeline !== 'undefined')     Timeline.init();
  if (typeof Testimonials !== 'undefined') Testimonials.init();
  if (typeof Modal !== 'undefined')        Modal.init();
});
