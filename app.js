'use strict';

/* =========================================================
   Saca tu Licencia — práctica del examen teórico Clase B (Chile)
   Banco: banco_preguntas_licencia_clase_b.json (no se modifica)
   Ruta y formato del examen: ruta.js
   Progreso: localStorage
   ========================================================= */

const CLAVE_PROGRESO = 'licenciaB.progreso.v1';
const URL_BANCO = 'banco_preguntas_licencia_clase_b.json';
const MASCOTA = 'Huemi';
const AUTOR = 'Javier. B';
// Poses de Huemi: [ancho, alto] en píxeles, para reservar su espacio antes de que carguen (evita saltos).
const POSES = {
  feliz: [184, 340], pensando: [191, 345], ups: [209, 339], celebra: [189, 350], licencia: [200, 340],
  hola: [157, 253], lee: [173, 249], pare: [217, 256], sinbencina: [197, 239], apurado: [178, 253],
  duerme: [236, 198], trofeo: [214, 243], maneja: [256, 252], cara: [181, 172], auto: [204, 225],
};
const HUEMUL = Object.fromEntries(Object.keys(POSES).map((p) => [p, `img/huemul-${p}.webp`]));
const tamPose = (p) => `width="${POSES[p][0]}" height="${POSES[p][1]}"`;
const PATRON_K = [0, 0.7, 1, 0.7, 0, -0.7, -1, -0.7]; // desplazamiento lateral de cada parada (× --amp)
const NOMBRES_META = { 30: 'Tranqui', 50: 'Constante', 100: 'A full' };
const DIAS_CORTOS = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const FRASES_OK = ['¡Bacán!', '¡Buena!', '¡Seco!', '¡Impeque!', '¡La rompiste!', '¡Vas como avión!', '¡Eso es!'];
const FRASES_MAL = ['¡Puchas!', '¡Uy, casi!', 'No era esa', '¡Ojo con esta!', 'Tranqui, se aprende'];

const ICONOS = {
  fuego: '<path d="M12.6 1.8c.4 3.1 2.2 4.8 3.8 6.6 1.6 1.8 3 3.8 3 6.6a7.4 7.4 0 0 1-14.8 0c0-2.7 1.3-4.9 3.1-6.5-.1 1.9.5 3.4 1.8 4.2-.3-4.3 1.2-8 3.1-10.9zM12 22c2.2 0 3.6-1.5 3.6-3.4 0-2.3-2-3.4-3-5.4-1.4 1.5-4.2 3-4.2 5.4 0 1.9 1.4 3.4 3.6 3.4z"/>',
  ruta: '<path d="M10 2h4l.4 4h-4.8zm-.8 6h5.6l.5 5H8.7zm-.7 7h7l.6 7H7.9z" opacity=".35"/><path d="M11.3 2h1.4v3.4h-1.4zm0 6h1.4v3.6h-1.4zm0 6.6h1.4V18h-1.4z"/><path d="M3 22 8 2h2L5.5 22zm18 0L16 2h-2l4.5 20z"/>',
  bencina: '<path d="M4 3.5C4 2.7 4.7 2 5.5 2h7c.8 0 1.5.7 1.5 1.5V11h.8c1.2 0 2.2 1 2.2 2.2v4.3a1 1 0 0 0 2 0V9.4l-2.3-2.3 1.4-1.4 2.6 2.6c.2.2.3.5.3.8v8.4a3 3 0 0 1-6 0v-4.3c0-.1-.1-.2-.2-.2H14V20h1v2H3v-2h1zm2 1v5h6v-5z"/>',
  estrella: '<path d="m12 1.8 3.1 6.4 7 1-5.1 4.9 1.2 7L12 17.8l-6.2 3.3 1.2-7-5.1-4.9 7-1z"/>',
  candado: '<path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5c1 0 1.5.6 1.5 1.5v8c0 1-.6 1.5-1.5 1.5h-11C5.6 21 5 20.4 5 19.5v-8c0-1 .6-1.5 1.5-1.5zm2.5 0h5V7.5a2.5 2.5 0 0 0-5 0z"/>',
  check: '<path d="M4 12.5 9.5 18 20 6.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>',
  cruz: '<path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>',
  libro: '<path d="M3 5.2C3 4.5 3.5 4 4.2 4c3 0 5.6.7 7.8 2.2V20c-2.2-1.4-4.8-2-7.8-2-.7 0-1.2-.5-1.2-1.2zM21 5.2c0-.7-.5-1.2-1.2-1.2-3 0-5.6.7-7.8 2.2V20c2.2-1.4 4.8-2 7.8-2 .7 0 1.2-.5 1.2-1.2z"/>',
  trofeo: '<path d="M7 2.5h10v1.6h3.3v2.6a4.6 4.6 0 0 1-4.1 4.6 5 5 0 0 1-3.2 3V17h3.5v4.5H7.5V17H11v-2.7a5 5 0 0 1-3.2-3A4.6 4.6 0 0 1 3.7 6.7V4.1H7zm0 3.4H5.6v.8c0 1.2.6 2.2 1.6 2.6-.1-.4-.2-.9-.2-1.3zm10 0v2.1c0 .4 0 .9-.2 1.3 1-.4 1.6-1.4 1.6-2.6v-.8z"/>',
  diana: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="12" cy="12" r="1.8"/>',
  repetir: '<path d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><path d="M18.6 2.6v4.6H14M5.4 21.4v-4.6H10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  pesa: '<path d="M2 10h2V8.5C4 7.7 4.7 7 5.5 7S7 7.7 7 8.5V11h10V8.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V10h2v4h-2v1.5c0 .8-.7 1.5-1.5 1.5S17 16.3 17 15.5V13H7v2.5C7 16.3 6.3 17 5.5 17S4 16.3 4 15.5V14H2z"/>',
  persona: '<circle cx="12" cy="7.5" r="4.5"/><path d="M3.5 21c.6-4.4 4-7 8.5-7s7.9 2.6 8.5 7z"/>',
  examen: '<path d="M6 2.5h9l4 4v14c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-17c0-.6.4-1 1-1zm2 7v2h8v-2zm0 4v2h8v-2zm0 4v2h5v-2z"/>',
  reloj: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M12 6.5V12l3.5 2.5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  licencia: '<path d="M3 5h18c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1zm2.5 4v6h5V9zm7 1v1.6H19V10zm0 3v1.6h4.5V13z"/>',
  medalla: '<path d="M7 2h4l1 3.5L13 2h4l-3 6.2a6.5 6.5 0 1 1-4 0zm5 8.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 1.3 1.3 2.5 2.7.4-2 1.9.5 2.7-2.5-1.3-2.5 1.3.5-2.7-2-1.9 2.7-.4z"/>',
  descargar: '<path d="M12 3v11m0 0-4.5-4.5M12 14l4.5-4.5M4 17v3h16v-3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  subir: '<path d="M12 15V4m0 0L7.5 8.5M12 4l4.5 4.5M4 17v3h16v-3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  ojo: '<path d="M12 5c5 0 9 4.5 10 7-1 2.5-5 7-10 7S3 14.5 2 12c1-2.5 5-7 10-7zm0 3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>',
  flecha: '<path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
};
const ico = (nombre, clase = '') => `<svg class="ico ${clase}" viewBox="0 0 24 24" aria-hidden="true">${ICONOS[nombre]}</svg>`;
const imgHuemul = (pose, clase = '', alt = '') => `<img class="${clase}" src="${HUEMUL[pose]}" ${tamPose(pose)} alt="${alt}" draggable="false">`;
/**
 * Huemi animado. anim: respira | salta | piensa | rebote | niega | entra | pop | maneja.
 * alterna: otra pose que aparece cada pocos segundos (cambia de gesto).
 */
function huemi(pose, { anim = 'respira', clase = '', alt = '', alterna = null, espejo = false, accion = '' } = {}) {
  const extra = alterna ? `<img class="alterna" src="${HUEMUL[alterna]}" ${tamPose(alterna)} alt="" draggable="false">` : '';
  const boton = accion ? ` data-accion="${accion}" role="button" tabindex="0" aria-label="Tocar a ${MASCOTA} para un dato del libro"` : '';
  return `<span class="huemi ${anim} ${espejo ? 'espejo' : ''} ${alterna ? 'ciclo' : ''} ${clase}"${boton}><img src="${HUEMUL[pose]}" ${tamPose(pose)} alt="${alt}" draggable="false">${extra}</span>`;
}
const imgAuto = (p) => `<img class="auto" src="img/huemul-auto.webp" width="204" height="225" alt="" style="--p:${p}" draggable="false">`;
const svgPare = (texto) => `<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="29,0 71,0 100,29 100,71 71,100 29,100 0,71 0,29" fill="#fff"/><polygon points="31,5 69,5 95,31 95,69 69,95 31,95 5,69 5,31" fill="currentColor"/><polygon points="33,10 67,10 90,33 90,67 67,90 33,90 10,67 10,33" fill="none" stroke="#fff" stroke-width="2.5"/><text x="50" y="58" text-anchor="middle" font-family="Baloo 2, Nunito, sans-serif" font-weight="800" font-size="${texto.length > 6 ? 17 : 22}" fill="#fff">${texto}</text></svg>`;

/* ---------- Estado global ---------- */
let banco = null;
let cfg = null;
const preguntasPorId = new Map();
const infoLeccion = new Map();      // idLeccion -> { unidad, leccion, tramo, posEnTramo }
const unidadDePregunta = new Map(); // idPregunta -> idUnidad
const leccionDePregunta = new Map();
const itemsRuta = [];                // [{ tipo: 'leccion'|'control', id, tramo }]
let P = null;
let vista = 'cargando';
let tab = 'ruta';
let pasoOnb = 0;
let hoja = null;
let modal = null;
let sesion = null;
let resultado = null;
let pantalla = null;                 // { tipo: 'intro'|'apuntes', id, volver }
let enfocarActual = true;
let temporizador = null;

/* ---------- Utilidades ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const azar = (arr) => arr[Math.floor(Math.random() * arr.length)];

function barajar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Ordena por dificultad (1 → 3) manteniendo el azar dentro de cada nivel. */
function porDificultad(ids) {
  return barajar(ids).sort((a, b) => preguntasPorId.get(a).dificultad - preguntasPorId.get(b).dificultad);
}

function fechaLocal(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function sumarDias(fecha, n) {
  const [y, m, d] = fecha.split('-').map(Number);
  return fechaLocal(new Date(y, m - 1, d + n));
}
function fechaLegible(fecha) {
  const [y, m, d] = fecha.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
}
const hoy = () => fechaLocal();
const paginas = (p) => (p[0] === p[1] ? `pág. ${p[0]}` : `págs. ${p[0]}–${p[1]}`);
const plural = (n, uno, varios) => `${n} ${n === 1 ? uno : varios}`;
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/* ---------- Progreso ---------- */
function progresoNuevo() {
  return {
    version: 2,
    onboarding: false,
    metaDiaria: null,
    xpTotal: 0,
    xpPorDia: {},
    sesionesPorDia: {},
    racha: { actual: 0, mejor: 0, ultimoDia: null },
    lecciones: {},
    controles: {},
    preguntas: {},
    srs: {},
    evaluaciones: {},
    simulacros: [],
    logros: {},
    ajustes: { sonido: true, vibracion: true, tema: 'sistema', movimiento: 'auto' },
  };
}

function cargarProgreso() {
  try {
    const crudo = localStorage.getItem(CLAVE_PROGRESO);
    if (crudo) return normalizar(JSON.parse(crudo));
  } catch (e) { console.warn('No se pudo leer el progreso', e); }
  return progresoNuevo();
}
function normalizar(datos) {
  const base = progresoNuevo();
  return {
    ...base, ...datos, version: 2,
    racha: { ...base.racha, ...(datos.racha || {}) },
    ajustes: { ...base.ajustes, ...(datos.ajustes || {}) },
    controles: datos.controles || {},
    logros: datos.logros || {},
    simulacros: Array.isArray(datos.simulacros) ? datos.simulacros : [],
  };
}
function guardar() {
  try { localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(P)); }
  catch (e) { console.warn('No se pudo guardar el progreso', e); }
}

const xpHoy = () => P.xpPorDia[hoy()] || 0;
const meta = () => P.metaDiaria || 50;

function rachaVigente() {
  const u = P.racha.ultimoDia;
  if (!u) return 0;
  return (u === hoy() || u === sumarDias(hoy(), -1)) ? P.racha.actual : 0;
}
function agregarXP(n) {
  if (n <= 0) return;
  P.xpTotal += n;
  P.xpPorDia[hoy()] = xpHoy() + n;
}
function registrarSesionTerminada() {
  const d = hoy();
  P.sesionesPorDia[d] = (P.sesionesPorDia[d] || 0) + 1;
  const necesarias = cfg.racha?.cuenta_si_completa_sesiones_por_dia || 1;
  if (P.sesionesPorDia[d] >= necesarias && P.racha.ultimoDia !== d) {
    P.racha.actual = P.racha.ultimoDia === sumarDias(d, -1) ? P.racha.actual + 1 : 1;
    P.racha.ultimoDia = d;
    P.racha.mejor = Math.max(P.racha.mejor, P.racha.actual);
    return true;
  }
  return false;
}

