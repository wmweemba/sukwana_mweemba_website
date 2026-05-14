/* ============================================================
   SUKWANA MWEEMBA & PARTNERS — TEAM MODAL
   Opens/closes partner profile modal. Traps focus while open.
   All visual state via CSS classes. No inline styles in HTML.
   ============================================================ */

'use strict';

var Modal = (function () {

  /* ----------------------------------------------------------
     PARTNER DATA
     Source of truth for all modal content.
     Image paths are basenames — .webp/.jpg appended at runtime.
     ---------------------------------------------------------- */
  var PARTNERS = {
    kasongo: {
      name:  'Mrs. Kasongo Mweemba-Chileshe',
      title: 'Managing Partner',
      bio:   'Mrs. Kasongo Mweemba-Chileshe joined Sukwana Mweemba & Partners \
in March 2012 as an associate, bringing with her a sharp commercial \
acumen and a client-first approach that quickly distinguished her \
practice. Her work spans conveyancing, commercial litigation, and \
advisory services, with a particular focus on financial institutions \
and corporate clients. In April 2017 she was appointed Managing \
Partner, a role in which she has led the firm with quiet authority \
and an unwavering commitment to the standard of excellence the firm \
was founded upon.\n\nUnder her stewardship the firm has deepened its relationships with \
several of Zambia\'s leading financial institutions while maintaining \
the personal, attentive service that defines the practice. Mrs. \
Mweemba-Chileshe is a member of the Law Association of Zambia and \
is admitted to practise before all courts of the Republic of Zambia. \
She approaches every matter — regardless of scale — with the same \
rigour, discretion, and professional integrity.',
      primaryImage:   'https://picsum.photos/seed/kasongo/600/700',
      secondaryImage: 'https://picsum.photos/seed/kasongo2/600/700'
    },
    sukwana: {
      name:  'Mr. Sukwana Lukangaba',
      title: 'Managing Partner',
      bio:   'Mr. Sukwana Lukangaba joined the firm as an Associate on 1st \
October 2010, following a distinguished career in the civil service \
where he served as Legal Aid Counsel, Parliamentary Counsel, and \
Assistant Senior State Advocate over a combined period of five years. \
That public sector foundation gave him a breadth of legal exposure \
rarely found in private practice — from legislative drafting to \
frontline legal aid — and it continues to inform the depth and \
precision he brings to every matter.\n\nAppointed partner in December 2013, Mr. Lukangaba has been \
instrumental in building the firm\'s commercial and advisory \
practice. His experience spans corporate law, civil litigation, \
and legal drafting, with a particular strength in matters requiring \
careful navigation of Zambia\'s regulatory and legislative landscape. \
He is admitted to practise before all courts of the Republic of \
Zambia and is a member of the Law Association of Zambia.',
      primaryImage:   'https://picsum.photos/seed/sukwana/600/700',
      secondaryImage: 'https://picsum.photos/seed/sukwana2/600/700'
    },
    theophilus: {
      name:  'Mr. Theophilus Gausi',
      title: 'Associate',
      bio:   'Mr. Theophilus Gausi joined Sukwana Mweemba & Partners in \
January 2020, bringing with him seven years of experience in \
banking and financial law. From February 2013 to March 2018 he \
served as Legal Officer at First National Bank Zambia Limited, \
where he was one of two persons tasked with establishing the \
bank\'s Legal Department from the ground up — an experience that \
gave him rare institutional insight into the legal needs of \
Zambia\'s financial sector.\n\nAt Sukwana Mweemba & Partners, Mr. Gausi focuses on conveyancing, \
the creation and perfection of securities, commercial agreements, \
and company secretarial work. His banking background makes him \
particularly well-placed to advise financial institutions on \
security documentation and enforcement. He is admitted to practise \
before all courts of the Republic of Zambia and is a member of \
the Law Association of Zambia.',
      primaryImage:   'https://picsum.photos/seed/theophilus/600/700',
      secondaryImage: 'https://picsum.photos/seed/theophilus2/600/700'
    }
  };

  /* ----------------------------------------------------------
     DOM CACHE
     ---------------------------------------------------------- */
  var modal, overlay, content, closeBtn;
  var modalName, modalTitle, modalBio;
  var modalImagePrimary, modalImageSecondary;
  var activeTrigger = null;

  var TRANSITION_MS = 400; /* matches --duration-base: 0.4s */

  function cacheDOM() {
    modal               = document.getElementById('team-modal');
    overlay             = modal.querySelector('.modal-overlay');
    content             = modal.querySelector('.modal-content');
    closeBtn            = modal.querySelector('.modal-close');
    modalName           = document.getElementById('modal-name');
    modalTitle          = modal.querySelector('.modal-title');
    modalBio            = modal.querySelector('.modal-bio');
    modalImagePrimary   = modal.querySelector('.modal-image-primary');
    modalImageSecondary = modal.querySelector('.modal-image-secondary');
  }

  /* ----------------------------------------------------------
     HELPERS
     ---------------------------------------------------------- */

  /* Build an img element. When path is a full URL (placeholder), use it
     directly. When it is a local basename, append .jpg (production path). */
  function buildPicture(basePath, alt, width, height) {
    var isUrl  = basePath.indexOf('http') === 0;
    var img    = document.createElement('img');
    img.src    = isUrl ? basePath : basePath + '.jpg';
    img.alt    = alt;
    img.width  = width  || 800;
    img.height = height || 600;
    img.loading = 'lazy';

    if (isUrl) {
      return img;
    }

    /* Local path: wrap in <picture> with WebP source */
    var picture = document.createElement('picture');
    var source  = document.createElement('source');
    source.setAttribute('srcset', basePath + '.webp');
    source.setAttribute('type', 'image/webp');
    picture.appendChild(source);
    picture.appendChild(img);
    return picture;
  }

  function populateModal(partner) {
    modalName.textContent  = partner.name;
    modalTitle.textContent = partner.title;
    modalBio.textContent   = partner.bio;

    /* Clear previous partner's images before inserting new ones */
    modalImagePrimary.innerHTML   = '';
    modalImageSecondary.innerHTML = '';

    modalImagePrimary.appendChild(
      buildPicture(partner.primaryImage, partner.name + ' — primary photo', 800, 600)
    );
    modalImageSecondary.appendChild(
      buildPicture(partner.secondaryImage, partner.name + ' — secondary photo', 800, 600)
    );
  }

  /* Return all keyboard-focusable elements within .modal-content */
  function getFocusable() {
    return Array.from(content.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), ' +
      'select:not([disabled]), textarea:not([disabled]), ' +
      '[tabindex]:not([tabindex="-1"])'
    ));
  }

  /* ----------------------------------------------------------
     OPEN / CLOSE
     ---------------------------------------------------------- */

  function openModal(memberId) {
    var partner = PARTNERS[memberId];
    if (!partner) return;

    populateModal(partner);

    if (activeTrigger) {
      activeTrigger.setAttribute('aria-expanded', 'true');
    }

    /* Set display first so the element is in the layout tree,
       then add .open in the next frame so the CSS transition fires.
       Focus moves after 50ms to allow the transition to start. */
    modal.style.display = 'flex';
    requestAnimationFrame(function () {
      modal.classList.add('open');
      setTimeout(function () { closeBtn.focus(); }, 50);
    });
  }

  function closeModal() {
    modal.classList.remove('open');

    /* Wait for CSS transition to finish before hiding */
    setTimeout(function () {
      modal.style.display = 'none';
    }, TRANSITION_MS);

    if (activeTrigger) {
      activeTrigger.setAttribute('aria-expanded', 'false');
      activeTrigger.focus();
    }
    activeTrigger = null;
  }

  /* ----------------------------------------------------------
     FOCUS TRAP
     Keeps Tab cycling within .modal-content while open.
     ---------------------------------------------------------- */
  function trapFocus(event) {
    var focusable = getFocusable();
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

  function onKeyDown(event) {
    if (!modal.classList.contains('open')) return;

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
    cacheDOM();
    if (!modal) return;

    /* Trigger buttons — stopPropagation prevents card click from also firing */
    document.querySelectorAll('.team-card-trigger').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        activeTrigger = btn;
        openModal(btn.closest('.team-card').dataset.member);
      });
    });

    /* Card click — mobile UX: whole card is tappable, not just the button */
    document.querySelectorAll('.team-card').forEach(function (card) {
      card.addEventListener('click', function () {
        activeTrigger = card.querySelector('.team-card-trigger');
        openModal(card.dataset.member);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', onKeyDown);
  }

  return { init: init };

}());
