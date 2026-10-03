import { html, raw } from '../lib/html.mjs';
import { site, contact, founder, solutionKeys } from '../config.mjs';
import { logoMark, icons, valueIcons, serviceIcons, flag, chevronDown } from './icons.mjs';
import { visual } from './visuals.mjs';
import { blueprint } from './blueprint.mjs';

const pad = (n) => String(n).padStart(2, '0');
const whatsappUrl = (message) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

const NAV = ['solutions', 'services', 'process', 'about', 'faq'];

// The page reads as a sequence of chapters; each one is numbered in its eyebrow.
const CHAPTERS = ['manifesto', 'anatomy', 'solutions', 'services', 'why', 'process', 'about', 'faq', 'contact'];
const chapter = (id) => CHAPTERS.indexOf(id) + 1;

// Registration marks drawn in the corners of a card, like on a technical drawing.
const MARKS = raw('<span class="marks" aria-hidden="true"><i></i><i></i><i></i><i></i></span>');

// Splits a line into words that rise from behind a mask when the heading enters the view.
// `from` continues the stagger when a heading is built from more than one piece.
function words(text, from = 0) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((word, i) => html`<span class="w" style="--wi:${from + i}"><span>${word}</span></span> `);
}

// Text that lights up word by word as it scrolls past (manifesto).
// Phrases between asterisks are set in silicon and light up as one piece.
function scrubText(text) {
  const tokens = (segment) => segment.split(/(\s+)/).map((token) => (/^\s+$/.test(token) ? ' ' : token ? html`<span class="sw">${token}</span>` : ''));
  return text.split('*').map((segment, i) => (i % 2 ? html`<em class="metal">${tokens(segment)}</em>` : tokens(segment)));
}

function externalLink(href, label, t, cls = '', icon = '') {
  return html`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${icon}<span>${label}</span><span class="visually-hidden"> (${t.ui.external})</span></a>`;
}

function eyebrow(id, text, cls = '') {
  return html`<p class="eyebrow eyebrow-numbered ${cls}"><span class="eyebrow-num metal" aria-hidden="true">${pad(chapter(id))}</span><span class="eyebrow-rule" aria-hidden="true"></span>${text}</p>`;
}

function sectionHead(id, eyebrowText, title, lead) {
  return html`<header class="section-head">
    ${eyebrow(id, eyebrowText, 'reveal')}
    <h2 class="section-title split" id="${id}-title">${words(title)}</h2>
    ${lead ? html`<p class="section-lead reveal" style="--d:3">${lead}</p>` : ''}
  </header>`;
}

// Chapter attributes: read by main.js for the chapter indicator.
const chapterAttrs = (id, label) => html`data-chapter="${pad(chapter(id))}" data-chapter-label="${label}"`;

function head(t, ctx) {
  const url = site.url + t.path;
  const { all } = ctx;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#organization`,
        name: site.name,
        url: site.url + '/',
        logo: `${site.url}/assets/img/icon-512.png`,
        image: `${site.url}/assets/img/og-${t.code}.png`,
        description: t.meta.description,
        slogan: `${t.hero.title} ${t.hero.titleMuted}`,
        foundingDate: String(site.foundingYear),
        founder: { '@type': 'Person', name: founder.name, sameAs: [founder.linkedin] },
        areaServed: 'BR',
        knowsLanguage: all.map((l) => l.htmlLang),
        telephone: `+${contact.whatsapp}`,
        sameAs: [contact.linkedin],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.services.title,
          itemListElement: t.services.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: `${s.text} ${s.points.join(', ')}.` } })),
        },
      },
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url + '/', name: site.name, inLanguage: t.htmlLang, publisher: { '@id': `${site.url}/#organization` } },
      {
        '@type': 'FAQPage',
        inLanguage: t.htmlLang,
        mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return html`<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${t.meta.title}</title>
<meta name="description" content="${t.meta.description}">
<link rel="canonical" href="${url}">
${all.map((l) => html`<link rel="alternate" hreflang="${l.htmlLang}" href="${site.url + l.path}">
`)}<link rel="alternate" hreflang="x-default" href="${site.url}/">
<meta name="theme-color" content="#09090b">
<meta name="color-scheme" content="dark">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${t.meta.title}">
<meta property="og:description" content="${t.meta.description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/assets/img/og-${t.code}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${site.name}: ${t.hero.title} ${t.hero.titleMuted}">
<meta property="og:locale" content="${t.ogLocale}">
${all.filter((l) => l.code !== t.code).map((l) => html`<meta property="og:locale:alternate" content="${l.ogLocale}">
`)}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=${ctx.version}">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js?v=${ctx.version}" defer></script>
<script type="application/ld+json">${raw(JSON.stringify(jsonLd).replace(/</g, '\\u003c'))}</script>
</head>`;
}

