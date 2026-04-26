/* ═══════════════════════════════════════════════
   Dr. B. Srinuvasu Kumar — Portfolio Script
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM refs ───────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const navToggle   = document.getElementById('navToggle');
  const navLinks    = document.getElementById('navLinks');
  const navAnchors  = document.querySelectorAll('.nav-link');
  const backToTop   = document.getElementById('backToTop');
  const reveals     = document.querySelectorAll('.reveal');
  const sections    = document.querySelectorAll('section[id]');

  /* ── Sticky navbar background (already sticky, enhance shadow) ── */
  function onScroll() {
    const scrollY = window.scrollY;

    /* Navbar shadow on scroll */
    if (scrollY > 40) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    /* Back to top visibility */
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    /* Active nav link */
    highlightNav(scrollY);
  }

  /* ── Active nav highlight ────────────────────── */
  function highlightNav(scrollY) {
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === '#' + currentId) {
        anchor.classList.add('active');
      }
    });
  }

  /* ── Scroll reveal (Intersection Observer) ───── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          /* Stagger delay based on sibling position */
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(
                el => el.classList.contains('reveal')
              )
            : [];
          const i = siblings.indexOf(entry.target);
          const delay = Math.min(i * 80, 400);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => revealObserver.observe(el));

  /* ── Mobile nav toggle ──────────────────────── */
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    animateHamburger(isOpen);
  });

  function animateHamburger(open) {
    const spans = navToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  }

  /* ── Close mobile nav on link click ─────────── */
  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
      animateHamburger(false);
    });
  });

  /* ── Smooth scroll for all hash links ────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Passive scroll listener ─────────────────── */
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Init ─────────────────────────────────────── */
  onScroll();

})();
