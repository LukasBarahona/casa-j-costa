import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import { hero, site } from '@/config/site';
import { EASE_OUT, useMotionEnabled, useScrollProgress } from '@/lib/motion';

/* Titular: cada línea sube desde detrás de su propia máscara. */
const HeroTitle: React.FC = () => (
  <h1 className="display text-hero text-white">
    {hero.title.map((line, i) => (
      <span key={line} className="block overflow-hidden pb-[0.12em]">
        <motion.span
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: EASE_OUT }}
          className={`block ${i === 1 ? 'text-bronce-claro' : ''}`}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </h1>
);

/* Presentación: bajada y datos clave del centro de eventos. */
const HeroIntro: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
    className="max-w-[460px] xl:max-w-[400px] xl:pb-3"
  >
    <p className="text-lead font-medium text-white/85">{hero.subtitle}</p>
    <ul className="mt-5 flex flex-wrap gap-2">
      {hero.facts.map((fact) => (
        <li key={fact} className="chip-dark">
          {fact}
        </li>
      ))}
    </ul>
  </motion.div>
);

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

/* Degradados fijos para que el encabezado y el titular se lean sobre la foto. */
const HeroShade: React.FC = () => (
  <div
    aria-hidden="true"
    className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_26%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.82)_100%)]"
  />
);

/* Portada anclada: la foto ocupa toda la pantalla desde el inicio, con el
   nombre de la casa encima. Al bajar, el nombre se va y aparece la frase de
   la casa. Solo se animan opacidad y transformaciones (baratas de dibujar).
   Todo depende de la posición del scroll: al subir, se revierte. */
const HeroScene: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrollProgress(ref, ['start start', 'end end']);

  const imageScale = useTransform(progress, [0, 1], [1, 1.1]);
  const introOpacity = useTransform(progress, [0.05, 0.38], [1, 0]);
  const introY = useTransform(progress, [0.05, 0.38], [0, -80]);
  const dimOpacity = useTransform(progress, [0.3, 0.62], [0, 1]);
  const captionOpacity = useTransform(progress, [0.46, 0.7], [0, 1]);
  const captionY = useTransform(progress, [0.46, 0.7], [36, 0]);

  return (
    <section id="inicio" ref={ref} className="tone-ebano relative h-[190svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 will-change-transform">
          <HeroImage />
        </motion.div>
        <HeroShade />
        <motion.div style={{ opacity: dimOpacity }} className="absolute inset-0 bg-black/45" aria-hidden="true" />

        <Header onImage />

        {/* Nombre y presentación */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="page absolute inset-x-0 bottom-0 flex flex-col gap-5 pb-24 md:pb-16 xl:flex-row xl:items-end xl:justify-between xl:gap-10"
        >
          <div className="flex-shrink-0 xl:whitespace-nowrap">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">
              {site.city}
              <span className="hidden sm:inline"> · Región Metropolitana</span>
            </p>
            <HeroTitle />
          </div>
          <HeroIntro />
        </motion.div>

        <motion.span
          style={{ opacity: introOpacity }}
          aria-hidden="true"
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75"
        >
          Desliza
          <ArrowDown size={13} className="motion-safe:animate-bounce" />
        </motion.span>

        {/* Frase de la casa */}
        <motion.div
          style={{ opacity: captionOpacity, y: captionY }}
          className="page pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-white"
        >
          <p className="display text-title">
            {hero.caption[0]} <br className="hidden sm:block" />
            <span className="text-bronce-claro">{hero.caption[1]}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* Versión sin movimiento: mismo contenido, todo a la vista. */
const HeroStatic: React.FC = () => (
  <section id="inicio" className="tone-ebano relative">
    <div className="relative flex min-h-[100svh] flex-col">
      <div className="absolute inset-0">
        <HeroImage />
      </div>
      <HeroShade />
      <Header onImage />
      <div className="page relative mt-auto flex flex-col gap-5 pb-10 pt-16 xl:flex-row xl:items-end xl:justify-between">
        <HeroTitle />
        <HeroIntro />
      </div>
    </div>
    <p className="display page pb-24 pt-14 text-title text-foreground">
      {hero.caption[0]} <span className="text-bronce-claro">{hero.caption[1]}</span>
    </p>
  </section>
);

const HeroSection: React.FC = () => {
  const motionOn = useMotionEnabled();
  return motionOn ? <HeroScene /> : <HeroStatic />;
};

export default HeroSection;
