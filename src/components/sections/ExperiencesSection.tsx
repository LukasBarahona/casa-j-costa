import React, { lazy, Suspense, useMemo, useRef, useState } from 'react';
import { CalendarDays, Images } from 'lucide-react';
import CarouselArrows from '@/components/ui/CarouselArrows';
import Reveal from '@/components/ui/Reveal';
import type { LightboxItem } from '@/components/ui/Lightbox';
import { experiences, experiencesEyebrow, experiencesTitle, type Experience } from '@/config/site';
import { useCarousel } from '@/hooks/useCarousel';

// El visor de fotos se descarga recién cuando alguien abre un boleto.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'));

// Los boletos alternan los colores de la paleta.
const ticketColors = [
  'bg-verde text-marfil',
  'bg-papel text-verde-profundo',
  'bg-verde-bosque text-marfil',
  'bg-verde-niebla text-verde-profundo',
  'bg-verde-profundo text-marfil',
  'bg-verde-salvia text-verde-profundo',
];

const dateLabel = (experience: Experience) => experience.date || 'Fecha por confirmar';

// Fotos del evento, cada una con el nombre y la fecha de la experiencia.
const toLightboxItems = (experience: Experience): LightboxItem[] =>
  experience.photos.map((image, index) => ({
    id: `${experience.name}-${index}`,
    image,
    eyebrow: dateLabel(experience),
    title: `Experiencia ${experience.name}`,
    caption: `${experience.description} Foto ${index + 1} de ${experience.photos.length}.`,
  }));

interface TicketProps {
  experience: Experience;
  index: number;
  onOpen: () => void;
}

const Ticket: React.FC<TicketProps> = ({ experience, index, onOpen }) => (
  // `flex` + `h-full`: todos los boletos toman el alto del más alto de la tira.
  <li className="flex flex-shrink-0">
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${experience.name}: ver fotos y fecha del evento`}
      className={`ticket group flex h-full w-[300px] select-none items-stretch rounded-3xl text-left transition-transform duration-300 ease-out hover:-translate-y-1 md:w-[360px] ${
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
          {dateLabel(experience)}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-xs font-semibold underline-offset-4 opacity-90 group-hover:underline">
          <Images size={13} />
          Ver fotos del evento
        </span>
      </span>
    </button>
  </li>
);

// Cuánto hay que mover el mouse para que cuente como arrastre y no como clic.
const DRAG_THRESHOLD = 6;

/* Experiencias propias de la casa, como boletos antiguos.

   La tira queda quieta: no se mueve con el scroll de la página. Se recorre
   con las flechas verdes, arrastrando con el mouse o deslizando el dedo.
   Al tocar un boleto se abren las fotos de ese evento, con su fecha. */
const ExperiencesSection: React.FC = () => {
  const { scrollerRef, edges, updateEdges, step } = useCarousel(24);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);

  // Boleto abierto y foto visible de ese evento.
  const [openExperience, setOpenExperience] = useState<Experience | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [lightboxRequested, setLightboxRequested] = useState(false);
  const lightboxItems = useMemo(
    () => (openExperience ? toLightboxItems(openExperience) : []),
    [openExperience]
  );

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

  const openTicket = (experience: Experience) => {
    // Si el gesto fue un arrastre, no es un clic sobre el boleto.
    if (drag.current?.moved) return;
    setLightboxRequested(true);
    setOpenExperience(experience);
    setPhotoIndex(0);
  };

  return (
    <section id="experiencias" className="overflow-x-clip py-24 md:py-32">
      <Reveal className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{experiencesEyebrow}</p>
          <h2 className="display mt-6 text-statement text-verde">{experiencesTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Recórrelas con las flechas y toca un boleto para ver las fotos y la fecha del evento.
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
            <Ticket
              key={experience.name}
              experience={experience}
              index={index}
              onOpen={() => openTicket(experience)}
            />
          ))}
        </ul>
      </div>

      {lightboxRequested && (
        <Suspense fallback={null}>
          <Lightbox items={lightboxItems} index={photoIndex} onIndexChange={setPhotoIndex} />
        </Suspense>
      )}
    </section>
  );
};

export default ExperiencesSection;
