// Schematic product interfaces drawn in SVG, one per solution.
// They are illustrative: no real customer data. Colors come from CSS classes (see .vz in main.css).

import { html, raw } from '../lib/html.mjs';

const W = 560;
const H = 360;

function frame(label, content, extra = '') {
  return html`<svg class="vz" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" focusable="false">
    <rect class="vz-bg" x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14"/>
    ${content}
    ${raw(extra)}
  </svg>`;
}

function header(title, right) {
  return html`
    <text class="vz-t1" x="24" y="34">${title}</text>
    ${right ? html`<text class="vz-t3" x="${W - 24}" y="34" text-anchor="end">${right}</text>` : ''}
    <line class="vz-line" x1="0" y1="54" x2="${W}" y2="54"/>`;
}

function check(cx, cy) {
  return html`<circle class="vz-fg" cx="${cx}" cy="${cy}" r="7"/>
    <path class="vz-check" d="M${cx - 3} ${cy} l2.2 2.3 l4 -4.6"/>`;
}

function pulseDot(cx, cy, r = 5) {
  return html`<circle class="vz-acc vz-ping" cx="${cx}" cy="${cy}" r="${r}"/>
    <circle class="vz-acc" cx="${cx}" cy="${cy}" r="${r}"/>`;
}

function ecommerce(v, label) {
  const steps = [
    [v.paid, '14:02:11', true],
    [v.invoice, '14:02:19', true],
    [v.label, '14:02:24', true],
    [v.transit, v.waiting, false],
  ];
  const bars = [38, 52, 44, 70, 58, 86, 74, 112];
  return frame(
    label,
    html`
    ${header(v.order, 'R$ 389,90')}
    <line class="vz-line" x1="40" y1="98" x2="40" y2="262"/>
    ${steps.map(([name, time, done], i) => {
      const y = 98 + i * 55;
      return html`
        ${done ? check(40, y) : pulseDot(40, y, 6)}
        <text class="vz-t1" x="62" y="${y + 4}">${name}</text>
        <text class="${done ? 'vz-t3' : 'vz-ta'}" x="62" y="${y + 22}">${time}</text>`;
    })}
    <rect class="vz-card" x="312" y="78" width="224" height="230" rx="10"/>
    <text class="vz-t3" x="332" y="106">${v.sales}</text>
    <text class="vz-big" x="332" y="138">${v.amount}</text>
    <line class="vz-line" x1="332" y1="284.5" x2="516" y2="284.5"/>
    ${bars.map((h, i) => html`<rect class="vz-bar ${i === bars.length - 1 ? 'vz-acc' : 'vz-dim'}" style="--i:${i}" x="${334 + i * 23}" y="${284 - h}" width="15" height="${h}" rx="3"/>`)}`,
  );
}

function restaurants(v, label) {
  const cols = [24, 202, 380];
  const tickets = [
    { col: 0, y: 96, name: `${v.table} 12`, time: '00:48', items: [v.items[0], v.items[1]] },
    { col: 0, y: 214, name: `${v.delivery} #88`, time: '01:12', items: [v.items[2], v.items[3]] },
    { col: 1, y: 96, name: `${v.table} 4`, time: '08:42', items: [v.items[5], v.items[4]], progress: 0.62, hot: true },
    { col: 1, y: 214, name: `${v.counter} #31`, time: '05:10', items: [v.items[2], v.items[4]], progress: 0.35 },
    { col: 2, y: 96, name: `${v.table} 7`, time: '12:05', items: [v.items[1], v.items[0]], done: true },
  ];
  return frame(
    label,
    html`
    ${header(v.title, v.count)}
    ${v.cols.map((c, i) => html`<text class="vz-t3 vz-caps" x="${cols[i]}" y="80">${c}</text>`)}
    ${tickets.map((t) => {
      const x = cols[t.col];
      return html`<g class="${t.done ? 'vz-faded' : ''}">
        <rect class="vz-card" x="${x}" y="${t.y}" width="156" height="104" rx="9"/>
        <text class="vz-t1" x="${x + 14}" y="${t.y + 26}">${t.name}</text>
        <text class="${t.hot ? 'vz-ta' : 'vz-t3'}" x="${x + 142}" y="${t.y + 26}" text-anchor="end">${t.time}</text>
        <text class="vz-t2 vz-sm" x="${x + 14}" y="${t.y + 52}">${t.items[0]}</text>
        <text class="vz-t2 vz-sm" x="${x + 14}" y="${t.y + 70}">${t.items[1]}</text>
        ${t.progress
          ? html`<rect class="vz-track" x="${x + 14}" y="${t.y + 86}" width="128" height="4" rx="2"/>
                 <rect class="vz-acc vz-grow-x" x="${x + 14}" y="${t.y + 86}" width="${128 * t.progress}" height="4" rx="2"/>`
          : ''}
        ${t.done ? check(x + 135, t.y + 86) : ''}
      </g>`;
    })}
    <rect class="vz-card vz-ghost" x="380" y="214" width="156" height="104" rx="9"/>`,
  );
}

