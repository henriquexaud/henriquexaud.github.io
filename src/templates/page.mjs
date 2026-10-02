import { html, raw } from '../lib/html.mjs';
import { site, contact, founder, solutionKeys } from '../config.mjs';
import { logoMark, icons } from './icons.mjs';
import { visual } from './visuals.mjs';

const pad = (n) => String(n).padStart(2, '0');
const whatsappUrl = (message) => `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;

const SECTIONS = ['solutions', 'services', 'engineering', 'process', 'about', 'faq'];

function externalLink(href, label, t, cls = '', icon = '') {
  return html`<a class="${cls}" href="${href}" target="_blank" rel="noopener noreferrer">${icon}<span>${label}</span><span class="visually-hidden"> (${t.ui.external})</span></a>`;
}

function sectionHead(index, eyebrow, title, lead) {
  return html`<header class="section-head">
    <p class="eyebrow"><span class="eyebrow-index">${pad(index)}</span>${eyebrow}</p>
    <h2 class="section-title">${title}</h2>
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
        founder: { '@type': 'Person', name: founder.name, jobTitle: t.about.founderRole, sameAs: [founder.linkedin, founder.github] },
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
<meta property="og:image:alt" content="${site.name}: ${t.hero.eyebrow}">
<meta property="og:locale" content="${t.ogLocale}">
${all.filter((l) => l.code !== t.code).map((l) => html`<meta property="og:locale:alternate" content="${l.ogLocale}">
`)}<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/fonts/instrument-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/jetbrains-mono-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/main.css?v=${ctx.version}">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js?v=${ctx.version}" defer></script>
<script type="application/ld+json">${raw(JSON.stringify(jsonLd).replace(/</g, '\\u003c'))}</script>
</head>`;
}

function languageSwitch(t, all, cls) {
  return html`<div class="lang ${cls}" role="group" aria-label="${t.ui.language}">
    ${all.map((l) =>
      l.code === t.code
        ? html`<a class="lang-item" href="${l.path}" hreflang="${l.htmlLang}" lang="${l.htmlLang}" aria-current="true" title="${l.label}">${l.short}</a>`
        : html`<a class="lang-item" href="${l.path}" hreflang="${l.htmlLang}" lang="${l.htmlLang}" title="${l.label}">${l.short}</a>`,
    )}
  </div>`;
}

function siteHeader(t, all) {
  return html`<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="${t.path}" aria-label="${site.name}: ${t.hero.eyebrow}">${logoMark(22)}<span class="brand-name">${site.name}</span></a>
    <nav class="primary-nav" aria-label="${t.ui.primaryNav}" id="primary-nav">
      <ul class="nav-list">
        ${SECTIONS.map((id) => html`<li><a class="nav-link" href="#${id}" data-nav="${id}">${t.nav[id]}</a></li>`)}
      </ul>
      <div class="nav-mobile-extra">
        ${languageSwitch(t, all, 'lang-mobile')}
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
  const m = t.hero.meta;
  return html`<section class="hero" aria-labelledby="hero-title">
  <div class="container">
    <p class="hero-eyebrow reveal"><span class="hero-eyebrow-mark" aria-hidden="true"></span>${t.hero.eyebrow}</p>
    <h1 class="hero-title reveal" id="hero-title">${t.hero.title} <span class="hero-title-muted">${t.hero.titleMuted}</span></h1>
    <p class="hero-lead reveal">${t.hero.lead}</p>
    <div class="hero-actions reveal">
      <a class="button button-primary" href="#contact">${t.hero.primary}${icons.arrowRight}</a>
      <a class="button button-ghost" href="#solutions">${t.hero.secondary}${icons.arrowDown}</a>
    </div>
    <dl class="hero-meta reveal">
      <div class="hero-meta-item">
        <dt>${m.availability}</dt>
        <dd>${site.acceptingProjects ? html`<span class="status-dot" aria-hidden="true"></span>${m.open}` : m.closed}</dd>
      </div>
      <div class="hero-meta-item">
        <dt>${m.base}</dt>
        <dd>${m.baseValue}</dd>
      </div>
      <div class="hero-meta-item">
        <dt>${m.clock}</dt>
        <dd><time class="tabular" data-clock data-tz="${site.timeZone}" data-locale="${t.htmlLang}">--:--</time> · ${m.clockSuffix}</dd>
      </div>
      <div class="hero-meta-item">
        <dt>${m.languages}</dt>
        <dd>PT · EN · ES</dd>
      </div>
    </dl>
  </div>
</section>`;
}

