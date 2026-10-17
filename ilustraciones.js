'use strict';

/* =========================================================
   Ilustraciones vectoriales: escena con la cordillera,
   e íconos de cada tramo.
   Los colores salen de variables CSS (--cielo-1, --cerro-1…)
   para que funcionen en modo claro y oscuro.
   ========================================================= */

/** Araucaria simple (copa en pisos). x, y = base del tronco. */
function araucaria(x, y, h) {
  const w = h * 0.55;
  const pisos = [0.35, 0.55, 0.75, 0.92].map((f, i) => {
    const yy = y - h * f;
    const ancho = w * (1 - i * 0.18);
    return `<path d="M${x - ancho / 2},${yy + h * 0.06} Q${x},${yy - h * 0.1} ${x + ancho / 2},${yy + h * 0.06} Z"/>`;
  }).join('');
  return `<g class="arbol"><rect x="${x - h * 0.03}" y="${y - h * 0.4}" width="${h * 0.06}" height="${h * 0.4}"/>${pisos}</g>`;
}

/** Escena superior de la ruta: cielo, sol/luna, Andes nevados, lomas y carretera. */
function svgEscena() {
  const nieve = (pts) => `<polygon class="nieve" points="${pts}"/>`;
  return `<svg class="escena-fondo" viewBox="0 0 400 180" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="g-cielo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" class="cielo-1"/><stop offset="1" class="cielo-2"/>
      </linearGradient>
    </defs>
    <rect width="400" height="180" fill="url(#g-cielo)"/>
    <g class="estrellas"><circle cx="40" cy="22" r="1.2"/><circle cx="95" cy="40" r="1"/><circle cx="160" cy="16" r="1.3"/><circle cx="250" cy="30" r="1"/><circle cx="330" cy="14" r="1.2"/><circle cx="372" cy="46" r="1"/></g>
    <circle class="astro" cx="330" cy="42" r="18"/>
    <g class="nube"><ellipse cx="80" cy="44" rx="26" ry="9"/><ellipse cx="96" cy="38" rx="16" ry="9"/><ellipse cx="250" cy="58" rx="20" ry="7"/><ellipse cx="262" cy="53" rx="12" ry="7"/></g>
    <polygon class="cerro-1" points="0,120 40,78 70,96 110,58 150,92 190,64 230,98 270,54 310,90 350,66 400,100 400,180 0,180"/>
    ${nieve('110,58 98,70 106,68 112,74 120,66')}${nieve('190,64 180,74 188,72 194,78 200,71')}${nieve('270,54 258,68 266,66 273,73 281,64')}${nieve('350,66 341,75 348,74 354,79 360,72')}${nieve('40,78 32,87 39,86 44,90 49,85')}
    <path class="cerro-2" d="M0,132 Q60,104 120,124 T240,118 T400,126 V180 H0 Z"/>
    <path class="loma" d="M0,150 Q90,128 200,142 T400,140 V180 H0 Z"/>
    <polygon class="asfalto-escena" points="200,128 206,128 262,180 138,180"/>
    <polygon class="borde-escena" points="199,128 200,128 140,180 136,180"/><polygon class="borde-escena" points="206,128 207,128 264,180 260,180"/>
    <g class="linea-escena"><polygon points="202.4,134 203.6,134 204,140 202,140"/><polygon points="201.8,147 204.2,147 205,156 201,156"/><polygon points="201,165 205,165 206,178 200,178"/></g>
    <g class="arboles">${araucaria(40, 156, 46)}${araucaria(330, 152, 38)}${araucaria(368, 160, 50)}</g>
    <g class="senal-escena"><rect x="272" y="140" width="2.4" height="24"/><circle cx="273.2" cy="138" r="8"/><circle class="senal-borde" cx="273.2" cy="138" r="6"/><text x="273.2" y="141" text-anchor="middle">60</text></g>
  </svg>`;
}

/** Íconos grandes (marca de agua) para cada tramo. Dibujados en blanco. */
const ILUSTRACION_TRAMO = {
  t01: '<rect x="6" y="14" width="52" height="36" rx="5"/><rect class="hueco" x="11" y="20" width="14" height="18" rx="2"/><rect class="hueco" x="30" y="21" width="22" height="3.5" rx="1.5"/><rect class="hueco" x="30" y="28" width="16" height="3.5" rx="1.5"/><text class="hueco" x="50" y="46" text-anchor="middle" font-size="12" font-weight="800">B</text>',
  t02: '<path d="M6 40 l4-12 c1-3 3-5 6-5 h24 c3 0 5 1 7 4 l6 8 h4 c2 0 3 1 3 3 v6 c0 1-1 2-2 2 H8 c-1 0-2-1-2-2z"/><path class="hueco" d="M15 34 l3-7 h9 v7z M31 27 h8 l5 7 h-13z"/><circle cx="18" cy="46" r="6"/><circle class="hueco" cx="18" cy="46" r="2.5"/><circle cx="46" cy="46" r="6"/><circle class="hueco" cx="46" cy="46" r="2.5"/>',
  t03: '<rect x="20" y="4" width="24" height="46" rx="6"/><circle class="hueco" cx="32" cy="15" r="5"/><circle class="hueco" cx="32" cy="27" r="5"/><circle class="hueco" cx="32" cy="39" r="5"/><rect x="29.5" y="50" width="5" height="12"/>',
  t04: '<path d="M8 10 h48 l-24 42z"/><path class="hueco" d="M17 15 h30 l-15 26z"/>',
  t05: '<path d="M20 6 h16 c3 0 5 2 5 5 v24 l8 12 c1 2 0 4-2 4 H22 c-3 0-5-2-5-5 V11 c0-3 1-5 3-5z"/><path class="hueco" d="M22 10 L44 44" stroke-width="5" stroke-linecap="round"/><circle cx="12" cy="36" r="4"/>',
  t06: '<circle cx="18" cy="9" r="5"/><path d="M14 16 h8 l3 14 -4 1 -2-7 -2 9 5 16 -4 2 -6-15 -3 13 h-4 l4-22z"/><circle cx="44" cy="46" r="10"/><circle class="hueco" cx="44" cy="46" r="7"/><path d="M44 46 l6-14 h5 M50 32 l-4 0" fill="none" stroke-width="3"/>',
  t07: '<circle cx="32" cy="32" r="26"/><circle class="hueco" cx="32" cy="32" r="19"/><circle cx="32" cy="32" r="7"/><rect x="29" y="38" width="6" height="16"/><rect x="11" y="29" width="16" height="6"/><rect x="37" y="29" width="16" height="6"/>',
  t08: '<path d="M18 36 a10 10 0 0 1 1-20 a14 14 0 0 1 26 2 a9 9 0 0 1 1 18z"/><path d="M20 42 l-4 10 M32 42 l-4 10 M44 42 l-4 10" fill="none" stroke-width="4" stroke-linecap="round"/>',
  t09: '<path d="M52 8 C24 8 10 22 12 44 c2 6 6 10 10 12 C26 34 34 26 46 20 C36 28 28 38 26 56 c18 2 30-12 30-32 c0-6-1-11-4-16z"/>',
  t10: '<path d="M32 6 l28 50 H4z"/><path class="hueco" d="M32 18 l17 31 H15z"/><rect x="29.5" y="25" width="5" height="14" rx="2"/><circle cx="32" cy="44" r="3"/>',
};
function svgTramo(id) {
  const dibujo = ILUSTRACION_TRAMO[id];
  return dibujo ? `<svg class="letrero-ilustra" viewBox="0 0 64 64" aria-hidden="true">${dibujo}</svg>` : '';
}
