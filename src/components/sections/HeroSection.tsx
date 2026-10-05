import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { hero } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

// Alto de la franja de foto en la composición final (55% en la maqueta).
const BAND = 55;

const HeroImage: React.FC = () => (
  <img
    src={hero.image}
    alt={hero.imageAlt}
    width={1920}
    height={1243}
    decoding="async"
    className="focus-in h-full w-full object-cover"
  />
);

/* Sello circular de la marca, montado sobre el borde entre la foto y el texto. */
const Seal: React.FC<{ className?: string }> = ({ className = '' }) => (
  <img
    src={hero.seal}
    alt="Casa J Costa, centro de eventos"
    width={267}
    height={267}
    className={`aspect-square w-[clamp(132px,18.5vw,268px)] rounded-full ${className}`}
  />
);

/* Titular, bajada y datos clave: la mitad inferior de la lámina. */
const HeroText: React.FC = () => (
  <>
    <h1 className="display text-hero text-verde">{hero.title}</h1>
    <p className="mt-2 text-[clamp(1rem,1.9vw,1.7rem)] italic leading-snug text-foreground md:mt-3">
      {hero.subtitle}
    </p>
    <ul className="mt-5 flex flex-wrap justify-center gap-2 md:mt-6">
      {hero.facts.map((fact) => (
        <li key={fact} className="rounded-full border border-verde/35 px-3.5 py-1.5 text-xs font-medium text-verde md:text-sm">
          {fact}
        </li>
      ))}
    </ul>
  </>
);

/* Portada anclada. Parte con la foto a pantalla completa y el sello encima;
   al bajar, la lámina crema sube hasta dejar la composición de la maqueta:
   franja de foto, sello sobre el borde y "Centro de eventos" debajo.
   Solo se animan opacidad y transformaciones; al subir, se revierte. */
const HeroScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, ['start start', 'end end']);

  const imageScale = useTransform(progress, [0, 1], [1.08, 1]);
  const panelY = useTransform(progress, [0.04, 0.62], ['100%', '0%']);
  const textOpacity = useTransform(progress, [0.4, 0.68], [0, 1]);
  const textY = useTransform(progress, [0.4, 0.68], [28, 0]);
  const sealScale = useTransform(progress, [0.04, 0.62], [1.22, 1]);
  const sealY = useTransform(progress, [0.04, 0.62], ['-7svh', '0svh']);
  const introOpacity = useTransform(progress, [0.02, 0.24], [1, 0]);

  return (
    <section id="inicio" ref={ref} className="tone-marfil relative h-[185svh] scroll-mt-0">
      <div className="tone-foto sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 origin-top will-change-transform">
          <HeroImage />
        </motion.div>
        {/* Sombra fija para que el encabezado y la bajada se lean sobre la foto */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_100%)]"
        />

        {/* Bajada sobre la foto: se va cuando sube la lámina */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="page pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center pb-7 text-center text-white"
        >
          <p className="max-w-[20ch] text-[clamp(1.05rem,2vw,1.7rem)] italic leading-snug sm:max-w-none">
            {hero.subtitle}
          </p>
          <span
            aria-hidden="true"
            className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80"
          >
            Desliza
            <ArrowDown size={13} className="motion-safe:animate-bounce" />
          </span>
        </motion.div>

        {/* Lámina crema */}
        <motion.div
          style={{ y: panelY, height: `${100 - BAND}svh` }}
          className="tone-marfil absolute inset-x-0 bottom-0 will-change-transform"
        >
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="page flex h-full flex-col items-center pt-[calc(clamp(132px,18.5vw,268px)/2+0.75rem)] text-center"
          >
            <HeroText />
          </motion.div>
        </motion.div>

        {/* Sello: termina centrado sobre el borde de la franja */}
        <div style={{ top: `${BAND}svh` }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ y: sealY, scale: sealScale }} className="will-change-transform">
            <Seal className="shadow-[0_0_0_3px_rgba(248,245,241,0.9)]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* Versión sin movimiento: la lámina de la maqueta, tal cual. */
const HeroStatic: React.FC = () => (
  <section id="inicio" className="tone-marfil relative scroll-mt-0">
    <div className="tone-foto h-[55svh] min-h-[240px] overflow-hidden">
      <HeroImage />
    </div>
    <div className="page flex flex-col items-center pb-16 text-center">
      <Seal className="-mt-[clamp(66px,9.25vw,134px)] shadow-[0_0_0_3px_rgba(248,245,241,0.9)]" />
      <div className="mt-4">
        <HeroText />
      </div>
    </div>
  </section>
);

const HeroSection: React.FC = () => {
  const motionOn = useMotionEnabled();
  return motionOn ? <HeroScene /> : <HeroStatic />;
};

export default HeroSection;