function solutions(t) {
  const s = t.solutions;
  return html`<section class="section" id="solutions" aria-labelledby="solutions-title">
  <div class="container">
    ${sectionHead(1, s.eyebrow, html`<span id="solutions-title">${s.title}</span>`, s.lead)}
    <div class="solutions" data-tabs>
      <div class="solution-tabs" role="tablist" aria-label="${s.tabsLabel}" aria-orientation="horizontal">
        ${solutionKeys.map((key, i) => html`<button class="solution-tab" type="button" role="tab" id="tab-${key}" aria-controls="panel-${key}" aria-selected="${i === 0 ? 'true' : 'false'}" tabindex="${i === 0 ? '0' : '-1'}"><span class="solution-tab-index">${pad(i + 1)}</span>${s.items[key].tab}</button>`)}
      </div>
      ${solutionKeys.map((key, i) => {
        const item = s.items[key];
        return html`<div class="solution-panel" role="tabpanel" id="panel-${key}" aria-labelledby="tab-${key}" tabindex="0" ${i === 0 ? '' : raw('data-inactive')}>
        <div class="solution-copy">
          <p class="solution-kicker"><span class="solution-kicker-index">${pad(i + 1)}</span>${item.tab}</p>
          <h3 class="solution-title">${item.title}</h3>
          <p class="solution-lead">${item.lead}</p>
          <table class="compare">
            <caption class="visually-hidden">${item.tab}: ${s.beforeLabel} / ${s.afterLabel}</caption>
            <thead><tr><th scope="col">${s.beforeLabel}</th><th scope="col">${s.afterLabel}</th></tr></thead>
            <tbody>
              ${item.compare.map(([before, after]) => html`<tr><td><span class="compare-mark compare-mark-before">${icons.cross}</span><span class="visually-hidden">${s.beforeLabel}: </span>${before}</td><td><span class="compare-mark compare-mark-after">${icons.check}</span><span class="visually-hidden">${s.afterLabel}: </span>${after}</td></tr>`)}
            </tbody>
          </table>
        </div>
        <div class="solution-side">
          <figure class="solution-visual" data-visual>
            ${visual(key, t.visuals[key], `${item.tab}: ${item.title}`)}
          </figure>
          <div class="solution-details">
            <h4 class="mini-label">${s.modulesLabel}</h4>
            <ul class="module-list">
              ${item.modules.map((m) => html`<li>${m}</li>`)}
            </ul>
            <h4 class="mini-label">${s.integrationsLabel}</h4>
            <ul class="chip-list">
              ${item.integrations.map((m) => html`<li class="chip">${m}</li>`)}
            </ul>
          </div>
          ${externalLink(whatsappUrl(item.message), s.cta, t, 'text-link', icons.whatsapp)}
        </div>
      </div>`;
      })}
    </div>
    <p class="solutions-other">${s.other} <a class="text-link" href="#contact">${s.otherCta}${icons.arrowRight}</a></p>
  </div>
</section>`;
}

function services(t) {
  const s = t.services;
  return html`<section class="section" id="services" aria-labelledby="services-title">
  <div class="container">
    ${sectionHead(2, s.eyebrow, html`<span id="services-title">${s.title}</span>`, s.lead)}
    <ol class="service-grid">
      ${s.items.map((item, i) => html`<li class="service reveal" style="--d:${i % 4}">
        <span class="service-index">${pad(i + 1)}</span>
        <h3 class="service-title">${item.title}</h3>
        <p class="service-text">${item.text}</p>
        <p class="service-tags">${item.tags}</p>
      </li>`)}
    </ol>
  </div>
</section>`;
}

