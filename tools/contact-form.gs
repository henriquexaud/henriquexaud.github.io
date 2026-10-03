/**
 * Duvalle — contact form backend (Google Apps Script).
 *
 * Receives the site's contact form, saves each message as a row in the Google Sheet this
 * script is attached to, sends the visitor an automatic reply and notifies you.
 * Free, runs on your Google account, sends from your Gmail.
 *
 * Setup (once, ~5 minutes):
 *  1. Create a Google Sheet (e.g. "Duvalle — contatos").
 *  2. In it: Extensions → Apps Script. Replace the editor's content with this file. Save.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me        Who has access: Anyone
 *     Authorize when asked (Google warns because the script is yours and unverified:
 *     Advanced → Go to project).
 *  4. Copy the web app URL (ends in /exec) into `formEndpoint` in src/config.mjs and run
 *     `npm run build`.
 *  After changing this script: Deploy → Manage deployments → edit → Version: New version
 *  (the URL stays the same).
 */

// Who gets notified of each new message. Empty = the account that owns the script.
const NOTIFY_TO = '';
const SENDER_NAME = 'Duvalle';

// The automatic reply, one per site language. Edit freely.
const REPLIES = {
  pt: {
    subject: 'Recebemos sua mensagem — Duvalle',
    body: 'Olá!\n\nObrigado por escrever para a Duvalle. Recebemos sua mensagem e respondemos pessoalmente em breve, normalmente em até um dia útil.\n\nSe quiser adiantar a conversa, é só responder este e-mail contando um pouco mais sobre o seu negócio e o que precisa melhorar.\n\nAté já,\nDuvalle',
  },
  en: {
    subject: 'We got your message — Duvalle',
    body: 'Hi!\n\nThanks for writing to Duvalle. We received your message and will reply personally soon, usually within one business day.\n\nIf you want to get ahead, just reply to this e-mail telling us a bit more about your business and what needs to improve.\n\nTalk soon,\nDuvalle',
  },
  es: {
    subject: 'Recibimos tu mensaje — Duvalle',
    body: '¡Hola!\n\nGracias por escribir a Duvalle. Recibimos tu mensaje y te responderemos personalmente pronto, normalmente en un día hábil.\n\nSi quieres adelantar la conversación, responde este correo contándonos un poco más sobre tu negocio y lo que necesita mejorar.\n\nHasta pronto,\nDuvalle',
  },
};

function doPost(e) {
  try {
    const data = parse_(e);
    if (data.website) return json_({ ok: true }); // hidden field filled: a bot

    const email = String(data.email || '').trim().slice(0, 254);
    const message = String(data.message || '').trim().slice(0, 5000);
    const lang = REPLIES[data.lang] ? data.lang : 'pt';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'email' });
    if (!message) return json_({ ok: false, error: 'message' });

    // At most one message per address every 2 minutes.
    const cache = CacheService.getScriptCache();
    const key = 'sent:' + email.toLowerCase();
    if (cache.get(key)) return json_({ ok: true });
    cache.put(key, '1', 120);

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(['Data', 'E-mail', 'Idioma', 'Mensagem', 'Página']);
    sheet.appendRow([new Date(), email, lang, message, String(data.page || '').slice(0, 300)]);

    const reply = REPLIES[lang];
    const owner = NOTIFY_TO || Session.getEffectiveUser().getEmail();
    MailApp.sendEmail({ to: email, subject: reply.subject, body: reply.body, name: SENDER_NAME, replyTo: owner });
    MailApp.sendEmail({
      to: owner,
      subject: 'Novo contato pelo site: ' + email,
      body: message + '\n\n— ' + email + ' (' + lang + ')',
      name: 'Site Duvalle',
      replyTo: email,
    });
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// The site sends JSON as text/plain; a form posted without JavaScript arrives as fields.
function parse_(e) {
  if (e && e.postData && e.postData.type !== 'application/x-www-form-urlencoded') {
    try {
      return JSON.parse(e.postData.contents);
    } catch (_) {}
  }
  return (e && e.parameter) || {};
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
