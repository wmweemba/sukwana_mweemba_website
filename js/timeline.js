/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — TIMELINE MODULE
   Manages the Evolution section scroll-linked progress bar
   and IntersectionObserver-driven item entrance animations.
   No frameworks. All visual state through CSS classes.
   ============================================================ */

'use strict';

var Timeline = (function () {

  /* -- Private state ---------------------------------------- */
  var section, progressBar, items;
  var rafPending = false;

  /* -- DOM cache -------------------------------------------- */
  function cacheDOM() {
    section     = document.getElementById('evolution');
    progressBar = document.getElementById('timeline-progress');
    items       = document.querySelectorAll('.timeline-item');
  }

  /* -- Reduced-motion shortcut ------------------------------ */
  function setAllActive() {
    items.forEach(function (item) {
      item.classList.add('active');
    });
    if (progressBar) {
      progressBar.style.height = '100%';
    }
  }

  /* -- Progress bar ----------------------------------------- */
  function updateProgress() {
    if (!section || !progressBar) return;

    /* offsetTop can be stale after layout changes; getBoundingClientRect is live */
    var sectionTop    = section.getBoundingClientRect().top + window.scrollY;
    var sectionHeight = section.offsetHeight;
    var scrolled      = window.scrollY - sectionTop;
    var percent       = Math.min(Math.max((scrolled / sectionHeight) * 100, 0), 100);

    progressBar.style.height = percent + '%';
    rafPending = false;
  }

  function onScroll() {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(updateProgress);
    }
  }

  /* -- IntersectionObserver ---------------------------------- */
  function initObserver() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); /* fire once then release */
        }
      });
    }, { threshold: 0.3 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* -- Public init ------------------------------------------ */
  function init() {
    cacheDOM();
    if (!section) return; /* section absent — nothing to do */

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      /* Show all items immediately; skip scroll listener */
      setAllActive();
      return;
    }

    initObserver();
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress(); /* resolve correct bar height on load */
  }

  return { init: init };

}());
