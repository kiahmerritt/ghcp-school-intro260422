(function () {
  'use strict';

  const STORAGE_KEY = 'kamiyama-lang';
  const SUPPORTED = ['ja', 'en'];

  /* ===== Language switcher ===== */
  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'ja';
    document.documentElement.lang = lang;

    const attr = 'data-' + lang;
    document.querySelectorAll('[' + attr + ']').forEach((el) => {
      const value = el.getAttribute(attr);
      if (value === null) return;
      // For <title> and <meta>, set content/text appropriately
      if (el.tagName === 'TITLE') {
        el.textContent = value;
      } else if (el.tagName === 'META') {
        el.setAttribute('content', value);
      } else {
        // Replace newline escapes with <br> for hero-title style content if needed
        el.innerHTML = value.replace(/\n/g, '<br>');
      }
    });

    // Update lang toggle active state
    document.querySelectorAll('.lang-opt').forEach((opt) => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* ignore */ }
  }

  function initLangToggle() {
    const toggle = document.getElementById('langToggle');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      // Allow clicking either the whole toggle or a specific option
      const optionEl = e.target.closest('.lang-opt');
      let next;
      if (optionEl && optionEl.dataset.lang) {
        next = optionEl.dataset.lang;
      } else {
        next = document.documentElement.lang === 'ja' ? 'en' : 'ja';
      }
      applyLang(next);
    });

    let saved = 'ja';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'ja'; } catch (_) { /* ignore */ }
    applyLang(saved);
  }

  /* ===== Header scroll state ===== */
  function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ===== Reveal on scroll ===== */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLangToggle();
    initHeaderScroll();
    initReveal();
  });
})();
