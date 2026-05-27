/* ────────────────────────────────────────────────
   ReceptAI — Landing Scripts
   ──────────────────────────────────────────────── */

(() => {
  'use strict';

  // ─── Year in footer ──────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ─── Nav: sticky bg on scroll ────────────────
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ─── Nav: mobile burger ──────────────────────
  const burger = document.getElementById('burger');
  const menu = document.querySelector('.nav__menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Hero call timer (cosmetic loop) ─────────
  const callTime = document.getElementById('callTime');
  if (callTime) {
    let sec = 42;
    setInterval(() => {
      sec += 1;
      if (sec > 99) sec = 1;
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      callTime.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  // ─── FAQ: only one open at a time ────────────
  const items = document.querySelectorAll('.faq__item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // ─── Lead form: validate + fake submit ───────
  const form = document.getElementById('leadForm');
  const successBox = document.getElementById('leadSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();

      if (name.length < 2 || phone.replace(/\D/g, '').length < 9) {
        form.querySelectorAll('input').forEach((input) => {
          if (input.required && !input.checkValidity()) {
            input.focus();
          }
        });
        return;
      }

      // TODO: hook real backend / webhook here
      console.log('Lead submitted:', { name, phone, business: data.get('business') });

      form.querySelectorAll('input, button').forEach((el) => (el.disabled = true));
      if (successBox) successBox.hidden = false;
    });
  }

  // ─── Demo player: simulated playback ─────────
  const demoWrap = document.querySelector('.demo');
  const demoBtn = document.getElementById('demoPlay');
  const demoBar = document.getElementById('demoBar');
  const demoCurrent = document.getElementById('demoCurrent');
  const demoTotal = document.getElementById('demoTotal');

  if (demoWrap && demoBtn && demoBar && demoCurrent) {
    const total = 38; // seconds
    let current = 0;
    let timer = null;
    let playing = false;

    const fmt = (s) => {
      const m = Math.floor(s / 60);
      const r = Math.floor(s % 60);
      return `${m}:${String(r).padStart(2, '0')}`;
    };

    if (demoTotal) demoTotal.textContent = fmt(total);

    const tick = () => {
      current += 0.1;
      if (current >= total) {
        current = 0;
        stop();
      }
      demoBar.style.width = `${(current / total) * 100}%`;
      demoCurrent.textContent = fmt(current);
    };

    const play = () => {
      playing = true;
      demoWrap.dataset.playing = 'true';
      timer = setInterval(tick, 100);
    };

    const stop = () => {
      playing = false;
      demoWrap.dataset.playing = 'false';
      if (timer) clearInterval(timer);
      timer = null;
    };

    demoBtn.addEventListener('click', () => {
      if (playing) {
        stop();
      } else {
        play();
      }
    });
  }

  // ─── Reveal-on-scroll ────────────────────────
  const revealEls = document.querySelectorAll(
    '.problem-card, .product-block, .flow__step, .pricing__card, .pricing__panel, .pricing__compare, .channel, .faq__item, .demo__player, .demo__transcript'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.55s ease-out, transform 0.55s ease-out';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => io.observe(el));
  }
})();
