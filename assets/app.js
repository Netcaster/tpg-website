/* True Perspective Global — app.js */

(function () {
  'use strict';

  /* ── Theme Toggle ────────────────────────── */
  const DARK = 'dark';
  const LIGHT = 'light';
  const saved = localStorage.getItem('tpg-theme') || DARK;
  const html = document.documentElement;

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('tpg-theme', theme);
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.textContent = theme === DARK ? '☀' : '☾';
    });
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.title = theme === DARK ? 'Switch to Day Mode' : 'Switch to Night Mode';
    });
  }

  applyTheme(saved);

  document.addEventListener('click', function (e) {
    if (e.target.closest('.theme-toggle')) {
      const current = html.getAttribute('data-theme') || DARK;
      applyTheme(current === DARK ? LIGHT : DARK);
    }
  });

  /* ── Mobile Nav ─────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.querySelector('.mobile-close');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => mobileNav.classList.add('open'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* ── Nav scroll style ────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      const isLight = html.getAttribute('data-theme') === LIGHT;
      if (window.scrollY > 40) {
        nav.style.background = isLight ? 'rgba(255,255,255,0.99)' : 'rgba(6,13,11,0.99)';
      } else {
        nav.style.background = '';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Scroll fade-up ──────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Contact form ────────────────────────── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    });
  }
})();