function hospitality(v, label) {
  const x0 = 150;
  const colW = 55;
  // [row, startDay, days, kind]: stays, bookings and cleaning between guests.
  const bars = [
    [0, 0, 3, 'occupied'], [0, 3, 1, 'cleaning'], [0, 4, 3, 'reserved'],
    [1, 1, 4, 'occupied'], [1, 5, 1, 'cleaning'],
    [2, 0, 2, 'occupied'], [2, 2, 1, 'cleaning'], [2, 3, 3, 'reserved'],
    [3, 0, 6, 'occupied'],
    [4, 2, 2, 'reserved'], [4, 5, 2, 'occupied'],
  ];
  const legend = [
    ['occupied', v.occupied],
    ['reserved', v.reserved],
    ['cleaning', v.cleaning],
  ];
  return frame(
    label,
    html`
    <defs>
      <pattern id="vz-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" class="vz-hatch"/>
      </pattern>
    </defs>
    <text class="vz-t1" x="24" y="34">${v.title}</text>
    ${legend.map(([kind, name], i) => {
      const lx = 256 + i * 98;
      return html`<rect class="vz-k-${kind}" x="${lx}" y="25" width="10" height="10" rx="2"/>
        <text class="vz-t3" x="${lx + 16}" y="34">${name}</text>`;
    })}
    <line class="vz-line" x1="0" y1="54" x2="${W}" y2="54"/>
    ${v.week.map((d, i) => html`<text class="vz-t3" x="${x0 + i * colW + colW / 2}" y="82" text-anchor="middle">${d}</text>
      <line class="vz-grid" x1="${x0 + i * colW}" y1="94" x2="${x0 + i * colW}" y2="336"/>`)}
    <line class="vz-today" x1="${x0 + 2 * colW + 30}" y1="90" x2="${x0 + 2 * colW + 30}" y2="336"/>
    ${v.rooms.map(([plate, model], r) => {
      const y = 110 + r * 46;
      return html`<text class="vz-t1 vz-sm" x="24" y="${y + 9}">${plate}</text>
        <text class="vz-t3" x="24" y="${y + 25}">${model}</text>`;
    })}
    ${bars.map(([r, d, n, kind], i) => html`<rect class="vz-k-${kind} vz-grow-x" style="--i:${i}" x="${x0 + d * colW + 4}" y="${104 + r * 46}" width="${n * colW - 8}" height="24" rx="6"/>`)}`,
  );
}

