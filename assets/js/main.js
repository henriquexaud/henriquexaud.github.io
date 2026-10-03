// Duvalle — progressive enhancements. The page is fully usable without this file.
//
// The page is told as a journey. One drawing (the three layers of a system) travels
// through it: it assembles in the hero, waits beside the manifesto, is taken apart in the
// anatomy chapter, closes into one piece, and comes back closed for the finale. Everything
// scroll-linked runs in one rAF loop that reads layout first and writes styles after.
(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
  const easeOut = (t) => 1 - (1 - t) ** 3;

  // Header: border on scroll + mobile menu --------------------------------------
  const header = $('[data-header]');
  const toggle = $('[data-menu-toggle]');
  const toggleLabel = $('[data-menu-label]');

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
  const langMenus = $$('[data-lang]');
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

  // SMIL animations (moving parts in the visuals) can't be stopped from CSS. With reduced
  // motion each drawing rests on its data-still moment; otherwise it can restart from zero.
  const restartSvg = (svg) => {
    if (!svg?.setCurrentTime) return;
    if (reducedMotion.matches) {
      svg.setCurrentTime(Number(svg.dataset.still) || 0);
      svg.pauseAnimations();
    } else {
      svg.setCurrentTime(0);
    }
  };
  const syncSvgAnimations = () => {
    $$('svg.vz').forEach((svg) => {
      if (reducedMotion.matches) restartSvg(svg);
      else svg.unpauseAnimations?.();
    });
  };
  syncSvgAnimations();
  reducedMotion.addEventListener('change', syncSvgAnimations);

  // Reveal on scroll ----------------------------------------------------------
  const reveal = (el) => {
    el.classList.add('is-in');
    if (el.matches('[data-visual]')) restartSvg(el.querySelector('svg.vz'));
  };
  const revealTargets = $$('.reveal, .split, [data-visual]');
  const cases = $$('.case');
  if ('IntersectionObserver' in window) {
    const observe = (targets, options) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      }, options);
      targets.forEach((el) => observer.observe(el));
    };
    observe(revealTargets, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    // A case "arrives" (its problem is struck through) once it is well into view.
    observe(cases, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
  } else {
    [...revealTargets, ...cases].forEach(reveal);
  }

  // The travelling drawing ---------------------------------------------------------
  const heroEl = $('[data-hero]');
  const heroContent = $('[data-hero-content]');
  const scrollCue = $('.scroll-cue');
  const drawing = $('[data-slot="hero"] [data-blueprint]');
  const slots = {
    hero: $('[data-slot="hero"]'),
    manifesto: $('[data-slot="manifesto"]'),
    anatomy: $('[data-slot="anatomy"]'),
    contact: $('[data-slot="contact"]'),
  };
  const anatomyGrid = $('[data-anatomy]');
  const anatomyCopy = $('[data-slot="anatomy"] [data-blueprint]');
  const anatomySteps = $$('.anatomy-step');
  const anatomyList = $('.anatomy-steps');
  const contactCard = $('.contact-card');
  const MERGED = Number(drawing?.dataset.merged) || 2.16;
  const BASE = 720; // CSS width of .stage

  let stage = null;
  let timeline = [];
  let frontFrom = Infinity;

  const pageTop = (el) => el.getBoundingClientRect().top + window.scrollY;
  const canStage = () => !reducedMotion.matches && drawing && heroEl && Object.values(slots).every(Boolean) && anatomyGrid && contactCard;

  const mountStage = () => {
    if (stage || !canStage()) return;
    const el = document.createElement('div');
    el.className = 'stage';
    el.setAttribute('aria-hidden', 'true');
    el.appendChild(drawing);
    document.body.appendChild(el);
    root.classList.add('has-stage');
    stage = { el, cache: {} };
  };

  const unmountStage = () => {
    if (!stage) return;
    slots.hero.appendChild(drawing);
    drawing.removeAttribute('style');
    drawing.removeAttribute('data-focus');
    drawing.classList.remove('is-merged');
    stage.el.remove();
    stage = null;
    root.classList.remove('has-stage');
  };

  // Keyframes along the page: where the drawing rests (a slot) and in what state.
  // a: approach of the plates, o: opacity, lab: labels, merge: one-piece look,
  // par: parallax weight (only in the hero).
  const buildTimeline = () => {
    if (!stage) return;
    const vh = window.innerHeight;
    const max = Math.max(1, root.scrollHeight - vh);
    const stageOpacity = (slot) => Number(getComputedStyle(slot).getPropertyValue('--stage-o')) || 1;
    const centerOf = (el) => pageTop(el) + el.offsetHeight / 2 - vh / 2;
    const figure = slots.anatomy.closest('.anatomy-figure');
    const stickTop = parseFloat(getComputedStyle(figure).top) || 0;
    const gridTop = pageTop(anatomyGrid);
    const stuckAt = gridTop - stickTop;
    const unstuckAt = gridTop + anatomyGrid.offsetHeight - figure.offsetHeight - stickTop;
    const last = anatomySteps[anatomySteps.length - 1];
    // The plates close while the last step reaches the middle, and before the figure moves on.
    const mergeAt = Math.min(last ? centerOf(last) - vh * 0.08 : unstuckAt, unstuckAt);
    const contactAt = Math.min(max, centerOf(contactCard));
    const heroH = heroEl.offsetHeight;

    const frames = [
      { y: 0, slot: 'hero', a: 0, o: 1, lab: 1, merge: 0, par: 1 },
      { y: heroH * 0.35, slot: 'hero', a: 1, o: 1, lab: 1, merge: 0, par: 1, ease: easeOut },
      { y: centerOf(slots.manifesto), slot: 'manifesto', a: 1, o: 1, lab: 0, merge: 0, par: 0 },
      { y: stuckAt, slot: 'anatomy', a: -0.3, o: 1, lab: 1, merge: 0, par: 0 },
      { y: mergeAt - vh * 0.36, slot: 'anatomy', a: -0.3, o: 1, lab: 1, merge: 0, par: 0 },
      { y: mergeAt, slot: 'anatomy', a: MERGED, o: 1, lab: 0, merge: 1, par: 0 },
      { y: unstuckAt, slot: 'anatomy', a: MERGED, o: 1, lab: 0, merge: 1, par: 0 },
      { y: unstuckAt + vh * 0.45, slot: 'anatomy', a: MERGED, o: 0, lab: 0, merge: 1, par: 0 },
      { y: contactAt - vh * 0.7, slot: 'contact', a: 0.4, o: 0, lab: 0, merge: 0, par: 0 },
      { y: contactAt, slot: 'contact', a: MERGED, o: 1, lab: 0, merge: 1, par: 0, ease: easeOut },
    ];
    frames.forEach((frame, i) => {
      if (i) frame.y = Math.max(frame.y, frames[i - 1].y + 1);
      frame.so = stageOpacity(slots[frame.slot]);
    });
    timeline = frames;
    frontFrom = frames[7].y;
  };

  const set = (el, cache, key, value, apply) => {
    if (cache[key] === value) return;
    cache[key] = value;
    apply(el, value);
  };

  // Custom properties written from the loop, skipped when the value has not changed.
  const varCache = new WeakMap();
  const setVar = (el, name, value) => {
    let cache = varCache.get(el);
    if (!cache) varCache.set(el, (cache = {}));
    set(el, cache, name, value, (n, v) => n.style.setProperty(name, v));
  };

  // Read: where the drawing should be for this scroll position.
  const measureStage = (ys, heroH) => {
    if (!stage || !timeline.length) return null;
    let i = 0;
    while (i < timeline.length - 2 && ys >= timeline[i + 1].y) i++;
    const k0 = timeline[i];
    const k1 = timeline[i + 1];
    const t = clamp((ys - k0.y) / (k1.y - k0.y));
    const e = (k1.ease || easeInOut)(t);
    const r0 = slots[k0.slot].getBoundingClientRect();
    const r1 = k1.slot === k0.slot ? r0 : slots[k1.slot].getBoundingClientRect();
    const dy = lerp(k0.par, k1.par, e) * Math.min(ys, heroH) * 0.22;
    return {
      x: lerp(r0.left, r1.left, e),
      y: lerp(r0.top, r1.top, e) + dy,
      w: lerp(r0.width, r1.width, e),
      o: lerp(k0.o * k0.so, k1.o * k1.so, e),
      a: lerp(k0.a, k1.a, e),
      lab: lerp(k0.lab, k1.lab, e),
      merge: lerp(k0.merge, k1.merge, e),
      front: ys >= frontFrom,
    };
  };

  // Write: only what changed since the last frame.
  const renderStage = (state) => {
    if (!stage || !state) return;
    const { el, cache } = stage;
    const { x, y, w, o, a } = state;
    set(el, cache, 'transform', `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(w / BASE).toFixed(4)})`, (n, v) => (n.style.transform = v));
    set(el, cache, 'opacity', o.toFixed(3), (n, v) => (n.style.opacity = v));
    set(el, cache, 'visibility', o < 0.004 ? 'hidden' : '', (n, v) => (n.style.visibility = v));
    set(el, cache, 'front', state.front, (n, v) => n.classList.toggle('is-front', v));
    set(drawing, cache, '--approach', a.toFixed(3), (n, v) => n.style.setProperty('--approach', v));
    set(drawing, cache, '--lab', state.lab.toFixed(3), (n, v) => n.style.setProperty('--lab', v));
    set(drawing, cache, '--merge', state.merge.toFixed(3), (n, v) => n.style.setProperty('--merge', v));
    set(drawing, cache, 'merged', a > MERGED - 0.3, (n, v) => n.classList.toggle('is-merged', v));
  };

  // Chapter indicator (wide screens) -----------------------------------------------
  const chapters = $$('[data-chapter]');
  let chapterTops = [];
  let hud = null;
  let activeChapter = -1;
  if (chapters.length > 1) {
    hud = document.createElement('div');
    hud.className = 'hud';
    hud.setAttribute('aria-hidden', 'true');
    hud.innerHTML = `<span class="hud-num metal"></span><span class="hud-label"></span><span class="hud-ticks">${chapters
      .slice(1)
      .map(() => '<i></i>')
      .join('')}</span>`;
    document.body.appendChild(hud);
  }

  const renderHud = (y, vh) => {
    if (!hud) return;
    let index = 0;
    chapterTops.forEach((top, i) => {
      if (top <= y + vh * 0.5) index = i;
    });
    if (index === activeChapter) return;
    activeChapter = index;
    const chapter = chapters[index];
    hud.classList.toggle('is-visible', index > 0);
    $('.hud-num', hud).textContent = chapter.dataset.chapter;
    const label = $('.hud-label', hud);
    label.textContent = chapter.dataset.chapterLabel;
    label.classList.remove('is-swapping');
    void label.offsetWidth;
    label.classList.add('is-swapping');
    $$('.hud-ticks i', hud).forEach((tick, i) => {
      tick.classList.toggle('is-active', i === index - 1);
      tick.classList.toggle('is-done', i < index - 1);
    });
  };

  // Scroll-linked effects ---------------------------------------------------------
  const progressBar = $('[data-progress]');
  const scrub = $('[data-scrub]');
  // Units that light up in turn: plain words, and highlighted phrases as one piece.
  const scrubUnits = scrub ? [...scrub.children] : [];
  const scrubCounts = scrubUnits.map((unit) => (unit.matches('em') ? unit.querySelectorAll('.sw').length : 1));
  const scrubTotal = scrubCounts.reduce((sum, n) => sum + n, 0);
  let scrubLit = -1;
  const fills = $$('[data-fill]');
  const processEl = $('[data-process]');
  const processSteps = processEl ? $$('.process-step', processEl) : [];
  const wordmark = $('[data-wordmark]');
  const stacking = window.matchMedia('(min-width: 1000px) and (min-height: 760px)');
  const narrow = window.matchMedia('(max-width: 959px)');
  let activeStep = -2;

  const layout = () => {
    buildTimeline();
    chapterTops = chapters.map(pageTop);
    activeChapter = -1;
  };

  const render = (ys) => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = root.scrollHeight - vh;
    const still = reducedMotion.matches;

    // Read ----------------------------------------------------------------
    const heroH = heroEl ? heroEl.offsetHeight : 0;
    const scrubRect = scrub?.getBoundingClientRect();
    const stepRects = anatomySteps.map((step) => step.getBoundingClientRect());
    const listRect = anatomyList?.getBoundingClientRect();
    const caseRects = stacking.matches ? cases.map((c) => c.getBoundingClientRect()) : null;
    const fillRects = fills.map((row) => row.getBoundingClientRect());
    const processTop = processEl?.getBoundingClientRect().top;
    const wordmarkRect = wordmark?.getBoundingClientRect();
    const stageState = measureStage(ys, heroH);

    // Write ---------------------------------------------------------------
    header?.classList.toggle('is-scrolled', y > 8);
    if (progressBar) setVar(progressBar, 'transform', `scaleX(${max > 0 ? clamp(y / max).toFixed(4) : 0})`);
    scrollCue?.classList.toggle('is-gone', y > 40);

    // Hero copy drifts slower than the page and dims as the chapter ends.
    if (heroContent) {
      const inHero = !still && y < heroH * 1.2;
      setVar(heroContent, 'transform', inHero ? `translate3d(0, ${(y * 0.14).toFixed(1)}px, 0)` : '');
      setVar(heroContent, 'opacity', inHero ? (1 - clamp((y - heroH * 0.2) / (heroH * 0.6)) * 0.85).toFixed(3) : '');
    }

    renderStage(stageState);

    // Manifesto: words light up while the paragraph crosses the screen.
    if (scrub && scrubRect) {
      const p = still ? 1 : clamp((vh * 0.82 - scrubRect.top) / (vh * 0.32 + scrubRect.height));
      const lit = Math.round(p * scrubTotal);
      if (lit !== scrubLit) {
        scrubLit = lit;
        let count = 0;
        scrubUnits.forEach((unit, i) => {
          unit.classList.toggle('is-lit', count < lit);
          count += scrubCounts[i];
        });
      }
    }

    // Anatomy: the step at the reading line is active; the drawing singles out its layer.
    if (anatomySteps.length) {
      const line = vh * (narrow.matches ? 0.72 : 0.55);
      let active = -1;
      stepRects.forEach((rect, i) => {
        if (rect.top < line) active = i;
      });
      if (stepRects.length && stepRects[stepRects.length - 1].bottom < vh * 0.15) active = -1;
      if (active !== activeStep) {
        activeStep = active;
        anatomySteps.forEach((step, i) => step.classList.toggle('is-active', i === active));
        const target = stage ? drawing : anatomyCopy;
        const focus = active >= 0 && active < 3 ? String(active) : null;
        [drawing, anatomyCopy].forEach((bp) => bp && bp !== target && bp.removeAttribute('data-focus'));
        if (target) {
          if (focus === null) target.removeAttribute('data-focus');
          else target.setAttribute('data-focus', focus);
        }
        // Without the travelling drawing, the copy still shows the closed piece at the end.
        if (!stage && anatomyCopy) {
          const closed = active === anatomySteps.length - 1;
          anatomyCopy.style.setProperty('--approach', closed ? String(MERGED) : '0');
          anatomyCopy.style.setProperty('--lab', closed ? '0' : '1');
          anatomyCopy.style.setProperty('--merge', closed ? '1' : '0');
          anatomyCopy.classList.toggle('is-merged', closed);
        }
      }
      if (anatomyGrid && listRect) {
        const ap = still ? 1 : clamp((line - listRect.top) / listRect.height);
        setVar(anatomyGrid, '--ap', ap.toFixed(3));
      }
    }

    // Solutions: a covered card sinks back as the next one slides over it.
    cases.forEach((c, i) => {
      let cover = 0;
      if (caseRects && !still && i < cases.length - 1) {
        const rect = caseRects[i];
        cover = clamp(1 - (caseRects[i + 1].top - rect.top) / rect.height);
      }
      setVar(c, '--cover', cover.toFixed(3));
    });

    // Services: silicon fills each verb as its row scrolls into place.
    fills.forEach((row, i) => {
      const fill = still ? 1 : clamp((vh * 0.92 - fillRects[i].top) / (vh * 0.42));
      setVar(row, '--fill', fill.toFixed(3));
    });

    // Process line fills while the section crosses the viewport.
    if (processEl) {
      const p = still ? 1 : clamp((vh * 0.8 - processTop) / (vh * 0.45));
      setVar(processEl, '--p', p.toFixed(3));
      processSteps.forEach((step, i) => step.classList.toggle('is-active', p > 0 && p >= i / Math.max(1, processSteps.length - 1) - 0.02));
    }

    // Footer: the name rises into place as the page ends.
    if (wordmark && wordmarkRect) {
      const p = still ? 1 : clamp((vh - wordmarkRect.top) / wordmarkRect.height);
      setVar(wordmark, '--wm', easeOut(p).toFixed(3));
    }

    renderHud(y, vh);
  };

  // One loop: the drawing follows a slightly damped scroll position, so its travel stays
  // fluid even when the wheel moves in steps. Everything else tracks the real position.
  let ys = window.scrollY;
  let raf = 0;
  let last = 0;
  const loop = (now) => {
    const y = window.scrollY;
    const dt = last ? Math.min(64, now - last) : 16;
    last = now;
    ys = reducedMotion.matches ? y : lerp(ys, y, 1 - Math.exp(-dt / 85));
    if (Math.abs(y - ys) < 0.4) ys = y;
    render(ys);
    if (ys !== y) raf = requestAnimationFrame(loop);
    else {
      raf = 0;
      last = 0;
    }
  };
  const requestRender = () => {
    if (!raf) raf = requestAnimationFrame(loop);
  };

  let layoutQueued = false;
  const relayout = () => {
    if (layoutQueued) return;
    layoutQueued = true;
    requestAnimationFrame(() => {
      layoutQueued = false;
      layout();
      render(ys);
    });
  };

  mountStage();
  layout();
  render(ys);
  window.addEventListener('scroll', requestRender, { passive: true });
  window.addEventListener('resize', relayout, { passive: true });
  window.addEventListener('load', relayout);
  document.fonts?.ready.then(relayout);
  if ('ResizeObserver' in window) new ResizeObserver(relayout).observe(document.body);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) unmountStage();
    else mountStage();
    activeStep = -2;
    scrubLit = -1;
    ys = window.scrollY;
    relayout();
  });

  // Pointer details (precise pointers only) ------------------------------------------
  // Soft light that follows the pointer on cards.
  $$('[data-spotlight]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });

  // Main calls to action lean slightly towards the pointer.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('[data-magnetic]').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        if (reducedMotion.matches) return;
        const rect = button.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;
        button.style.transform = `translate(${(dx * 12).toFixed(1)}px, ${(dy * 10).toFixed(1)}px)`;
      });
      button.addEventListener('pointerleave', () => (button.style.transform = ''));
    });
  }

  // Active section in the navigation ---------------------------------------------
  const navLinks = new Map();
  $$('[data-nav]').forEach((link) => navLinks.set(link.dataset.nav, link));
  if (navLinks.size && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = navLinks.get(entry.target.id);
          navLinks.forEach((l) => {
            l.classList.remove('is-active');
            l.removeAttribute('aria-current');
          });
          if (!link) return;
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'location');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    $$('main > section[id]').forEach((section) => sectionObserver.observe(section));
  }

  root.classList.add('is-ready');
})();
