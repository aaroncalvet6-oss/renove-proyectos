document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav ---------- */
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('navToggle');
  const floating = document.getElementById('floatingActions');
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  const closeNav = () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (floating) floating.classList.remove('hidden');
  };
  const openNav = () => {
    nav.classList.add('open');
    toggle.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (floating) floating.classList.add('hidden');
  };

  toggle.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });
  backdrop.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

  /* ---------- Scrollspy ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => spyObserver.observe(section));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    revealObserver.observe(el);
  });

  /* ---------- Stat counters ---------- */
  const statEls = document.querySelectorAll('.stat-number');
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target || '0');
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  statEls.forEach(el => statObserver.observe(el));

  /* ---------- Before / after slider ---------- */
  const baSlider = document.getElementById('baSlider');
  const baRange = document.getElementById('baRange');
  if (baSlider && baRange) {
    const setPos = (value) => {
      baSlider.style.setProperty('--pos', `${value}%`);
    };
    baRange.addEventListener('input', (e) => setPos(e.target.value));
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  const validators = {
    name: value => value.trim().length >= 2,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: value => value.trim().length >= 10,
  };

  const validateField = (field) => {
    const wrap = field.closest('.form-field');
    const isValid = validators[field.name](field.value);
    wrap.classList.toggle('invalid', !isValid);
    return isValid;
  };

  if (form) {
    ['name', 'email', 'message'].forEach(fieldName => {
      const field = form.elements[fieldName];
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-field').classList.contains('invalid')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'message'].map(name => form.elements[name]);
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        note.textContent = 'Por favor, revisa los campos marcados.';
        note.className = 'form-note error';
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        note.textContent = '¡Gracias! Hemos recibido tu mensaje y te contactaremos en breve.';
        note.className = 'form-note success';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar solicitud';
      }, 700);
    });
  }
});