/** "auto": movimiento completo, o suave si el sistema pide reducir animaciones. */
function movimientoEfectivo() {
  const m = P?.ajustes.movimiento || 'auto';
  if (m !== 'auto') return m;
  return matchMedia('(prefers-reduced-motion: reduce)').matches ? 'suave' : 'completo';
}
function aplicarTema() {
  document.documentElement.dataset.movimiento = movimientoEfectivo();
  const t = P?.ajustes.tema;
  if (t === 'claro') document.documentElement.dataset.theme = 'light';
  else if (t === 'oscuro') document.documentElement.dataset.theme = 'dark';
  else delete document.documentElement.dataset.theme;
  const oscuro = t === 'oscuro' || (t !== 'claro' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', oscuro ? '#152030' : '#0039a6');
}

/* ---------- Repaso espaciado ---------- */
const intervalos = () => cfg.repaso_espaciado_dias || [1, 3, 7, 14, 30];
function srsFallo(id) { P.srs[id] = { nivel: 0, proxima: sumarDias(hoy(), intervalos()[0]) }; }
function srsAcierto(id) {
  const s = P.srs[id];
  if (!s || s.proxima > hoy()) return;
  const nivel = s.nivel + 1;
  if (nivel >= intervalos().length) delete P.srs[id];
  else P.srs[id] = { nivel, proxima: sumarDias(hoy(), intervalos()[nivel]) };
}
function srsPendientes() {
  const h = hoy();
  return Object.entries(P.srs)
    .filter(([id, s]) => s.proxima <= h && preguntasPorId.has(id))
    .sort((a, b) => (a[1].proxima < b[1].proxima ? -1 : a[1].proxima > b[1].proxima ? 1 : a[1].nivel - b[1].nivel))
    .map(([id]) => id);
}
function srsProxima() {
  return Object.values(P.srs).map((s) => s.proxima).filter((f) => f > hoy()).sort()[0] || null;
}

/* ---------- Ruta y desbloqueos ---------- */
const leccionCompletada = (id) => !!P.lecciones[id]?.completada;
const controlAprobado = (tid) => !!P.controles[tid]?.aprobado;
const idsDeLeccion = (id) => infoLeccion.get(id).leccion.preguntas.map((p) => p.id);
const acertadas = (ids) => ids.filter((id) => (P.preguntas[id]?.aciertos || 0) > 0).length;
const leccionDominada = (id) => { const ids = idsDeLeccion(id); return acertadas(ids) === ids.length; };

function itemCompletado(it) { return it.tipo === 'leccion' ? leccionCompletada(it.id) : controlAprobado(it.tramo.id); }
function itemDesbloqueado(i) { return i === 0 || itemCompletado(itemsRuta[i]) || itemCompletado(itemsRuta[i - 1]); }
const indiceItem = (tipo, id) => itemsRuta.findIndex((it) => it.tipo === tipo && (tipo === 'leccion' ? it.id === id : it.tramo.id === id));
const leccionDesbloqueada = (id) => itemDesbloqueado(indiceItem('leccion', id));
const controlDesbloqueado = (tid) => itemDesbloqueado(indiceItem('control', tid));
function itemActual() {
  const i = itemsRuta.findIndex((it, k) => !itemCompletado(it) && itemDesbloqueado(k));
  return i === -1 ? null : itemsRuta[i];
}
const tramoDesbloqueado = (t) => itemDesbloqueado(indiceItem('leccion', t.lecciones[0]));
const tramoCompleto = (t) => controlAprobado(t.id);
const colorUnidad = (uid) => { const l = banco.unidades.find((u) => u.id === uid).lecciones[0].id; return infoLeccion.get(l).tramo.color; };
function unidadCompleta(unidad) { return unidad.lecciones.every((l) => leccionCompletada(l.id)); }

/* ---------- Sonido y vibración ---------- */
let audioCtx = null;
function sonar(tipo) {
  if (!P?.ajustes.sonido) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notas = { ok: [[659, 0], [988, 0.09]], mal: [[220, 0], [185, 0.12]], fin: [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.3]], clic: [[880, 0]] }[tipo];
    const t0 = audioCtx.currentTime;
    notas.forEach(([f, t]) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = tipo === 'mal' ? 'sawtooth' : 'triangle';
      o.frequency.value = f;
      const vol = tipo === 'mal' ? 0.05 : tipo === 'clic' ? 0.04 : 0.14;
      g.gain.setValueAtTime(0.0001, t0 + t);
      g.gain.exponentialRampToValueAtTime(vol, t0 + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + (tipo === 'clic' ? 0.06 : 0.22));
      o.connect(g).connect(audioCtx.destination);
      o.start(t0 + t);
      o.stop(t0 + t + 0.25);
    });
  } catch (e) { /* sin audio */ }
}
function vibrar(ms) { if (P?.ajustes.vibracion && navigator.vibrate) try { navigator.vibrate(ms); } catch (e) { /* nada */ } }

/** Un dato del libro para que Huemi lo cuente: de lecciones ya abiertas en la ruta. */
let ultimoDato = null;
function datoAlAzar() {
  const abiertas = itemsRuta.filter((it, i) => it.tipo === 'leccion' && itemDesbloqueado(i)).map((it) => it.id);
  const notas = abiertas.flatMap((id) => apuntesDe(id)).filter((p) => p !== ultimoDato);
  ultimoDato = notas.length ? azar(notas) : null;
  return ultimoDato;
}

/* ---------- Confeti con los colores de la bandera ---------- */
function lanzarConfeti() {
  if (movimientoEfectivo() !== 'completo') return;
  const capa = document.createElement('div');
  capa.className = 'confeti';
  capa.setAttribute('aria-hidden', 'true');
  const colores = ['#0039a6', '#d52b1e', '#ffffff', '#ffc72c'];
  capa.innerHTML = Array.from({ length: 46 }, (_, i) => `<i style="left:${(Math.random() * 100).toFixed(1)}%;background:${colores[i % colores.length]};animation-delay:${(Math.random() * 0.6).toFixed(2)}s;animation-duration:${(2.2 + Math.random() * 1.4).toFixed(2)}s;--giro:${Math.round(Math.random() * 720 - 360)}deg;--x:${Math.round(Math.random() * 140 - 70)}px"></i>`).join('');
  document.body.appendChild(capa);
  setTimeout(() => capa.remove(), 4200);
}

/* ---------- Toast ---------- */
let toastTimer = null;
function toast(texto) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = texto;
  document.body.appendChild(el);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2600);
}

/* =========================================================
   Logros
   ========================================================= */
const LOGROS = [
  { id: 'primer-km', titulo: 'Primer kilómetro', desc: 'Completa tu primera lección', icono: 'ruta', ok: () => Object.values(P.lecciones).some((l) => l.completada) },
  { id: 'diagnostico', titulo: 'Punto de partida', desc: 'Haz el diagnóstico inicial', icono: 'diana', ok: () => !!P.evaluaciones['diagnostico-inicial'] },
  { id: 'perfecta', titulo: 'Impeque', desc: 'Termina una sesión sin errores', icono: 'estrella', ok: () => P.logros.perfecta === true },
  { id: 'tramo-1', titulo: 'Primer control', desc: 'Aprueba el control del tramo 1', icono: 'check', ok: () => controlAprobado(RUTA[0].id) },
  { id: 'racha-3', titulo: 'Tres al hilo', desc: 'Racha de 3 días', icono: 'fuego', ok: () => P.racha.mejor >= 3 },
  { id: 'racha-7', titulo: 'Semana completa', desc: 'Racha de 7 días', icono: 'fuego', ok: () => P.racha.mejor >= 7 },
  { id: 'repaso', titulo: 'Sin deudas', desc: 'Completa un repaso de errores', icono: 'repetir', ok: () => P.logros.repaso === true },
  { id: 'km-500', titulo: 'Ruta larga', desc: 'Recorre 500 km', icono: 'ruta', ok: () => P.xpTotal >= 500 },
  { id: 'cien', titulo: 'Cien aciertos', desc: 'Acierta 100 preguntas distintas', icono: 'medalla', ok: () => acertadas([...preguntasPorId.keys()]) >= 100 },
  { id: 'mitad', titulo: 'Mitad de camino', desc: 'Aprueba 5 tramos', icono: 'trofeo', ok: () => RUTA.filter((t) => controlAprobado(t.id)).length >= 5 },
  { id: 'simulacro', titulo: 'Listo pa\'l examen', desc: 'Aprueba un simulacro', icono: 'examen', ok: () => P.simulacros.some((s) => s.aprobado) },
  { id: 'licencia', titulo: 'Licencia en mano', desc: 'Completa toda la ruta', icono: 'licencia', ok: () => RUTA.every((t) => controlAprobado(t.id)) },
];
// P.logros guarda la fecha (texto) de cada logro ganado; "perfecta" y "repaso" usan true como marca previa.
const logroGanado = (id) => typeof P.logros[id] === 'string';
function revisarLogros() {
  const nuevos = [];
  LOGROS.forEach((l) => {
    if (logroGanado(l.id)) return;
    if (l.ok()) { P.logros[l.id] = hoy(); nuevos.push(l); }
  });
  return nuevos;
}

/* =========================================================
   Sesiones
   ========================================================= */
function itemCola(id, repeticion = false) {
  const p = preguntasPorId.get(id);
  let orden = p.opciones.map((_, i) => i);
  // En verdadero/falso se mantiene "Verdadero, Falso" para no confundir.
  if (cfg.barajar_opciones && p.tipo === 'seleccion_multiple') orden = barajar(orden);
  return { id, orden, repeticion };
}

const MODOS = {
  leccion: { vidas: true, repetir: true, feedback: true, orden: 'dificultad' },
  control: { vidas: true, repetir: true, feedback: true, orden: 'dificultad' },
  repaso_espaciado: { vidas: true, repetir: true, feedback: true, orden: 'tal_cual' },
  repaso_unidad: { vidas: true, repetir: true, feedback: true, orden: 'dificultad' },
  diagnostico_inicial: { vidas: false, repetir: false, feedback: true, orden: 'dificultad' },
  evaluacion_general: { vidas: false, repetir: false, feedback: true, orden: 'azar' },
  simulacro: { vidas: false, repetir: false, feedback: false, orden: 'tal_cual' },
};

function iniciarSesion({ tipo, titulo, ids, ref = null, color = null, dobles = [] }) {
  const modo = MODOS[tipo];
  let lista = ids.slice();
  if (modo.orden === 'dificultad') lista = porDificultad(lista);
  else if (modo.orden === 'azar' && cfg.barajar_preguntas) lista = barajar(lista);
  sesion = {
    tipo, titulo, ref, color, modo,
    cola: lista.map((id) => itemCola(id)),
    total: lista.length,
    idx: 0,
    vidas: modo.vidas ? cfg.vidas_por_sesion : null,
    repetir: modo.repetir && cfg.repetir_falladas_al_final,
    primera: {},
    respuestas: {},
    dobles: new Set(dobles),
    resueltas: 0,
    xp: 0,
    errores: 0,
    seguidas: 0,
    seleccion: null,
    estado: 'pregunta',
    ultimoOk: null,
    xpUltima: 0,
    metaAntes: xpHoy() >= meta(),
    inicio: Date.now(),
    fin: tipo === 'simulacro' ? Date.now() + EXAMEN_OFICIAL.minutos * 60000 : null,
  };
  hoja = null; pantalla = null; resultado = null;
  vista = 'sesion';
  history.pushState({ capa: 'sesion' }, '');
  if (sesion.fin) iniciarReloj();
  render();
  window.scrollTo(0, 0);
}

function iniciarReloj() {
  clearInterval(temporizador);
  temporizador = setInterval(() => {
    if (!sesion?.fin) return clearInterval(temporizador);
    const quedan = Math.max(0, Math.round((sesion.fin - Date.now()) / 1000));
    const el = document.querySelector('.reloj');
    if (el) {
      el.querySelector('span').textContent = mmss(quedan);
      el.classList.toggle('apurado', quedan <= 300);
    }
    if (quedan <= 0) { clearInterval(temporizador); modal = null; terminarSesion(true, true); }
  }, 1000);
}

function elegirPreguntasLeccion(idLeccion) {
  const n = cfg.preguntas_por_sesion;
  const ids = idsDeLeccion(idLeccion);
  if (ids.length <= n) return ids;
  // Prioridad: no vistas -> falladas la última vez -> el resto; dentro de cada grupo, de fácil a difícil.
  const grupo = (id) => { const s = P.preguntas[id]; return !s ? 0 : s.ultimaOk === false ? 1 : 2; };
  return porDificultad(ids).sort((a, b) => grupo(a) - grupo(b)).slice(0, n);
}

