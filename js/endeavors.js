/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — ENDEAVORS MODULE
   Toggles .active on .ledger-card for touch and keyboard users,
   mirroring the :hover document stamp wipe reveal in components.css.
   No frameworks. All visual state through CSS classes.
   ============================================================ */

'use strict';

var Endeavors = (function () {

  function cacheDOM() {
    return document.querySelectorAll('.ledger-card');
  }

  function toggleActive(card) {
    card.classList.toggle('active');
  }

  function bindEvents(cards) {
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        toggleActive(card);
      });

      card.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleActive(card);
        }
      });
    });
  }

  function init() {
    var cards = cacheDOM();
    if (!cards.length) return;
    bindEvents(cards);
  }

  return { init: init };
}());
