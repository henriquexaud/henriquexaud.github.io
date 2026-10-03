// The site's protagonist: an axonometric "exploded view" of three layers of a system
// (interface, processes, data), drawn like a technical blueprint on silicon plates.
// main.js drives it through the whole page with CSS variables:
//   --approach  how far the plates have travelled towards the middle one
//               (0 = exploded, 1 = settled, ~2.15 = stacked into one piece, < 0 = opened up)
//   --lab       opacity of the labels      --merge  0 → 1 as the stack becomes one piece
// and data-focus="0|1|2" to single out one layer.

import { html } from '../lib/html.mjs';

const CX = 300;
const A = 170; // half width of a plate
const B = 98; // half height (isometric ratio)
const T = 8; // plate thickness
const TOPS = [30, 136, 242];
const SPAN = TOPS[2] - TOPS[0];
const APPROACH = [44, 0, -44]; // how far each plate travels towards the middle one

const f = (n) => Math.round(n * 10) / 10;

// Point on a plate from local coordinates u (towards the right corner) and v (towards the left corner).
function at(y, u, v) {
  return [CX + u * A - v * A, y + u * B + v * B];
}

const pt = (p) => p.map(f).join(',');

function rect(y, u0, u1, v0, v1) {
  return [at(y, u0, v0), at(y, u1, v0), at(y, u1, v1), at(y, u0, v1)].map(pt).join(' ');
}

// Stacked closely enough, the plates read as one block.
export const MERGED = Math.round(((TOPS[1] - TOPS[0] - T - 3) / APPROACH[0]) * 100) / 100;

// The plate edges are polished silicon: lit on the left face, in shadow on the right.
function plate(y, uid, i) {
  const top = `${CX},${y} ${CX + A},${y + B} ${CX},${y + 2 * B} ${CX - A},${y + B}`;
  const left = `${CX - A},${y + B} ${CX},${y + 2 * B} ${CX},${y + 2 * B + T} ${CX - A},${y + B + T}`;
  const right = `${CX},${y + 2 * B} ${CX + A},${y + B} ${CX + A},${y + B + T} ${CX},${y + 2 * B + T}`;
  return html`<polygon class="bp-side" fill="url(#bp-si-l-${uid})" points="${left}"/>
    <polygon class="bp-side bp-side-dark" fill="url(#bp-si-r-${uid})" points="${right}"/>
    <polygon class="bp-plate bp-draw" points="${top}" pathLength="1"/>
    ${i === 0 ? html`<polygon class="bp-wafer" fill="url(#bp-wafer-${uid})" points="${top}"/>` : ''}`;
}

function label(y, index, text) {
  const x0 = CX + A;
  const y0 = y + B;
  return html`<g class="bp-tag">
    <path class="bp-leader" d="M${x0 + 6} ${y0} H${x0 + 30}"/>
    <circle class="bp-dot" cx="${x0 + 6}" cy="${y0}" r="2"/>
    <text class="bp-index" x="${x0 + 38}" y="${y0 - 6}">${index}</text>
    <text class="bp-label" x="${x0 + 38}" y="${y0 + 10}">${text}</text>
  </g>`;
}

function interfaceLayer(y) {
  return html`<polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.88, 0.1, 0.2)}"/>
    <polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.46, 0.3, 0.88)}"/>
    <polygon class="bp-fill-accent bp-draw" pathLength="1" points="${rect(y, 0.56, 0.88, 0.3, 0.56)}"/>
    <polygon class="bp-pulse bp-pulse-fill" points="${rect(y, 0.56, 0.88, 0.3, 0.56)}"/>
    <path class="bp-pulse bp-pulse-line" pathLength="1" d="M${[at(y, 0.12, 0.15), at(y, 0.88, 0.15)].map(pt).join(' L')}"/>
    <polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.56, 0.88, 0.66, 0.88)}"/>`;
}

