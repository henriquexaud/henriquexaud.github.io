// Site-wide settings that do not depend on the language.
// Copy lives in src/i18n/<locale>.mjs.

export const site = {
  name: 'Duvalle',
  url: 'https://henriquexaud.github.io',
  foundingYear: 2021,
};

export const contact = {
  // Where the contact form sends its messages: the URL of the Google Apps Script web app
  // described in tools/contact-form.gs (it saves each message in a Google Sheet and sends
  // the automatic reply). Ends in /exec. While it is null the form can't send.
  formEndpoint: null,
};

export const founder = {
  name: 'Henrique Xaud',
};

// The first locale is the default one and is served from the site root.
// To add a language: create src/i18n/<code>.mjs (copy an existing file) and list it here.
export const locales = ['pt', 'en', 'es'];

// Order of the solutions in the page. Keys must exist in every locale file.
export const solutionKeys = ['ecommerce', 'logistics', 'restaurants', 'hospitality', 'appointments'];
