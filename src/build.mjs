// Generates the static site from src/ into the repository root (served by GitHub Pages).
// Usage: node src/build.mjs

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site, locales, solutionKeys } from './config.mjs';
import { toString } from './lib/html.mjs';
import { renderPage } from './templates/page.mjs';
import { renderNotFound } from './templates/not-found.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function write(relPath, content) {
  const file = join(root, relPath);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log(`  ${relPath}  ${(Buffer.byteLength(content) / 1024).toFixed(1)} KB`);
}

// Integration lists may differ per market (e.g. Pix only matters in Brazil).
const FREE_LENGTH = new Set(['integrations']);

function checkLocale(t, reference) {
  const missing = [];
  const walk = (ref, obj, path) => {
    for (const key of Object.keys(ref)) {
      const p = path ? `${path}.${key}` : key;
      if (!(key in obj)) missing.push(p);
      else if (ref[key] && typeof ref[key] === 'object' && !Array.isArray(ref[key])) walk(ref[key], obj[key], p);
      else if (Array.isArray(ref[key]) && !FREE_LENGTH.has(key) && (!Array.isArray(obj[key]) || obj[key].length !== ref[key].length)) missing.push(`${p} (length)`);
    }
  };
  walk(reference, t, '');
  for (const key of solutionKeys) if (!t.solutions.items[key]) missing.push(`solutions.items.${key}`);
  if (missing.length) throw new Error(`Locale "${t.code}" is missing: ${missing.join(', ')}`);
}

// LOCALES=pt builds a subset (handy while translating).
const codes = process.env.LOCALES ? process.env.LOCALES.split(',') : locales;
const all = [];
for (const code of codes) {
  const mod = await import(`./i18n/${code}.mjs`);
  all.push(mod.default);
}
all.forEach((t) => checkLocale(t, all[0]));

const version = createHash('sha256')
  .update(readFileSync(join(root, 'assets/css/main.css')))
  .update(readFileSync(join(root, 'assets/js/main.js')))
  .digest('hex')
  .slice(0, 8);

const ctx = { all, version, year: new Date().getFullYear() };

console.log('Building pages');
for (const t of all) {
  write(join(t.path, 'index.html').replace(/^\//, ''), toString(renderPage(t, ctx)));
}
write('404.html', toString(renderNotFound(ctx)));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${all
  .map(
    (t) => `  <url>
    <loc>${site.url + t.path}</loc>
    <lastmod>${today}</lastmod>
${all.map((l) => `    <xhtml:link rel="alternate" hreflang="${l.htmlLang}" href="${site.url + l.path}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}/"/>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

const base = all[0];
write(
  'site.webmanifest',
  JSON.stringify(
    {
      name: site.name,
      short_name: site.name,
      description: base.meta.description,
      lang: base.htmlLang,
      start_url: '/',
      display: 'browser',
      background_color: '#09090b',
      theme_color: '#09090b',
      icons: [
        { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  ) + '\n',
);
console.log('Done.');
