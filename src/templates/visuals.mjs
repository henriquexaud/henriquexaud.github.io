// Schematic product interfaces drawn in SVG, one per solution.
// They are illustrative: no real customer data. Colors come from CSS classes (see .vz in main.css).

import { html, raw } from '../lib/html.mjs';

const W = 560;
const H = 360;

// `still` (seconds): the moment of the animation shown when motion is reduced.
function frame(label, content, extra = '', still = 0) {
  return html`<svg class="vz" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" focusable="false" data-still="${still}">
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

// Stores: one business selling everywhere. A single sequence plays once when the
// drawing appears: a recovered cart turns into a sale, today's total goes up and the
// shared stock drops by one on every channel at the same time.
function ecommerce(v, label) {
  // Sales rhythm through the day (0..1), drawn as a smooth area.
  const values = [0.16, 0.22, 0.3, 0.46, 0.6, 0.5, 0.44, 0.52, 0.62, 0.74, 0.66, 0.82, 0.94];
  const cx0 = 24;
  const cx1 = 332;
  const top = 160;
  const base = 320;
  const pts = values.map((val, i) => [cx0 + ((cx1 - cx0) * i) / (values.length - 1), base - (base - top) * val]);
  const r = (n) => Math.round(n * 10) / 10;
  const curve = pts
    .map((p, i) => {
      if (i === 0) return `M${r(p[0])} ${r(p[1])}`;
      const p0 = pts[i - 2] || pts[i - 1];
      const p1 = pts[i - 1];
      const p3 = pts[i + 1] || p;
      const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6];
      const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6];
      return `C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p[0])} ${r(p[1])}`;
    })
    .join(' ');
  const [lx, ly] = [r(pts[pts.length - 1][0]), r(pts[pts.length - 1][1])];

  // Timeline (seconds): the sale lands once the chart has drawn itself.
  const sale = 1.7;
  const fade = (from, to, at, dur = 0.35) =>
    raw(`<animate attributeName="opacity" from="${from}" to="${to}" begin="${at}s" dur="${dur}s" fill="freeze"/>`);
  const rowsY = [166, 190, 214];

  return frame(
    label,
    html`
    <defs>
      <linearGradient id="vz-area" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#00c853" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#00c853" stop-opacity="0"/>
      </linearGradient>
    </defs>
    ${header(v.title, v.when)}
    <text class="vz-big" x="24" y="100">${v.amountBefore}${fade(1, 0, sale + 0.2, 0.25)}</text>
    <text class="vz-big" x="24" y="100" opacity="0">${v.amount}${fade(0, 1, sale + 0.3, 0.3)}</text>
    <text class="vz-ta" x="24" y="122">${v.delta}</text>
    <path class="vz-area vz-pop" d="${curve} L${cx1} ${base} L${cx0} ${base} Z"/>
    <path class="vz-spark vz-draw-line" pathLength="1" d="${curve}"/>
    <line class="vz-line" x1="${cx0}" y1="${base + 0.5}" x2="${cx1}" y2="${base + 0.5}"/>
    <circle class="vz-arrival" cx="${lx}" cy="${ly}" r="4" opacity="0">
      <animate attributeName="r" from="4" to="16" begin="${sale + 0.2}s" dur="0.9s" fill="freeze"/>
      <animate attributeName="opacity" values="0.6;0" begin="${sale + 0.2}s" dur="0.9s" fill="freeze"/>
    </circle>
    <circle class="vz-car" cx="${lx}" cy="${ly}" r="4.5"/>

    <rect class="vz-card" x="356" y="68" width="180" height="168" rx="12"/>
    <text class="vz-t3 vz-caps" x="374" y="94">${v.stock}</text>
    <rect class="vz-chip" x="374" y="106" width="36" height="36" rx="8"/>
    <path class="vz-glyph" d="M383 118 h18 l-1.5 14 h-15 z M387.5 118 v-2 a4.5 4.5 0 0 1 9 0 v2"/>
    <text class="vz-t1 vz-sm" x="422" y="128">${v.product}</text>
    <line class="vz-line" x1="374" y1="150" x2="518" y2="150"/>
    ${v.channels.map((name, i) => {
      const y = rowsY[i];
      const at = sale + 0.45 + i * 0.1;
      return html`<text class="vz-t2 vz-sm" x="374" y="${y}">${name}</text>
        <text class="vz-t1 vz-sm" x="518" y="${y}" text-anchor="end">12${fade(1, 0, at, 0.2)}</text>
        <text class="vz-ta vz-sm" x="518" y="${y}" text-anchor="end" opacity="0">11${fade(0, 1, at + 0.1, 0.25)}${fade(1, 0, at + 1.6, 0.6)}</text>
        <text class="vz-t1 vz-sm" x="518" y="${y}" text-anchor="end" opacity="0">11${fade(0, 1, at + 1.6, 0.6)}</text>`;
    })}

    <g opacity="0">
      <animate attributeName="opacity" from="0" to="1" begin="${sale}s" dur="0.4s" fill="freeze"/>
      <animateTransform attributeName="transform" type="translate" from="0 8" to="0 0" begin="${sale}s" dur="0.5s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.2 1"/>
      <rect class="vz-card vz-raised" x="356" y="252" width="180" height="62" rx="12"/>
      <circle class="vz-acc" cx="378" cy="283" r="9"/>
      <path class="vz-check-dark" d="M374 283 l2.6 2.7 l5 -5.6"/>
      <text class="vz-t1 vz-sm" x="396" y="278">${v.toast}</text>
      <text class="vz-t3" x="396" y="295">${v.toastNote}</text>
    </g>`,
    '',
    6,
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
  // Hour labels every 2h; one appointment per day keeps the week readable.
  const hours = ['08', '10', '12', '14', '16'];
  // [day, startHour (0 = 08:00), hours, labelIndex]
  const blocks = [
    [0, 0, 2, 0],
    [1, 1, 2, 2],
    [2, 3, 2, 3],
    [3, 0, 2, 4],
    [4, 2, 2, 5],
  ];
  return frame(
    label,
    html`
    ${header(v.title, '')}
    ${v.week.map((d, i) => html`<text class="vz-t3" x="${x0 + i * colW + 8}" y="80">${d}</text>`)}
    ${hours.map((h, i) => html`<text class="vz-t3" x="24" y="${y0 + i * 2 * rowH + 4}">${h}:00</text>
      <line class="vz-grid" x1="${x0}" y1="${y0 + i * 2 * rowH}" x2="${W - 24}" y2="${y0 + i * 2 * rowH}"/>`)}
    ${blocks.map(([d, s, n, l], i) => {
      const x = x0 + d * colW + 4;
      const y = y0 + s * rowH + 2;
      const [service, person] = v.blocks[l].split(' · ');
      return html`<g class="vz-pop" style="--i:${i}">
        <rect class="vz-card" x="${x}" y="${y}" width="${colW - 8}" height="${n * rowH - 4}" rx="6"/>
        <rect class="${i === 1 ? 'vz-acc' : 'vz-fg'}" x="${x}" y="${y}" width="3" height="${n * rowH - 4}" rx="1.5"/>
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

// Logistics: the day's route on a map, with the order travelling to its destination.
function logistics(v, label) {
  const done = 'M60 300 L60 236 L140 236 L140 160 L186 160';
  const ahead = 'M186 160 L232 160 L232 104 L316 104';
  // One timeline drives the map and the card: the order sets off, a solid trail
  // draws behind it, it settles at the destination, the card reads "delivered",
  // then everything fades out and the loop restarts.
  const dur = 9;
  const go = 0.04;
  const arrive = 0.5;
  const out = 0.9;
  const gone = 0.97;
  const ease = '0.45 0 0.25 1';
  const travel = (attr, from, to) =>
    raw(`<animate attributeName="${attr}" values="${from};${from};${to};${to}" keyTimes="0;${go};${arrive};1" calcMode="spline" keySplines="0 0 1 1; ${ease}; 0 0 1 1" dur="${dur}s" repeatCount="indefinite"/>`);
  const fadeOut = raw(`<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;${out};${gone};1" dur="${dur}s" repeatCount="indefinite"/>`);

  // Streets on a grid; the two avenues are wider. City blocks fill the gaps.
  const xs = [60, 140, 232, 316];
  const ys = [104, 160, 236, 290];
  const avenues = ['M24 160 H340', 'M232 64 V336'];
  const streets = [...ys.filter((y) => y !== 160).map((y) => `M24 ${y} H340`), ...xs.filter((x) => x !== 232).map((x) => `M${x} 64 V336`)];
  const edgesX = [24, ...xs, 340];
  const edgesY = [68, ...ys, 336];
  const blocks = [];
  for (let i = 0; i < edgesX.length - 1; i++) {
    for (let j = 0; j < edgesY.length - 1; j++) {
      const x0 = edgesX[i] + (i ? 7 : 0);
      const x1 = edgesX[i + 1] - (i < edgesX.length - 2 ? 7 : 0);
      const y0 = edgesY[j] + (j ? 7 : 0);
      const y1 = edgesY[j + 1] - (j < edgesY.length - 2 ? 7 : 0);
      if (x1 - x0 > 8 && y1 - y0 > 8) blocks.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0, park: i === 3 && j === 2 });
    }
  }
  const delivered = [
    [60, 236],
    [140, 196],
    [186, 160],
  ];
  return frame(
    label,
    html`
    ${header(v.title, v.when)}
    <clipPath id="vz-map"><rect x="24" y="68" width="316" height="268" rx="10"/></clipPath>
    <rect class="vz-map" x="24" y="68" width="316" height="268" rx="10"/>
    <g clip-path="url(#vz-map)">
      ${blocks.map((b) => html`<rect class="${b.park ? 'vz-park' : 'vz-block'}" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="3"/>`)}
      ${streets.map((d) => html`<path class="vz-street" d="${d}"/>`)}
      ${avenues.map((d) => html`<path class="vz-street vz-avenue" d="${d}"/>`)}
      <path class="vz-route-done" d="${done}"/>
      <path class="vz-route-plan" d="${ahead}"/>
      <path class="vz-route-trail" d="${ahead}" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
        ${travel('stroke-dashoffset', 1, 0)}
        ${fadeOut}
      </path>
    </g>
    <rect class="vz-fg" x="52" y="292" width="16" height="16" rx="3"/>
    ${delivered.map(([x, y]) => check(x, y))}
    <circle class="vz-dest" cx="316" cy="104" r="6"/>
    <circle class="vz-arrival" cx="316" cy="104" r="6" opacity="0">
      <animate attributeName="r" values="6;6;20;20" keyTimes="0;${arrive};${arrive + 0.12};1" dur="${dur}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.5;0;0" keyTimes="0;${arrive};${arrive + 0.005};${arrive + 0.12};1" dur="${dur}s" repeatCount="indefinite"/>
    </circle>
    <g opacity="0">
      <circle class="vz-car-halo" r="12"/>
      <circle class="vz-car" r="6"/>
      <animateMotion path="${ahead}" keyPoints="0;0;1;1" keyTimes="0;${go};${arrive};1" calcMode="spline" keySplines="0 0 1 1; ${ease}; 0 0 1 1" dur="${dur}s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;${go};${out};${gone};1" dur="${dur}s" repeatCount="indefinite"/>
    </g>

    <rect class="vz-card" x="356" y="68" width="180" height="124" rx="12"/>
    ${[
      [v.delivered, '18', 'vz-fg'],
      [v.route, '06', 'vz-acc'],
      [v.issue, '01', 'vz-warn'],
    ].map(([name, n, cls], i) => {
      const y = 100 + i * 32;
      return html`<circle class="${cls}" cx="378" cy="${y - 4}" r="4"/>
        <text class="vz-t2" x="392" y="${y}">${name}</text>
        <text class="vz-t1" x="516" y="${y}" text-anchor="end">${n}</text>`;
    })}

    <rect class="vz-card" x="356" y="206" width="180" height="130" rx="12"/>
    <text class="vz-t3 vz-caps" x="374" y="232">${v.next}</text>
    <text class="vz-t1 vz-sm" x="374" y="258">${v.order}</text>
    <text class="vz-t3" x="374" y="275">${v.area}</text>
    <rect class="vz-track" x="374" y="292" width="144" height="4" rx="2"/>
    <rect class="vz-acc" x="374" y="292" width="0" height="4" rx="2">
      ${travel('width', 0, 144)}
      ${fadeOut}
    </rect>
    <text class="vz-ta" x="374" y="318">${v.eta}
      <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;${arrive};${arrive + 0.02};${gone};1" dur="${dur}s" repeatCount="indefinite"/>
    </text>
    <text class="vz-ta" x="374" y="318" opacity="0">${v.arrived}
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;${arrive};${arrive + 0.02};${out};${gone};1" dur="${dur}s" repeatCount="indefinite"/>
    </text>
`,
    '',
    dur * 0.7,
  );
}

const renderers = { ecommerce, logistics, restaurants, hospitality, appointments };

export function visual(key, labels, ariaLabel) {
  return renderers[key](labels, ariaLabel);
}