// Language menu: a native <details> disclosure, so it also works without JavaScript.
function languageSwitch(t, all, cls) {
  return html`<details class="lang ${cls}" data-lang>
    <summary class="lang-trigger">
      ${flag(t.flag, 20)}<span class="visually-hidden">${t.ui.language}: ${t.menuLabel}</span>${chevronDown}
    </summary>
    <ul class="lang-menu">
      ${all.map(
        (l) =>
          html`<li><a class="lang-option" href="${l.path}" hreflang="${l.htmlLang}" lang="${l.htmlLang}" ${l.code === t.code ? raw('aria-current="true"') : ''}>${flag(l.flag, 24)}<span>${l.menuLabel}</span>${l.code === t.code ? icons.check : ''}</a></li>`,
      )}
    </ul>
  </details>`;
}

function siteHeader(t, all) {
  return html`<header class="site-header" data-header>
  <div class="scroll-progress" data-progress aria-hidden="true"></div>
  <div class="container header-inner">
    <a class="brand" href="${t.path}" aria-label="${site.name}">${logoMark(22, 'hd')}<span class="brand-name">${site.name}</span></a>
    <nav class="primary-nav" aria-label="${t.ui.primaryNav}" id="primary-nav">
      <ul class="nav-list">
        ${NAV.map((id) => html`<li><a class="nav-link" href="#${id}" data-nav="${id}">${t.nav[id]}</a></li>`)}
      </ul>
      <div class="nav-mobile-extra">
        ${languageSwitch(t, all, 'lang-mobile lang-up')}
        <a class="button button-primary" href="#contact">${t.nav.cta}${icons.arrowRight}</a>
      </div>
    </nav>
    <div class="header-actions">
      ${languageSwitch(t, all, 'lang-desktop')}
      <a class="button button-small button-metal header-cta" href="#contact" data-magnetic>${t.nav.cta}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle data-label-open="${t.ui.menu}" data-label-close="${t.ui.closeMenu}">
        <span class="menu-toggle-icon" aria-hidden="true"><span></span><span></span></span>
        <span class="visually-hidden" data-menu-label>${t.ui.menu}</span>
      </button>
    </div>
  </div>
</header>`;
}

// Prologue: the drawing assembles itself while the title rises line by line.
function hero(t) {
  const titleWords = t.hero.title.split(/\s+/).length;
  return html`<section class="hero" aria-labelledby="hero-title" data-hero data-chapter="00" data-chapter-label="${t.hero.eyebrow}">
  <div class="container hero-inner">
    <div class="hero-slot" data-slot="hero">${blueprint(t.hero.layers, 'hero')}</div>
    <div class="hero-content" data-hero-content>
      <span class="hero-guide" aria-hidden="true"></span>
      <p class="eyebrow hero-eyebrow reveal">${t.hero.eyebrow}</p>
      <h1 class="hero-title split" id="hero-title">${words(t.hero.title)}<span class="hero-title-muted metal">${t.hero.titleMuted}</span></h1>
      <p class="hero-lead reveal" style="--d:${titleWords + 2}">${t.hero.lead}</p>
      <div class="hero-actions reveal" style="--d:${titleWords + 3}">
        <a class="button button-primary button-large" href="#contact" data-magnetic>${t.hero.primary}${icons.arrowRight}</a>
        <a class="button button-ghost button-large" href="#solutions">${t.hero.secondary}</a>
      </div>
    </div>
  </div>
  <a class="scroll-cue" href="#manifesto" aria-hidden="true" tabindex="-1"><span class="scroll-cue-line"></span><span class="scroll-cue-text">${t.hero.scroll}</span></a>
</section>`;
}

// How we think: one sentence that lights up as it is read.
function manifesto(t) {
  const m = t.manifesto;
  return html`<section class="section manifesto" id="manifesto" aria-labelledby="manifesto-title" ${chapterAttrs('manifesto', m.eyebrow)}>
  <div class="container manifesto-inner">
    <div class="manifesto-copy">
      ${eyebrow('manifesto', m.eyebrow, 'reveal')}
      <h2 class="visually-hidden" id="manifesto-title">${m.eyebrow}</h2>
      <p class="manifesto-text" data-scrub>${scrubText(m.text)}</p>
    </div>
  </div>
</section>`;
}

