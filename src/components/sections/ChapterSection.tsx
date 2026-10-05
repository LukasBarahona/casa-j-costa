import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { JMark, Ornament } from '@/components/ui/Brand';
import type { Chapter, ChapterColumn } from '@/config/site';
import { useIsMobile } from '@/hooks/use-mobile';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

// Alto de la franja de fotos, en % de la pantalla (55–59% en la maqueta).
const BAND = 57;
// Tramo del recorrido en que la franja se divide: cada columna parte un poco después de la anterior.
const SPLIT_START = 0.3;
const SPLIT_STEP = 0.07;
const SPLIT_LENGTH = 0.22;

/* La J de cada columna va en la capa de arriba, casi entera sobre la foto y
   algo translúcida (deja ver la imagen); solo su base toca la lámina crema. */
const COLUMN_J =
  'pointer-events-none relative z-10 -mt-[10.5svh] h-[12.5svh] max-h-[118px] min-h-[64px] w-auto flex-shrink-0 text-white opacity-80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]';

/* Titular y bajada del capítulo. */
const ChapterIntro: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <>
    <h2 className="display text-title text-verde">{chapter.title}</h2>
    <div className="mt-4 max-w-[640px] space-y-3 md:mt-5">
      {chapter.lead.map((paragraph) => (
        <p key={paragraph} className="copy text-[15px] md:text-[17px]">
          {paragraph}
        </p>
      ))}
    </div>
  </>
);

/* Pie de una columna: la J sobre el borde de la foto, nombre, texto y filete. */
const ColumnCaption: React.FC<{ column: ChapterColumn }> = ({ column }) => (
  <div className="flex h-full flex-col items-center px-5 pb-[5svh] text-center lg:px-8">
    <JMark className={COLUMN_J} />
    <h3 className="display mt-[2.6svh] text-[clamp(1.35rem,2.6vw,2.4rem)] leading-tight text-verde">
      {column.title}
    </h3>
    <p className="copy mt-[1.6svh] max-w-[290px] text-[13px] lg:text-[15px]">{column.text}</p>
    <Ornament className="mt-auto h-5 w-auto pt-0" />
  </div>
);

interface ColumnProps {
  column: ChapterColumn;
  index: number;
  progress: MotionValue<number>;
}

