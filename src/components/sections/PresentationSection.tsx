import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { presentation, type PresentationBeat } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

const COUNT = presentation.length;
// Cuánto dura el cruce entre un tiempo y el siguiente, en fracción del recorrido.
const FADE = 0.06;

/* Ventana de visibilidad del tiempo `index`: el primero ya está al entrar
   y el último se queda hasta que la escena se suelta.
   - `overlap` (fotos): el tiempo entrante y el saliente se cruzan.
   - sin `overlap` (textos): el saliente termina de irse antes de que entre
     el siguiente, para que nunca haya dos textos legibles a la vez. */
function useBeatWindow(progress: MotionValue<number>, index: number, overlap = false) {
  const start = index / COUNT;
  const end = (index + 1) / COUNT;
  const isFirst = index === 0;
  const isLast = index === COUNT - 1;
  // Los puntos se mantienen dentro del recorrido de la escena (0–1).
  const range = (
    overlap
      ? [start - FADE, start + FADE, end - FADE, end + FADE]
      : [start, start + FADE, end - FADE, end]
  ).map((point) => Math.min(1, Math.max(0, point)));

  const opacity = useTransform(progress, range, [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]);
  const shift = useTransform(progress, range, [isFirst ? 0 : 1, 0, 0, isLast ? 0 : -1]);

  return { opacity, shift };
}

const BeatFigure: React.FC<{ beat: PresentationBeat; className?: string }> = ({ beat, className = '' }) =>
  beat.kind === 'logo' ? (
    <div className={`flex items-center justify-center bg-ebano ${className}`}>
      <img src={beat.image} alt={beat.imageAlt} className="w-[72%] rounded-full" loading="lazy" />
    </div>
  ) : (
    <img src={beat.image} alt={beat.imageAlt} loading="lazy" className={`object-cover ${className}`} />
  );

const BeatImage: React.FC<{ beat: PresentationBeat; index: number; progress: MotionValue<number> }> = ({
  beat,
  index,
  progress,
}) => {
  const { opacity, shift } = useBeatWindow(progress, index, true);
  const scale = useTransform(shift, [-1, 0, 1], [1.06, 1, 1.06]);

  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 will-change-[opacity,transform]">
      <BeatFigure beat={beat} className="h-full w-full" />
    </motion.div>
  );
};

const BeatText: React.FC<{ beat: PresentationBeat; index: number; progress: MotionValue<number> }> = ({
  beat,
  index,
  progress,
}) => {
  const { opacity, shift } = useBeatWindow(progress, index);
  const y = useTransform(shift, [-1, 0, 1], [-28, 0, 28]);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <p className="mb-4 font-display text-lg text-accent md:mb-6">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h2 className="display text-title text-foreground">{beat.title}</h2>
      <p className="mt-4 max-w-[460px] text-lead text-muted-foreground md:mt-6">{beat.text}</p>
    </motion.div>
  );
};

const BeatBar: React.FC<{ index: number; progress: MotionValue<number> }> = ({ index, progress }) => {
  const scaleX = useTransform(progress, [index / COUNT, (index + 1) / COUNT], [0, 1]);

  return (
    <span className="relative block h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/15">
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left rounded-full bg-accent" />
    </span>
  );
};

/* Presentación anclada en tres tiempos: qué es Casa J Costa, el fogón y las
   antigüedades. El marco en arco cambia de foto y el texto se releva con el scroll. */
const PresentationScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, ['start start', 'end end']);

  return (
    <section
      id="casa-j-costa"
      ref={ref}
      className="tone-bosque relative z-10 -mt-12 h-[230svh] rounded-t-sheet md:h-[260svh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="page flex min-h-0 flex-1 flex-col pb-6 pt-10 md:pb-10 md:pt-14">
          <p className="eyebrow">01 / Casa J Costa</p>

          <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 md:mt-0 md:flex-row md:items-center md:gap-16 lg:gap-24">
            {/* Marco en arco */}
            <div className="relative mx-auto min-h-[170px] w-full max-w-[250px] flex-1 md:mx-0 md:h-[min(68svh,620px)] md:max-w-[min(42vw,460px)] md:flex-none">
              <div className="arch absolute inset-0 overflow-hidden bg-ebano">
                {presentation.map((beat, index) => (
                  <BeatImage key={beat.title} beat={beat} index={index} progress={progress} />
                ))}
              </div>
              {/* Filete de latón que sigue el arco */}
              <div className="arch pointer-events-none absolute -inset-2.5 border border-accent/50" />
            </div>

            {/* Texto de cada tiempo */}
            <div className="relative h-[230px] flex-none md:h-[340px] md:flex-1">
              {presentation.map((beat, index) => (
                <BeatText key={beat.title} beat={beat} index={index} progress={progress} />
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2" aria-hidden="true">
            {presentation.map((beat, index) => (
              <BeatBar key={beat.title} index={index} progress={progress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Versión sin movimiento: los tres tiempos, uno junto al otro. */
const PresentationStatic: React.FC = () => (
  <section id="casa-j-costa" className="tone-bosque relative z-10 rounded-t-sheet py-20">
    <div className="page">
      <p className="eyebrow">01 / Casa J Costa</p>
      <div className="mt-10 grid gap-12 sm:grid-cols-3">
        {presentation.map((beat, index) => (
          <Reveal key={beat.title}>
            <div className="arch aspect-[3/4] w-full max-w-[280px] overflow-hidden bg-ebano">
              <BeatFigure beat={beat} className="h-full w-full" />
            </div>
            <p className="mt-6 font-display text-lg text-accent">{String(index + 1).padStart(2, '0')}</p>
            <h2 className="display mt-2 text-statement text-foreground">{beat.title}</h2>
            <p className="mt-3 max-w-[440px] text-muted-foreground">{beat.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PresentationSection: React.FC = () => {
  const motionOn = useMotionEnabled();
  return motionOn ? <PresentationScene /> : <PresentationStatic />;
};

export default PresentationSection;