// Anatomy: the drawing from the opening stays pinned while each layer is explained,
// then the three plates close into a single piece.
function anatomy(t) {
  const a = t.anatomy;
  return html`<section class="section anatomy" id="anatomy" aria-labelledby="anatomy-title" ${chapterAttrs('anatomy', a.eyebrow)}>
  <div class="container">
    ${sectionHead('anatomy', a.eyebrow, a.title)}
    <div class="anatomy-grid" data-anatomy>
      <figure class="anatomy-figure">
        <div class="anatomy-slot" data-slot="anatomy">${blueprint(t.hero.layers, 'anatomy')}</div>
        <figcaption class="anatomy-caption">${a.figure}</figcaption>
      </figure>
      <ol class="anatomy-steps">
        ${a.steps.map((step, i) => html`<li class="anatomy-step${i === a.steps.length - 1 ? ' anatomy-step-final' : ''}" data-step="${i}">
          <p class="anatomy-name"><span class="anatomy-index metal">${pad(i + 1)}</span>${step.name}</p>
          <h3 class="anatomy-title">${step.title}</h3>
          <p class="anatomy-text">${step.text}</p>
        </li>`)}
      </ol>
    </div>
  </div>
</section>`;
}

// Solutions: a menu on top and the cases side by side in a track that slides sideways
// (swipe, trackpad or the menu). Without JavaScript the cases simply stack.
function solutions(t) {
  const s = t.solutions;
  const total = pad(solutionKeys.length);
  return html`<section class="section" id="solutions" aria-labelledby="solutions-title" ${chapterAttrs('solutions', s.eyebrow)}>
  <div class="container">
    ${sectionHead('solutions', s.eyebrow, s.title, s.lead)}
    <div class="solutions" data-tabs>
      <div class="solution-tabs" role="tablist" aria-label="${s.listLabel}">
        ${solutionKeys.map((key, i) => html`<button class="solution-tab" type="button" role="tab" id="tab-${key}" aria-controls="case-${key}" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}"><span class="solution-tab-num" aria-hidden="true">${pad(i + 1)}</span>${s.items[key].tab}</button>`)}
        <span class="solution-tabs-bar" aria-hidden="true"></span>
      </div>
      <div class="cases" data-track>
        ${solutionKeys.map((key, i) => {
          const item = s.items[key];
          return html`<article class="case" id="case-${key}" role="tabpanel" aria-labelledby="tab-${key}">
          <div class="case-card">
            <div class="case-copy">
              <p class="case-meta"><span class="case-num metal">${pad(i + 1)}</span><span class="case-total">/ ${total}</span><span class="case-tab">${item.tab}</span></p>
              <p class="case-problem"><span class="case-label">${s.problemLabel}</span><span class="case-problem-text">${item.problem}</span></p>
              <p class="case-label case-label-solution">${s.solutionLabel}</p>
              <h3 class="case-title">${item.title}</h3>
              <ul class="benefits">
                ${item.benefits.map((b, j) => html`<li style="--j:${j}"><span class="benefit-mark">${icons.check}</span><span>${b}</span></li>`)}
              </ul>
            </div>
            <figure class="solution-visual" data-visual>
              ${visual(key, t.visuals[key], `${item.tab}: ${item.title}`)}
            </figure>
          </div>
        </article>`;
        })}
      </div>
    </div>
  </div>
</section>`;
}

// Services: three verbs set large in outline; silicon fills them as they scroll into place.
function services(t) {
  const s = t.services;
  return html`<section class="section" id="services" aria-labelledby="services-title" ${chapterAttrs('services', s.eyebrow)}>
  <div class="container">
    ${sectionHead('services', s.eyebrow, s.title, s.lead)}
    <ol class="services">
      ${s.items.map((item, i) => html`<li class="service" data-fill>
        <div class="service-head">
          <span class="service-num" aria-hidden="true">${pad(i + 1)}</span>
          <p class="service-verb"><span class="service-verb-outline">${item.kicker}</span><span class="service-verb-fill metal" aria-hidden="true">${item.kicker}</span></p>
        </div>
        <div class="service-body">
          <span class="service-icon" aria-hidden="true">${serviceIcons[item.icon]}</span>
          <h3 class="service-title">${item.title}</h3>
          <p class="service-text">${item.text}</p>
          <ul class="service-points">
            ${item.points.map((point) => html`<li>${point}</li>`)}
          </ul>
        </div>
      </li>`)}
    </ol>
  </div>
</section>`;
}

function why(t) {
  const w = t.why;
  return html`<section class="section" id="why" aria-labelledby="why-title" ${chapterAttrs('why', w.eyebrow)}>
  <div class="container">
    ${sectionHead('why', w.eyebrow, w.title)}
    <ul class="value-grid">
      ${w.items.map((item, i) => html`<li class="value reveal reveal-tilt" style="--d:${i}" data-spotlight>
        <span class="value-icon" aria-hidden="true">${valueIcons[item.icon]}</span>
        <h3 class="value-title">${item.title}</h3>
        <p class="value-text">${item.text}</p>
      </li>`)}
    </ul>
  </div>