function engineering(t) {
  const e = t.engineering;
  return html`<section class="section" id="engineering" aria-labelledby="engineering-title">
  <div class="container">
    ${sectionHead(3, e.eyebrow, html`<span id="engineering-title">${e.title}</span>`, e.lead)}
    <div class="engineering">
      <div class="proof reveal">
        <h3 class="mini-label">${e.proofTitle}</h3>
        <ul class="proof-list">
          ${e.proof.map((p) => html`<li><span class="proof-tag">${p.tag}</span><p>${p.text}</p></li>`)}
        </ul>
      </div>
      <ul class="guarantee-grid">
        ${e.guarantees.map((g, i) => html`<li class="guarantee reveal" style="--d:${i % 2}">
          <h3 class="guarantee-title">${g.title}</h3>
          <p class="guarantee-text">${g.text}</p>
          <p class="guarantee-tech">${g.tech}</p>
        </li>`)}
      </ul>
    </div>
    <div class="stack reveal">
      <h3 class="mini-label">${e.stackTitle}</h3>
      <dl class="stack-grid">
        ${e.stack.map((g) => html`<div class="stack-row"><dt>${g.layer}</dt><dd>${g.items.join(' · ')}</dd></div>`)}
      </dl>
    </div>
  </div>
</section>`;
}

function process(t) {
  const p = t.process;
  return html`<section class="section" id="process" aria-labelledby="process-title">
  <div class="container">
    ${sectionHead(4, p.eyebrow, html`<span id="process-title">${p.title}</span>`, p.lead)}
    <ol class="process">
      ${p.steps.map((step, i) => html`<li class="process-step reveal" style="--d:${i}">
        <span class="process-node" aria-hidden="true"></span>
        <span class="process-index">${pad(i + 1)}</span>
        <h3 class="process-title">${step.title}</h3>
        <p class="process-text">${step.text}</p>
        <p class="process-out"><span>${p.outLabel}</span>${step.out}</p>
      </li>`)}
    </ol>
  </div>
</section>`;
}

function principles(t) {
  const p = t.principles;
  return html`<section class="section section-tight" aria-labelledby="principles-title">
  <div class="container">
    ${sectionHead(5, p.eyebrow, html`<span id="principles-title">${p.title}</span>`)}
    <ul class="principle-grid">
      ${p.items.map((item, i) => html`<li class="principle reveal" style="--d:${i % 3}">
        <p class="principle-tag">${item.tag}</p>
        <h3 class="principle-title">${item.title}</h3>
        <p class="principle-text">${item.text}</p>
      </li>`)}
    </ul>
  </div>
</section>`;
}

function about(t) {
  const a = t.about;
  return html`<section class="section" id="about" aria-labelledby="about-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        <p class="eyebrow"><span class="eyebrow-index">06</span>${a.eyebrow}</p>
        <h2 class="section-title" id="about-title">${a.title}</h2>
        ${a.paragraphs.map((p) => html`<p class="about-text reveal">${p}</p>`)}
      </div>
      <aside class="founder reveal" aria-label="${founder.name}">
        <div class="founder-head">
          <span class="founder-avatar" aria-hidden="true">HX</span>
          <div>
            <p class="founder-name">${founder.name}</p>
            <p class="founder-role">${a.founderRole}</p>
          </div>
        </div>
        <p class="founder-bio">${a.founderBio}</p>
        <dl class="founder-facts">
          ${a.facts.map((f) => html`<div><dt>${f.label}</dt><dd>${f.value}</dd></div>`)}
        </dl>
        <div class="founder-links">
          ${externalLink(founder.linkedin, 'LinkedIn', t, 'icon-link', icons.linkedin)}
          ${externalLink(founder.github, 'GitHub', t, 'icon-link', icons.github)}
        </div>
      </aside>
    </div>
  </div>
</section>`;
}

