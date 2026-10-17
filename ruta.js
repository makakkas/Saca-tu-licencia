'use strict';

/* =========================================================
   Ruta de aprendizaje: de lo más básico a lo más avanzado.

   Reordena las 54 lecciones del banco (sin tocar sus preguntas)
   en 10 tramos. Criterio:
   1. Primero lo que necesitas antes de subirte al auto
      (trámite, convivencia vial, conceptos base).
   2. Luego el vehículo, las señales y las normas de circulación,
      que son la base del examen.
   3. Después seguridad, usuarios vulnerables y factores humanos.
   4. Al final situaciones especiales, leyes, sanciones y glosario,
      que concentran datos finos (cifras, plazos, excepciones).
   Dentro de cada tramo las lecciones van de menor a mayor dificultad
   promedio (campo "dificultad" del banco) cuando el tema lo permite.

   Formato del examen oficial (simulacro): 35 preguntas, 3 de doble
   puntaje (38 puntos), se aprueba con 33 y hay 45 minutos.
   Fuentes: conaset.cl y mtt.gob.cl (nuevo examen teórico 2024).
   ========================================================= */

const RUTA = [
  {
    id: 't01', titulo: 'Primeros pasos', color: '#0039a6',
    descripcion: 'Cómo se obtiene la licencia, la convivencia vial y por qué hablamos de siniestros.',
    lecciones: ['u10-l03', 'u03-l02', 'u03-l01', 'u01-l03', 'u01-l01'],
  },
  {
    id: 't02', titulo: 'Conoce tu auto', color: '#d52b1e',
    descripcion: 'Panel, luces, mantención básica, frenos y neumáticos.',
    lecciones: ['u02-l01', 'u02-l06', 'u02-l02', 'u02-l03', 'u02-l05', 'u02-l04'],
  },
  {
    id: 't03', titulo: 'Señales y semáforos', color: '#00843d',
    descripcion: 'Carabineros, semáforos, señales verticales y demarcaciones.',
    lecciones: ['u06-l01', 'u10-l01', 'u06-l05', 'u06-l03', 'u06-l02'],
  },
  {
    id: 't04', titulo: 'Reglas de la calle', color: '#0072ce',
    descripcion: 'Preferencias, velocidad, distancia, virajes, adelantamientos y estacionamiento.',
    lecciones: ['u06-l04', 'u06-l08', 'u06-l11', 'u06-l10', 'u06-l06', 'u06-l07', 'u06-l09'],
  },
  {
    id: 't05', titulo: 'Seguridad a bordo', color: '#e07a00',
    descripcion: 'Cinturón, sillas para niñas y niños, airbag y las leyes físicas de un choque.',
    lecciones: ['u02-l08', 'u05-l04', 'u02-l09', 'u02-l07'],
  },
  {
    id: 't06', titulo: 'Compartir la vía', color: '#7b3fa0',
    descripcion: 'Peatones, niñas y niños, personas mayores, ciclistas y motociclistas.',
    lecciones: ['u05-l02', 'u05-l03', 'u05-l01'],
  },
  {
    id: 't07', titulo: 'Tú al volante', color: '#b8002e',
    descripcion: 'Cansancio, alcohol, drogas, medicamentos, emociones y atención.',
    lecciones: ['u04-l07', 'u04-l04', 'u04-l03', 'u04-l05', 'u04-l06', 'u04-l02', 'u04-l01'],
  },
  {
    id: 't08', titulo: 'Condiciones especiales', color: '#3a5a78',
    descripcion: 'Lluvia, noche, autopistas, túneles, niebla, carga y nieve.',
    lecciones: ['u07-l05', 'u07-l03', 'u07-l01', 'u07-l04', 'u07-l02', 'u07-l07', 'u07-l06'],
  },
  {
    id: 't09', titulo: 'Conducción eficiente', color: '#2e8b57',
    descripcion: 'Ahorrar combustible, cuidar el ambiente y los vehículos eléctricos.',
    lecciones: ['u08-l02', 'u09-l06', 'u08-l01'],
  },
  {
    id: 't10', titulo: 'Leyes y emergencias', color: '#1d2b4f',
    descripcion: 'Documentos, Ley No Chat, qué hacer en un siniestro, sanciones y glosario.',
    lecciones: ['u09-l03', 'u09-l02', 'u09-l01', 'u09-l05', 'u01-l02', 'u10-l02', 'u09-l04'],
  },
];

const EXAMEN_OFICIAL = {
  preguntas: 35,
  doblePuntaje: 3,
  puntajeMaximo: 38,
  puntajeAprobacion: 33,
  minutos: 45,
  // Materias con doble puntaje según CONASET: alcohol, velocidad, casco,
  // cinturón de seguridad y sistemas de retención infantil.
  leccionesDoble: ['u04-l04', 'u06-l08', 'u02-l08', 'u05-l04'],
  palabrasDoble: ['casco'],
  fuentes: [
    { titulo: 'CONASET: nuevo examen teórico', url: 'https://www.conaset.cl/mtt-presenta-nuevo-libro-de-conduccion-y-suma-importantes-actualizaciones-en-electromovilidad-y-seguridad-infantil/' },
    { titulo: 'MTT: preguntas frecuentes del examen teórico', url: 'https://www.mtt.gob.cl/preguntas-frecuentes-nuevo-examen-teorico' },
  ],
};
