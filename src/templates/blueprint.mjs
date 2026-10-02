// Hero illustration: an axonometric "exploded view" of three layers of a system
// (interface, processes, data), drawn like a technical blueprint.
// Plates move apart as the page scrolls (--explode, set by main.js).

import { html } from '../lib/html.mjs';

const CX = 290;
const A = 170; // half width of a plate
const B = 98; // half height (isometric ratio)
const T = 8; // plate thickness
const TOPS = [70, 196, 322];
const EXPLODE = [-34, 0, 34];

const f = (n) => Math.round(n * 10) / 10;

// Point on a plate from local coordinates u (towards the right corner) and v (towards the left corner).
function at(y, u, v) {
  return [CX + u * A - v * A, y + u * B + v * B];
}

function poly(y, pts) {
  return pts.map(([u, v]) => at(y, u, v).map(f).join(',')).join(' ');
}

function rect(y, u0, u1, v0, v1) {
  return poly(y, [
    [u0, v0],
    [u1, v0],
    [u1, v1],
    [u0, v1],
  ]);
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
  return html`<path class="bp-leader" d="M${x0 + 6} ${y0} H${x0 + 34}"/>
    <circle class="bp-dot" cx="${x0 + 6}" cy="${y0}" r="2"/>
    <text class="bp-index" x="${x0 + 42}" y="${y0 - 6}">${index}</text>
    <text class="bp-label" x="${x0 + 42}" y="${y0 + 10}">${text}</text>`;
}

function interfaceLayer(y) {
  return html`<polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.88, 0.1, 0.2)}"/>
    <polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.12, 0.46, 0.3, 0.88)}"/>
    <polygon class="bp-fill-accent bp-draw" pathLength="1" points="${rect(y, 0.56, 0.88, 0.3, 0.56)}"/>
    <polygon class="bp-line bp-draw" pathLength="1" points="${rect(y, 0.56, 0.88, 0.66, 0.88)}"/>`;
}

function processLayer(y) {
  const nodes = [
    [0.22, 0.28],
    [0.72, 0.22],
    [0.5, 0.55],
    [0.82, 0.74],
    [0.24, 0.78],
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [0, 4],
  ];
  const p = nodes.map(([u, v]) => at(y, u, v).map(f));
  return html`${edges.map(([a, b]) => html`<path class="bp-line bp-draw" pathLength="1" d="M${p[a][0]} ${p[a][1]} L${p[b][0]} ${p[b][1]}"/>`)}
    ${p.map(([x, py], i) =>
      i === 2
        ? html`<circle class="bp-node-accent bp-ping" cx="${x}" cy="${py}" r="5"/><circle class="bp-node-accent" cx="${x}" cy="${py}" r="5"/>`
        : html`<circle class="bp-node" cx="${x}" cy="${py}" r="4"/>`,
    )}`;
}

function dataLayer(y) {
  const lines = [];
  for (let u = 0.16; u <= 0.85; u += 0.1) {
    const [x1, y1] = at(y, u, 0.14).map(f);
    const [x2, y2] = at(y, u, 0.86).map(f);
    lines.push(html`<path class="bp-hatch bp-draw" pathLength="1" d="M${x1} ${y1} L${x2} ${y2}"/>`);
  }
  return lines;
}

function cross(x, y) {
  return html`<path class="bp-cross" d="M${x - 6} ${y} H${x + 6} M${x} ${y - 6} V${y + 6}"/>`;
}

export function blueprint(layers) {
  const bottom = TOPS[2] + 2 * B + T;
  const dimX = CX - A - 44;
  const layerContent = [interfaceLayer, processLayer, dataLayer];
  // Lower plates are drawn first so upper plates overlap them.
  const order = [2, 1, 0];

  return html`<div class="blueprint" data-blueprint aria-hidden="true">
  <svg class="bp" viewBox="0 0 640 600" focusable="false">
    <g class="bp-guides">
      <path class="bp-connector" d="M${CX - A} ${TOPS[0] + B} V${TOPS[2] + B} M${CX + A} ${TOPS[0] + B} V${TOPS[2] + B} M${CX} ${TOPS[0] + 2 * B} V${TOPS[2] + 2 * B}"/>
      <path class="bp-dim bp-draw" pathLength="1" d="M${dimX} ${TOPS[0]} V${bottom}"/>
      <path class="bp-dim" d="M${dimX - 6} ${TOPS[0]} H${dimX + 6} M${dimX - 6} ${bottom} H${dimX + 6} M${dimX - 3} ${TOPS[0] + 8} L${dimX} ${TOPS[0]} L${dimX + 3} ${TOPS[0] + 8} M${dimX - 3} ${bottom - 8} L${dimX} ${bottom} L${dimX + 3} ${bottom - 8}"/>
      ${[1, 2, 3, 4, 5].map((i) => html`<path class="bp-tick" d="M${dimX - 3} ${TOPS[0] + ((bottom - TOPS[0]) * i) / 6} H${dimX + 3}"/>`)}
      ${cross(CX + A + 20, 34)}
      ${cross(dimX, bottom + 40)}
      <circle class="bp-arc" cx="${CX}" cy="${TOPS[1] + B}" r="${A + 46}" pathLength="1"/>
    </g>
    ${order.map(
      (i) => html`<g class="bp-layer" style="--shift:${EXPLODE[i]}px; --i:${i}">
      ${plate(TOPS[i])}
      ${layerContent[i](TOPS[i])}
      ${label(TOPS[i], String(i + 1).padStart(2, '0'), layers[i])}
    </g>`,
    )}
  </svg>
</div>`;
}
