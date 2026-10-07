import { useCallback, useEffect, useRef, useState } from 'react';

/* Tira horizontal que se recorre con flechas (y con el dedo o el trackpad,
   porque es scroll nativo). Devuelve la referencia del contenedor, si está en
   alguno de sus extremos y la función que avanza una pieza. */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(gap = 24) {
  const scrollerRef = useRef<T>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    setEdges({ atStart: scroller.scrollLeft <= 1, atEnd: scroller.scrollLeft >= max - 1 });
  }, []);

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const step = useCallback(
    (direction: 1 | -1) => {
      const scroller = scrollerRef.current;
      const item = scroller?.querySelector('li');
      if (!scroller || !item) return;
      scroller.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: 'smooth' });
    },
    [gap]
  );

  return { scrollerRef, edges, updateEdges, step };
}
