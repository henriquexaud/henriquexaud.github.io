// DuaTech — progressive enhancements. The page is fully usable without this file.
(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Header: border on scroll + mobile menu --------------------------------------
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const toggleLabel = document.querySelector('[data-menu-label]');

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    if (!header || !toggle) return;
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (toggleLabel) toggleLabel.textContent = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
  };

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  header?.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header?.classList.contains('is-open')) {
      setMenu(false);
      toggle?.focus();
    }
  });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (event) => event.matches && setMenu(false));

  // Language menus: close on outside click and on Escape ----------------------------
  const langMenus = [...document.querySelectorAll('[data-lang]')];
  document.addEventListener('click', (event) => {
    langMenus.forEach((menu) => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    langMenus.forEach((menu) => {
      if (!menu.open) return;
      menu.open = false;
      menu.querySelector('summary')?.focus();
    });
  });
  langMenus.forEach((menu) =>
    menu.addEventListener('toggle', () => {
      if (menu.open) langMenus.forEach((other) => other !== menu && (other.open = false));
    }),
  );

  // Reveal on scroll ----------------------------------------------------------
  const revealTargets = document.querySelectorAll('.reveal, [data-visual]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-in'));
  }

  // SMIL animations (moving dots in the visuals) can't be stopped from CSS.
  const syncSvgAnimations = () => {
    document.querySelectorAll('svg.vz, svg.bp').forEach((svg) => {
      if (reducedMotion.matches) svg.pauseAnimations?.();
      else svg.unpauseAnimations?.();
    });
  };
  syncSvgAnimations();
  reducedMotion.addEventListener('change', syncSvgAnimations);

  // Scroll-linked effects (one rAF-throttled handler) -----------------------------
  const progressBar = document.querySelector('[data-progress]');
  const heroEl = document.querySelector('.hero');
  const drawing = document.querySelector('[data-blueprint]');
  const processEl = document.querySelector('[data-process]');
  const steps = processEl ? [...processEl.children] : [];
  const clamp = (n) => Math.min(1, Math.max(0, n));
  let ticking = false;

  const updateScroll = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`;

    const still = reducedMotion.matches;

    // Hero drawing: plates move apart (exploded view), drift and fade as the hero leaves.
    if (heroEl && drawing) {
      const p = still ? 0 : clamp(y / heroEl.offsetHeight);
      drawing.style.setProperty('--explode', p.toFixed(3));
      drawing.style.transform = still ? '' : `translate3d(0, ${(y * 0.12).toFixed(1)}px, 0)`;
      drawing.style.opacity = still ? '' : String(1 - p * 0.85);
    }

    // Process line fills while the section crosses the viewport.
    if (processEl) {
      const top = processEl.getBoundingClientRect().top;
      const p = still ? 1 : clamp((vh * 0.8 - top) / (vh * 0.45));
      processEl.style.setProperty('--p', p.toFixed(3));
      steps.forEach((step, i) => step.classList.toggle('is-active', p > 0 && p >= i / Math.max(1, steps.length - 1) - 0.02));
    }
  };

  const requestScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScroll);
  };
  updateScroll();
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  reducedMotion.addEventListener('change', requestScroll);

  // Pointer-following light on cards.
  document.querySelectorAll('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  // Active section in the navigation ---------------------------------------------
  const navLinks = new Map();
  document.querySelectorAll('[data-nav]').forEach((link) => navLinks.set(link.dataset.nav, link));
  if (navLinks.size && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = navLinks.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => {
              l.classList.remove('is-active');
              l.removeAttribute('aria-current');
            });
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'location');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  // Solutions tabs (WAI-ARIA tabs pattern) ---------------------------------------
  const tabsRoot = document.querySelector('[data-tabs]');
  if (tabsRoot) {
    const tabs = [...tabsRoot.querySelectorAll('[role="tab"]')];
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute('aria-controls')));

    panels.forEach((panel) => {
      if (panel.hasAttribute('data-inactive')) {
        panel.hidden = true;
        panel.removeAttribute('data-inactive');
      }
    });

    const select = (index, { focus = false, scroll = false } = {}) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[i].hidden = !selected;
        panels[i].classList.toggle('is-entering', selected);
      });
      // Replay the illustration's animation each time its tab is opened.
      const figure = panels[index].querySelector('[data-visual]');
      if (figure?.classList.contains('is-in')) {
        figure.classList.remove('is-in');
        void figure.offsetWidth;
        figure.classList.add('is-in');
      }
      const tab = tabs[index];
      if (focus) tab.focus();
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      if (scroll) tabsRoot.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (event) => {
        const keys = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select((keys[event.key] + tabs.length) % tabs.length, { focus: true });
      });
    });

    // Footer links open a specific solution.
    document.querySelectorAll('[data-tab-link]').forEach((link) => {
      link.addEventListener('click', (event) => {
        const index = tabs.findIndex((tab) => tab.id === `tab-${link.dataset.tabLink}`);
        if (index < 0) return;
        event.preventDefault();
        select(index, { scroll: true });
        history.replaceState(null, '', '#solutions');
      });
    });
  }

  root.classList.add('is-ready');
})();