/* Foto de una columna: sube desde abajo y tapa la foto ancha, como una persiana. */
const ColumnPhoto: React.FC<ColumnProps> = ({ column, index, progress }) => {
  const start = SPLIT_START + index * SPLIT_STEP;
  const y = useTransform(progress, [start, start + SPLIT_LENGTH], ['101%', '0%']);

  return (
    <div className="relative overflow-hidden">
      <motion.img
        src={column.image}
        alt={column.imageAlt}
        // Sin carga diferida: la foto espera fuera del marco y debe estar lista cuando sube.
        decoding="async"
        style={{ y }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  );
};

const ColumnText: React.FC<ColumnProps> = ({ column, index, progress }) => {
  const start = SPLIT_START + SPLIT_LENGTH * 0.6 + index * SPLIT_STEP;
  const opacity = useTransform(progress, [start, start + 0.14], [0, 1]);
  const y = useTransform(progress, [start, start + 0.14], [26, 0]);

  return (
    <motion.div style={{ opacity, y }} className="h-full">
      <ColumnCaption column={column} />
    </motion.div>
  );
};

/* Capítulo anclado (pantallas anchas). Entra como la lámina de presentación
   de la maqueta —franja de foto, titular y la J grande— y, al avanzar, la
   franja se divide en cuatro columnas con su nombre y su texto. Todo depende
   de la posición del scroll: al subir, las columnas se recogen. */
const ChapterScene: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, ['start start', 'end end']);

  const introOpacity = useTransform(progress, [0.22, 0.36], [1, 0]);
  const introY = useTransform(progress, [0.22, 0.36], [0, -32]);
  const bigJOpacity = useTransform(progress, [0.2, 0.34], [1, 0]);
  const bigJY = useTransform(progress, [0, 0.34], [0, -40]);
  const wideScale = useTransform(progress, [0, 0.5], [1, 1.06]);

  return (
    <section id={chapter.id} ref={ref} className="tone-marfil relative h-[270svh] scroll-mt-0">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Franja de fotos */}
        <div className="tone-foto absolute inset-x-0 top-0 overflow-hidden" style={{ height: `${BAND}svh` }}>
          <motion.img
            src={chapter.image}
            alt={chapter.imageAlt}
            loading="lazy"
            decoding="async"
            style={{ scale: wideScale, objectPosition: chapter.imagePosition }}
            className="absolute inset-0 h-full w-full object-cover will-change-transform"
          />
          <div className="absolute inset-0 grid grid-cols-4">
            {chapter.columns.map((column, index) => (
              <ColumnPhoto key={column.title} column={column} index={index} progress={progress} />
            ))}
          </div>
        </div>

        {/* La J grande, entre la foto y la lámina crema */}
        <motion.div
          style={{ opacity: bigJOpacity, y: bigJY }}
          className="pointer-events-none absolute right-[2.8vw] top-[25.6svh]"
          aria-hidden="true"
        >
          <JMark className="h-[min(66svh,44vw)] w-auto text-white" />
        </motion.div>

        {/* Lámina de presentación */}
        <motion.div
          style={{ opacity: introOpacity, y: introY, top: `${BAND + 6}svh` }}
          className="absolute inset-x-0 px-[5.8vw]"
        >
          <div className="max-w-[58vw]">
            <ChapterIntro chapter={chapter} />
          </div>
        </motion.div>

        {/* Pies de las cuatro columnas */}
        <div className="absolute inset-x-0 bottom-0 grid grid-cols-4" style={{ top: `${BAND}svh` }}>
          {chapter.columns.map((column, index) => (
            <ColumnText key={column.title} column={column} index={index} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* Capítulo sin escena anclada (teléfono, movimiento reducido o pantalla muy
   baja): la lámina de presentación y, debajo, las cuatro columnas. En teléfono
   las columnas son un carrusel que se desliza con el dedo. */
const ChapterStatic: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <section id={chapter.id} className="tone-marfil relative overflow-x-clip pb-16 md:pb-24">
    <div className="tone-foto relative h-[46svh] min-h-[230px] overflow-hidden md:h-[55svh]">
      <img
        src={chapter.image}
        alt={chapter.imageAlt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: chapter.imagePosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>

    <div className="page relative">
      <JMark className="pointer-events-none absolute -top-[21vw] right-[4vw] h-[46vw] max-h-[420px] w-auto text-white md:-top-[150px]" />
      <Reveal className="relative pt-9 md:pt-14">
        <ChapterIntro chapter={chapter} />
      </Reveal>
    </div>

    <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] md:mt-16 md:grid md:grid-cols-4 md:gap-0 md:overflow-visible md:px-0">
      {chapter.columns.map((column, index) => (
        <li key={column.title} className="w-[68%] max-w-[300px] flex-shrink-0 snap-center md:w-auto md:max-w-none">
          <Reveal delay={index * 0.06} className="flex h-full flex-col">
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={column.image}
                alt={column.imageAlt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col items-center px-3 text-center md:px-5">
              <JMark className="pointer-events-none relative z-10 -mt-[70px] h-[84px] w-auto flex-shrink-0 text-white opacity-80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.28)]" />
              <h3 className="display mt-3 text-[1.45rem] leading-tight text-verde md:text-[clamp(1.35rem,2.6vw,2.4rem)]">
                {column.title}
              </h3>
              <p className="copy mt-2 max-w-[290px] text-[13px] md:text-sm">{column.text}</p>
              <Ornament className="mt-auto h-auto w-[92px] pt-5" />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
    <p className="mt-5 text-center text-xs font-medium text-muted-foreground md:hidden" aria-hidden="true">
      Desliza para ver los cuatro
    </p>
  </section>
);

const ChapterSection: React.FC<{ chapter: Chapter }> = ({ chapter }) => {
  const isMobile = useIsMobile();
  const motionOn = useMotionEnabled();
  return motionOn && !isMobile ? <ChapterScene chapter={chapter} /> : <ChapterStatic chapter={chapter} />;
};

export default ChapterSection;
