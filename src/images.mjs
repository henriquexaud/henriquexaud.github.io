// Renders the favicon set and the Open Graph images (one per locale) with a headless browser.
// Only needed when the brand or the hero copy changes; the output is committed.
// Usage: npm run images   (requires the dev dependency "playwright")

import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { site, locales } from './config.mjs';
import { escape } from './lib/html.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const img = join(root, 'assets/img');
const fontUrl = (file) => pathToFileURL(join(root, 'assets/fonts', file)).href;

const mark = (size, bar = '#c8f169', bowl = '#ededef') =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><rect x="2.5" y="3" width="5" height="18" rx="1.25" fill="${bar}"/><path d="M10 3h1.5a9 9 0 0 1 0 18H10z" fill="${bowl}"/></svg>`;

// Favicon: the mark on a dark rounded tile.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#09090b"/><g transform="translate(5 5) scale(0.9166)"><rect x="2.5" y="3" width="5" height="18" rx="1.25" fill="#c8f169"/><path d="M10 3h1.5a9 9 0 0 1 0 18H10z" fill="#ededef"/></g></svg>\n`;
writeFileSync(join(img, 'favicon.svg'), faviconSvg);

const fonts = `
@font-face { font-family: 'Instrument Sans'; src: url('${fontUrl('instrument-sans-latin.woff2')}') format('woff2'); font-weight: 400 700; }
@font-face { font-family: 'JetBrains Mono'; src: url('${fontUrl('jetbrains-mono-latin.woff2')}') format('woff2'); font-weight: 400 500; }`;

const tmp = mkdtempSync(join(tmpdir(), 'duatech-'));
const browser = await chromium.launch();

async function render(name, width, height, body, type = 'png') {
  const file = join(tmp, `${name}.html`);
  writeFileSync(file, `<!doctype html><meta charset="utf-8"><style>${fonts}
    * { margin: 0; box-sizing: border-box; }
    html, body { width: ${width}px; height: ${height}px; background: transparent; }
  </style>${body}`);
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot({ type, omitBackground: true });
  await page.close();
  return buffer;
}

const tile = (size, radius) =>
  `<div style="width:${size}px;height:${size}px;border-radius:${radius}px;background:#09090b;display:grid;place-items:center">${mark(Math.round(size * 0.62))}</div>`;

writeFileSync(join(img, 'apple-touch-icon.png'), await render('apple', 180, 180, `<div style="width:180px;height:180px;background:#09090b;display:grid;place-items:center">${mark(112)}</div>`));
writeFileSync(join(img, 'icon-192.png'), await render('i192', 192, 192, tile(192, 40)));
writeFileSync(join(img, 'icon-512.png'), await render('i512', 512, 512, tile(512, 108)));

// favicon.ico: a single 32×32 PNG wrapped in an ICO container.
const png32 = await render('f32', 32, 32, tile(32, 7));
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6);
header.writeUInt8(32, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png32.length, 14);
header.writeUInt32LE(22, 18);
writeFileSync(join(root, 'favicon.ico'), Buffer.concat([header, png32]));

for (const code of locales) {
  const t = (await import(`./i18n/${code}.mjs`)).default;
  const solutions = Object.values(t.solutions.items).map((s) => s.tab);
  const body = `<div style="position:relative;width:1200px;height:630px;background:#09090b;color:#ededef;font-family:'Instrument Sans';overflow:hidden">
    <div style="position:absolute;inset:0 72px;border-left:1px solid rgb(255 255 255/.08);border-right:1px solid rgb(255 255 255/.08)"></div>
    <div style="position:absolute;left:0;right:0;top:120px;border-top:1px solid rgb(255 255 255/.08)"></div>
    <div style="position:absolute;left:0;right:0;bottom:120px;border-top:1px solid rgb(255 255 255/.08)"></div>
    <div style="position:absolute;left:112px;top:44px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600;letter-spacing:-.02em">${mark(32)}${site.name}</div>
    <div style="position:absolute;right:112px;top:56px;font-family:'JetBrains Mono';font-size:17px;letter-spacing:.08em;text-transform:uppercase;color:#a3a6ad;display:flex;align-items:center;gap:12px"><span style="width:10px;height:10px;border-radius:2px;background:#c8f169"></span>${escape(t.hero.eyebrow)}</div>
    <div style="position:absolute;left:112px;right:112px;top:168px;font-size:76px;font-weight:600;line-height:1;letter-spacing:-.045em">${escape(t.hero.title)} <span style="color:#80848d">${escape(t.hero.titleMuted)}</span></div>
    <div style="position:absolute;left:112px;right:112px;bottom:46px;display:flex;justify-content:space-between;font-family:'JetBrains Mono';font-size:16px;color:#80848d">
      <span>${escape(solutions.slice(0, 3).join(' · '))}</span><span>${site.url.replace('https://', '')}</span>
    </div>
  </div>`;
  writeFileSync(join(img, `og-${code}.png`), await render(`og-${code}`, 1200, 630, body));
}

await browser.close();
console.log('Images written to assets/img and favicon.ico');
