import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { menus, menusIntro, menusLead, menusNote, MENU_MODALITY, type Menu } from '@/config/site';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSiteActions } from '@/hooks/useSiteActions';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

// Cada menú sube un escalón: papel, verde de marca y ébano con filete de latón.
const cardStyle: Record<Menu['level'], { card: string; rule: string; cta: string }> = {
  1: {
    card: 'bg-papel text-ebano',
    rule: 'bg-ebano/15',
    cta: 'bg-ebano text-marfil',
  },
  2: {
    card: 'bg-verde text-marfil',
    rule: 'bg-marfil/25',
    cta: 'bg-marfil text-ebano',
  },
  3: {
    card: 'bg-ebano text-marfil ring-1 ring-bronce/70',
    rule: 'bg-bronce/50',
    cta: 'bg-bronce-claro text-ebano',
  },
};

/* Rombos: cuántos lleva encendidos indica qué tan premium es el menú. */
const Level: React.FC<{ level: Menu['level'] }> = ({ level }) => (
  <span className="flex items-center gap-1.5" role="img" aria-label={`Nivel ${level} de 3`}>
    {[1, 2, 3].map((step) => (
      <span
        key={step}
        className={`h-2 w-2 rotate-45 ${step <= level ? 'bg-bronce-claro' : 'border border-current opacity-40'}`}
      />
    ))}
  </span>
);

const MenuCard: React.FC<{ menu: Menu }> = ({ menu }) => {
  const { openQuote } = useSiteActions();
  const style = cardStyle[menu.level];
  const isTop = menu.level === 3;

  return (
    <motion.article
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`arch relative flex h-full flex-col items-center px-7 pb-8 pt-16 text-center shadow-xl shadow-black/20 ${style.card}`}
    >
      {isTop && (
        <span className="arch pointer-events-none absolute inset-2 border border-bronce/40" aria-hidden="true" />
      )}

      <span className={`font-display text-6xl leading-none ${isTop ? 'text-bronce-claro' : ''}`} aria-hidden="true">
        {menu.numeral}
      </span>
      <span className={`mt-6 h-px w-12 ${style.rule}`} aria-hidden="true" />

      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-70">Menú</p>
      <h3 className="display mt-2 text-[clamp(1.9rem,3vw,2.6rem)] leading-none">{menu.name}</h3>
      <p className={`mt-3 font-display text-lg ${isTop ? 'text-bronce-claro' : 'opacity-80'}`}>
        {menu.tagline}
      </p>

      <div className="mt-6">
        <Level level={menu.level} />
      </div>

      <p className="mt-6 text-sm leading-relaxed opacity-80">{menu.description}</p>

      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => openQuote({ modality: MENU_MODALITY, menu: menu.name })}
          className={`pill group/cta min-h-11 whitespace-nowrap hover:opacity-90 ${style.cta}`}
        >
          Cotizar este menú
          <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
};

// Posición de partida de cada carta en el abanico (izquierda, centro, derecha).
const FAN = [
  { x: '62%', y: 90, rotate: -9 },
  { x: '0%', y: 150, rotate: 0 },
  { x: '-62%', y: 90, rotate: 9 },
];

const FannedCard: React.FC<{ menu: Menu; index: number; progress: MotionValue<number> }> = ({
  menu,
  index,
  progress,
}) => {
  const from = FAN[index];
  const x = useTransform(progress, [0, 1], [from.x, '0%']);
  const y = useTransform(progress, [0, 1], [from.y, 0]);
  const rotate = useTransform(progress, [0, 1], [from.rotate, 0]);

  return (
    <motion.div style={{ x, y, rotate, zIndex: index === 1 ? 2 : 1 }} className="h-full will-change-transform">
      <MenuCard menu={menu} />
    </motion.div>
  );
};

/* Menús del Evento Integral: tres cartas que parten juntas, como una mano
   de naipes, y se abren en abanico a medida que la sección entra en pantalla. */
const MenusSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const motionOn = useMotionEnabled();
  const scrollYProgress = useScrollProgress(ref, ['start 0.95', 'start 0.3']);
  const fan = !isMobile && motionOn;

  return (
    <section id="menus" className="px-3 md:px-6">
      <div className="tone-bosque rounded-sheet">
        <div className="page py-20 md:py-36">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">04 / Menús</p>
              <h2 className="display mt-6 text-title text-foreground">
                {menusIntro[0]} <br />
                <span className="text-verde-salvia">{menusIntro[1]}</span>
              </h2>
            </div>
            <p className="max-w-[380px] text-lead text-muted-foreground">{menusLead}</p>
          </Reveal>

          {/* Teléfono: carrusel que se desliza con el dedo, una carta por vez.
              Pantallas anchas: las tres cartas en fila. */}
          <div
            ref={ref}
            className="no-scrollbar -mx-[var(--gutter)] mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-8 pt-2 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:p-0 lg:gap-10"
          >
            {menus.map((menu, index) =>
              fan ? (
                <FannedCard key={menu.name} menu={menu} index={index} progress={scrollYProgress} />
              ) : (
                <Reveal
                  key={menu.name}
                  delay={index * 0.08}
                  className="w-[82%] max-w-[340px] flex-shrink-0 snap-center md:mx-auto md:h-full md:w-full md:max-w-[380px]"
                >
                  <MenuCard menu={menu} />
                </Reveal>
              )
            )}
          </div>
          <p className="text-center text-xs font-medium text-muted-foreground md:hidden" aria-hidden="true">
            Desliza para ver los tres menús
          </p>

          <Reveal className="mt-8 flex items-center justify-center gap-4 text-center md:mt-14">
            <span className="hidden h-px w-12 bg-accent/60 sm:block" aria-hidden="true" />
            <p className="max-w-[460px] text-sm text-muted-foreground">{menusNote}</p>
            <span className="hidden h-px w-12 bg-accent/60 sm:block" aria-hidden="true" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MenusSection;
