/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — TESTIMONIALS MODULE
   Desktop: typewriter scroll-lock (JS-driven).
   Mobile:  pure-CSS infinite marquee (no JS involvement).
   Mode is decided by viewport width at the 1024px breakpoint
   and re-evaluated on debounced resize.
   ============================================================ */

'use strict';

const Testimonials = (function () {

  /* ----------------------------------------------------------
     DATA
     ---------------------------------------------------------- */
  const TESTIMONIALS = [
    {
      quote: "Sukwana Mweemba & Partners handled our conveyancing " +
             "with a level of thoroughness and speed we had not " +
             "encountered before. The two-day turnaround on our " +
             "mortgage documentation was exceptional.",
      name:  "David Phiri",
      role:  "Director, Lusaka Property Holdings"
    },
    {
      quote: "Their advisory work during our company restructuring " +
             "was invaluable. Mrs. Mweemba-Chileshe brought clarity " +
             "to complex regulatory questions and kept us informed " +
             "at every stage of the process.",
      name:  "Mutale Banda",
      role:  "CEO, Copperbelt Logistics Ltd"
    },
    {
      quote: "We have relied on this firm for our legal documentation " +
             "and dispute resolution needs for several years. The " +
             "standard of work and the confidentiality with which " +
             "matters are handled is consistently outstanding.",
      name:  "Christine Zulu",
      role:  "Head of Legal, Zambian Financial Services Group"
    }
  ];

  const DESKTOP_BP    = 1024;
  const TYPE_INTERVAL = 40;   /* ms per character */
  const HOLD_AFTER    = 2500; /* ms to hold completed quote */
  const RESIZE_DEBOUNCE = 250;

  /* ----------------------------------------------------------
     STATE
     ---------------------------------------------------------- */
  let initialised   = false;
  let currentMode   = null;
  let observer      = null;
  let typeTimeout   = null;
  let advanceTimeout = null;
  let resizeTimer   = null;

  /* Cached desktop DOM references — re-resolved on each setup */
  let sectionEl = null;
  let desktopEl = null;
  let textEl    = null;
  let attrEl    = null;
  let nameEl    = null;
  let roleEl    = null;
  let dots      = null;

  /* ----------------------------------------------------------
     UTILITIES
     ---------------------------------------------------------- */
  function getMode() {
    return window.innerWidth >= DESKTOP_BP ? 'desktop' : 'mobile';
  }

  function prefersReducedMotion() {
    return window.matchMedia &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function clearTimers() {
    if (typeTimeout)    { clearTimeout(typeTimeout);    typeTimeout    = null; }
    if (advanceTimeout) { clearTimeout(advanceTimeout); advanceTimeout = null; }
  }

  function updateDots(index) {
    if (!dots) return;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === index);
    }
  }

  /* ----------------------------------------------------------
     TYPEWRITER ENGINE
     ---------------------------------------------------------- */
  function typeWriter(text, onComplete) {
    let i = 0;
    textEl.textContent = '';

    function step() {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i += 1;
        typeTimeout = setTimeout(step, TYPE_INTERVAL);
      } else {
        typeTimeout = null;
        if (onComplete) onComplete();
      }
    }

    step();
  }

  function playTestimonial(index) {
    clearTimers();

    const t = TESTIMONIALS[index];

    /* Reset attribution before next quote begins */
    attrEl.classList.remove('visible');
    nameEl.textContent = '';
    roleEl.textContent = '';
    updateDots(index);

    typeWriter(t.quote, function onQuoteComplete() {
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      attrEl.classList.add('visible');

      advanceTimeout = setTimeout(function () {
        const next = (index + 1) % TESTIMONIALS.length;
        playTestimonial(next);
      }, HOLD_AFTER);
    });
  }

  /* ----------------------------------------------------------
     REDUCED-MOTION FALLBACK
     Replaces the typewriter stage with all three quotes stacked,
     fully visible. No animations, no cursor, no observer.
     ---------------------------------------------------------- */
  function renderStatic() {
    const stage = desktopEl.querySelector('.typewriter-stage');
    if (!stage) return;

    stage.innerHTML = '';

    TESTIMONIALS.forEach(function (t) {
      const block = document.createElement('div');
      block.className = 'typewriter-quote-static';

      const quote = document.createElement('blockquote');
      quote.textContent = t.quote;

      const attr = document.createElement('div');
      attr.className = 'typewriter-attribution visible';

      const name = document.createElement('span');
      name.className = 'attribution-name';
      name.textContent = t.name;

      const role = document.createElement('span');
      role.className = 'attribution-role';
      role.textContent = t.role;

      attr.appendChild(name);
      attr.appendChild(role);

      block.appendChild(quote);
      block.appendChild(attr);
      stage.appendChild(block);
    });
  }

  /* ----------------------------------------------------------
     DESKTOP SETUP
     ---------------------------------------------------------- */
  function initTypewriter() {
    sectionEl = document.getElementById('testimonials');
    desktopEl = sectionEl ? sectionEl.querySelector('.testimonials-desktop') : null;
    if (!desktopEl) return;

    textEl = desktopEl.querySelector('.typewriter-text');
    attrEl = desktopEl.querySelector('.typewriter-attribution');
    nameEl = desktopEl.querySelector('.typewriter-attribution .attribution-name');
    roleEl = desktopEl.querySelector('.typewriter-attribution .attribution-role');
    dots   = Array.prototype.slice.call(desktopEl.querySelectorAll('.progress-dot'));

    if (prefersReducedMotion()) {
      renderStatic();
      return;
    }

    /* Trigger first play when section enters viewport (one-shot) */
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          playTestimonial(0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(sectionEl);

    /* Progress dots — jump-to-index */
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        if (isNaN(idx)) return;
        playTestimonial(idx);
      });
    });
  }

  /* ----------------------------------------------------------
     TEARDOWN — used when crossing the desktop/mobile threshold
     ---------------------------------------------------------- */
  function teardownTypewriter() {
    clearTimers();

    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (textEl) textEl.textContent = '';
    if (attrEl) attrEl.classList.remove('visible');
    if (nameEl) nameEl.textContent = '';
    if (roleEl) roleEl.textContent = '';
    if (dots) dots.forEach(function (d) { d.classList.remove('active'); });

    sectionEl = desktopEl = textEl = attrEl = nameEl = roleEl = dots = null;
  }

  /* ----------------------------------------------------------
     MODE DISPATCH
     ---------------------------------------------------------- */
  function setupForMode() {
    currentMode = getMode();
    if (currentMode === 'desktop') {
      initTypewriter();
    }
    /* Mobile mode is pure CSS — nothing to wire up. */
  }

  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const newMode = getMode();
      if (newMode === currentMode) return;
      teardownTypewriter();
      setupForMode();
    }, RESIZE_DEBOUNCE);
  }

  /* ----------------------------------------------------------
     PUBLIC API
     ---------------------------------------------------------- */
  return {
    init: function () {
      if (initialised) return;
      initialised = true;
      setupForMode();
      window.addEventListener('resize', handleResize, { passive: true });
    }
  };

}());
