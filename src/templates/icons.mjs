import { raw } from '../lib/html.mjs';

// The DuaTech mark: a "D" split in two parts (dua = two).
export const logoMark = (size = 22) =>
  raw(`<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect class="logo-bar" x="2.5" y="3" width="5" height="18" rx="1.25"/><path class="logo-bowl" d="M10 3h1.5a9 9 0 0 1 0 18H10z"/></svg>`);

const icon = (body, cls = 'icon') =>
  raw(`<svg class="${cls}" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">${body}</svg>`);

export const icons = {
  arrowRight: icon('<path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>', 'icon icon-arrow'),
  arrowDown: icon('<path d="M8 3v10M4 9l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'),
  external: icon('<path d="M6 3h7v7M13 3 4 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>', 'icon icon-ext'),
  plus: icon('<path d="M8 3v10M3 8h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>', 'icon icon-plus'),
  check: icon('<path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'),
  cross: icon('<path d="m4.5 4.5 7 7m0-7-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  menu: icon('<path d="M2.5 5.5h11M2.5 10.5h11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  close: icon('<path d="m4 4 8 8m0-8-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  whatsapp: icon('<path fill="currentColor" d="M13.6 2.3A7.4 7.4 0 0 0 1.9 11.2L.9 15l3.9-1a7.4 7.4 0 0 0 3.5.9 7.4 7.4 0 0 0 5.3-12.6Zm-5.3 11.4a6.1 6.1 0 0 1-3.1-.9l-.2-.1-2.3.6.6-2.3-.2-.2a6.1 6.1 0 1 1 5.2 2.9Zm3.4-4.6c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.4.1l-.6.7c-.1.1-.2.1-.4 0a5 5 0 0 1-2.5-2.2c-.2-.3.2-.3.5-1 .1-.1 0-.2 0-.3l-.6-1.4c-.1-.4-.3-.3-.4-.3h-.4a.7.7 0 0 0-.5.2 2.1 2.1 0 0 0-.7 1.6 3.7 3.7 0 0 0 .8 2 8.4 8.4 0 0 0 3.2 2.8c1.2.5 1.7.6 2.3.5a2 2 0 0 0 1.3-.9 1.6 1.6 0 0 0 .1-.9c0-.1-.2-.2-.4-.3Z"/>'),
  linkedin: icon('<path fill="currentColor" d="M13.6 1H2.4A1.4 1.4 0 0 0 1 2.4v11.2A1.4 1.4 0 0 0 2.4 15h11.2a1.4 1.4 0 0 0 1.4-1.4V2.4A1.4 1.4 0 0 0 13.6 1ZM5.2 12.9H3.1V6.2h2.1ZM4.1 5.3a1.2 1.2 0 1 1 1.2-1.2 1.2 1.2 0 0 1-1.2 1.2Zm8.8 7.6h-2.1V9.6c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8v3.3H6.3V6.2h2v.9a2.2 2.2 0 0 1 2-1.1c2.1 0 2.5 1.4 2.5 3.2Z"/>'),
  github: icon('<path fill="currentColor" d="M8 .8a7.2 7.2 0 0 0-2.3 14c.4.1.5-.2.5-.4v-1.3c-2 .4-2.4-.9-2.4-.9a1.9 1.9 0 0 0-.8-1c-.7-.5 0-.5 0-.5a1.5 1.5 0 0 1 1.1.7 1.5 1.5 0 0 0 2.1.6 1.5 1.5 0 0 1 .4-1c-1.6-.2-3.3-.8-3.3-3.6a2.8 2.8 0 0 1 .8-1.9 2.6 2.6 0 0 1 .1-1.9s.6-.2 2 .7a6.8 6.8 0 0 1 3.6 0c1.4-.9 2-.7 2-.7a2.6 2.6 0 0 1 .1 1.9 2.8 2.8 0 0 1 .7 1.9c0 2.8-1.7 3.4-3.3 3.6a1.7 1.7 0 0 1 .5 1.3v2c0 .2.1.5.5.4A7.2 7.2 0 0 0 8 .8Z"/>'),
  mail: icon('<path d="M2 4h12v8H2zM2 4.5l6 4.5 6-4.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>'),
};