function elegirPreguntasControl(tramo) {
  const n = cfg.preguntas_por_sesion;
  const listas = tramo.lecciones.map((l) => barajar(idsDeLeccion(l)).sort((a, b) => {
    const fa = P.preguntas[a]?.ultimaOk === false ? 0 : 1;
    const fb = P.preguntas[b]?.ultimaOk === false ? 0 : 1;
    return fa - fb;
  }));
  const elegidas = [];
  for (let r = 0; elegidas.length < n && listas.some((l) => l.length > r); r++) {
    barajar(listas).forEach((l) => { if (l[r] && elegidas.length < n) elegidas.push(l[r]); });
  }
  return elegidas;
}

function elegirPreguntasSimulacro() {
  const E = EXAMEN_OFICIAL;
  const pool = [...preguntasPorId.values()].filter((p) => E.leccionesDoble.includes(leccionDePregunta.get(p.id))
    || E.palabrasDoble.some((w) => (p.enunciado + ' ' + p.explicacion).toLowerCase().includes(w)));
  // Tres preguntas de doble puntaje, de materias distintas.
  const dobles = [];
  const usadas = new Set();
  barajar(pool).forEach((p) => {
    const l = leccionDePregunta.get(p.id);
    if (dobles.length < E.doblePuntaje && !usadas.has(l)) { dobles.push(p.id); usadas.add(l); }
  });
  // El resto, proporcional a la cantidad de preguntas de cada unidad del libro.
  const resto = E.preguntas - dobles.length;
  const total = preguntasPorId.size;
  const cuotas = banco.unidades.map((u) => {
    const ids = u.lecciones.flatMap((l) => l.preguntas.map((p) => p.id)).filter((id) => !dobles.includes(id));
    const exacta = (ids.length / total) * resto;
    return { ids, n: Math.floor(exacta), frac: exacta % 1 };
  });
  let faltan = resto - cuotas.reduce((s, c) => s + c.n, 0);
  [...cuotas].sort((a, b) => b.frac - a.frac).forEach((c) => { if (faltan > 0) { c.n++; faltan--; } });
  const normales = cuotas.flatMap((c) => barajar(c.ids).slice(0, c.n));
  return { ids: barajar([...dobles, ...normales]), dobles };
}

function empezarLeccion(id, saltarIntro = false) {
  if (!saltarIntro && !P.lecciones[id]?.introVista) { abrirPantalla('intro', id, 'ruta'); return; }
  const { tramo, leccion } = infoLeccion.get(id);
  iniciarSesion({ tipo: 'leccion', titulo: leccion.titulo, ref: id, color: tramo.color, ids: elegirPreguntasLeccion(id) });
}
function empezarControl(tid) {
  const t = RUTA.find((x) => x.id === tid);
  iniciarSesion({ tipo: 'control', titulo: `Control: ${t.titulo}`, ref: tid, color: t.color, ids: elegirPreguntasControl(t) });
}
function empezarDiagnostico(id) {
  const d = banco.diagnosticos.find((x) => x.id === id);
  const ids = d.preguntas.filter((pid) => preguntasPorId.has(pid));
  iniciarSesion({ tipo: d.tipo, titulo: d.titulo, ref: d.id, ids, color: d.unidad ? colorUnidad(d.unidad) : null });
}
function empezarRepasoEspaciado() {
  const ids = srsPendientes().slice(0, cfg.preguntas_por_sesion);
  if (ids.length) iniciarSesion({ tipo: 'repaso_espaciado', titulo: 'Repaso de errores', ids, color: '#f07f09' });
}
function empezarSimulacro() {
  const { ids, dobles } = elegirPreguntasSimulacro();
  iniciarSesion({ tipo: 'simulacro', titulo: 'Simulacro de examen', ids, dobles, color: '#0039a6' });
}

function seleccionar(i) {
  if (!sesion || sesion.estado !== 'pregunta') return;
  sesion.seleccion = i;
  document.querySelectorAll('.opcion').forEach((b, j) => b.classList.toggle('sel', j === i));
  const btn = document.getElementById('btn-comprobar');
  if (btn) btn.disabled = false;
  sonar('clic');
}

function comprobar() {
  if (!sesion || sesion.estado !== 'pregunta' || sesion.seleccion === null) return;
  const s = sesion;
  const item = s.cola[s.idx];
  const p = preguntasPorId.get(item.id);
  const elegida = item.orden[s.seleccion];
  const ok = elegida === p.respuesta_correcta;

  const est = P.preguntas[item.id] || { vistas: 0, aciertos: 0, fallos: 0, ultimaOk: null };
  est.vistas++;
  ok ? est.aciertos++ : est.fallos++;
  est.ultimaOk = ok;
  P.preguntas[item.id] = est;

  s.xpUltima = 0;
  if (!item.repeticion) {
    s.primera[item.id] = ok;
    s.respuestas[item.id] = elegida;
    if (ok) {
      s.xpUltima = cfg.xp_por_dificultad[String(p.dificultad)] || 10;
      s.xp += s.xpUltima;
      srsAcierto(item.id);
    }
  }
  if (ok) {
    s.resueltas++;
    s.seguidas++;
  } else {
    s.errores++;
    s.seguidas = 0;
    srsFallo(item.id);
    if (s.modo.vidas) s.vidas = Math.max(0, s.vidas - 1);
    if (s.repetir) s.cola.push(itemCola(item.id, true));
    else s.resueltas++;
  }
  s.ultimoOk = ok;
  guardar();

  if (!s.modo.feedback) {          // simulacro: sin corrección hasta el final
    s.idx++;
    s.seleccion = null;
    if (s.idx >= s.cola.length) return terminarSesion(true);
    render();
    window.scrollTo(0, 0);
    return;
  }
  if (ok) sonar('ok');
  else { sonar('mal'); vibrar(120); }
  s.estado = 'feedback';
  render();
  document.querySelector('.feedback .btn')?.focus({ preventScroll: true });
  // En PC la explicación queda bajo las alternativas: se baja hasta ella.
  if (matchMedia('(min-width: 760px)').matches) document.querySelector('.feedback')?.scrollIntoView({ block: 'nearest', behavior: movimientoEfectivo() === 'completo' ? 'smooth' : 'auto' });
}

function continuar() {
  if (!sesion || sesion.estado !== 'feedback') return;
  if (sesion.modo.vidas && sesion.vidas <= 0) return terminarSesion(false);
  sesion.idx++;
  if (sesion.idx >= sesion.cola.length) return terminarSesion(true);
  sesion.seleccion = null;
  sesion.estado = 'pregunta';
  render();
  window.scrollTo(0, 0);
}

function terminarSesion(terminada, tiempoAgotado = false) {
  clearInterval(temporizador);
  const s = sesion;
  if (!s) return;
  const correctas = Object.values(s.primera).filter(Boolean).length;
  const pct = Math.round((correctas / s.total) * 100);
  const umbral = cfg.porcentaje_para_completar_leccion;
  const res = {
    tipo: s.tipo, titulo: s.titulo, ref: s.ref, color: s.color, terminada, tiempoAgotado,
    correctas, total: s.total, pct, xp: 0, perfecta: false,
    rachaSubio: false, metaCumplida: false, nuevo: false, aprobada: pct >= umbral,
    // Falladas a la primera; en el simulacro también las que quedaron sin responder.
    falladas: s.cola.filter((it) => !it.repeticion && (s.primera[it.id] === false || (s.tipo === 'simulacro' && s.primera[it.id] === undefined))).map((it) => it.id),
    respuestas: { ...s.respuestas },
    dobles: [...s.dobles],
    segundos: Math.round((Date.now() - s.inicio) / 1000),
    logros: [],
  };

  if (s.tipo === 'simulacro') {
    const E = EXAMEN_OFICIAL;
    res.puntaje = s.cola.reduce((suma, it) => suma + (s.primera[it.id] ? (s.dobles.has(it.id) ? 2 : 1) : 0), 0);
    res.maximo = E.puntajeMaximo;
    res.aprobada = res.puntaje >= E.puntajeAprobacion;
    res.sinResponder = s.cola.filter((it) => s.primera[it.id] === undefined).length;
  }

  if (terminada) {
    res.perfecta = s.errores === 0 && Object.keys(s.primera).length === s.total;
    res.xp = s.xp + (res.perfecta ? cfg.bonus_sesion_perfecta : 0);
    agregarXP(res.xp);
    res.rachaSubio = registrarSesionTerminada();
    res.metaCumplida = !s.metaAntes && xpHoy() >= meta();
    if (res.perfecta && !logroGanado('perfecta')) P.logros.perfecta = true;

    if (s.tipo === 'leccion') {
      const l = P.lecciones[s.ref] || { completada: false, mejorPct: 0, intentos: 0 };
      l.intentos++;
      l.mejorPct = Math.max(l.mejorPct, pct);
      if (res.aprobada && !l.completada) { l.completada = true; res.nuevo = true; }
      P.lecciones[s.ref] = l;
      res.dominada = leccionDominada(s.ref);
    } else if (s.tipo === 'control') {
      const c = P.controles[s.ref] || { aprobado: false, mejorPct: 0, intentos: 0 };
      c.intentos++;
      c.mejorPct = Math.max(c.mejorPct, pct);
      if (res.aprobada && !c.aprobado) { c.aprobado = true; res.nuevo = true; }
      P.controles[s.ref] = c;
    } else if (s.tipo === 'repaso_espaciado') {
      if (!logroGanado('repaso')) P.logros.repaso = true;
    } else if (s.tipo === 'simulacro') {
      P.simulacros.unshift({ fecha: hoy(), puntaje: res.puntaje, maximo: res.maximo, aprobado: res.aprobada, segundos: res.segundos });
      P.simulacros = P.simulacros.slice(0, 30);
    } else {
      const e = P.evaluaciones[s.ref] || { mejorPct: 0, intentos: 0 };
      e.intentos++;
      e.mejorPct = Math.max(e.mejorPct, pct);
      e.ultimoPct = pct;
      e.fecha = hoy();
      if (s.tipo === 'diagnostico_inicial') {
        const porUnidad = {};
        Object.entries(s.primera).forEach(([id, ok]) => {
          const u = unidadDePregunta.get(id);
          porUnidad[u] = porUnidad[u] || [0, 0];
          porUnidad[u][1]++;
          if (ok) porUnidad[u][0]++;
        });
        e.porUnidad = porUnidad;
      }
      P.evaluaciones[s.ref] = e;
    }
    res.logros = revisarLogros();
    sonar('fin');
  } else if (s.tipo === 'leccion' || s.tipo === 'control') {
    const coleccion = s.tipo === 'leccion' ? P.lecciones : P.controles;
    const d = coleccion[s.ref] || (s.tipo === 'leccion' ? { completada: false, mejorPct: 0, intentos: 0 } : { aprobado: false, mejorPct: 0, intentos: 0 });
    d.intentos++;
    coleccion[s.ref] = d;
  }
  guardar();
  sesion = null;
  resultado = res;
  vista = 'resultado';
  render();
  window.scrollTo(0, 0);
  if (terminada && (res.nuevo || res.perfecta || (res.tipo === 'simulacro' && res.aprobada))) lanzarConfeti();
}

function salirSesion() {
  clearInterval(temporizador);
  sesion = null;
  vista = 'inicio';
  enfocarActual = true;
  render();
}
function pedirSalirSesion() {
  const examen = sesion?.tipo === 'simulacro';
  modal = {
    pose: 'ups',
    titulo: examen ? '¿Abandonar el simulacro?' : '¿Te bajas en esta parada?',
    texto: examen
      ? 'Si sales ahora el simulacro no se va a corregir ni contar.'
      : 'Si sales ahora no sumas kilómetros ni cuenta para tu racha. Lo que respondiste igual queda guardado para tus repasos.',
    ok: 'Seguir', okClase: 'verde',
    cancelar: 'Salir', cancelarRojo: true,
    alCancelar: salirSesion,
  };
  render();
}

/* ---------- Pantallas de explicación ---------- */
function abrirPantalla(tipo, id, volver) {
  const yaAbierta = vista === 'pantalla';
  pantalla = { tipo, id, volver };
  hoja = null;
  vista = 'pantalla';
  if (!yaAbierta) history.pushState({ capa: 'pantalla' }, '');
  render();
  window.scrollTo(0, 0);
}
function cerrarPantalla() {
  const volver = pantalla?.volver || 'ruta';
  pantalla = null;
  vista = 'inicio';
  tab = volver;
  enfocarActual = volver === 'ruta';
  render();
}
/** Apuntes de una lección: explicaciones únicas del libro, de lo básico a lo más fino. */
function apuntesDe(idLeccion) {
  const vistos = new Set();
  return idsDeLeccion(idLeccion)
    .map((id) => preguntasPorId.get(id))
    .sort((a, b) => a.dificultad - b.dificultad || a.fuente.pagina - b.fuente.pagina)
    .filter((p) => { const k = p.explicacion.trim(); if (vistos.has(k)) return false; vistos.add(k); return true; });
}

/* =========================================================
   Vistas
   ========================================================= */