function appointments(v, label) {
  const x0 = 72;
  const colW = 92.8;
  const y0 = 92;
  const rowH = 24;
  const hours = ['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'];
  // [day, startRow, rows, labelIndex]
  const blocks = [
    [0, 0, 2, 0], [0, 4, 2, 1],
    [1, 1, 2, 2], [1, 6, 2, 3],
    [2, 0, 3, 4],
    [3, 2, 2, 5], [3, 6, 2, 6],
    [4, 1, 2, 1],
  ];
  return frame(
    label,
    html`
    ${header(v.title, '')}
    ${v.week.map((d, i) => html`<text class="vz-t3" x="${x0 + i * colW + 8}" y="80">${d}</text>`)}
    ${hours.map((h, i) => html`<text class="vz-t3" x="24" y="${y0 + i * rowH + 4}">${h}:00</text>
      <line class="vz-grid" x1="${x0}" y1="${y0 + i * rowH}" x2="${W - 24}" y2="${y0 + i * rowH}"/>`)}
    ${blocks.map(([d, s, n, l], i) => {
      const x = x0 + d * colW + 4;
      const y = y0 + s * rowH + 2;
      const [service, person] = v.blocks[l].split(' · ');
      return html`<g class="vz-pop" style="--i:${i}">
        <rect class="vz-card" x="${x}" y="${y}" width="${colW - 8}" height="${n * rowH - 4}" rx="6"/>
        <rect class="${i === 2 ? 'vz-acc' : 'vz-fg'}" x="${x}" y="${y}" width="3" height="${n * rowH - 4}" rx="1.5"/>
        <text class="vz-t2 vz-xs" x="${x + 10}" y="${y + 15}">${service}</text>
        <text class="vz-t3 vz-xs" x="${x + 10}" y="${y + 29}">${person}</text>
      </g>`;
    })}
    <g class="vz-toast">
      <rect class="vz-card vz-raised" x="300" y="280" width="236" height="56" rx="10"/>
      <circle class="vz-acc" cx="324" cy="308" r="9"/>
      <path class="vz-check-dark" d="M320 308 l2.6 2.7 l5 -5.6"/>
      <text class="vz-t1 vz-sm" x="342" y="303">${v.toast}</text>
      <text class="vz-t3" x="342" y="320">${v.confirmed} · ${v.week[1]} 09:00</text>
    </g>`,
  );
}

function logistics(v, label) {
  const route = 'M186 160 L232 160 L232 104 L316 104';
  const stops = [
    [60, 236, true],
    [140, 196, true],
    [186, 160, true],
    [232, 104, false],
    [316, 104, false],
  ];
  const streets = [
    'M24 236 H340', 'M24 160 H340', 'M24 104 H340', 'M24 290 H340',
    'M60 64 V336', 'M140 64 V336', 'M232 64 V336', 'M316 64 V336',
    'M24 330 L180 64', 'M200 336 L340 200',
  ];
  return frame(
    label,
    html`
    ${header(v.title, '')}
    <clipPath id="vz-map"><rect x="24" y="68" width="316" height="268" rx="10"/></clipPath>
    <rect class="vz-map" x="24" y="68" width="316" height="268" rx="10"/>
    <g clip-path="url(#vz-map)">
      ${streets.map((d) => html`<path class="vz-street" d="${d}"/>`)}
      <path class="vz-route" d="${route}"/>
      <path class="vz-route-done" d="M60 300 L60 236 L140 236 L140 160 L186 160"/>
    </g>
    <rect class="vz-fg" x="52" y="292" width="16" height="16" rx="3"/>
    ${stops.map(([x, y, done]) => (done ? check(x, y) : html`<circle class="vz-stop" cx="${x}" cy="${y}" r="6"/>`))}
    <g>
      <circle class="vz-acc vz-ping" r="7"/>
      <circle class="vz-acc" r="7"/>
      <animateMotion dur="7s" repeatCount="indefinite" path="M186 160 L232 160 L232 104 L316 104" keyPoints="0;1;1" keyTimes="0;0.85;1" calcMode="linear"/>
    </g>
    <rect class="vz-card" x="356" y="68" width="180" height="268" rx="10"/>
    ${[
      [v.delivered, '18', 'vz-fg'],
      [v.route, '06', 'vz-acc'],
      [v.issue, '01', 'vz-warn'],
    ].map(([name, n, cls], i) => {
      const y = 102 + i * 44;
      return html`<circle class="${cls}" cx="378" cy="${y - 4}" r="4"/>
        <text class="vz-t2" x="392" y="${y}">${name}</text>
        <text class="vz-t1" x="516" y="${y}" text-anchor="end">${n}</text>`;
    })}
    <line class="vz-line" x1="372" y1="236" x2="520" y2="236"/>
    <text class="vz-t3" x="374" y="262">${v.vehicle}</text>
    <text class="vz-t1" x="516" y="262" text-anchor="end">3/5</text>
    <rect class="vz-track" x="374" y="278" width="142" height="5" rx="2.5"/>
    <rect class="vz-acc vz-grow-x" x="374" y="278" width="85" height="5" rx="2.5"/>
    <text class="vz-t3" x="374" y="310">${v.eta}</text>`,
  );
}

