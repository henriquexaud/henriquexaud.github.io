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

// Stores: one business selling everywhere. Today's sales across every channel,
// a single stock shared by all of them and an abandoned cart won back.
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
  const last = pts[pts.length - 1];

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
    <text class="vz-big" x="24" y="100">${v.amount}</text>
    <text class="vz-ta" x="24" y="122">${v.delta}</text>
    <path class="vz-area vz-pop" d="${curve} L${cx1} ${base} L${cx0} ${base} Z"/>
    <path class="vz-spark vz-draw-line" pathLength="1" d="${curve}"/>
    <line class="vz-line" x1="${cx0}" y1="${base + 0.5}" x2="${cx1}" y2="${base + 0.5}"/>
    <g class="vz-pop" style="--i:8">${pulseDot(last[0], r(last[1]), 4)}</g>

    <rect class="vz-card" x="356" y="78" width="180" height="172" rx="12"/>
    <text class="vz-t3 vz-caps" x="374" y="104">${v.stock}</text>
    <rect class="vz-chip" x="374" y="118" width="44" height="44" rx="9"/>
    <path class="vz-glyph" d="M384 135 h24 l-2 18 h-20 z M390 135 v-2.5 a6 6 0 0 1 12 0 v2.5"/>
    <text class="vz-t1 vz-sm" x="430" y="145">${v.product}</text>
    <text class="vz-big" x="374" y="206">12</text>
    <text class="vz-t3" x="412" y="206">${v.units}</text>
    <circle class="vz-acc" cx="380" cy="228" r="6"/>
    <path class="vz-check-dark" d="M377.6 228 l1.7 1.9 l3.2 -3.6"/>
    <text class="vz-ta" x="393" y="232">${v.synced}</text>

    <g class="vz-toast">
      <rect class="vz-card vz-raised" x="356" y="268" width="180" height="58" rx="12"/>
      <circle class="vz-acc" cx="378" cy="297" r="9"/>
      <path class="vz-check-dark" d="M374 297 l2.6 2.7 l5 -5.6"/>
      <text class="vz-t1 vz-sm" x="396" y="292">${v.toast}</text>
      <text class="vz-t3" x="396" y="309">${v.toastNote}</text>
    </g>`,
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
  // The order travels from the last delivered stop to its destination in one go,
  // turns fully green on arrival and waits there before the loop restarts.
  const cycle = '8s';
  const arrive = 0.5;
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
      <path class="vz-route" d="${ahead}"/>
    </g>
    <rect class="vz-fg" x="52" y="292" width="16" height="16" rx="3"/>
    ${delivered.map(([x, y]) => check(x, y))}
    <circle class="vz-stop" cx="316" cy="104" r="6"/>
    <g class="vz-vehicle">
      <circle class="vz-acc vz-ping" r="7"/>
      <circle class="vz-acc" r="7"/>
      <circle class="vz-hole" r="2.5">
        <animate attributeName="opacity" values="1;0" keyTimes="0;${arrive}" calcMode="discrete" dur="${cycle}" repeatCount="indefinite"/>
      </circle>
      <animateMotion dur="${cycle}" repeatCount="indefinite" path="${ahead}" keyPoints="0;1;1" keyTimes="0;${arrive};1" calcMode="spline" keySplines="0.45 0 0.25 1; 0 0 1 1"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.94;1" dur="${cycle}" repeatCount="indefinite"/>
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
    <rect class="vz-acc vz-grow-x" x="374" y="292" width="${144 * 0.7}" height="4" rx="2"/>
    <text class="vz-ta" x="374" y="318">${v.eta}</text>
`,
  );
}

// Gyms: check-ins per day this week and members drifting away.
function gyms(v, label) {
  const values = [0.82, 0.74, 0.9, 0.7, 0.6, 0.42, 0.24];
  const today = 2;
  const base = 300;
  const maxH = 190;
  const barW = 22;
  const step = 44;
  const x0 = 40;
  return frame(
    label,
    html`
    ${header(v.title, v.when)}
    <line class="vz-line" x1="24" y1="${base + 0.5}" x2="340" y2="${base + 0.5}"/>
    ${values.map((val, i) => {
      const h = Math.round(maxH * val);
      return html`<rect class="vz-bar ${i === today ? 'vz-acc' : 'vz-dim'}" style="--i:${i}" x="${x0 + i * step}" y="${base - h}" width="${barW}" height="${h}" rx="5"/>
        <text class="${i === today ? 'vz-ta' : 'vz-t3'}" x="${x0 + i * step + barW / 2}" y="${base + 22}" text-anchor="middle">${v.days[i]}</text>`;
    })}
    <rect class="vz-card" x="356" y="78" width="180" height="248" rx="12"/>
    <text class="vz-t3" x="374" y="108">${v.active}</text>
    <text class="vz-big" x="374" y="142">486</text>
    <line class="vz-line" x1="374" y1="168" x2="518" y2="168"/>
    <text class="vz-tw" x="374" y="196">${v.risk}</text>
    <g class="vz-pop" style="--i:3">
      <circle class="vz-avatar" cx="384" cy="228" r="10"/>
      <text class="vz-initial" x="384" y="232" text-anchor="middle">${v.members[0][0][0]}</text>
      <text class="vz-t2 vz-sm" x="402" y="226">${v.members[0][0]}</text>
      <text class="vz-t3" x="402" y="241">${v.members[0][1]}</text>
    </g>
    <g class="vz-toast">
      <circle class="vz-acc" cx="382" cy="291" r="7"/>
      <path class="vz-check-dark" d="M379 291 l2 2.2 l3.6 -4"/>
      <text class="vz-ta" x="396" y="295">${v.sent}</text>
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
