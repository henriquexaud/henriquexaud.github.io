// Site-wide settings that do not depend on the language.
// Copy lives in src/i18n/<locale>.mjs.

export const site = {
  name: 'DuaTech',
  url: 'https://henriquexaud.github.io',
  foundingYear: 2021,
};

export const contact = {
  whatsapp: '5512981324077',
  // Optional: set an address (e.g. 'contato@duatech.com.br') to show an e-mail link.
  email: null,
  linkedin: 'https://www.linkedin.com/in/henrique-xaud/',
  github: 'https://github.com/henriquexaud',
};

export const founder = {
  name: 'Henrique Xaud',
  linkedin: contact.linkedin,
  github: contact.github,
};

// The first locale is the default one and is served from the site root.
// To add a language: create src/i18n/<code>.mjs (copy an existing file) and list it here.
export const locales = ['pt', 'en', 'es'];

// Order of the solutions in the page. Keys must exist in every locale file.
export const solutionKeys = ['ecommerce', 'logistics', 'restaurants', 'hospitality', 'appointments', 'gyms', 'teams'];