function engagementAndFaq(t) {
  const e = t.engagement;
  const f = t.faq;
  return html`<section class="section" id="faq" aria-labelledby="engagement-title">
  <div class="container">
    ${sectionHead(7, e.eyebrow, html`<span id="engagement-title">${e.title}</span>`)}
    <ul class="model-grid">
      ${e.models.map((m, i) => html`<li class="model reveal" style="--d:${i}">
        <h3 class="model-title">${m.title}</h3>
        <p class="model-text">${m.text}</p>
        <p class="model-fit"><span>${e.fitLabel}</span>${m.fit}</p>
      </li>`)}
    </ul>
    <div class="faq">
      <div class="faq-head">
        <p class="eyebrow">${f.eyebrow}</p>
        <h2 class="faq-title">${f.title}</h2>
      </div>
      <div class="faq-list">
        ${f.items.map((item) => html`<details class="faq-item">
          <summary><span>${item.q}</span>${icons.plus}</summary>
          <p>${item.a}</p>
        </details>`)}
      </div>
    </div>
  </div>
</section>`;
}

function contactSection(t) {
  const c = t.contact;
  return html`<section class="section contact" id="contact" aria-labelledby="contact-title">
  <div class="container">
    <div class="contact-card reveal">
      <div class="contact-main">
        <p class="eyebrow"><span class="eyebrow-index">08</span>${c.eyebrow}</p>
        <h2 class="contact-title" id="contact-title">${c.title}</h2>
        <p class="contact-lead">${c.lead}</p>
        <div class="contact-actions">
          ${externalLink(whatsappUrl(c.whatsappMessage), c.whatsapp, t, 'button button-primary button-large', icons.whatsapp)}
          ${externalLink(contact.linkedin, c.linkedin, t, 'button button-ghost button-large', icons.linkedin)}
          ${contact.email ? html`<a class="button button-ghost button-large" href="mailto:${contact.email}">${icons.mail}<span>${contact.email}</span></a>` : ''}
        </div>
      </div>
      <div class="contact-side">
        <h3 class="mini-label">${c.checklistTitle}</h3>
        <ol class="checklist">
          ${c.checklist.map((item, i) => html`<li><span>${pad(i + 1)}</span>${item}</li>`)}
        </ol>
      </div>
    </div>
  </div>
</section>`;
}

function siteFooter(t, all, year) {
  const f = t.footer;
  return html`<footer class="site-footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand" href="${t.path}">${logoMark(20)}<span class="brand-name">${site.name}</span></a>
        <p class="footer-tagline">${f.tagline}</p>
      </div>
      <nav class="footer-col" aria-label="${f.studio}">
        <h2 class="footer-heading">${f.studio}</h2>
        <ul>${SECTIONS.map((id) => html`<li><a href="#${id}">${t.nav[id]}</a></li>`)}</ul>
      </nav>
      <nav class="footer-col" aria-label="${f.solutions}">
        <h2 class="footer-heading">${f.solutions}</h2>
        <ul>${solutionKeys.map((key) => html`<li><a href="#solutions" data-tab-link="${key}">${t.solutions.items[key].tab}</a></li>`)}</ul>
      </nav>
      <div class="footer-col">
        <h2 class="footer-heading">${f.contact}</h2>
        <ul>
          <li>${externalLink(whatsappUrl(t.contact.whatsappMessage), 'WhatsApp', t)}</li>
          <li>${externalLink(contact.linkedin, 'LinkedIn', t)}</li>
          ${contact.email ? html`<li><a href="mailto:${contact.email}">${contact.email}</a></li>` : ''}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${site.foundingYear}–${year} ${site.name}. ${f.rights}</p>
      ${languageSwitch(t, all, 'lang-footer')}
      <p class="footer-built">${f.built}</p>
    </div>
  </div>
</footer>`;
}

export function renderPage(t, ctx) {
  const body = html`<!doctype html>
<html lang="${t.htmlLang}">
${head(t, ctx)}
<body>
<a class="skip-link" href="#main">${t.ui.skip}</a>
${siteHeader(t, ctx.all)}
<main id="main">
${hero(t)}
${solutions(t)}
${services(t)}
${engineering(t)}
${process(t)}
${principles(t)}
${about(t)}
${engagementAndFaq(t)}
${contactSection(t)}
</main>
${siteFooter(t, ctx.all, ctx.year)}
</body>
</html>
`;
  return body;
}
