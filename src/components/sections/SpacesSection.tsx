import React, { lazy, Suspense, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import type { LightboxItem } from '@/components/ui/Lightbox';
import { spaces, spacesIntro, type Space } from '@/config/site';
import { EASE_OUT } from '@/lib/motion';

// El visor de fotos se descarga recién cuando alguien abre una.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'));

const ALL = 'Todo';
const categories = [ALL, ...Array.from(new Set(spaces.map((space) => space.category)))];

// Número de catálogo: el orden en que la pieza aparece en `spaces`.
const catalogNumber = (space: Space) => String(spaces.indexOf(space) + 1).padStart(2, '0');

const toLightboxItem = (space: Space): LightboxItem => ({
  id: space.slug,
  image: space.image,
  title: space.title,
  caption: `${space.category} · ${space.moment} — ${space.description}`,
});

interface SpaceTileProps {
  space: Space;
  order: number;
  onOpen: () => void;
}

/* Pieza del collage: foto cuadrada con su número y nombre encima. */
const SpaceTile: React.FC<SpaceTileProps> = ({ space, order, onOpen }) => (
  <motion.li
    initial={{ opacity: 0, scale: 0.94 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay: (order % 4) * 0.05, ease: EASE_OUT }}
  >
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-secondary text-left"
    >
      <img
        src={space.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <span
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent"
        aria-hidden="true"
      />
      <span className="absolute left-2.5 top-2.5 rounded-full bg-marfil/95 px-2 py-0.5 font-display text-[11px] text-ebano">
        N.º {catalogNumber(space)}
      </span>
      <span className="absolute inset-x-3 bottom-2.5 text-white">
        <span className="display block text-base leading-tight md:text-lg">{space.title}</span>
        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
          {space.category}
        </span>
      </span>
      <span className="sr-only"> — ampliar foto</span>
    </button>
  </motion.li>
);

/* La casa: collage de fotos cuadradas, siempre en color. Cada pieza lleva su
   número de catálogo; al tocarla se abre en grande con su descripción. */
const SpacesSection: React.FC = () => {
  const [category, setCategory] = useState(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxRequested, setLightboxRequested] = useState(false);

  const filtered = useMemo(
    () => spaces.filter((space) => category === ALL || space.category === category),
    [category]
  );
  const lightboxItems = useMemo(() => filtered.map(toLightboxItem), [filtered]);

  return (
    <section id="la-casa" className="relative overflow-x-clip py-20 md:py-28">
      <div className="page">
        <Reveal>
          <p className="eyebrow">02 / La casa</p>
          <h2 className="display mt-6 text-title text-foreground">
            {spacesIntro[0]} <br className="hidden md:block" />
            <span className="text-verde">{spacesIntro[1]}</span>
          </h2>
        </Reveal>

        {/* Filtro: control segmentado */}
        <Reveal delay={0.1} className="mt-8">
          <div
            role="group"
            aria-label="Filtrar fotos"
            className="inline-flex max-w-full flex-wrap gap-1 rounded-[1.75rem] border border-foreground/10 bg-foreground/[0.03] p-1"
          >
            {categories.map((option) => {
              const active = option === category;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(option)}
                  className={`relative min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300 md:min-h-0 ${
                    active ? 'text-marfil' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="space-filter"
                      transition={{ duration: 0.5, ease: EASE_OUT }}
                      className="absolute inset-0 rounded-full bg-verde"
                    />
                  )}
                  <span className="relative">{option}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Al cambiar el filtro el collage se vuelve a montar y las piezas entran de nuevo */}
        <ul key={category} className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
          {filtered.map((space, index) => (
            <SpaceTile
              key={space.slug}
              space={space}
              order={index}
              onOpen={() => {
                setLightboxRequested(true);
                setLightboxIndex(index);
              }}
            />
          ))}
        </ul>
      </div>

      {lightboxRequested && (
        <Suspense fallback={null}>
          <Lightbox items={lightboxItems} index={lightboxIndex} onIndexChange={setLightboxIndex} />
        </Suspense>
      )}
    </section>
  );
};

export default SpacesSection;