// Small line glyphs for each automation step, drawn around (0, 0).
const glyphs = [
  '<path class="vz-glyph" d="M-5 -2h10v7h-10z M-5 -2l2-3.5h6l2 3.5 M-1.5 1h3"/>',
  '<path class="vz-glyph-fill" d="M0-6 1.6-1.6 6 0 1.6 1.6 0 6-1.6 1.6-6 0-1.6-1.6z"/>',
  '<path class="vz-glyph" d="M-4.5-6h6l3 3v9h-9z M-2 0h4.5 M-2 3h4.5"/>',
  '<path class="vz-glyph" d="M-5 5v-4 M0 5v-9 M5 5v-6"/>',
];

// Steps complete one after another; the activity log fills in step by step.
function automation(v, label) {
  const ys = [76, 140, 204, 268];
  const step = 650;
  const start = 250;
  const times = ['07:00', '07:01', '07:02'];
  return frame(
    label,
    html`
    ${header(v.title, v.when)}
    ${ys.slice(0, 3).map((y, i) => html`<rect class="vz-track" x="49" y="${y + 48}" width="2" height="${ys[i + 1] - y - 48}" rx="1"/>
      <rect class="vz-acc vz-seq-y" style="--t:${start + i * step + 300}ms" x="49" y="${y + 48}" width="2" height="${ys[i + 1] - y - 48}" rx="1"/>`)}
    ${v.nodes.map((n, i) => {
      const y = ys[i];
      return html`<rect class="vz-card" x="24" y="${y}" width="244" height="48" rx="12"/>
        <rect class="vz-chip" x="36" y="${y + 10}" width="28" height="28" rx="8"/>
        <g transform="translate(50 ${y + 24})">${raw(glyphs[i])}</g>
        <text class="vz-t1 vz-sm" x="78" y="${y + 29}">${n}</text>
        <circle class="vz-ring" cx="246" cy="${y + 24}" r="8"/>
        <g class="vz-seq" style="--t:${start + i * step}ms">
          <circle class="vz-acc" cx="246" cy="${y + 24}" r="8.5"/>
          <path class="vz-check-light" d="M242.5 ${y + 24} l2.3 2.4 l4.3 -4.8"/>
        </g>`;
    })}
    <rect class="vz-card" x="288" y="76" width="248" height="240" rx="12"/>
    <text class="vz-t3 vz-caps" x="308" y="104">${v.activity}</text>
    <line class="vz-line" x1="288" y1="118" x2="536" y2="118"/>
    ${v.log.map((l, i) => {
      const y = 146 + i * 34;
      return html`<g class="vz-seq" style="--t:${start + (i + 1) * step}ms">
        <circle class="vz-acc" cx="312" cy="${y - 4}" r="3"/>
        <text class="vz-t2 vz-sm" x="324" y="${y}">${l}</text>
        <text class="vz-t3" x="516" y="${y}" text-anchor="end">${times[i]}</text>
      </g>`;
    })}
    <line class="vz-line" x1="308" y1="240" x2="516" y2="240"/>
    <g class="vz-seq" style="--t:${start + 4 * step}ms">
      <text class="vz-t3" x="308" y="266">${v.savedLabel}</text>
      <text class="vz-big" x="308" y="298">${v.savedValue}</text>
    </g>`,
  );
}

const renderers = { ecommerce, logistics, restaurants, hospitality, appointments, automation };

export function visual(key, labels, ariaLabel) {
  return renderers[key](labels, ariaLabel);
}
