import { html } from '../lib/html.mjs';
import { site } from '../config.mjs';
import { logoMark } from './icons.mjs';

// GitHub Pages serves a single 404.html for every locale, so it speaks all of them.
const copy = {
  pt: { title: 'Página não encontrada', text: 'O endereço pode ter mudado.', link: 'Ir para o início' },
  en: { title: 'Page not found', text: 'The address may have changed.', link: 'Go to the homepage' },
  es: { title: 'Página no encontrada', text: 'Es posible que la dirección haya cambiado.', link: 'Ir al inicio' },
};

export function renderNotFound(ctx) {
  const [base] = ctx.all;
  return html`<!doctype html>
<html lang="${base.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 · ${site.name}</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#09090b">
<meta name="color-scheme" content="dark">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/css/main.css?v=${ctx.version}">
</head>
<body>
<main class="not-found">
  <a class="brand" href="/">${logoMark(22, 'nf')}<span class="brand-name">${site.name}</span></a>
  <p class="not-found-code">404</p>
  <ul class="not-found-list">
    ${ctx.all.map((t) => {
      const c = copy[t.code] || copy.en;
      return html`<li lang="${t.htmlLang}">
        <h1 class="not-found-title">${c.title}</h1>
        <p>${c.text} <a class="text-link" href="${t.path}">${c.link}</a></p>
      </li>`;
    })}
  </ul>
</main>
</body>
</html>
`;
}
