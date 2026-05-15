/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — TEAM MODAL
   Opens/closes per-partner profile modals. Traps focus while open.
   All visual state via CSS classes. No inline styles.
   ============================================================ */

'use strict';

var Modal = (function () {

  var activeModal   = null;
  var activeTrigger = null;

  /* ----------------------------------------------------------
     FOCUS TRAP
     Keeps Tab cycling within the open modal's content panel.
     ---------------------------------------------------------- */
  function getFocusable(modalEl) {
    return Array.from(modalEl.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    ));
  }

  function trapFocus(event) {
    if (!activeModal) return;

    var focusable = getFocusable(activeModal);
    if (!focusable.length) return;

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (event.shiftKey) {
      /* Shift+Tab on first element → wrap to last */
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      /* Tab on last element → wrap to first */
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  /* ----------------------------------------------------------
     OPEN / CLOSE
     CSS handles all animation; JS only toggles the .open class
     and manages aria state + focus.
     ---------------------------------------------------------- */
  function openModal(modalEl, triggerEl) {
    activeModal   = modalEl;
    activeTrigger = triggerEl;

    modalEl.classList.add('open');
    modalEl.removeAttribute('aria-hidden');
    triggerEl.setAttribute('aria-expanded', 'true');

    /* Move focus into modal after transition begins */
    var closeBtn = modalEl.querySelector('.modal-close');
    setTimeout(function () { closeBtn.focus(); }, 50);
  }

  function closeModal() {
    if (!activeModal) return;

    activeModal.classList.remove('open');
    activeModal.setAttribute('aria-hidden', 'true');

    if (activeTrigger) {
      activeTrigger.setAttribute('aria-expanded', 'false');
      activeTrigger.focus();
    }

    activeModal   = null;
    activeTrigger = null;
  }

  /* ----------------------------------------------------------
     KEYBOARD HANDLER
     ---------------------------------------------------------- */
  function onKeyDown(event) {
    if (!activeModal) return;

    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'Tab') {
      trapFocus(event);
    }
  }

  /* ----------------------------------------------------------
     INIT
     ---------------------------------------------------------- */
  function init() {
    /* Trigger buttons — stopPropagation prevents card click from double-firing */
    document.querySelectorAll('.partner-card-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        var partnerId = btn.closest('.partner-card').dataset.partner;
        var modalEl   = document.getElementById('modal-' + partnerId);
        if (modalEl) openModal(modalEl, btn);
      });
    });

    /* Card click — whole card is tappable on mobile */
    document.querySelectorAll('.partner-card').forEach(function (card) {
      card.addEventListener('click', function () {
        var btn       = card.querySelector('.partner-card-trigger');
        var partnerId = card.dataset.partner;
        var modalEl   = document.getElementById('modal-' + partnerId);
        if (modalEl) openModal(modalEl, btn);
      });
    });

    /* Close buttons — one per modal */
    document.querySelectorAll('.modal-close').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    /* Overlay clicks — one per modal */
    document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
      overlay.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', onKeyDown);
  }

  return { init: init };

}());
