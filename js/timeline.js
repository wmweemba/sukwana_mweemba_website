/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — TIMELINE MODULE
   Manages the Evolution section scroll-linked progress bar,
   IntersectionObserver-driven chapter entrance animations,
   and active-year highlighting as the bar passes each chapter.
   No frameworks. All visual state through CSS classes.
   ============================================================ */

'use strict';

var Timeline = (function () {

  /* -- Private state ---------------------------------------- */
  var section, progressBar, track, chapters;
  var rafPending = false;

  /* -- DOM cache -------------------------------------------- */
  function cacheDOM() {
    section     = document.getElementById('evolution');
    progressBar = document.getElementById('timeline-progress');
    track       = section && section.querySelector('.timeline-track');
    chapters    = document.querySelectorAll('.timeline-chapter');
  }

  /* -- Reduced-motion shortcut ------------------------------ */
  function setAllActive() {
    chapters.forEach(function (chapter) {
      chapter.classList.add('active');
      var yearEl = chapter.querySelector('.timeline-year');
      if (yearEl) yearEl.classList.add('active-year');
    });
    if (progressBar) progressBar.style.height = '100%';
  }

  /* -- Active year highlighting ----------------------------- */
  /*
   * Compares the current progress bar fill (0–100 %) against each
   * chapter's vertical range within the track.  Exactly one chapter
   * is active at a time: the one whose range brackets the current %.
   * getBoundingClientRect gives live positions that are scroll-
   * independent when compared relative to each other.
   */
  function updateActiveChapters(percent) {
    if (!track || !chapters.length) return;

    var trackHeight = track.offsetHeight;
    var trackRect   = track.getBoundingClientRect();

    chapters.forEach(function (chapter, index) {
      var yearEl = chapter.querySelector('.timeline-year');
      if (!yearEl) return;

      var chapterTopInTrack = chapter.getBoundingClientRect().top - trackRect.top;

      var nextTopInTrack;
      if (index < chapters.length - 1) {
        nextTopInTrack = chapters[index + 1].getBoundingClientRect().top - trackRect.top;
      } else {
        nextTopInTrack = trackHeight;
      }

      var activationPct   = (chapterTopInTrack / trackHeight) * 100;
      var deactivationPct = (nextTopInTrack    / trackHeight) * 100;

      if (percent >= activationPct && percent < deactivationPct) {
        yearEl.classList.add('active-year');
      } else {
        yearEl.classList.remove('active-year');
      }
    });
  }

  /* -- Progress bar ----------------------------------------- */
  /*
   * Maps scroll position to 0–100 % fill on #timeline-progress.
   *
   * 0 %  — section top aligned with viewport top
   *         (window.scrollY === sectionTop)
   * 100 % — section bottom aligned with viewport bottom
   *         (window.scrollY === sectionTop + sectionHeight − viewportHeight)
   *
   * Dividing by (sectionHeight − viewportHeight) rather than
   * sectionHeight fixes the previous bug where the bar hit 100 %
   * a full viewport-height early.
   *
   * element.style.height is set directly inside requestAnimationFrame;
   * no CSS transition is applied — this is the permitted exception in
   * CLAUDE.md Rule 6 for scroll-driven progress bars.
   */
  function updateProgress() {
    if (!section || !progressBar) return;

    var sectionTop     = section.getBoundingClientRect().top + window.scrollY;
    var sectionHeight  = section.offsetHeight;
    var viewportHeight = window.innerHeight;

    /* Scrollable distance until section bottom reaches viewport bottom.
       Clamp to 1 to guard against zero-division on very short sections. */
    var scrollable = Math.max(sectionHeight - viewportHeight, 1);
    var scrolled   = window.scrollY - sectionTop;
    var percent    = Math.min(Math.max((scrolled / scrollable) * 100, 0), 100);

    progressBar.style.height = percent + '%';
    updateActiveChapters(percent);

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

    chapters.forEach(function (chapter) {
      observer.observe(chapter);
    });
  }

  /* -- Public init ------------------------------------------ */
  function init() {
    cacheDOM();
    if (!section) return; /* section absent — nothing to do */

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      /* Show all chapters and years immediately; skip scroll listener */
      setAllActive();
      return;
    }

    initObserver();
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress(); /* resolve correct bar height on load */
  }

  return { init: init };

}());
