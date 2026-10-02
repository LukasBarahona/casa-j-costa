import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import { capacityCopy, site } from '@/config/site';
import { useScrollProgress } from '@/lib/motion';

const { min: MIN, max: MAX } = site.capacity;

// Geometría de la esfera (coordenadas del viewBox).
const VIEW_W = 400;
const VIEW_H = 240;
const HUB = { x: 200, y: 205 };
const RADIUS = 170;
// La aguja barre de -SWEEP a +SWEEP grados respecto de la vertical.
const SWEEP = 75;

const angleFor = (value: number) => -SWEEP + ((value - MIN) / (MAX - MIN)) * SWEEP * 2;

function pointAt(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: HUB.x + radius * Math.sin(rad), y: HUB.y - radius * Math.cos(rad) };
}

function arcPath(radius: number, from: number, to: number) {
  const a = pointAt(from, radius);
  const b = pointAt(to, radius);
  return `M ${a.x} ${a.y} A ${radius} ${radius} 0 0 1 ${b.x} ${b.y}`;
}

const ticks = Array.from({ length: (MAX - MIN) / 5 + 1 }, (_, i) => MIN + i * 5);

/* Esfera de balanza antigua: marcas cada 5, números cada 10. */
const DialFace: React.FC = () => (
  <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-full w-full" aria-hidden="true">
    <path d={`${arcPath(RADIUS + 14, -88, 88)} L ${HUB.x} ${HUB.y} Z`} className="fill-papel/60" />
    <path d={arcPath(RADIUS + 14, -88, 88)} fill="none" className="stroke-bronce" strokeWidth="2" />
    <path d={arcPath(RADIUS, -SWEEP, SWEEP)} fill="none" className="stroke-verde-profundo/40" strokeWidth="1" />

    {ticks.map((value) => {
      const major = value % 10 === 0;
      const angle = angleFor(value);
      const outer = pointAt(angle, RADIUS);
      const inner = pointAt(angle, RADIUS - (major ? 16 : 8));
      const label = pointAt(angle, RADIUS - 34);
      return (
        <g key={value}>
          <line
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            className="stroke-verde-profundo"
            strokeWidth={major ? 2 : 1}
            strokeLinecap="round"
          />
          {major && (
            <text
              x={label.x}
              y={label.y + 5}
              textAnchor="middle"
              className="fill-verde-profundo font-display"
              fontSize="15"
            >
              {value}
            </text>
          )}
        </g>
      );
    })}

    <text
      x={HUB.x}
      y={HUB.y - 34}
      textAnchor="middle"
      className="fill-verde-bosque"
      fontSize="8.5"
      fontWeight="600"
      letterSpacing="2.5"
    >
      CASA J COSTA · CHICUREO
    </text>
  </svg>
);

/* Capacidad: la aguja de la balanza marca de 40 a 120 personas mientras la
   sección cruza la pantalla. Lleva un resorte, como una aguja de verdad. */
const CapacitySection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useScrollProgress(ref, ['start 0.9', 'end 0.4']);
  const target = useTransform(scrollYProgress, [0.15, 0.85], [MIN, MAX], { clamp: true });
  const value = useSpring(target, { stiffness: 70, damping: 11, mass: 0.9 });
  const rotate = useTransform(value, angleFor);
  const count = useTransform(value, (v) => Math.round(Math.min(MAX, Math.max(MIN, v))));

  return (
    <section ref={ref} className="px-3 md:px-6">
      <div className="tone-salvia rounded-sheet">
        <div className="page grid items-center gap-12 py-20 md:grid-cols-2 md:gap-16 md:py-28">
          <Reveal>
            <p className="eyebrow">Capacidad</p>
            <h2 className="display mt-6 text-title">
              {capacityCopy.title[0]} <br />
              <span className="text-verde">{capacityCopy.title[1]}</span>
            </h2>
            <p className="mt-6 max-w-[440px] text-lead text-muted-foreground">{capacityCopy.text}</p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto w-full max-w-[520px]">
            <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
              <DialFace />
              {/* Aguja */}
              <motion.div
                aria-hidden="true"
                style={{
                  left: `${(HUB.x / VIEW_W) * 100}%`,
                  top: `${(HUB.y / VIEW_H) * 100}%`,
                  height: `${((RADIUS - 22) / VIEW_H) * 100}%`,
                  x: '-50%',
                  y: '-100%',
                  rotate,
                  transformOrigin: '50% 100%',
                }}
                className="absolute w-[3px] rounded-full bg-gradient-to-t from-ebano via-ebano to-bronce"
              />
              <span
                aria-hidden="true"
                style={{ left: `${(HUB.x / VIEW_W) * 100}%`, top: `${(HUB.y / VIEW_H) * 100}%` }}
                className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bronce bg-ebano"
              />
            </div>

            <p className="mt-2 text-center" aria-label={`De ${MIN} a ${MAX} personas`}>
              <motion.span className="display block text-[clamp(4rem,10vw,7.5rem)] leading-none tabular-nums">
                {count}
              </motion.span>
              <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                personas
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CapacitySection;
