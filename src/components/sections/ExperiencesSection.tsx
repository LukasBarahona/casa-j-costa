import React, { useRef } from 'react';
import { CalendarDays } from 'lucide-react';
import CarouselArrows from '@/components/ui/CarouselArrows';
import Reveal from '@/components/ui/Reveal';
import { experiences, experiencesEyebrow, experiencesTitle, type Experience } from '@/config/site';
import { useCarousel } from '@/hooks/useCarousel';

// Los boletos alternan los colores de la paleta.
const ticketColors = [
  'bg-verde text-marfil',
  'bg-papel text-verde-profundo',
  'bg-verde-bosque text-marfil',
  'bg-verde-niebla text-verde-profundo',
  'bg-verde-profundo text-marfil',
  'bg-verde-salvia text-verde-profundo',
];

/* Boleto de una experiencia. Por ahora no se abren: se ven levemente
   atenuados y anuncian "Próximamente". Cuando haya fecha y fotos, volverán a
   ser botones que abren las fotos del evento. */
const Ticket: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => (
  // `flex` + `h-full`: todos los boletos toman el alto del más alto de la tira.
  <li className="flex flex-shrink-0">
    <div
      aria-disabled="true"
      className={`ticket flex h-full w-[300px] select-none items-stretch rounded-3xl opacity-75 saturate-[0.85] md:w-[360px] ${
        ticketColors[index % ticketColors.length]
      }`}
    >
      <span className="flex flex-col justify-between py-6 pl-8 pr-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">N.º</span>
        <span className="font-display text-4xl leading-none">{String(index + 1).padStart(2, '0')}</span>
      </span>
      {/* Línea de corte del boleto */}
      <span className="my-4 border-l border-dashed border-current opacity-40" aria-hidden="true" />
      <span className="flex flex-1 flex-col justify-center py-5 pl-5 pr-8">
        <span className="display text-2xl leading-none md:text-3xl">{experience.name}</span>
        <span className="mt-2 text-sm leading-snug opacity-85">{experience.description}</span>
        <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold opacity-90">
          <CalendarDays size={13} />
          Próximamente
        </span>
      </span>
    </div>
  </li>
);

// Cuánto hay que mover el mouse para que cuente como arrastre y no como clic.
const DRAG_THRESHOLD = 6;

/* Experiencias propias de la casa, como boletos antiguos.

   La tira queda quieta: no se mueve con el scroll de la página. Se recorre
   con las flechas verdes, arrastrando con el mouse o deslizando el dedo.
   Los boletos todavía no se abren (ver `Ticket`). */
const ExperiencesSection: React.FC = () => {
  const { scrollerRef, edges, updateEdges, step } = useCarousel(24);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  // Arrastre con el mouse (en pantallas táctiles el deslizamiento ya es nativo).
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft, moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state) return;
    const distance = e.clientX - state.startX;
    if (!state.moved && Math.abs(distance) < DRAG_THRESHOLD) return;
    if (!state.moved) {
      state.moved = true;
      // Desde aquí es un arrastre: la tira se queda con el puntero aunque salga de ella.
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    e.currentTarget.scrollLeft = state.startLeft - distance;
  };

  const endDrag = () => {
    // `moved` se consulta en el clic que viene justo después; se limpia en el siguiente ciclo.
    const state = drag.current;
    window.setTimeout(() => {
      if (drag.current === state) drag.current = null;
    }, 0);
  };

  return (
    <section id="experiencias" className="overflow-x-clip py-24 md:py-32">
      <Reveal className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{experiencesEyebrow}</p>
          <h2 className="display mt-6 text-statement text-verde">{experiencesTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Recórrelas con las flechas y conoce lo que se viene en la casa.
          </p>
        </div>
        <CarouselArrows label="Boletos" atStart={edges.atStart} atEnd={edges.atEnd} onStep={step} />
      </Reveal>

      <div
        ref={scrollerRef}
        role="group"
        aria-label="Experiencias: desliza hacia los lados"
        onScroll={updateEdges}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="no-scrollbar mt-10 cursor-grab overflow-x-auto overscroll-x-contain pb-1 pt-2 active:cursor-grabbing"
      >
        <ul className="flex w-max gap-4 px-[var(--gutter)] md:gap-6">
          {experiences.map((experience, index) => (
            <Ticket key={experience.name} experience={experience} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExperiencesSection;
