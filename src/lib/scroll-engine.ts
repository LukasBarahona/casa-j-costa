import type { MotionValue } from 'framer-motion';

/* Motor de scroll del sitio.

   Regla: medir una vez, dibujar por cuadro.
   - Las posiciones de cada escena se leen al cargar y cuando cambia el tamaño
     de la ventana o el alto del documento. Nunca durante el scroll.
   - Un solo listener de scroll (pasivo) para todo el sitio. En cada cuadro solo
     se hace aritmética con las posiciones guardadas y se actualizan los valores
     que cambiaron.

   (El `useScroll` de framer-motion vuelve a medir cada elemento en cada cuadro;
   con una veintena de escenas eso frenaba el scroll en equipos modestos.) */

type EdgeName = 'start' | 'center' | 'end';

// "<borde del elemento> <borde de la pantalla>", p. ej. 'start end' = el inicio
// del elemento toca el final (abajo) de la pantalla. También admite 0–1.
export type ScrollOffset = `${EdgeName | number} ${EdgeName | number}`;

interface Tracker {
  element: HTMLElement;
  from: [number, number];
  to: [number, number];
  value: MotionValue<number>;
  // Posiciones de scroll (px) donde el progreso vale 0 y 1.
  start: number;
  end: number;
}

const EDGES: Record<EdgeName, number> = { start: 0, center: 0.5, end: 1 };
// La barra del navegador móvil aparece y desaparece al hacer scroll:
// un cambio solo de alto menor a esto no amerita volver a medir.
const BROWSER_BAR_TOLERANCE = 160;

const trackers = new Set<Tracker>();

let viewportWidth = 0;
let viewportHeight = 0;
let started = false;
let updateQueued = false;
let measureQueued = false;

function parseOffset(offset: ScrollOffset): [number, number] {
  const [element, viewport] = offset.split(' ');
  const toFraction = (edge: string) => (edge in EDGES ? EDGES[edge as EdgeName] : Number(edge));
  return [toFraction(element), toFraction(viewport)];
}

function measureTracker(tracker: Tracker) {
  const rect = tracker.element.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  tracker.start = top + rect.height * tracker.from[0] - viewportHeight * tracker.from[1];
  tracker.end = top + rect.height * tracker.to[0] - viewportHeight * tracker.to[1];
}

function update() {
  updateQueued = false;
  const y = window.scrollY;

  for (const tracker of trackers) {
    const span = tracker.end - tracker.start;
    const progress = span === 0 ? 0 : Math.min(1, Math.max(0, (y - tracker.start) / span));
    if (progress !== tracker.value.get()) tracker.value.set(progress);
  }
}

function measureAll() {
  measureQueued = false;
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  trackers.forEach(measureTracker);
  update();
}

function queueUpdate() {
  if (updateQueued) return;
  updateQueued = true;
  requestAnimationFrame(update);
}

function queueMeasure() {
  if (measureQueued) return;
  measureQueued = true;
  requestAnimationFrame(measureAll);
}

function onResize() {
  const sameWidth = window.innerWidth === viewportWidth;
  const smallHeightChange = Math.abs(window.innerHeight - viewportHeight) < BROWSER_BAR_TOLERANCE;
  if (sameWidth && smallHeightChange) return;
  queueMeasure();
}

function start() {
  if (started) return;
  started = true;
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', onResize);
  // El alto del documento cambia cuando cargan las fuentes o se filtra la galería.
  new ResizeObserver(queueMeasure).observe(document.body);
  document.fonts?.ready.then(queueMeasure);
  queueMeasure();
}

/* Empieza a seguir un elemento: `value` irá de 0 a 1 mientras el elemento
   recorre el tramo entre los dos offsets. Devuelve la función para dejar de seguirlo. */
export function trackScroll(
  element: HTMLElement,
  [from, to]: [ScrollOffset, ScrollOffset],
  value: MotionValue<number>
): () => void {
  start();
  const tracker: Tracker = {
    element,
    from: parseOffset(from),
    to: parseOffset(to),
    value,
    start: 0,
    end: 0,
  };
  measureTracker(tracker);
  trackers.add(tracker);
  update();
  return () => {
    trackers.delete(tracker);
  };
}
