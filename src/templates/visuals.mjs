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
    ${header(v.order, '')}
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
`,
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
    ${pulseDot(232, 132, 7)}
    <rect class="vz-card" x="356" y="68" width="180" height="150" rx="10"/>
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
`,
  );
}

// Gyms: a heatmap of check-ins over the week (peaks at dawn and evening) and a
// retention panel that flags members who stopped showing up.
function gyms(v, label) {
  // Rows: Mon..Sun. Columns: 2-hour slots from 06:00 to 20:00.
  const heat = [
    [0.9, 0.5, 0.2, 0.3, 0.2, 0.4, 1, 0.8],
    [0.8, 0.4, 0.3, 0.4, 0.2, 0.5, 0.9, 0.7],
    [0.9, 0.5, 0.2, 0.3, 0.3, 0.4, 1, 0.9],
    [0.7, 0.4, 0.3, 0.2, 0.2, 0.5, 0.9, 0.6],
    [0.6, 0.3, 0.2, 0.3, 0.2, 0.4, 0.7, 0.4],
    [0.3, 0.6, 0.7, 0.4, 0.2, 0.1, 0.1, 0],
    [0.1, 0.3, 0.4, 0.2, 0.1, 0, 0, 0],
  ];
  const x0 = 62;
  const y0 = 80;
  const cell = 28;
  const step = 32;
  return frame(
    label,
    html`
    ${header(v.title, v.when)}
    ${v.days.map((d, r) => html`<text class="vz-t3" x="24" y="${y0 + r * step + 18}">${d}</text>`)}
    ${heat.map((row, r) =>
      row.map(
        (o, c) => html`<rect class="vz-cell vz-pop" style="--i:${c}" x="${x0 + c * step}" y="${y0 + r * step}" width="${cell}" height="${cell}" rx="6"/>
          ${o > 0 ? html`<rect class="vz-heat vz-pop" style="--i:${c}" fill-opacity="${o}" x="${x0 + c * step}" y="${y0 + r * step}" width="${cell}" height="${cell}" rx="6"/>` : ''}`,
      ),
    )}
    ${['06h', '10h', '14h', '18h'].map((h, i) => html`<text class="vz-t3" x="${x0 + i * 2 * step}" y="${y0 + 7 * step + 12}">${h}</text>`)}
    <rect class="vz-card" x="356" y="70" width="180" height="270" rx="12"/>
    <text class="vz-t3" x="374" y="98">${v.active}</text>
    <text class="vz-big" x="374" y="130">486</text>
    <line class="vz-line" x1="374" y1="168" x2="518" y2="168"/>
    <text class="vz-tw" x="374" y="194">${v.risk}</text>
    ${v.members.map(([name, note], i) => {
      const y = 222 + i * 40;
      return html`<g class="vz-pop" style="--i:${i + 3}">
        <circle class="vz-avatar" cx="384" cy="${y}" r="10"/>
        <text class="vz-initial" x="384" y="${y + 4}" text-anchor="middle">${name[0]}</text>
        <text class="vz-t2 vz-sm" x="402" y="${y - 2}">${name}</text>
        <text class="vz-t3" x="402" y="${y + 13}">${note}</text>
      </g>`;
    })}
    <g class="vz-toast">
      <circle class="vz-acc" cx="382" cy="309" r="7"/>
      <path class="vz-check-dark" d="M379 309 l2 2.2 l3.6 -4"/>
      <text class="vz-ta" x="396" y="313">${v.sent}</text>
    </g>`,
  );
}

// Teams: work flowing through a short delivery cycle, blockers surfaced and
// cleared, and the cycle's progress shared by the whole team.
function teams(v, label) {
  const cardW = 110;
  const gap = 14;
  const y0 = 82;
  const xs = v.stages.map((_, i) => 24 + i * (cardW + gap));
  const flow = `M${xs[0] + cardW / 2} ${y0 + 28} H${xs[xs.length - 1] + cardW / 2}`;
  return frame(
    label,
    html`
    ${header(v.title, v.when)}
    <path class="vz-flow" d="${flow}"/>
    ${v.stages.map(([name, count], i) => {
      const x = xs[i];
      return html`<g class="vz-pop" style="--i:${i}">
        <rect class="vz-card" x="${x}" y="${y0}" width="${cardW}" height="56" rx="10"/>
        <text class="vz-big vz-count" x="${x + 14}" y="${y0 + 30}">${count}</text>
        <text class="vz-t3" x="${x + 14}" y="${y0 + 46}">${name}</text>
      </g>`;
    })}
    <rect class="vz-card" x="24" y="164" width="316" height="176" rx="12"/>
    <text class="vz-t3 vz-caps" x="42" y="190">${v.blockers}</text>
    <line class="vz-line" x1="24" y1="204" x2="340" y2="204"/>
    ${v.blockerItems.map(([title, note], i) => {
      const y = 236 + i * 52;
      const open = i === 0;
      return html`<g class="vz-pop" style="--i:${i + 4}">
        ${open
          ? html`<circle class="vz-warn" cx="48" cy="${y - 4}" r="5"/>`
          : html`<circle class="vz-acc" cx="48" cy="${y - 4}" r="7"/><path class="vz-check-dark" d="M45 ${y - 4} l2 2.2 l3.6 -4"/>`}
        <text class="${open ? 'vz-t1 vz-sm' : 'vz-t2 vz-sm vz-done'}" x="66" y="${y}">${title}</text>
        <text class="${open ? 'vz-tw' : 'vz-ta'}" x="66" y="${y + 16}">${note}</text>
      </g>`;
    })}
    <rect class="vz-card" x="356" y="164" width="180" height="176" rx="12"/>
    <text class="vz-t3" x="374" y="192">${v.cycle}</text>
    <text class="vz-big" x="374" y="228">${v.cycleValue}</text>
    <rect class="vz-track" x="374" y="244" width="144" height="5" rx="2.5"/>
    <rect class="vz-acc vz-grow-x" x="374" y="244" width="${144 * 0.68}" height="5" rx="2.5"/>
    <text class="vz-t3" x="374" y="270">${v.cycleNote}</text>
    `,
  );
}

const renderers = { ecommerce, logistics, restaurants, hospitality, appointments, gyms, teams };

export function visual(key, labels, ariaLabel) {
  return renderers[key](labels, ariaLabel);
}
