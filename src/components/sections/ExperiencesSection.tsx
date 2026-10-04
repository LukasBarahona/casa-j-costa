import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMotionValueEvent } from 'framer-motion';
import { CalendarDays, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import type { LightboxItem } from '@/components/ui/Lightbox';
import { experiences, experiencesTitle, type Experience } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

// El visor de fotos se descarga recién cuando alguien abre un boleto.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'));

// Los boletos alternan los colores de la paleta.
const ticketColors = [
  'bg-verde text-marfil',
  'bg-bronce text-ebano',
  'bg-azulado text-marfil',
  'bg-verde-bosque text-marfil',
  'bg-verde-niebla text-verde-profundo',
  'bg-ebano text-marfil',
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
  <li className="flex-shrink-0">
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${experience.name}: ver fotos y fecha del evento`}
      className={`ticket group flex w-[300px] select-none items-stretch rounded-3xl text-left transition-transform duration-300 ease-out hover:-translate-y-1 md:w-[360px] ${
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

// Tramo del cruce de la sección por la pantalla en que la tira se desplaza sola.
const travelFor = (progress: number) => Math.min(1, Math.max(0, (progress - 0.28) / 0.42));
// Cuánto hay que mover el mouse para que cuente como arrastre y no como clic.
const DRAG_THRESHOLD = 6;

const arrowClass =
  'flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-colors hover:border-foreground/60 hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30';

/* Experiencias propias de la casa, como boletos antiguos.

   La tira se mueve de dos formas que se suman:
   - sola, mientras la sección cruza la pantalla (ligada al scroll de la página);
   - a mano, sin moverse del lugar: arrastrando, con las flechas, deslizando el
     dedo o el trackpad de lado, o con las flechas del teclado.
   Al tocar un boleto se abren las fotos de ese evento, con su fecha. */
const ExperiencesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const motionOn = useMotionEnabled();
  const progress = useScrollProgress(sectionRef, ['start end', 'end start']);

  // Lo que la persona corrió la tira a mano, respecto de donde la deja el scroll de la página.
  const userShift = useRef(0);
  // Última posición puesta por el scroll de la página (para distinguirla del scroll manual).
  const lastAuto = useRef(0);
  const drag = useRef<{ startX: number; startLeft: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  // Boleto abierto y foto visible de ese evento.
  const [openExperience, setOpenExperience] = useState<Experience | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [lightboxRequested, setLightboxRequested] = useState(false);
  const lightboxItems = useMemo(
    () => (openExperience ? toLightboxItems(openExperience) : []),
    [openExperience]
  );

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
    <section id="experiencias" ref={sectionRef} className="overflow-x-clip py-24 md:py-32">
      <Reveal className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">06 / Experiencias</p>
          <h2 className="display mt-6 text-statement text-foreground">{experiencesTitle}</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Toca un boleto para ver las fotos y la fecha del evento.
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
        onScroll={handleScroll}
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