function vStats() {
  const racha = rachaVigente();
  const hecha = P.racha.ultimoDia === hoy();
  const frac = Math.min(1, xpHoy() / meta());
  const circ = 2 * Math.PI * 10;
  return `
      <div class="stats">
        <button class="stat racha ${hecha ? '' : 'apagada'}" data-accion="tab" data-tab="perfil" aria-label="Racha de ${plural(racha, 'día', 'días')}">${ico('fuego')}<span>${racha}</span></button>
        <button class="stat meta" data-accion="tab" data-tab="perfil" aria-label="Meta diaria: ${xpHoy()} de ${meta()} kilómetros">
          <svg class="anillo ${frac >= 1 ? 'lleno' : ''}" viewBox="0 0 26 26"><circle class="pista" cx="13" cy="13" r="10"/><circle class="valor" cx="13" cy="13" r="10" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - frac)}"/></svg>
          <span>${xpHoy()}/${meta()}</span>
        </button>
        <button class="stat km" data-accion="tab" data-tab="perfil" aria-label="${P.xpTotal} kilómetros recorridos">${ico('ruta')}<span>${P.xpTotal}</span></button>
      </div>`;
}

function vCabecera() {
  return `
  <header class="topbar">
    <div class="franja-chilena"></div>
    <div class="topbar-fila">
      <img class="topbar-logo" src="img/logo.webp" width="957" height="1000" alt="Saca tu Licencia">
      ${vStats()}
    </div>
  </header>`;
}

const vCreditos = () => `<p class="creditos">Creada, diseñada y desarrollada por <b>${AUTOR}</b></p>`;

/** Panel derecho, solo en pantallas grandes (PC y notebook). */
function vPanel() {
  const actual = itemActual();
  const pend = srsPendientes().length;
  const frac = Math.min(1, xpHoy() / meta());
  let siguiente = `<p>Terminaste toda la ruta. ¡Ahora rinde el simulacro!</p>`;
  if (actual) {
    const titulo = actual.tipo === 'leccion' ? infoLeccion.get(actual.id).leccion.titulo : `Control: ${actual.tramo.titulo}`;
    const accion = actual.tipo === 'leccion' ? `data-accion="abrirLeccion" data-id="${actual.id}"` : `data-accion="abrirControl" data-id="${actual.tramo.id}"`;
    siguiente = `<p>Tramo ${RUTA.indexOf(actual.tramo) + 1} · ${esc(actual.tramo.titulo)}</p><h3>${esc(titulo)}</h3>
      <button class="btn verde chico" ${accion}>${actual.tipo === 'leccion' ? (P.lecciones[actual.id]?.intentos ? 'Seguir' : 'Empezar') : 'Rendir control'}</button>`;
  }
  const dato = datoAlAzar();
  return `
  <aside class="panel" aria-label="Resumen">
    ${vStats()}
    <div class="tarjeta">
      <div class="tarjeta-cab"><div class="tarjeta-icono" style="--c:var(--verde)">${ico('diana')}</div>
        <div><h3>Meta del día</h3><p>${xpHoy()} de ${meta()} km${frac >= 1 ? ' · ¡cumplida!' : ''}</p></div></div>
      <div class="barra" style="--t:var(--verde)"><div style="width:${frac * 100}%"></div></div>
    </div>
    <div class="tarjeta panel-siguiente">
      <p class="subtitulo" style="margin:0">Siguiente parada</p>
      ${siguiente}
    </div>
    ${pend ? `<div class="tarjeta">
      <div class="tarjeta-cab"><div class="tarjeta-icono" style="--c:transparent">${imgHuemul('pensando')}</div>
        <div><h3>Repaso de errores</h3><p>${plural(pend, 'pregunta pendiente', 'preguntas pendientes')}</p></div></div>
      <button class="btn amarillo chico" data-accion="repasoEspaciado">Repasar ahora</button>
    </div>` : ''}
    <div class="tarjeta">
      <div class="tarjeta-cab"><div class="tarjeta-icono" style="--c:transparent">${imgHuemul('apurado')}</div>
        <div><h3>Simulacro de examen</h3><p>${EXAMEN_OFICIAL.preguntas} preguntas · ${EXAMEN_OFICIAL.minutos} min · apruebas con ${EXAMEN_OFICIAL.puntajeAprobacion}/${EXAMEN_OFICIAL.puntajeMaximo}</p></div></div>
      <button class="btn azul chico" data-accion="simulacro">Rendir simulacro</button>
    </div>
    ${dato ? `<div class="tarjeta panel-dato">
      <div class="tarjeta-cab">${huemi('lee', { anim: 'respira' })}<div><p class="dato-cab">Dato del libro</p><p>${esc(dato.explicacion)}</p><p class="nota">pág. ${esc(dato.fuente.pagina)}</p></div></div>
    </div>` : ''}
    ${vCreditos()}
  </aside>`;
}

function vTabbar() {
  const pendientes = srsPendientes().length;
  const t = (id, icono, txt, extra = '') => `
    <button class="tab ${tab === id ? 'activa' : ''}" data-accion="tab" data-tab="${id}" ${tab === id ? 'aria-current="page"' : ''}>${ico(icono)}<span>${txt}</span>${extra}</button>`;
  return `<nav class="tabbar" aria-label="Secciones">
    <img class="tabbar-logo" src="img/logo.webp" width="957" height="1000" alt="Saca tu Licencia">
    ${t('ruta', 'ruta', 'Ruta')}
    ${t('practicar', 'pesa', 'Practicar', pendientes ? `<span class="insignia">${pendientes}</span>` : '')}
    ${t('apuntes', 'libro', 'Apuntes')}
    ${t('perfil', 'persona', 'Perfil')}
    <div class="tabbar-pie">${huemi('hola', { anim: 'respira' })}${vCreditos()}</div>
  </nav>`;
}

/** Había racha y pasó más de un día sin practicar. */
const rachaPerdida = () => P.racha.actual > 0 && rachaVigente() === 0;

function saludo() {
  if (rachaPerdida()) return `¡Me quedé dormido! Se cortó tu racha de <b>${plural(P.racha.actual, 'día', 'días')}</b>. Hoy partimos de nuevo.`;
  const h = new Date().getHours();
  const base = h < 12 ? '¡Buenos días!' : h < 20 ? '¡Buenas tardes!' : '¡Buenas noches!';
  const pend = srsPendientes().length;
  const faltan = meta() - xpHoy();
  if (!itemActual()) return `${base} Terminaste toda la ruta. ¡Ahora a rendir el <b>simulacro</b>!`;
  if (pend) return `${base} Tienes <b>${plural(pend, 'pregunta', 'preguntas')}</b> para repasar en Practicar.`;
  if (faltan > 0) return `${base} Te faltan <b>${faltan} km</b> para tu meta de hoy.`;
  return `¡Meta cumplida! <b>Vas como avión.</b> Si quieres, sigue sumando kilómetros.`;
}

function vRuta() {
  const actual = itemActual();
  let html = `
  <section class="escena">
    ${svgEscena()}
    ${huemi(!actual ? 'trofeo' : rachaPerdida() ? 'duerme' : 'hola', { anim: rachaPerdida() ? 'respira' : 'salta', clase: 'escena-huemi', alterna: actual && !rachaPerdida() ? 'feliz' : null, accion: 'tocarHuemi' })}
    <div class="globo escena-globo" id="globo-escena" aria-live="polite">${saludo()}</div>
  </section>`;
  let fila = 0;
  const nodoFila = (contenido, { abierta, esActual, etiqueta, burbuja, pose }) => {
    const k = PATRON_K[fila % PATRON_K.length];
    // La etiqueta va al lado opuesto del desplazamiento (o hacia donde no sigue el camino).
    const lado = k > 0 ? 'izq' : k < 0 ? 'der' : (fila % PATRON_K.length === 0 ? 'izq' : 'der');
    fila++;
    return `
      <div class="nodo-fila ${abierta ? '' : 'bloqueada'} ${esActual ? 'con-burbuja' : ''}" style="--k:${k}">
        <div class="parada">
          ${esActual ? `<span class="burbuja">${burbuja}</span>${huemi(pose, { anim: 'salta', clase: `huemi-ruta ${lado === 'izq' ? 'der' : 'izq'}`, alterna: pose === 'feliz' ? 'licencia' : null })}` : ''}
          ${contenido}
          <span class="nodo-etiqueta ${lado}">${etiqueta}</span>
        </div>
      </div>`;
  };
  html += RUTA.map((t, ti) => {
    const desbloq = tramoDesbloqueado(t);
    const hechas = t.lecciones.filter(leccionCompletada).length;
    fila = 0;
    const nodos = t.lecciones.map((lid) => {
      const { leccion } = infoLeccion.get(lid);
      const comp = leccionCompletada(lid);
      const dom = comp && leccionDominada(lid);
      const abierta = leccionDesbloqueada(lid);
      const esActual = actual?.tipo === 'leccion' && actual.id === lid;
      const estado = dom ? 'dominada' : comp ? 'completada' : abierta ? (esActual ? 'actual' : '') : 'bloqueada';
      const icono = dom ? 'estrella' : comp ? 'check' : abierta ? 'libro' : 'candado';
      return nodoFila(
        `<button class="nodo ${estado}" data-accion="abrirLeccion" data-id="${lid}" aria-label="${esc(leccion.titulo)}${dom ? ' (dominada)' : comp ? ' (completada)' : abierta ? '' : ' (bloqueada)'}">${ico(icono)}</button>`,
        { abierta, esActual, etiqueta: esc(leccion.titulo), burbuja: P.lecciones[lid]?.intentos ? '¡Sigamos!' : '¡Parte aquí!', pose: 'feliz' },
      );
    }).join('');
    const ctrlAbierto = controlDesbloqueado(t.id);
    const ctrlOk = controlAprobado(t.id);
    const ctrlActual = actual?.tipo === 'control' && actual.tramo.id === t.id;
    const nodoControl = nodoFila(
      `<button class="nodo control ${ctrlOk ? 'completada' : ctrlAbierto ? (ctrlActual ? 'actual' : '') : 'bloqueada'}" data-accion="abrirControl" data-id="${t.id}" aria-label="Control del tramo ${ti + 1}${ctrlOk ? ' (aprobado)' : ''}">${svgPare(ctrlOk ? 'LISTO' : 'CONTROL')}</button>`,
      { abierta: ctrlAbierto, esActual: ctrlActual, etiqueta: 'Control del tramo', burbuja: '¡Control!', pose: 'pare' },
    );
    return `
    <section class="tramo ${desbloq ? '' : 'bloqueado'}" style="--t:${t.color}">
      <div class="letrero">
        ${svgTramo(t.id)}
        <div class="escudo"><small>TRAMO</small><span>${ti + 1}</span></div>
        <div class="letrero-txt">
          <p class="letrero-sup">${tramoCompleto(t) ? 'Tramo aprobado' : desbloq ? 'En ruta' : 'Más adelante'} · ${hechas}/${t.lecciones.length}</p>
          <h2>${esc(t.titulo)}</h2>
          <p>${esc(t.descripcion)}</p>
        </div>
      </div>
      <div class="camino">${nodos}${nodoControl}</div>
    </section>`;
  }).join('');
  html += `<div class="meta-final">${huemi('maneja', { anim: 'maneja' })}<p>Al final del camino: <b>¡tu licencia!</b></p></div>`;
  return html;
}

