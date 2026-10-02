import { html, raw } from '../lib/html.mjs';
import { site, contact, founder, solutionKeys } from '../config.mjs';
import { logoMark, icons, valueIcons, flag, chevronDown } from './icons.mjs';
import { visual } from './visuals.mjs';

const pad = (n) => String(n).padStart(2, '0');
const whatsappUrl = (message) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

const NAV = ['solutions', 'services', 'process', 'about', 'faq'];

function externalLink(href, label, t, cls = '', icon = '') {
  return html`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${icon}<span>${label}</span><span class="visually-hidden"> (${t.ui.external})</span></a>`;
}

function sectionHead(id, eyebrow, title, lead) {
  return html`<header class="section-head">
    <p class="eyebrow">${eyebrow}</p>
    <h2 class="section-title" id="${id}-title">${title}</h2>
    ${lead ? html`<p class="section-lead">${lead}</p>` : ''}
  </header>`;
}

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
          itemListElement: t.services.items.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.text } })),
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
  <div class="container header-inner">
    <a class="brand" href="${t.path}" aria-label="${site.name}">${logoMark(22)}<span class="brand-name">${site.name}</span></a>
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
      <a class="button button-small button-light header-cta" href="#contact">${t.nav.cta}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" data-menu-toggle data-label-open="${t.ui.menu}" data-label-close="${t.ui.closeMenu}">
        <span class="menu-toggle-icon" aria-hidden="true"><span></span><span></span></span>
        <span class="visually-hidden" data-menu-label>${t.ui.menu}</span>
      </button>
    </div>
  </div>
</header>`;
}

function hero(t) {
  return html`<section class="hero" aria-labelledby="hero-title">
  <div class="container">
    <p class="eyebrow hero-eyebrow reveal">${t.hero.eyebrow}</p>
    <h1 class="hero-title reveal" id="hero-title">${t.hero.title} <span class="hero-title-muted">${t.hero.titleMuted}</span></h1>
    <p class="hero-lead reveal">${t.hero.lead}</p>
    <div class="hero-actions reveal">
      <a class="button button-primary button-large" href="#contact">${t.hero.primary}${icons.arrowRight}</a>
      <a class="button button-ghost button-large" href="#solutions">${t.hero.secondary}</a>
    </div>
  </div>
</section>`;
}

function solutions(t) {
  const s = t.solutions;
  return html`<section class="section" id="solutions" aria-labelledby="solutions-title">
  <div class="container">
    ${sectionHead('solutions', s.eyebrow, s.title, s.lead)}
    <div class="solutions" data-tabs>
      <div class="solution-tabs" role="tablist" aria-label="${s.tabsLabel}">
        ${solutionKeys.map((key, i) => html`<button class="solution-tab" type="button" role="tab" id="tab-${key}" aria-controls="panel-${key}" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}">${s.items[key].tab}</button>`)}
      </div>
      ${solutionKeys.map((key, i) => {
        const item = s.items[key];
        return html`<div class="solution-panel" role="tabpanel" id="panel-${key}" aria-labelledby="tab-${key}" tabindex="0" ${i === 0 ? '' : raw('data-inactive')}>
        <div class="solution-copy">
          <p class="solution-kicker">${item.tab}</p>
          <h3 class="solution-title">${item.title}</h3>
          <p class="solution-lead">${item.lead}</p>
          <ul class="benefits">
            ${item.benefits.map((b) => html`<li><span class="benefit-mark">${icons.check}</span><span>${b}</span></li>`)}
          </ul>
        </div>
        <figure class="solution-visual" data-visual>
          ${visual(key, t.visuals[key], `${item.tab}: ${item.title}`)}
        </figure>
      </div>`;
      })}
    </div>
  </div>
</section>`;
}

function services(t) {
  const s = t.services;
  return html`<section class="section" id="services" aria-labelledby="services-title">
  <div class="container">
    ${sectionHead('services', s.eyebrow, s.title)}
    <ul class="service-grid">
      ${s.items.map((item, i) => html`<li class="service reveal" style="--d:${i % 3}">
        <h3 class="service-title">${item.title}</h3>
        <p class="service-text">${item.text}</p>
      </li>`)}
    </ul>
  </div>
</section>`;
}

function why(t) {
  const w = t.why;
  return html`<section class="section" aria-labelledby="why-title">
  <div class="container">
    ${sectionHead('why', w.eyebrow, w.title)}
    <ul class="value-grid">
      ${w.items.map((item, i) => html`<li class="value reveal" style="--d:${i}">
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
  return html`<section class="section" id="process" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead('process', p.eyebrow, p.title)}
    <ol class="process">
      ${p.steps.map((step, i) => html`<li class="process-step reveal" style="--d:${i}">
        <span class="process-index" aria-hidden="true">${pad(i + 1)}</span>
        <h3 class="process-title">${step.title}</h3>
        <p class="process-text">${step.text}</p>
      </li>`)}
    </ol>
  </div>
</section>`;
}

function about(t) {
  const a = t.about;
  return html`<section class="section" id="about" aria-labelledby="about-title">
  <div class="container about">
    <div class="about-copy">
      <p class="eyebrow">${a.eyebrow}</p>
      <h2 class="section-title" id="about-title">${a.title}</h2>
      <p class="about-text reveal">${a.text}</p>
    </div>
    <div class="founder reveal">
      <span class="founder-avatar" aria-hidden="true">HX</span>
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
  return html`<section class="section" id="faq" aria-labelledby="faq-title">
  <div class="container faq">
    ${sectionHead('faq', f.eyebrow, f.title)}
    <div class="faq-list">
      ${f.items.map((item) => html`<details class="faq-item">
        <summary><span>${item.q}</span>${icons.plus}</summary>
        <p>${item.a}</p>
      </details>`)}
    </div>
  </div>
</section>`;
}

function contactSection(t) {
  const c = t.contact;
  return html`<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="container">
    <div class="contact-card reveal">
      <p class="eyebrow">${c.eyebrow}</p>
      <h2 class="contact-title" id="contact-title">${c.title}</h2>
      <p class="contact-lead">${c.lead}</p>
      <div class="contact-actions">
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
      <a class="brand" href="${t.path}">${logoMark(20)}<span class="brand-name">${site.name}</span></a>
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