// Processes: a 3×3 grid of raised modules wired along the plate's axes, like a
// circuit. One route is highlighted.
function processLayer(y) {
  const G = [0.2, 0.5, 0.8];
  const S = 0.075; // half size of a module
  const H = 7; // module height
  const route = [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
    [2, 2],
  ];
  const onRoute = (a, b) =>
    route.some((p, i) => i > 0 && ((p[0] === a[0] && p[1] === a[1] && route[i - 1][0] === b[0] && route[i - 1][1] === b[1]) || (p[0] === b[0] && p[1] === b[1] && route[i - 1][0] === a[0] && route[i - 1][1] === a[1])));

  // Wires between neighbours: from the edge of one module to the edge of the next.
  const wires = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i < 2) wires.push([[i, j], [i + 1, j]]);
      if (j < 2) wires.push([[i, j], [i, j + 1]]);
    }
  }
  const wire = ([a, b]) => {
    const du = b[0] - a[0];
    const dv = b[1] - a[1];
    const p1 = at(y, G[a[0]] + du * S, G[a[1]] + dv * S);
    const p2 = at(y, G[b[0]] - du * S, G[b[1]] - dv * S);
    return `M${pt(p1)} L${pt(p2)}`;
  };

  const module = ([i, j]) => {
    const u = G[i];
    const v = G[j];
    const lit = route.some((p) => p[0] === i && p[1] === j);
    const hub = i === 1 && j === 1;
    const raise = (p) => [p[0], p[1] - H];
    const front = at(y, u + S, v + S);
    const right = at(y, u + S, v - S);
    const left = at(y, u - S, v + S);
    const faceR = [right, front, raise(front), raise(right)].map(pt).join(' ');
    const faceL = [left, front, raise(front), raise(left)].map(pt).join(' ');
    const top = [at(y, u - S, v - S), right, front, left].map(raise).map(pt).join(' ');
    return html`<polygon class="bp-mod-side" points="${faceL}"/>
      <polygon class="bp-mod-side bp-mod-side-dark" points="${faceR}"/>
      <polygon class="${hub ? 'bp-mod-hub' : lit ? 'bp-mod-lit' : 'bp-mod'}" points="${top}"/>`;
  };

  const cells = [];
  // Back to front, so nearer modules overlap farther ones.
  for (let sum = 0; sum <= 4; sum++) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i + j === sum) cells.push([i, j]);

  const signal = route.map(([i, j]) => pt(at(y, G[i], G[j]))).join(' L');

  return html`${wires.map((w) => html`<path class="${onRoute(w[0], w[1]) ? 'bp-wire-lit' : 'bp-wire'} bp-draw" pathLength="1" d="${wire(w)}"/>`)}
    <path class="bp-pulse bp-pulse-line" pathLength="1" d="M${signal}"/>
    ${cells.map(module)}`;
}

function dataLayer(y) {
  const lines = [];
  // One line is lit: the data layer is active too, like the other two.
  for (let k = 0; k < 7; k++) {
    const u = 0.16 + k * 0.1;
    const [x1, y1] = at(y, u, 0.14).map(f);
    const [x2, y2] = at(y, u, 0.86).map(f);
    lines.push(html`<path class="${k === 5 ? 'bp-hatch-lit' : 'bp-hatch'} bp-draw" pathLength="1" d="M${x1} ${y1} L${x2} ${y2}"/>`);
    if (k % 2) lines.push(html`<path class="bp-pulse bp-pulse-line" style="--o:${k * 0.13}" pathLength="1" d="M${x1} ${y1} L${x2} ${y2}"/>`);
  }
  return lines;
}

function cross(x, y) {
  return html`<path class="bp-cross" d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}"/>`;
}

// `uid` keeps gradient ids unique when the drawing appears more than once on a page.
export function blueprint(layers, uid = 'bp') {
  const layerContent = [interfaceLayer, processLayer, dataLayer];
  // Lower plates are drawn first so upper plates overlap them.
  const order = [2, 1, 0];
  const stops = (list) => list.map(([o, c, a = 1]) => html`<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`);

  return html`<div class="blueprint" data-blueprint data-merged="${MERGED}" aria-hidden="true">
  <svg class="bp" viewBox="0 0 640 480" focusable="false">
    <defs>
      <linearGradient id="bp-si-l-${uid}" x1="0" y1="0" x2="1" y2="0">${stops([[0, '#3d424b'], [0.34, '#a9b0bb'], [0.5, '#e9ecf1'], [0.62, '#7d8490'], [1, '#2f333a']])}</linearGradient>
      <linearGradient id="bp-si-r-${uid}" x1="0" y1="0" x2="1" y2="0">${stops([[0, '#24272d'], [0.4, '#5d636e'], [0.55, '#9aa1ad'], [0.7, '#4a4f58'], [1, '#1d2025']])}</linearGradient>
      <linearGradient id="bp-wafer-${uid}" x1="0" y1="0" x2="1" y2="1">${stops([[0, '#ffffff', 0], [0.34, '#e3e7ed', 0.5], [0.44, '#b4bbc6', 0.3], [0.54, '#f1f3f7', 0.38], [0.66, '#ffffff', 0], [1, '#ffffff', 0]])}</linearGradient>
      <radialGradient id="bp-glow-${uid}">${stops([[0, '#00c853', 0.32], [0.45, '#00c853', 0.08], [1, '#00c853', 0]])}</radialGradient>
    </defs>
    <ellipse class="bp-glow" cx="${CX}" cy="${TOPS[1] + B + T}" rx="${A * 1.5}" ry="${B * 1.5}" fill="url(#bp-glow-${uid})"/>
    <g class="bp-guides">
      <path class="bp-connector" style="--k:${Math.round((2000 * APPROACH[0]) / SPAN) / 1000}; --cy:${TOPS[1] + B}px" d="M${CX + A} ${TOPS[0] + B} V${TOPS[2] + B}"/>
      <path class="bp-connector" style="--k:${Math.round((2000 * APPROACH[0]) / SPAN) / 1000}; --cy:${TOPS[1] + 2 * B}px" d="M${CX} ${TOPS[0] + 2 * B} V${TOPS[2] + 2 * B}"/>
      ${cross(CX + A + 24, 14)}
    </g>
    ${order.map(
      (i) => html`<g class="bp-layer" data-layer="${i}" style="--shift:${APPROACH[i]}px; --i:${i}">
      ${plate(TOPS[i], uid, i)}
      ${layerContent[i](TOPS[i])}
      ${label(TOPS[i], String(i + 1).padStart(2, '0'), layers[i])}
    </g>`,
    )}
  </svg>
</div>`;
}