/** Dibuja la carretera (bordes blancos, asfalto y línea amarilla) uniendo los nodos de cada tramo. */
function dibujarCaminos() {
  document.querySelectorAll('.camino').forEach((camino) => {
    camino.querySelector('svg.pista-vial')?.remove();
    const base = camino.getBoundingClientRect();
    const filas = [...camino.querySelectorAll('.nodo-fila')];
    const pts = filas.map((f) => {
      const r = f.querySelector('.nodo').getBoundingClientRect();
      return { x: r.left + r.width / 2 - base.left, y: r.top + r.height / 2 - base.top, bloq: f.classList.contains('bloqueada') };
    });
    if (!pts.length) return;
    const todos = [{ x: pts[0].x, y: -24, bloq: pts[0].bloq }, ...pts, { x: pts[pts.length - 1].x, y: base.height + 30, bloq: pts[pts.length - 1].bloq }];
    const trazo = (a) => a.map((p, i) => {
      if (i === 0) return `M${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      const q = a[i - 1];
      const dy = (p.y - q.y) / 2;
      return `C${q.x.toFixed(1)},${(q.y + dy).toFixed(1)} ${p.x.toFixed(1)},${(p.y - dy).toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(' ');
    let corte = todos.findIndex((p) => p.bloq);
    if (corte === -1) corte = todos.length;
    const abiertos = todos.slice(0, corte);
    const cerrados = todos.slice(Math.max(0, corte - 1));
    const capa = (a, clase) => {
      if (a.length < 2) return '';
      const d = trazo(a);
      return `<g class="${clase}"><path class="sombra-vial" d="${d}"/><path class="borde-vial" d="${d}"/><path class="asfalto" d="${d}"/><path class="linea" d="${d}"/></g>`;
    };
    camino.insertAdjacentHTML('afterbegin', `<svg class="pista-vial" aria-hidden="true">${capa(cerrados, 'bloq')}${capa(abiertos, 'abierta')}</svg>`);
  });
}

function vPracticar() {
  const pend = srsPendientes();
  const totalSrs = Object.keys(P.srs).length;
  const prox = srsProxima();
  const diag = banco.diagnosticos.find((d) => d.tipo === 'diagnostico_inicial');
  const evalGen = banco.diagnosticos.find((d) => d.tipo === 'evaluacion_general');
  const repasos = banco.diagnosticos.filter((d) => d.tipo === 'repaso_unidad');
  const E = EXAMEN_OFICIAL;
  const ultimo = P.simulacros[0];
  const aprobados = P.simulacros.filter((s) => s.aprobado).length;
  const resumen = (d) => {
    const e = P.evaluaciones[d.id];
    return e ? `Mejor resultado: ${e.mejorPct}% · ${plural(e.intentos, 'intento', 'intentos')}` : `${d.preguntas.length} preguntas`;
  };

  let html = `<h1 class="titulo-seccion">Practicar</h1>`;

  html += `
  <div class="tarjeta destacada">
    <div class="tarjeta-cab">
      <div class="tarjeta-icono" style="--c:transparent">${imgHuemul('apurado')}</div>
      <div><h3>Simulacro de examen <span class="etiqueta">Formato oficial</span></h3>
      <p>${E.preguntas} preguntas · ${E.minutos} minutos · ${E.doblePuntaje} valen doble</p></div>
    </div>
    <p>Como el examen teórico Clase B: apruebas con <b>${E.puntajeAprobacion} de ${E.puntajeMaximo} puntos</b>. Las respuestas se corrigen al final.</p>
    ${ultimo ? `<p class="nota">Último: ${ultimo.puntaje}/${ultimo.maximo} puntos (${ultimo.aprobado ? 'aprobado' : 'reprobado'}) · ${plural(P.simulacros.length, 'simulacro', 'simulacros')}, ${aprobados} ${aprobados === 1 ? 'aprobado' : 'aprobados'}.</p>` : ''}
    <button class="btn azul" data-accion="simulacro">Rendir simulacro</button>
  </div>`;

  html += `
  <div class="tarjeta">
    <div class="tarjeta-cab">
      <div class="tarjeta-icono" style="--c:transparent">${imgHuemul(pend.length ? 'pensando' : 'feliz')}</div>
      <div><h3>Repaso de errores</h3>
      <p>${pend.length ? `${plural(pend.length, 'pregunta pendiente', 'preguntas pendientes')} para hoy` : totalSrs ? `Nada pendiente hoy. Próximo repaso: ${fechaLegible(prox)}.` : 'Aún no tienes preguntas falladas. ¡Bacán!'}</p></div>
    </div>
    <p class="nota">Lo que fallas vuelve a aparecer a los ${intervalos().join(', ')} días hasta que lo domines.</p>
    <button class="btn ${pend.length ? 'amarillo' : ''}" data-accion="repasoEspaciado" ${pend.length ? '' : 'disabled'}>Repasar ahora</button>
  </div>`;

  if (diag) {
    html += `
    <div class="tarjeta">
      <div class="tarjeta-cab">
        <div class="tarjeta-icono" style="--c:var(--rojo)">${ico('diana')}</div>
        <div><h3>${esc(diag.titulo)}</h3><p>${resumen(diag)}</p></div>
      </div>
      ${diag.descripcion ? `<p class="nota">${esc(diag.descripcion)}</p>` : ''}
      ${P.evaluaciones[diag.id]?.porUnidad ? vDiagUnidades(P.evaluaciones[diag.id].porUnidad) : ''}
      <button class="btn" data-accion="diagnostico" data-id="${diag.id}">${P.evaluaciones[diag.id] ? 'Repetir diagnóstico' : 'Hacer diagnóstico'}</button>
    </div>`;
  }
  if (evalGen) {
    html += `
    <div class="tarjeta">
      <div class="tarjeta-cab">
        <div class="tarjeta-icono" style="--c:var(--verde)">${ico('trofeo')}</div>
        <div><h3>${esc(evalGen.titulo)}</h3><p>${resumen(evalGen)}</p></div>
      </div>
      ${evalGen.descripcion ? `<p class="nota">${esc(evalGen.descripcion)} Con explicación en cada pregunta.</p>` : ''}
      <button class="btn" data-accion="diagnostico" data-id="${evalGen.id}">Empezar evaluación</button>
    </div>`;
  }

  html += `<h2 class="subtitulo">Repasos por unidad del libro</h2>
  <p class="nota" style="margin:-4px 0 10px">Se desbloquean al completar todas las lecciones de esa unidad del libro.</p>
  <div class="lista-filas">`;
  html += repasos.map((d) => {
    const u = banco.unidades.find((x) => x.id === d.unidad);
    const abierto = unidadCompleta(u);
    const e = P.evaluaciones[d.id];
    const aprobado = e && e.mejorPct >= cfg.porcentaje_para_completar_leccion;
    const hechas = u.lecciones.filter((l) => leccionCompletada(l.id)).length;
    return `
    <button class="fila" style="--t:${colorUnidad(u.id)}" data-accion="diagnostico" data-id="${d.id}" ${abierto ? '' : 'disabled'}>
      <span class="num">${u.orden}</span>
      <span class="txt"><strong>${esc(u.titulo)}</strong><span>${abierto ? resumen(d) : `${hechas}/${u.lecciones.length} lecciones completadas`}</span></span>
      ${abierto ? (aprobado ? ico('trofeo', 'oro') : ico('estrella')) : ico('candado')}
    </button>`;
  }).join('');
  html += `</div>`;
  return html;
}

function vDiagUnidades(porUnidad) {
  return `<div class="diag-unidades">` + banco.unidades.filter((u) => porUnidad[u.id]).map((u) => {
    const [c, t] = porUnidad[u.id];
    return `<div class="diag-fila" style="--t:${c === t ? 'var(--verde)' : c === 0 ? 'var(--rojo)' : 'var(--amarillo-osc)'}">
      <span>${u.orden}. ${esc(u.titulo)}</span><b>${c}/${t}</b>
      <div class="barra"><div style="width:${Math.max(4, (c / t) * 100)}%"></div></div>
    </div>`;
  }).join('') + `</div>`;
}

function vApuntes() {
  let html = `<h1 class="titulo-seccion">Apuntes</h1>
  <div class="saludo">${huemi('lee', { anim: 'respira', alt: MASCOTA })}<div class="globo">Aquí está lo importante de cada lección, sacado del <b>Libro para la Conducción en Chile</b>. Léelo antes de practicar.</div></div>`;
  html += RUTA.map((t, ti) => `
    <h2 class="subtitulo">Tramo ${ti + 1} · ${esc(t.titulo)}</h2>
    <div class="lista-filas">
      ${t.lecciones.map((lid, i) => {
        const { leccion } = infoLeccion.get(lid);
        const n = apuntesDe(lid).length;
        const comp = leccionCompletada(lid);
        return `<button class="fila" style="--t:${t.color}" data-accion="verApuntes" data-id="${lid}">
          <span class="num">${i + 1}</span>
          <span class="txt"><strong>${esc(leccion.titulo)}</strong><span>${plural(n, 'punto clave', 'puntos clave')} · ${paginas(leccion.paginas)}</span></span>
          ${comp ? ico('check', 'verde') : ico('ojo')}
        </button>`;
      }).join('')}
    </div>`).join('');
  return html;
}

function vPerfil() {
  const totalPreg = preguntasPorId.size;
  const lecciones = itemsRuta.filter((it) => it.tipo === 'leccion');
  const lecHechas = lecciones.filter((it) => leccionCompletada(it.id)).length;
  const dom = acertadas([...preguntasPorId.keys()]);
  const dias = [];
  for (let i = 6; i >= 0; i--) {
    const f = sumarDias(hoy(), -i);
    const [y, m, d] = f.split('-').map(Number);
    dias.push({ f, xp: P.xpPorDia[f] || 0, letra: DIAS_CORTOS[new Date(y, m - 1, d).getDay()], hoy: i === 0 });
  }
  const maxXp = Math.max(meta(), ...dias.map((d) => d.xp));
  const fuente = banco.meta?.fuente || {};
  const temas = [['sistema', 'Automático'], ['claro', 'Claro'], ['oscuro', 'Oscuro']];
  const movimientos = [['auto', 'Automático'], ['completo', 'Completo'], ['suave', 'Suave'], ['nada', 'Sin movimiento']];
  const sistemaReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  return `
  <h1 class="titulo-seccion">Tu progreso</h1>
  <div class="grilla-stats">
    <div class="cuadro" style="color:var(--naranja)">${ico('fuego')}<div><strong>${rachaVigente()}</strong><span>${rachaVigente() === 1 ? 'día de racha' : 'días de racha'}</span></div></div>
    <div class="cuadro" style="color:var(--azul-claro)">${ico('ruta')}<div><strong>${P.xpTotal}</strong><span>km recorridos</span></div></div>
    <div class="cuadro" style="color:var(--verde)">${ico('check')}<div><strong>${lecHechas}/${lecciones.length}</strong><span>lecciones</span></div></div>
    <div class="cuadro" style="color:var(--rojo)">${ico('libro')}<div><strong>${dom}/${totalPreg}</strong><span>preguntas acertadas</span></div></div>
  </div>
  <p class="nota" style="margin-top:8px">Mejor racha: ${plural(P.racha.mejor, 'día', 'días')}. Sumas km al acertar a la primera: ${Object.entries(cfg.xp_por_dificultad).map(([d, x]) => `${x} km en nivel ${d}`).join(', ')}.</p>

  <h2 class="subtitulo">Últimos 7 días</h2>
  <div class="tarjeta">
    <div class="semana">
      ${dias.map((d) => `<div class="semana-dia ${d.hoy ? 'hoy' : ''}"><b>${d.xp || ''}</b><div class="semana-barra ${d.xp >= meta() ? 'cumplida' : ''}" style="height:${Math.round((d.xp / maxXp) * 80)}%"></div><span>${d.letra}</span></div>`).join('')}
    </div>
  </div>

  <h2 class="subtitulo">Meta diaria</h2>
  <div class="chips">
    ${cfg.meta_diaria_xp_opciones.map((m) => `<button class="chip ${m === P.metaDiaria ? 'activo' : ''}" data-accion="meta" data-xp="${m}">${m} km<small>${NOMBRES_META[m] || ''}</small></button>`).join('')}
  </div>

  <h2 class="subtitulo">Logros</h2>
  <div class="logros">
    ${LOGROS.map((l) => `
      <div class="logro ${logroGanado(l.id) ? '' : 'no'}" title="${esc(l.desc)}">
        <div class="medalla">${ico(l.icono)}</div>
        <strong>${esc(l.titulo)}</strong><span>${esc(l.desc)}</span>
      </div>`).join('')}
  </div>

  <h2 class="subtitulo">Ajustes</h2>
  <div class="tarjeta">
    <label class="interruptor">Sonidos <input type="checkbox" data-accion="ajuste" data-clave="sonido" ${P.ajustes.sonido ? 'checked' : ''}></label>
    <label class="interruptor">Vibrar al equivocarte <input type="checkbox" data-accion="ajuste" data-clave="vibracion" ${P.ajustes.vibracion ? 'checked' : ''}></label>
    <div>
      <p style="font-weight:700;color:var(--texto);margin-bottom:8px">Tema</p>
      <div class="chips">${temas.map(([v, n]) => `<button class="chip ${P.ajustes.tema === v ? 'activo' : ''}" data-accion="tema" data-tema="${v}">${n}</button>`).join('')}</div>
    </div>
    <div>
      <p style="font-weight:700;color:var(--texto);margin-bottom:8px">Movimiento de ${MASCOTA} y animaciones</p>
      <div class="chips">${movimientos.map(([v, n]) => `<button class="chip ${(P.ajustes.movimiento || 'auto') === v ? 'activo' : ''}" data-accion="movimiento" data-valor="${v}">${n}</button>`).join('')}</div>
      ${sistemaReduce ? `<p class="nota" style="margin-top:8px">Tu equipo pide reducir animaciones, así que en Automático ${MASCOTA} se mueve suave. Elige Completo para verlo saltar y celebrar.</p>` : ''}
    </div>
  </div>

  <h2 class="subtitulo">Respaldo del progreso</h2>
  <div class="tarjeta">
    <p>Tu progreso se guarda solo en este navegador. Descarga un respaldo para pasarlo a otro equipo o no perderlo.</p>
    <div class="chips">
      <button class="btn chico" data-accion="exportar">${ico('descargar')} Descargar</button>
      <label class="btn chico archivo-label" style="cursor:pointer">${ico('subir')} Cargar<input type="file" accept=".json,application/json" data-accion="importar"></label>
    </div>
  </div>

  <h2 class="subtitulo">Fuentes</h2>
  <div class="tarjeta">
    <p><b>${esc(fuente.titulo || '')}</b><br>${esc(fuente.autor || '')}<br>${esc(fuente.edicion || '')}</p>
    ${fuente.sitio ? `<p><a href="${esc(fuente.sitio)}" target="_blank" rel="noopener">${esc(fuente.sitio.replace(/^https?:\/\//, ''))}</a></p>` : ''}
    <p>Formato del simulacro según ${EXAMEN_OFICIAL.fuentes.map((f) => `<a href="${esc(f.url)}" target="_blank" rel="noopener">${esc(f.titulo)}</a>`).join(' y ')}.</p>
    <p class="nota">Las preguntas se redactaron a partir del libro; cada respuesta indica la página y la cita que la respalda. Las preguntas del examen oficial no son públicas: esta app es para practicar y no lo reemplaza.</p>
  </div>

  <h2 class="subtitulo">Acerca de</h2>
  <div class="tarjeta acerca">
    <div class="tarjeta-cab"><img class="acerca-logo" src="img/logo.webp" width="957" height="1000" alt="">
      <div><h3>Saca tu Licencia</h3><p>Creada, diseñada y desarrollada por <b>${AUTOR}</b>.</p></div></div>
  </div>

  <button class="btn texto" style="color:var(--rojo)" data-accion="borrar">Borrar mi progreso</button>`;
}

function vInicio() {
  let cuerpo = '';
  if (tab === 'ruta') cuerpo = vRuta();
  else if (tab === 'practicar') cuerpo = vPracticar();
  else if (tab === 'apuntes') cuerpo = vApuntes();
  else cuerpo = vPerfil();
  return `<div class="inicio">${vCabecera()}${vTabbar()}<main class="contenido">${cuerpo}${vCreditos()}</main>${vPanel()}</div>${vHoja()}`;
}

function vHoja() {
  if (!hoja) return '';
  let html = '';
  if (hoja.tipo === 'leccion') {
    const { unidad, leccion, tramo, posEnTramo } = infoLeccion.get(hoja.id);
    const abierta = leccionDesbloqueada(hoja.id);
    const datos = P.lecciones[hoja.id];
    const ids = idsDeLeccion(hoja.id);
    const ac = acertadas(ids);
    const n = Math.min(cfg.preguntas_por_sesion, ids.length);
    const tnum = RUTA.indexOf(tramo) + 1;
    html = `
    <div class="hoja ${abierta ? '' : 'bloqueada'}" style="--t:${tramo.color}" role="dialog" aria-label="${esc(leccion.titulo)}">
      <div class="hoja-cab">
        <div>
          <p class="hoja-sup">Tramo ${tnum} · Lección ${posEnTramo + 1} de ${tramo.lecciones.length}</p>
          <h3>${esc(leccion.titulo)}</h3>
          <p>Libro, unidad ${unidad.orden}: ${esc(unidad.titulo)} · ${paginas(leccion.paginas)}</p>
        </div>
        ${imgHuemul(abierta ? 'feliz' : 'pensando')}
      </div>
      ${abierta ? `
        <div class="barra" aria-label="Preguntas acertadas"><div style="width:${(ac / ids.length) * 100}%"></div></div>
        <p>Acertadas ${ac}/${ids.length}${datos?.mejorPct ? ` · Mejor sesión ${datos.mejorPct}%` : ''}${datos?.completada ? (ac === ids.length ? ' · ¡Dominada!' : ' · Completada. Acierta todas para dominarla') : ` · Necesitas ${cfg.porcentaje_para_completar_leccion}% para avanzar`}</p>
        <button class="btn blanco" data-accion="empezarLeccion" data-id="${hoja.id}">${datos?.completada ? 'Practicar de nuevo' : datos?.intentos ? 'Seguir' : 'Empezar'} · ${n} preguntas</button>
        <button class="btn fantasma chico" data-accion="verIntro" data-id="${hoja.id}">${ico('libro')} Repasar la teoría</button>`
        : `<p>Completa lo anterior en la ruta para desbloquear esta lección. Igual puedes leer los apuntes.</p>
        <button class="btn blanco" data-accion="verApuntes" data-id="${hoja.id}">Leer apuntes</button>`}
    </div>`;
  } else if (hoja.tipo === 'control') {
    const t = RUTA.find((x) => x.id === hoja.id);
    const abierto = controlDesbloqueado(t.id);
    const c = P.controles[t.id];
    html = `
    <div class="hoja ${abierto ? '' : 'bloqueada'}" style="--t:${t.color}" role="dialog" aria-label="Control del tramo">
      <div class="hoja-cab">
        <div>
          <p class="hoja-sup">Tramo ${RUTA.indexOf(t) + 1} · Control</p>
          <h3>Control: ${esc(t.titulo)}</h3>
          <p>${cfg.preguntas_por_sesion} preguntas de todo el tramo. Con ${cfg.porcentaje_para_completar_leccion}% a la primera pasas al tramo siguiente.${c?.mejorPct ? ` Mejor resultado: ${c.mejorPct}%.` : ''}</p>
        </div>
        ${imgHuemul('pare')}
      </div>
      ${abierto
        ? `<button class="btn blanco" data-accion="empezarControl" data-id="${t.id}">${c?.aprobado ? 'Repetir control' : 'Rendir control'}</button>`
        : `<p>Completa todas las lecciones del tramo para rendir el control.</p><button class="btn blanco" data-accion="cerrarHoja">Entendido</button>`}
    </div>`;
  }
  return `<div class="velo" data-accion="cerrarHoja">${html}</div>`;
}

function vModal() {
  if (!modal) return '';
  return `
  <div class="velo centro">
    <div class="modal" role="alertdialog" aria-label="${esc(modal.titulo)}">
      ${modal.pose ? huemi(modal.pose, { anim: modal.pose === 'ups' || modal.pose === 'sinbencina' ? 'niega' : 'pop' }) : ''}
      <h3>${esc(modal.titulo)}</h3>
      <p>${esc(modal.texto)}</p>
      <button class="btn ${modal.okClase || 'azul'}" data-accion="modalOk">${esc(modal.ok)}</button>
      <button class="btn texto" ${modal.cancelarRojo ? 'style="color:var(--rojo)"' : ''} data-accion="modalCancelar">${esc(modal.cancelar)}</button>
    </div>
  </div>`;
}

function vSesion() {
  const s = sesion;
  const item = s.cola[s.idx];
  const p = preguntasPorId.get(item.id);
  const vf = p.tipo === 'verdadero_falso';
  const fb = s.estado === 'feedback';
  const examen = s.tipo === 'simulacro';
  const pct = Math.min(100, examen ? (s.idx / s.total) * 100 : (s.resueltas / s.total) * 100);
  // Se dibuja con el avance anterior y render() lo lleva al nuevo, para que el auto avance animado.
  const previo = s.pctPrevio ?? pct;
  s.pctNuevo = pct;
  const letras = ['A', 'B', 'C', 'D', 'E', 'F'];

  const opciones = item.orden.map((orig, i) => {
    let clase = '';
    if (fb) {
      if (orig === p.respuesta_correcta) clase = 'correcta';
      else if (i === s.seleccion) clase = 'incorrecta';
    } else if (i === s.seleccion) clase = 'sel';
    return `<button class="opcion ${clase}" data-accion="opcion" data-i="${i}" ${fb ? 'disabled' : ''}>
      <span class="tecla">${letras[i]}</span><span>${esc(p.opciones[orig])}</span></button>`;
  }).join('');

  let etiqueta;
  if (item.repeticion) etiqueta = `<span class="rep">${ico('repetir')} Pregunta fallada · otra vez</span>`;
  else if (examen) etiqueta = `<span>Pregunta ${s.idx + 1} de ${s.total}</span>${s.dobles.has(item.id) ? '<span class="etiqueta amarilla">Vale doble</span>' : ''}`;
  else etiqueta = `<span>${vf ? 'Verdadero o falso' : 'Elige la respuesta correcta'}</span>`;
  const dific = examen ? '' : `<span class="dific" title="Dificultad ${p.dificultad} de 3" aria-label="Dificultad ${p.dificultad} de 3">${[1, 2, 3].map((n) => `<i class="${n <= p.dificultad ? 'on' : ''}"></i>`).join('')}</span>`;

  let pie;
  if (fb) {
    const ok = s.ultimoOk;
    const pose = ok ? (s.seguidas >= 3 ? 'celebra' : 'feliz') : 'ups';
    pie = `
    <div class="feedback ${ok ? 'ok' : 'mal'}" role="status">
      <div class="fb-scroll">
      <div class="fb-cab">
        ${huemi(pose, { anim: ok ? (pose === 'celebra' ? 'rebote' : 'pop') : 'niega', alt: MASCOTA })}
        <div>
          <div class="fb-titulo"><span>${ok ? (s.seguidas >= 3 ? `¡${s.seguidas} seguidas!` : azar(FRASES_OK)) : azar(FRASES_MAL)}</span>
          ${s.xpUltima ? `<span class="fb-km">${ico('ruta')}+${s.xpUltima} km</span>` : ''}</div>
          ${ok ? '' : `<p class="fb-correcta">Respuesta correcta: ${esc(p.opciones[p.respuesta_correcta])}</p>`}
        </div>
      </div>
      <div class="explica">
        <p class="explica-cab"><img class="avatar" src="${HUEMUL.cara}" alt="">${MASCOTA} te explica</p>
        <p>${esc(p.explicacion)}</p>
        ${vFuente(p)}
      </div>
      </div>
      <button class="btn ${ok ? 'verde' : 'rojo'}" data-accion="continuar">${s.modo.vidas && s.vidas <= 0 ? 'Ver resultado' : 'Continuar'}</button>
    </div>`;
  } else {
    pie = `<footer class="sesion-pie"><button id="btn-comprobar" class="btn ${examen ? 'azul' : 'verde'}" data-accion="comprobar" ${s.seleccion === null ? 'disabled' : ''}>${examen ? (s.idx + 1 === s.total ? 'Entregar examen' : 'Responder') : 'Comprobar'}</button></footer>`;
  }

  let indicador;
  if (examen) {
    const quedan = Math.max(0, Math.round((s.fin - Date.now()) / 1000));
    indicador = `<div class="reloj ${quedan <= 300 ? 'apurado' : ''}" aria-label="Tiempo restante">${ico('reloj')}<span>${mmss(quedan)}</span></div>`;
  } else if (s.modo.vidas) {
    indicador = `<div class="bencina ${s.vidas === 0 ? 'sin' : ''} ${fb && !s.ultimoOk ? 'golpe' : ''}" aria-label="Bencina: ${s.vidas} de ${cfg.vidas_por_sesion}">${ico('bencina')}<span class="tanque">${Array.from({ length: cfg.vidas_por_sesion }, (_, i) => `<i class="${i < s.vidas ? '' : 'vacio'}"></i>`).join('')}</span></div>`;
  } else {
    indicador = `<div class="reloj">${Math.min(s.idx + 1, s.total)}/${s.total}</div>`;
  }

  return `
  <div class="sesion">
    <header class="sesion-top">
      <button class="cerrar" data-accion="salir" aria-label="Salir">${ico('cruz')}</button>
      <div class="progreso" role="progressbar" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100">
        <div class="relleno" style="width:${previo}%"></div>${imgAuto(previo)}
      </div>
      ${indicador}
    </header>
    <main class="sesion-cuerpo">
      <p class="etiqueta-tipo">${etiqueta}${dific}</p>
      <div class="pregunta">
        ${examen && (s.fin - Date.now()) <= 300000 ? huemi('apurado', { anim: 'niega' }) : huemi('pensando', { anim: 'piensa' })}
        <div class="globo"><h2 class="enunciado">${esc(p.enunciado)}</h2></div>
      </div>
      <div class="opciones ${vf ? 'vf' : ''}">${opciones}</div>
    </main>
    ${pie}
  </div>
  ${vModal()}`;
}

function vFuente(p) {
  if (!p.fuente) return '';
  return `
  <div class="fuente">
    <div class="fuente-cab">${ico('libro')} Libro para la Conducción en Chile · pág. ${esc(p.fuente.pagina)}</div>
    <blockquote>“${esc(p.fuente.cita)}”</blockquote>
  </div>`;
}

function vPantalla() {
  const { tipo, id } = pantalla;
  const { unidad, leccion, tramo } = infoLeccion.get(id);
  const notas = apuntesDe(id);
  const abierta = leccionDesbloqueada(id);
  const cab = `
    <header class="pantalla-cab" style="--t:${tramo.color}">
      <button class="cerrar" data-accion="cerrarPantalla" aria-label="Volver">${ico('flecha')}</button>
      <p class="hoja-sup">${tipo === 'intro' ? 'Antes de empezar' : 'Apuntes'} · Tramo ${RUTA.indexOf(tramo) + 1}</p>
      <h1>${esc(leccion.titulo)}</h1>
      <p class="hoja-sup" style="text-transform:none;letter-spacing:0">Libro, unidad ${unidad.orden} · ${paginas(leccion.paginas)}</p>
    </header>`;
  const punto = (p, conCita) => `
    <div class="punto"><div>${esc(p.explicacion)}<small>pág. ${esc(p.fuente.pagina)}</small>
      ${conCita ? `<details><summary>Ver cita del libro</summary><blockquote>“${esc(p.fuente.cita)}”</blockquote></details>` : ''}</div></div>`;

  if (tipo === 'intro') {
    const clave = notas.slice(0, 4);
    return `
    <div class="pantalla" style="--t:${tramo.color}">
      ${cab}
      <div class="pantalla-cuerpo">
        <div class="explicacion">${huemi('lee', { anim: 'entra', alt: MASCOTA, alterna: 'licencia' })}
          <div class="globo">¡Hola! Soy <b>${MASCOTA}</b>. Antes de las preguntas, mira lo más importante de esta lección.</div>
        </div>
        <div class="puntos-clave">${clave.map((p) => punto(p, false)).join('')}</div>
        ${notas.length > clave.length ? `<p class="nota">Hay ${plural(notas.length - clave.length, 'punto más', 'puntos más')} en los apuntes completos.</p>` : ''}
      </div>
      <div class="pantalla-pie">
        ${abierta ? `<button class="btn verde" data-accion="empezarDesdeIntro" data-id="${id}">¡Vamos!</button>` : ''}
        <button class="btn texto" data-accion="verApuntes" data-id="${id}">Ver todos los apuntes</button>
      </div>
    </div>`;
  }
  return `
  <div class="pantalla" style="--t:${tramo.color}">
    ${cab}
    <div class="pantalla-cuerpo">
      <div class="explicacion">${huemi('lee', { anim: 'respira', alt: MASCOTA })}
        <div class="globo">Van de lo más básico a lo más fino. Toca <b>Ver cita del libro</b> para leer el texto original.</div>
      </div>
      <div class="puntos-clave">${notas.map((p) => punto(p, true)).join('')}</div>
    </div>
    ${abierta ? `<div class="pantalla-pie"><button class="btn verde" data-accion="empezarDesdeIntro" data-id="${id}">Practicar esta lección</button></div>` : ''}
  </div>`;
}

function vResultado() {
  const r = resultado;
  const umbral = cfg.porcentaje_para_completar_leccion;
  let titulo, texto, pose, color;

  if (!r.terminada) {
    titulo = '¡Sin bencina!'; texto = 'Te quedaste sin bencina en esta sesión. Repasa las explicaciones y vuelve a intentarlo.';
    pose = 'sinbencina'; color = 'var(--rojo)';
  } else if (r.tipo === 'simulacro') {
    titulo = r.aprobada ? '¡Aprobado!' : 'Reprobado, por ahora';
    texto = r.tiempoAgotado ? 'Se acabó el tiempo. ' : '';
    texto += r.aprobada ? 'Con este puntaje pasarías el examen teórico. ¡Seco!' : `Necesitas ${EXAMEN_OFICIAL.puntajeAprobacion} puntos. Revisa lo que fallaste y vuelve a intentarlo.`;
    pose = r.aprobada ? 'trofeo' : 'ups'; color = r.aprobada ? 'var(--verde)' : 'var(--rojo)';
  } else if (r.tipo === 'leccion') {
    if (r.nuevo) { titulo = '¡Lección completada!'; texto = `Acertaste ${r.correctas} de ${r.total} a la primera. Se abrió lo que sigue en la ruta.`; pose = 'celebra'; color = 'var(--azul-claro)'; }
    else if (r.aprobada) { titulo = r.dominada ? '¡Lección dominada!' : '¡Buena práctica!'; texto = `Acertaste ${r.correctas} de ${r.total} a la primera.`; pose = r.dominada ? 'celebra' : 'feliz'; color = 'var(--verde)'; }
    else { titulo = 'Casi, sigue practicando'; texto = `Necesitas ${umbral}% de aciertos a la primera para avanzar. Lograste ${r.pct}%.`; pose = 'ups'; color = 'var(--naranja)'; }
  } else if (r.tipo === 'control') {
    if (r.aprobada) { titulo = r.nuevo ? '¡Control aprobado!' : '¡Control aprobado otra vez!'; texto = r.nuevo ? 'Pasaste el control. ¡A la siguiente etapa de la ruta!' : `Acertaste ${r.correctas} de ${r.total}.`; pose = 'trofeo'; color = 'var(--verde)'; }
    else { titulo = 'No pasaste el control'; texto = `Necesitas ${umbral}% a la primera. Lograste ${r.pct}%. Repasa los apuntes del tramo y vuelve.`; pose = 'ups'; color = 'var(--rojo)'; }
  } else if (r.tipo === 'repaso_espaciado') {
    titulo = 'Repaso terminado'; texto = `Acertaste ${r.correctas} de ${r.total}. Las que aciertas vuelven más adelante; las que fallas, mañana.`; pose = 'feliz'; color = 'var(--naranja)';
  } else if (r.tipo === 'diagnostico_inicial') {
    titulo = 'Diagnóstico listo'; texto = `Acertaste ${r.correctas} de ${r.total}. Así te fue por unidad del libro:`; pose = 'pensando'; color = 'var(--azul-claro)';
  } else {
    titulo = r.aprobada ? '¡Muy bien!' : 'Sigue practicando';
    texto = `Acertaste ${r.correctas} de ${r.total} (${r.pct}%).`;
    pose = r.aprobada ? 'celebra' : 'pensando'; color = r.aprobada ? 'var(--verde)' : 'var(--naranja)';
  }

  const avisos = [];
  if (r.perfecta) avisos.push(`<div class="aviso verde">${ico('estrella')} ¡Sesión impeque! +${cfg.bonus_sesion_perfecta} km de bonus</div>`);
  if (r.rachaSubio) avisos.push(`<div class="aviso naranja">${ico('fuego')} Racha de ${plural(P.racha.actual, 'día', 'días')}. ¡Vuelve mañana!</div>`);
  if (r.metaCumplida) avisos.push(`<div class="aviso verde">${ico('diana')} ¡Cumpliste tu meta diaria de ${meta()} km!</div>`);
  r.logros.forEach((l) => avisos.push(`<div class="aviso oro">${imgHuemul('trofeo', 'aviso-huemi')} Logro desbloqueado: ${esc(l.titulo)}</div>`));

  const diag = r.tipo === 'diagnostico_inicial' && r.terminada ? vDiagUnidades(P.evaluaciones[r.ref].porUnidad) : '';

  const errores = r.falladas.length ? `
    <div class="errores">
      <h2 class="subtitulo">Revisa lo que fallaste (${r.falladas.length})</h2>
      ${r.falladas.map((id) => {
        const p = preguntasPorId.get(id);
        const tuya = r.respuestas[id];
        return `<details><summary>${r.dobles.includes(id) ? '<span class="etiqueta amarilla">Doble</span> ' : ''}${esc(p.enunciado)}</summary>
          ${tuya === undefined ? '<p class="tu-resp">Sin responder</p>' : `<p class="tu-resp">Tu respuesta: ${esc(p.opciones[tuya])}</p>`}
          <p class="fb-correcta">${ico('check')} ${esc(p.opciones[p.respuesta_correcta])}</p>
          <p class="fb-texto">${esc(p.explicacion)}</p>${vFuente(p)}</details>`;
      }).join('')}
    </div>` : '';

  let acciones = `<button class="btn verde" data-accion="volver">Continuar</button>`;
  if (r.tipo === 'leccion' && (!r.aprobada || !r.terminada)) {
    acciones = `<button class="btn verde" data-accion="reintentarLeccion" data-id="${r.ref}">Intentar de nuevo</button>
      <button class="btn" data-accion="verApuntesResultado" data-id="${r.ref}">Repasar apuntes</button>
      <button class="btn texto" data-accion="volver">Volver a la ruta</button>`;
  } else if (r.tipo === 'control' && (!r.aprobada || !r.terminada)) {
    acciones = `<button class="btn verde" data-accion="empezarControl" data-id="${r.ref}">Intentar de nuevo</button>
      <button class="btn texto" data-accion="volver">Volver a la ruta</button>`;
  } else if (r.tipo === 'simulacro') {
    acciones = `<button class="btn azul" data-accion="simulacro">Otro simulacro</button>
      <button class="btn texto" data-accion="volver" data-tab="practicar">Volver</button>`;
  } else if (r.tipo === 'diagnostico_inicial') {
    acciones = `<button class="btn verde" data-accion="volver" data-tab="ruta">Ir a la ruta</button>`;
  }

  const stats = r.tipo === 'simulacro' ? `
    <div class="puntaje-examen" style="--c:${color}">
      <strong>${r.puntaje}/${r.maximo}</strong>
      <span>puntos · necesitas ${EXAMEN_OFICIAL.puntajeAprobacion} · ${r.correctas} de ${r.total} correctas · ${mmss(Math.min(r.segundos, EXAMEN_OFICIAL.minutos * 60))} min${r.sinResponder ? ` · ${r.sinResponder} sin responder` : ''}</span>
    </div>` : r.terminada ? `
    <div class="res-stats">
      <div class="res-stat" style="--c:var(--azul-claro)"><span>Kilómetros</span><strong>${ico('ruta')}${r.xp}</strong></div>
      <div class="res-stat" style="--c:var(--verde)"><span>Aciertos</span><strong>${ico('diana')}${r.pct}%</strong></div>
      <div class="res-stat" style="--c:var(--naranja)"><span>Racha</span><strong>${ico('fuego')}${rachaVigente()}</strong></div>
    </div>` : '';

  return `
  <div class="resultado" style="--c:${color}">
    <div class="res-cab">
      ${huemi(pose, { anim: pose === 'celebra' || pose === 'trofeo' ? 'rebote' : pose === 'ups' || pose === 'sinbencina' ? 'niega' : 'entra', alt: MASCOTA })}
      <h1>${titulo}</h1>
      <p>${texto}</p>
    </div>
    ${diag}
    ${stats}
    ${avisos.join('')}
    ${errores}
    <div class="res-acciones">${acciones}</div>
  </div>`;
}

function vOnboarding() {
  const puntos = `<div class="puntos">${[0, 1, 2].map((i) => `<i class="${i === pasoOnb ? 'on' : ''}"></i>`).join('')}</div>`;
  if (pasoOnb === 0) {
    return `
    <div class="onb">
      <div class="onb-cuerpo centrado">
        <img class="logo-grande" src="img/logo.webp" alt="Saca tu Licencia">
        <p>Prepara el examen teórico <b>Clase B</b> con el <b>Libro para la Conducción en Chile</b> de CONASET. Partimos por lo más básico y avanzamos tramo a tramo.</p>
        ${vCreditos()}
      </div>
      ${puntos}
      <button class="btn verde" data-accion="onbSiguiente">¡Partamos!</button>
    </div>`;
  }
  if (pasoOnb === 1) {
    const sel = P.metaDiaria || 50;
    return `
    <div class="onb">
      <div class="onb-cuerpo">
        <div class="presenta">${huemi('hola', { anim: 'entra', alt: MASCOTA, alterna: 'licencia' })}<div class="globo">¡Hola! Soy <b>${MASCOTA}</b>, el huemul que te va a acompañar hasta que tengas tu licencia en la mano.</div></div>
        <h1>¿Cuántos km al día?</h1>
        <p>Cada respuesta correcta suma kilómetros. Elige tu meta diaria (la puedes cambiar después).</p>
        ${cfg.meta_diaria_xp_opciones.map((m) => `
          <button class="opcion-meta ${m === sel ? 'activo' : ''}" data-accion="metaOnb" data-xp="${m}">${NOMBRES_META[m] || 'Meta'}<span>${m} km al día</span></button>`).join('')}
      </div>
      ${puntos}
      <button class="btn verde" data-accion="onbSiguiente">Continuar</button>
    </div>`;
  }
  const diag = banco.diagnosticos.find((d) => d.tipo === 'diagnostico_inicial');
  return `
  <div class="onb">
    <div class="onb-cuerpo">
      <div class="presenta">${huemi('pensando', { anim: 'entra', alt: MASCOTA })}<div class="globo">¿Hacemos un diagnóstico para ver cuánto sabes?</div></div>
      <h1>¿Cómo quieres partir?</h1>
      <p>${diag ? `El diagnóstico tiene ${diag.preguntas.length} preguntas de todo el libro, sin bencina que perder y con explicación en cada una.` : ''} Después sigues la ruta desde lo más básico.</p>
    </div>
    ${puntos}
    <div class="res-acciones">
      ${diag ? `<button class="btn azul" data-accion="onbDiagnostico" data-id="${diag.id}">Hacer diagnóstico</button>` : ''}
      <button class="btn" data-accion="onbTerminar">Ir directo a la ruta</button>
    </div>
  </div>`;
}

function render() {
  const app = document.getElementById('app');
  if (vista === 'onboarding') app.innerHTML = vOnboarding() + vModal();
  else if (vista === 'inicio') app.innerHTML = vInicio() + vModal();
  else if (vista === 'sesion') app.innerHTML = vSesion();
  else if (vista === 'resultado') app.innerHTML = vResultado() + vModal();
  else if (vista === 'pantalla') app.innerHTML = vPantalla() + vModal();

  if (vista === 'sesion' && sesion) {
    const barra = document.querySelector('.progreso');
    const pct = sesion.pctNuevo;
    sesion.pctPrevio = pct;
    if (barra) {
      void barra.offsetWidth;
      requestAnimationFrame(() => {
        barra.querySelector('.relleno').style.width = `${pct}%`;
        barra.querySelector('.auto').style.setProperty('--p', pct);
      });
    }
  }
  if (vista === 'inicio' && tab === 'ruta') {
    dibujarCaminos();
    if (enfocarActual) {
      enfocarActual = false;
      const nodo = document.querySelector('.con-burbuja .nodo');
      if (nodo) requestAnimationFrame(() => nodo.scrollIntoView({ block: 'center' }));
    }
  }
}

/* =========================================================
   Acciones
   ========================================================= */
function volverAInicio(nuevoTab) {
  resultado = null;
  vista = 'inicio';
  if (nuevoTab) tab = nuevoTab;
  enfocarActual = tab === 'ruta';
  render();
  if (tab !== 'ruta') window.scrollTo(0, 0);
}

const acciones = {
  tab(d) {
    if (vista !== 'inicio') { volverAInicio(d.tab); return; }
    if (tab === d.tab) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    tab = d.tab; hoja = null;
    enfocarActual = tab === 'ruta';
    window.scrollTo(0, 0);
    render();
  },
  abrirLeccion(d) { hoja = { tipo: 'leccion', id: d.id }; render(); },
  abrirControl(d) { hoja = { tipo: 'control', id: d.id }; render(); },
  cerrarHoja(d, el, e) {
    if (el.classList.contains('velo') && e.target !== el) return;
    hoja = null; render();
  },
  empezarLeccion(d) { empezarLeccion(d.id); },
  reintentarLeccion(d) { empezarLeccion(d.id, true); },
  empezarDesdeIntro(d) {
    const l = P.lecciones[d.id] || { completada: false, mejorPct: 0, intentos: 0 };
    l.introVista = true; P.lecciones[d.id] = l; guardar();
    empezarLeccion(d.id, true);
  },
  verIntro(d) { abrirPantalla('intro', d.id, 'ruta'); },
  verApuntes(d) { abrirPantalla('apuntes', d.id, vista === 'inicio' ? tab : pantalla?.volver || 'ruta'); },
  verApuntesResultado(d) { resultado = null; abrirPantalla('apuntes', d.id, 'ruta'); },
  cerrarPantalla() { cerrarPantalla(); },
  empezarControl(d) { empezarControl(d.id); },
  diagnostico(d) { empezarDiagnostico(d.id); },
  simulacro() {
    const E = EXAMEN_OFICIAL;
    modal = {
      pose: 'apurado',
      titulo: 'Simulacro de examen',
      texto: `${E.preguntas} preguntas y ${E.minutos} minutos. ${E.doblePuntaje} preguntas valen doble (alcohol, velocidad, cinturón, casco o sillas para niños). Apruebas con ${E.puntajeAprobacion} de ${E.puntajeMaximo} puntos. Verás las correcciones al final.`,
      ok: '¡Partir!', okClase: 'azul',
      alOk: empezarSimulacro,
      cancelar: 'Ahora no',
    };
    render();
  },
  repasoEspaciado() { empezarRepasoEspaciado(); },
  opcion(d) { seleccionar(Number(d.i)); },
  comprobar() { comprobar(); },
  continuar() { continuar(); },
  salir() { pedirSalirSesion(); },
  volver(d) { volverAInicio(d.tab); },
  meta(d) { P.metaDiaria = Number(d.xp); guardar(); render(); },
  ajuste(d, el) { P.ajustes[d.clave] = el.checked; guardar(); },
  tema(d) { P.ajustes.tema = d.tema; guardar(); aplicarTema(); render(); },
  movimiento(d) { P.ajustes.movimiento = d.valor; guardar(); aplicarTema(); render(); },
  exportar() {
    const blob = new Blob([JSON.stringify({ app: 'saca-tu-licencia', exportado: new Date().toISOString(), progreso: P }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `saca-tu-licencia-progreso-${hoy()}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Respaldo descargado');
  },
  importar(d, el) {
    const f = el.files?.[0];
    if (!f) return;
    f.text().then((t) => {
      const datos = JSON.parse(t);
      const prog = datos.progreso || datos;
      if (!prog || typeof prog !== 'object' || !('lecciones' in prog) || !('xpTotal' in prog)) throw new Error('formato');
      modal = {
        pose: 'pensando',
        titulo: '¿Cargar este respaldo?',
        texto: `Tiene ${prog.xpTotal} km y ${Object.values(prog.lecciones).filter((l) => l.completada).length} lecciones completadas. Reemplazará tu progreso actual.`,
        ok: 'Cargar respaldo', okClase: 'azul',
        alOk: () => { P = normalizar(prog); P.onboarding = true; guardar(); aplicarTema(); render(); toast('Progreso cargado'); },
        cancelar: 'Cancelar',
      };
      render();
    }).catch(() => toast('Ese archivo no es un respaldo válido'));
    el.value = '';
  },
  borrar() {
    modal = {
      pose: 'sinbencina',
      titulo: '¿Borrar todo tu progreso?',
      texto: 'Se eliminan tus lecciones, kilómetros, racha, logros y repasos pendientes. No se puede deshacer.',
      ok: 'Mantener mi progreso', okClase: 'verde',
      cancelar: 'Borrar todo', cancelarRojo: true,
      alCancelar: () => {
        P = progresoNuevo(); guardar(); aplicarTema();
        tab = 'ruta'; pasoOnb = 0; vista = 'onboarding';
        render();
      },
    };
    render();
  },
  modalOk() { const m = modal; modal = null; render(); m?.alOk?.(); },
  modalCancelar() { const m = modal; modal = null; render(); m?.alCancelar?.(); },
  onbSiguiente() {
    if (pasoOnb === 1 && !P.metaDiaria) P.metaDiaria = 50;
    pasoOnb++; guardar(); render(); window.scrollTo(0, 0);
  },
  metaOnb(d) { P.metaDiaria = Number(d.xp); render(); },
  onbTerminar() { P.onboarding = true; guardar(); vista = 'inicio'; tab = 'ruta'; enfocarActual = true; render(); },
  onbDiagnostico(d) { P.onboarding = true; guardar(); empezarDiagnostico(d.id); },
  tocarHuemi(d, el) {
    const dato = datoAlAzar();
    const globo = document.getElementById('globo-escena');
    if (globo && dato) globo.classList.add('dato');
    if (globo && dato) globo.innerHTML = `<span class="dato-cab">Dato del libro</span>${esc(dato.explicacion)}<small>pág. ${esc(dato.fuente.pagina)} · toca a ${MASCOTA} para otro</small>`;
    const img = el.querySelector('img');
    if (img && !img.src.endsWith(HUEMUL.lee)) {
      img.src = HUEMUL.lee;
      img.setAttribute('width', POSES.lee[0]); img.setAttribute('height', POSES.lee[1]);
      el.querySelector('.alterna')?.remove();
      el.classList.remove('ciclo');
    }
    el.classList.remove('brinco');
    void el.offsetWidth;
    el.classList.add('brinco');
    clearTimeout(el._brinco);
    el._brinco = setTimeout(() => el.classList.remove('brinco'), 650);
    sonar('clic');
  },
};

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-accion]');
  if (!el || el.tagName === 'INPUT') return;
  const fn = acciones[el.dataset.accion];
  if (fn) fn(el.dataset, el, e);
});
document.addEventListener('change', (e) => {
  const el = e.target.closest('input[data-accion]');
  if (el && acciones[el.dataset.accion]) acciones[el.dataset.accion](el.dataset, el, e);
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement?.matches('span[role="button"][data-accion]')) {
    document.activeElement.click(); e.preventDefault(); return;
  }
  if (modal) { if (e.key === 'Escape') acciones.modalOk(); return; }
  if (hoja && e.key === 'Escape') { hoja = null; render(); return; }
  if (vista === 'pantalla' && e.key === 'Escape') { cerrarPantalla(); return; }
  if (vista !== 'sesion' || !sesion) return;
  const item = sesion.cola[sesion.idx];
  if (sesion.estado === 'pregunta') {
    const n = item.orden.length;
    const k = e.key.toLowerCase();
    const vf = preguntasPorId.get(item.id).tipo === 'verdadero_falso';
    let i = null;
    if (/^[1-9]$/.test(k)) i = Number(k) - 1;
    else if (vf && (k === 'v' || k === 'f')) i = k === 'v' ? 0 : 1;
    else if (!vf && k.length === 1 && 'abcd'.includes(k)) i = 'abcd'.indexOf(k);
    if (i !== null && i < n) { seleccionar(i); e.preventDefault(); }
    else if (e.key === 'Enter') { comprobar(); e.preventDefault(); }
  } else if (e.key === 'Enter') {
    if (document.activeElement?.closest('.feedback') && document.activeElement.tagName === 'BUTTON') return;
    continuar(); e.preventDefault();
  }
});

// Botón "atrás" del celular: durante una sesión pide confirmación; en otras capas vuelve atrás.
window.addEventListener('popstate', () => {
  if (vista === 'sesion' && sesion) {
    history.pushState({ capa: 'sesion' }, '');
    if (!modal) pedirSalirSesion();
    return;
  }
  if (modal) { modal = null; render(); return; }
  if (vista === 'pantalla') { cerrarPantalla(); return; }
  if (hoja) { hoja = null; render(); return; }
  if (vista === 'resultado') volverAInicio();
});

let redibujo = null;
window.addEventListener('resize', () => {
  clearTimeout(redibujo);
  redibujo = setTimeout(() => { if (vista === 'inicio' && tab === 'ruta') dibujarCaminos(); }, 120);
});
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => aplicarTema());
matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', () => aplicarTema());
document.fonts?.ready.then(() => { if (vista === 'inicio' && tab === 'ruta') dibujarCaminos(); });