</section>`;
}

function process(t) {
  const p = t.process;
  return html`<section class="section" id="process" aria-labelledby="process-title" ${chapterAttrs('process', p.eyebrow)}>
  <div class="container">
    ${sectionHead('process', p.eyebrow, p.title)}
    <div class="process-track" data-process>
    <span class="process-head" aria-hidden="true"></span>
    <ol class="process">
      ${p.steps.map((step, i) => html`<li class="process-step reveal" style="--d:${i}">
        <span class="process-node" aria-hidden="true"></span>
        <span class="process-index metal" aria-hidden="true">${pad(i + 1)}</span>
        <h3 class="process-title">${step.title}</h3>
        <p class="process-text">${step.text}</p>
      </li>`)}
    </ol>
    </div>
  </div>
</section>`;
}

function about(t) {
  const a = t.about;
  return html`<section class="section" id="about" aria-labelledby="about-title" ${chapterAttrs('about', a.eyebrow)}>
  <div class="container about">
    <div class="about-copy">
      ${eyebrow('about', a.eyebrow, 'reveal')}
      <h2 class="section-title split" id="about-title">${words(a.title)}</h2>
      <p class="about-text reveal" style="--d:3">${a.text}</p>
    </div>
    <div class="founder reveal" style="--d:4" data-spotlight>
      <span class="founder-avatar" aria-hidden="true"><span>HX</span></span>
      <div class="founder-info">
        <p class="founder-name">${founder.name}</p>
        <p class="founder-role">${a.founderRole}, ${site.name}</p>
      </div>
      ${externalLink(founder.linkedin, 'LinkedIn', t, 'founder-link', icons.linkedin)}
    </div>
  </div>
</section>`;
}

function faq(t) {
  const f = t.faq;
  return html`<section class="section" id="faq" aria-labelledby="faq-title" ${chapterAttrs('faq', f.eyebrow)}>
  <div class="container faq">
    ${sectionHead('faq', f.eyebrow, f.title)}
    <div class="faq-list">
      ${f.items.map((item, i) => html`<details class="faq-item reveal" style="--d:${i}">
        <summary><span>${item.q}</span>${icons.plus}</summary>
        <p>${item.a}</p>
      </details>`)}
    </div>
  </div>
</section>`;
}

// Finale: the drawing returns, closed into one piece, above the invitation.
function contactSection(t) {
  const c = t.contact;
  return html`<section class="section contact" id="contact" aria-labelledby="contact-title" ${chapterAttrs('contact', c.eyebrow)}>
  <div class="container">
    <div class="contact-card reveal" data-spotlight>
      ${MARKS}
      <div class="contact-slot" data-slot="contact" aria-hidden="true"></div>
      ${eyebrow('contact', c.eyebrow)}
      <h2 class="contact-title split" id="contact-title">${words(c.title)}</h2>
      <p class="contact-lead reveal" style="--d:4">${c.lead}</p>
      <div class="contact-actions reveal" style="--d:5">
        ${externalLink(whatsappUrl(c.whatsappMessage), c.whatsapp, t, 'button button-primary button-large', icons.whatsapp)}
        ${externalLink(contact.linkedin, c.linkedin, t, 'button button-ghost button-large', icons.linkedin)}
        ${contact.email ? html`<a class="button button-ghost button-large" href="mailto:${contact.email}">${icons.mail}<span>${contact.email}</span></a>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

function siteFooter(t, year) {
  return html`<footer class="site-footer">
  <div class="container footer-inner">
    <div class="footer-brand">
      <a class="brand" href="${t.path}">${logoMark(20, 'ft')}<span class="brand-name">${site.name}</span></a>
      <p class="footer-tagline">${t.footer.tagline}</p>
    </div>
    <nav class="footer-nav" aria-label="${site.name}">
      <ul>${NAV.map((id) => html`<li><a href="#${id}">${t.nav[id]}</a></li>`)}</ul>
    </nav>
    <div class="footer-bottom">
      <p>© ${year} ${site.name}. ${t.footer.rights}</p>
      <a class="back-to-top" href="#top">${t.ui.backToTop}${icons.arrowUp}</a>
    </div>
  </div>
  <div class="wordmark" aria-hidden="true" data-wordmark><span class="wordmark-text metal">${site.name}</span></div>
</footer>`;
}

export function renderPage(t, ctx) {
  return html`<!doctype html>
<html lang="${t.htmlLang}">
${head(t, ctx)}
<body id="top">
<a class="skip-link" href="#main">${t.ui.skip}</a>
${siteHeader(t, ctx.all)}
<main id="main">
${hero(t)}
${manifesto(t)}
${anatomy(t)}
${solutions(t)}
${services(t)}
${why(t)}
${process(t)}
${about(t)}
${faq(t)}
${contactSection(t)}
</main>
${siteFooter(t, ctx.year)}
</body>
</html>
`;
}
