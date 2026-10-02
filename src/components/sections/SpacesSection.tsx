import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { spaces, spacesIntro, type Space, type SpaceShape } from '@/config/site';
import { EASE_OUT } from '@/lib/motion';

// El visor de fotos se descarga recién cuando alguien abre una.
const Lightbox = lazy(() => import('@/components/ui/Lightbox'));

const ALL = 'Todo';
const categories = [ALL, ...Array.from(new Set(spaces.map((space) => space.category)))];

const shapeClass: Record<SpaceShape, string> = {
  wide: 'aspect-[4/3] rounded-3xl',
  tall: 'aspect-[4/5] rounded-3xl',
  arch: 'aspect-[3/4] rounded-b-3xl rounded-t-full',
};

// Número de catálogo: el orden en que la pieza aparece en `spaces`.
const catalogNumber = (space: Space) => String(spaces.indexOf(space) + 1).padStart(2, '0');

/* Cuántas columnas caben: 2 en teléfonos, 3 en tablet, 4 en escritorio.
   Fotos chicas: se ve la pieza completa y entra más catálogo por pantalla. */
function useColumnCount(): number {
  const getCount = () => {
    if (typeof window === 'undefined') return 4;
    if (window.matchMedia('(min-width: 1024px)').matches) return 4;
    if (window.matchMedia('(min-width: 640px)').matches) return 3;
    return 2;
  };
  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const update = () => setCount(getCount());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

interface SpaceCardProps {
  space: Space;
  order: number;
  onOpen: () => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ space, order, onOpen }) => (
  <motion.article
    initial={{ opacity: 0, y: 36 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay: order * 0.06, ease: EASE_OUT }}
    className="group relative"
  >
    <div className="relative">
      <Photo src={space.image} className={shapeClass[space.shape]} />
      {/* Etiqueta de catálogo */}
      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-marfil/95 px-2.5 py-0.5 font-display text-xs text-ebano shadow-sm">
        N.º {catalogNumber(space)}
      </span>
      <span className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-marfil/95 text-ebano opacity-0 transition-all duration-500 ease-out group-hover:rotate-45 group-hover:opacity-100">
        <ArrowUpRight size={14} />
      </span>
    </div>

    <div className="mt-3 px-1">
      <h3 className="display text-lg leading-tight text-foreground">
        {/* El botón se estira sobre toda la tarjeta */}
        <button
          type="button"
          onClick={onOpen}
          className="text-left after:absolute after:inset-0 after:content-['']"
        >
          {space.title}
          <span className="sr-only"> — ampliar foto</span>
        </button>
      </h3>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {space.category}
        <span className="hidden sm:inline"> · {space.moment}</span>
      </p>
      <p className="mt-1.5 text-xs leading-snug text-muted-foreground">{space.description}</p>
    </div>
  </motion.article>
);

/* La casa: galería tipo catálogo de anticuario. Piezas numeradas, marcos en
   arco y fotos chicas, siempre en color. Al tocar una, se abre en grande. */
const SpacesSection: React.FC = () => {
  const [category, setCategory] = useState(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxRequested, setLightboxRequested] = useState(false);
  const columnCount = useColumnCount();

  const filtered = useMemo(
    () => spaces.filter((space) => category === ALL || space.category === category),
    [category]
  );

  // Columnas escalonadas: cada pieza va a la columna que le toca por turno.
  const columns = useMemo(
    () =>
      Array.from({ length: columnCount }, (_, column) =>
        filtered.filter((_, index) => index % columnCount === column)
      ),
    [filtered, columnCount]
  );

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

        {/* Al cambiar el filtro la grilla se vuelve a montar y las piezas entran de nuevo */}
        <div key={`${category}-${columnCount}`} className="mt-10 flex gap-4 md:gap-6 lg:gap-8">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`flex min-w-0 flex-1 flex-col gap-8 md:gap-10 ${
                columnIndex % 2 === 1 ? 'pt-10 md:pt-16' : ''
              }`}
            >
              {column.map((space) => (
                <SpaceCard
                  key={space.slug}
                  space={space}
                  order={columnIndex}
                  onOpen={() => {
                    setLightboxRequested(true);
                    setLightboxIndex(filtered.indexOf(space));
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {lightboxRequested && (
        <Suspense fallback={null}>
          <Lightbox items={filtered} index={lightboxIndex} onIndexChange={setLightboxIndex} />
        </Suspense>
      )}
    </section>
  );
};

export default SpacesSection;