/* =========================================================
   Arranque
   ========================================================= */
function indexarBanco(datos) {
  banco = datos;
  cfg = datos.config_juego || {};
  cfg.preguntas_por_sesion ??= 10;
  cfg.vidas_por_sesion ??= 5;
  cfg.xp_por_dificultad ??= { 1: 10, 2: 15, 3: 20 };
  cfg.bonus_sesion_perfecta ??= 0;
  cfg.porcentaje_para_completar_leccion ??= 80;
  cfg.meta_diaria_xp_opciones ??= [30, 50, 100];
  cfg.repetir_falladas_al_final ??= true;
  banco.diagnosticos = banco.diagnosticos || [];

  const porId = new Map();
  banco.unidades.sort((a, b) => a.orden - b.orden);
  banco.unidades.forEach((u) => {
    u.lecciones.sort((a, b) => a.orden - b.orden);
    u.lecciones.forEach((l) => {
      porId.set(l.id, { unidad: u, leccion: l });
      l.preguntas.forEach((p) => {
        preguntasPorId.set(p.id, p);
        unidadDePregunta.set(p.id, u.id);
        leccionDePregunta.set(p.id, l.id);
      });
    });
  });

  // ruta.js define el orden; si alguna lección del banco no está, va en un tramo extra al final.
  const enRuta = new Set(RUTA.flatMap((t) => t.lecciones));
  const faltantes = [...porId.keys()].filter((id) => !enRuta.has(id));
  if (faltantes.length) RUTA.push({ id: 'extra', titulo: 'Más lecciones', color: '#55627a', descripcion: 'Lecciones adicionales del banco.', lecciones: faltantes });
  RUTA.forEach((t) => {
    t.lecciones = t.lecciones.filter((id) => porId.has(id));
    t.lecciones.forEach((id, i) => {
      infoLeccion.set(id, { ...porId.get(id), tramo: t, posEnTramo: i });
      itemsRuta.push({ tipo: 'leccion', id, tramo: t });
    });
    itemsRuta.push({ tipo: 'control', id: `control-${t.id}`, tramo: t });
  });
}

