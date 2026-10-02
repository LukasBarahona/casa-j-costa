import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { experiences, experiencesTitle } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

// Los boletos alternan los colores de la paleta.
const ticketColors = [
  'bg-verde text-marfil',
  'bg-bronce text-ebano',
  'bg-azulado text-marfil',
  'bg-verde-bosque text-marfil',
  'bg-verde-niebla text-verde-profundo',
  'bg-ebano text-marfil',
];

const Ticket: React.FC<{ index: number; name: string; description: string }> = ({
  index,
  name,
  description,
}) => (
  <li
    className={`ticket flex w-[280px] flex-shrink-0 select-none items-stretch rounded-3xl md:w-[360px] ${
      ticketColors[index % ticketColors.length]
    }`}
  >
    <div className="flex flex-col justify-between py-6 pl-8 pr-5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">N.º</span>
      <span className="font-display text-4xl leading-none">{String(index + 1).padStart(2, '0')}</span>
    </div>
    {/* Línea de corte del boleto */}
    <span className="my-4 border-l border-dashed border-current opacity-40" aria-hidden="true" />
    <div className="flex flex-1 flex-col justify-center py-6 pl-5 pr-8">
      <h3 className="display text-2xl leading-none md:text-3xl">{name}</h3>
      <p className="mt-2 text-sm leading-snug opacity-85">{description}</p>
    </div>
  </li>
);

// Tramo del cruce de la sección por la pantalla en que la tira se desplaza sola.
const travelFor = (progress: number) => Math.min(1, Math.max(0, (progress - 0.28) / 0.42));

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30';

/* Experiencias propias de la casa, como boletos antiguos.

   La tira se mueve de dos formas que se suman:
   - sola, mientras la sección cruza la pantalla (ligada al scroll de la página);
   - a mano, sin moverse del lugar: arrastrando, con las flechas, deslizando el
     dedo o el trackpad de lado, o con las flechas del teclado.
   Es un contenedor con scroll horizontal nativo; el scroll de la página solo
   le va fijando la posición, sumando lo que la persona ya corrió a mano. */
const ExperiencesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const motionOn = useMotionEnabled();
  const progress = useScrollProgress(sectionRef, ['start end', 'end start']);

  // Lo que la persona corrió la tira a mano, respecto de donde la deja el scroll de la página.
  const userShift = useRef(0);
  // Última posición puesta por el scroll de la página (para distinguirla del scroll manual).
  const lastAuto = useRef(0);
  const drag = useRef<{ startX: number; startLeft: number } | null>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  const maxScroll = () => {
    const scroller = scrollerRef.current;
    return scroller ? Math.max(0, scroller.scrollWidth - scroller.clientWidth) : 0;
  };

  const autoPosition = useCallback(
    (value: number) => (motionOn ? travelFor(value) * maxScroll() : 0),
    [motionOn]
  );

  const updateEdges = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setEdges({
      atStart: scroller.scrollLeft <= 1,
      atEnd: scroller.scrollLeft >= maxScroll() - 1,
    });
  }, []);

  // Scroll de la página → posición de la tira (más lo corrido a mano).
  useMotionValueEvent(progress, 'change', (value) => {
    const scroller = scrollerRef.current;
    if (!scroller || !motionOn) return;
    const target = Math.min(maxScroll(), Math.max(0, autoPosition(value) + userShift.current));
    lastAuto.current = target;
    scroller.scrollLeft = target;
  });

  // Scroll manual → se recuerda cuánto se apartó de la posición automática.
  const handleScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (Math.abs(scroller.scrollLeft - lastAuto.current) > 1) {
      userShift.current = scroller.scrollLeft - autoPosition(progress.get());
      lastAuto.current = scroller.scrollLeft;
    }
    updateEdges();
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [updateEdges]);

  const step = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    const ticket = scroller?.querySelector('li');
    if (!scroller || !ticket) return;
    scroller.scrollBy({ left: direction * (ticket.offsetWidth + 24), behavior: 'smooth' });
  };

  // Arrastre con el mouse (en pantallas táctiles el deslizamiento ya es nativo).
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    e.currentTarget.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current = null;
  };

  return (
    <section id="experiencias" ref={sectionRef} className="overflow-x-clip py-24 md:py-32">
      <Reveal className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Experiencias Casa J Costa</p>
          <h2 className="display mt-6 text-statement text-foreground">{experiencesTitle}</h2>
          <p className="mt-3 hidden text-sm text-muted-foreground md:block">
            Arrastra los boletos o usa las flechas para verlos todos.
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.atStart}
            aria-label="Boletos anteriores"
            className={arrowClass}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.atEnd}
            aria-label="Boletos siguientes"
            className={arrowClass}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </Reveal>

      <div
        ref={scrollerRef}
        role="group"
        aria-label="Experiencias: desliza hacia los lados"
        tabIndex={0}
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar mt-10 cursor-grab overflow-x-auto overscroll-x-contain py-1 active:cursor-grabbing"
      >
        <ul className="flex w-max gap-4 px-[var(--gutter)] md:gap-6">
          {experiences.map((experience, index) => (
            <Ticket key={experience.name} index={index} {...experience} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperiencesSection;
