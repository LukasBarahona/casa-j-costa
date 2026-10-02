import { useEffect, useLayoutEffect, useState, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';
import { trackScroll, type ScrollOffset } from '@/lib/scroll-engine';

// Curva de entrada: rápida al inicio, se asienta suave.
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// Las escenas ancladas necesitan alto: en un teléfono horizontal se muestra la versión estática.
const MIN_SCENE_HEIGHT = 500;

function computeMotionEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return !reduced && window.innerHeight > MIN_SCENE_HEIGHT;
}

/* ¿Se pueden usar las escenas ancladas al scroll?
   No, si la persona pidió reducir el movimiento o la pantalla es muy baja:
   en ese caso cada escena entrega su versión estática completa. */
export function useMotionEnabled(): boolean {
  const [enabled, setEnabled] = useState(computeMotionEnabled);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(computeMotionEnabled());
    query.addEventListener('change', update);
    window.addEventListener('resize', update);
    return () => {
      query.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return enabled;
}

/* Progreso (0 → 1) de un elemento mientras recorre el tramo entre dos offsets
   (ver `scroll-engine.ts`). Como depende solo de la posición, todo lo que se
   derive de él es reversible: al subir, la escena retrocede. */
export function useScrollProgress(
  target: RefObject<HTMLElement>,
  offset: [ScrollOffset, ScrollOffset]
): MotionValue<number> {
  const progress = useMotionValue(0);
  const [from, to] = offset;

  // useLayoutEffect: el valor correcto queda puesto antes del primer pintado
  // (importa al recargar la página a mitad del recorrido).
  useLayoutEffect(() => {
    const element = target.current;
    if (!element) return;
    return trackScroll(element, [from, to], progress);
  }, [target, from, to, progress]);

  return progress;
}
