import { raw } from '../lib/html.mjs';

// The DuaTech mark: a "D" split in two parts (dua = two).
export const logoMark = (size = 22) =>
  raw(`<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect class="logo-bar" x="2.5" y="3" width="5" height="18" rx="1.25"/><path class="logo-bowl" d="M10 3h1.5a9 9 0 0 1 0 18H10z"/></svg>`);

const icon = (body, cls = 'icon') =>
  raw(`<svg class="${cls}" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${body}</svg>`);

export const icons = {
  arrowRight: icon('<path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>', 'icon icon-arrow'),
  arrowUp: icon('<path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>', 'icon icon-up'),
  plus: icon('<path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', 'icon icon-plus'),
  check: icon('<path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'),
  whatsapp: icon('<path fill="currentColor" d="M13.6 2.3A7.4 7.4 0 0 0 1.9 11.2L.9 15l3.9-1a7.4 7.4 0 0 0 3.5.9 7.4 7.4 0 0 0 5.3-12.6Zm-5.3 11.4a6.1 6.1 0 0 1-3.1-.9l-.2-.1-2.3.6.6-2.3-.2-.2a6.1 6.1 0 1 1 5.2 2.9Zm3.4-4.6c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0a5 5 0 0 1-2.5-2.2c-.2-.3.2-.3.5-1 .1-.1 0-.2 0-.3l-.6-1.4c-.1-.4-.3-.3-.4-.3h-.4a.7.7 0 0 0-.5.2 2.1 2.1 0 0 0-.7 1.6 3.7 3.7 0 0 0 .8 2 8.4 8.4 0 0 0 3.2 2.8c1.2.5 1.7.6 2.3.5a2 2 0 0 0 1.3-.9 1.6 1.6 0 0 0 .1-.9c0-.1-.2-.2-.4-.3Z"/>'),
  linkedin: icon('<path fill="currentColor" d="M13.6 1H2.4A1.4 1.4 0 0 0 1 2.4v11.2A1.4 1.4 0 0 0 2.4 15h11.2a1.4 1.4 0 0 0 1.4-1.4V2.4A1.4 1.4 0 0 0 13.6 1ZM5.2 12.9H3.1V6.2h2.1ZM4.1 5.3a1.2 1.2 0 1 1 1.2-1.2 1.2 1.2 0 0 1-1.2 1.2Zm8.8 7.6h-2.1V9.6c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8v3.3H6.3V6.2h2v.9a2.2 2.2 0 0 1 2-1.1c2.1 0 2.5 1.4 2.5 3.2Z"/>'),
  mail: icon('<path d="M2 4h12v8H2zM2 4.5l6 4.5 6-4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'),
};

const valueIcon = (body) =>
  raw(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`);

// Line icons for the "why DuaTech" values.
export const valueIcons = {
  fit: valueIcon('<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>'),
  shield: valueIcon('<path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6z"/><path d="m9 12 2 2 4-4"/>'),
  key: valueIcon('<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/>'),
  chat: valueIcon('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>'),
};

const serviceIcon = (body) =>
  raw(`<svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`);

// Drafting-style icons for the three service fronts.
export const serviceIcons = {
  build: serviceIcon('<path d="M16 4 27 10.3v12.4L16 29 5 22.7V10.3z"/><path d="M5 10.3 16 16.6l11-6.3M16 16.6V29"/><path d="M16 4v4M27 10.3l-3.5 2" stroke-dasharray="1.5 2.5" opacity=".6"/>'),
  connect: serviceIcon('<circle cx="7" cy="23" r="3"/><circle cx="25" cy="23" r="3"/><circle cx="16" cy="8" r="3"/><path d="M14.4 10.6 8.6 20.4M17.6 10.6l5.8 9.8M10 23h12"/>'),
  evolve: serviceIcon('<path d="M5 26h5v-5h5v-5h5v-5h5"/><path d="M21 6h5v5"/><path d="m26 6-7 7" stroke-dasharray="1.5 2.5" opacity=".6"/>'),
};

// Round flags for the language menu (cropped to a circle by CSS).
const usStripes = Array.from({ length: 7 }, (_, i) => `<rect y="${(i * 2 * 24) / 13}" width="24" height="${24 / 13}" fill="#B22234"/>`).join('');
const usStars = [2.2, 5.5, 8.8]
  .flatMap((x) => [2.2, 5.5, 8.8, 11.4].map((y) => `<circle cx="${x}" cy="${y}" r="0.7" fill="#fff"/>`))
  .join('');

const flagSvgs = {
  br: '<rect width="24" height="24" fill="#009B3A"/><path d="M12 3.6 22.4 12 12 20.4 1.6 12z" fill="#FEDF00"/><circle cx="12" cy="12" r="5" fill="#002776"/><path d="M7.1 11.1c3.3-.9 6.8-.4 9.8 1.4" fill="none" stroke="#fff" stroke-width="0.9"/>',
  us: `<rect width="24" height="24" fill="#fff"/>${usStripes}<rect width="11" height="${(24 * 7) / 13}" fill="#3C3B6E"/>${usStars}`,
  es: '<rect width="24" height="24" fill="#AA151B"/><rect y="6" width="24" height="12" fill="#F1BF00"/>',
};

export const flag = (code, size = 20) =>
  raw(`<span class="flag" style="--flag-size:${size}px"><svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${flagSvgs[code]}</svg></span>`);

export const chevronDown = raw(
  '<svg class="icon icon-chevron" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m4.5 6.5 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
);