function arrancar(datos) {
  indexarBanco(datos);
  P = cargarProgreso();
  aplicarTema();
  revisarLogros();
  vista = P.onboarding ? 'inicio' : 'onboarding';
  render();
  Object.values(HUEMUL).forEach((src) => { const i = new Image(); i.src = src; });
}

function mostrarErrorCarga(err) {
  console.error(err);
  document.getElementById('app').innerHTML = `
  <div class="error-carga">
    ${imgHuemul('sinbencina', 'error-huemi')}
    <h1>No se pudo cargar el banco de preguntas</h1>
    <p>El navegador bloquea la lectura de <code>${URL_BANCO}</code> cuando abres <code>index.html</code> directo desde la carpeta. Abre la app con un servidor local, por ejemplo <code>python -m http.server</code> en la carpeta del proyecto, y entra a <code>http://localhost:8000</code>.</p>
    <p>También puedes elegir el archivo JSON a mano:</p>
    <label class="archivo-label">
      <span class="btn azul">Elegir archivo JSON</span>
      <input type="file" accept=".json,application/json" id="archivo-banco">
    </label>
  </div>`;
  document.getElementById('archivo-banco').addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    f.text().then((t) => arrancar(JSON.parse(t))).catch((er) => toast('El archivo no es válido: ' + er.message));
  });
}

fetch(URL_BANCO)
  .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
  .then(arrancar)
  .catch(mostrarErrorCarga);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
