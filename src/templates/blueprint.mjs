// Hero illustration: an axonometric "exploded view" of three layers of a system
// (interface, processes, data), drawn like a technical blueprint.
// As the page scrolls the plates draw closer and settle at a fixed distance
// (--approach, 0 → 1, set by main.js).

import { html } from '../lib/html.mjs';

const CX = 300;
const A = 170; // half width of a plate
const B = 98; // half height (isometric ratio)
const T = 8; // plate thickness
const TOPS = [30, 136, 242];
const SPAN = TOPS[2] - TOPS[0];
const APPROACH = [26, 0, -26]; // how far each plate travels towards the middle one

const f = (n) => Math.round(n * 10) / 10;

// Point on a plate from local coordinates u (towards the right corner) and v (towards the left corner).
function at(y, u, v) {
  return [CX + u * A - v * A, y + u * B + v * B];
}

const pt = (p) => p.map(f).join(',');

function rect(y, u0, u1, v0, v1) {
  return [at(y, u0, v0), at(y, u1, v0), at(y, u1, v1), at(y, u0, v1)].map(pt).join(' ');
}

function plate(y) {
  const top = `${CX},${y} ${CX + A},${y + B} ${CX},${y + 2 * B} ${CX - A},${y + B}`;
  const left = `${CX - A},${y + B} ${CX},${y + 2 * B} ${CX},${y + 2 * B + T} ${CX - A},${y + B + T}`;
  const right = `${CX},${y + 2 * B} ${CX + A},${y + B} ${CX + A},${y + B + T} ${CX},${y + 2 * B + T}`;
  return html`<polygon class="bp-side" points="${left}"/>
    <polygon class="bp-side bp-side-dark" points="${right}"/>
    <polygon class="bp-plate bp-draw" points="${top}" pathLength="1"/>`;
}

function label(y, index, text) {
  const x0 = CX + A;
  const y0 = y + B;
  return html`<path class="bp-leader" d="M${x0 + 6} ${y0} H${x0 + 30}"/>
    <circle class="bp-dot" cx="${x0 + 6}" cy="${y0}" r="2"/>
    <text class="bp-index" x="${x0 + 38}" y="${y0 - 6}">${index}</text>
    <text class="bp-label" x="${x0 + 38}" y="${y0 + 10}">${text}</text>`;
}

function interfaceLayer(y) {
  return html`<polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.88, 0.1, 0.2)}"/>
    <polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.46, 0.3, 0.88)}"/>
    <polygon class="bp-fill-accent bp-draw" pathLength="1" points="${rect(y, 0.56, 0.88, 0.3, 0.56)}"/>
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

  return html`${wires.map((w) => html`<path class="${onRoute(w[0], w[1]) ? 'bp-wire-lit' : 'bp-wire'} bp-draw" pathLength="1" d="${wire(w)}"/>`)}
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
  }
  return lines;
}

function cross(x, y) {
  return html`<path class="bp-cross" d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}"/>`;
}

export function blueprint(layers) {
  const layerContent = [interfaceLayer, processLayer, dataLayer];
  // Lower plates are drawn first so upper plates overlap them.
  const order = [2, 1, 0];

  return html`<div class="blueprint" data-blueprint aria-hidden="true">
  <svg class="bp" viewBox="0 0 640 480" focusable="false">
    <g class="bp-guides">
      <path class="bp-connector" style="--k:${Math.round((2000 * APPROACH[0]) / SPAN) / 1000}; --cy:${TOPS[1] + B}px" d="M${CX + A} ${TOPS[0] + B} V${TOPS[2] + B}"/>
      <path class="bp-connector" style="--k:${Math.round((2000 * APPROACH[0]) / SPAN) / 1000}; --cy:${TOPS[1] + 2 * B}px" d="M${CX} ${TOPS[0] + 2 * B} V${TOPS[2] + 2 * B}"/>
      ${cross(CX + A + 24, 14)}
    </g>
    ${order.map(
      (i) => html`<g class="bp-layer" style="--shift:${APPROACH[i]}px; --i:${i}">
      ${plate(TOPS[i])}
      ${layerContent[i](TOPS[i])}
      ${label(TOPS[i], String(i + 1).padStart(2, '0'), layers[i])}
    </g>`,
    )}
  </svg>
</div>`;
}
