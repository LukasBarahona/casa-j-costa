import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { JMark } from '@/components/ui/Brand';
import {
  menus,
  menusImage,
  menusImageAlt,
  menusIntro,
  menusLead,
  menusNote,
  MENU_MODALITY,
  type Menu,
} from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

/* Círculo blanco de un menú, montado sobre el borde de la foto (como en la maqueta).
   Teléfono: solo el numeral. Pantallas anchas: numeral, nombre y bajada. */
const MenuDisc: React.FC<{ menu: Menu }> = ({ menu }) => {
  const { openQuote } = useSiteActions();

  return (
    <button
      type="button"
      onClick={() => openQuote({ modality: MENU_MODALITY, menu: menu.name })}
      aria-label={`Cotizar el menú ${menu.name}`}
      // Al pasar el cursor: el círculo se levanta, se tiñe de verde y el filete interior se aclara.
      className="group/disc relative flex aspect-square w-full flex-col items-center rounded-full bg-white px-[8%] pt-[13%] text-center text-verde shadow-[0_18px_40px_-28px_rgba(42,57,39,0.5)] transition-[transform,background-color,color,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:bg-verde hover:text-white hover:shadow-[0_28px_50px_-26px_rgba(42,57,39,0.75)] focus-visible:-translate-y-2 focus-visible:bg-verde focus-visible:text-white max-md:justify-center max-md:pt-0"
    >
      {/* Filete interior */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[4.5%] rounded-full border border-verde/25 transition-[inset,border-color] duration-500 ease-out group-hover/disc:inset-[3%] group-hover/disc:border-white/45 group-focus-visible/disc:border-white/45"
      />
      <span className="display text-[clamp(1.75rem,3.9vw,3.5rem)] leading-none" aria-hidden="true">
        {menu.numeral}
      </span>
      <span className="display mt-[4%] hidden text-[clamp(1.05rem,2.5vw,2.25rem)] leading-tight md:block">
        {menu.name}
      </span>
      <span className="mt-[6%] hidden h-px w-8 bg-current opacity-40 lg:block" aria-hidden="true" />
      <span className="mt-[5%] hidden max-w-[13em] text-[clamp(0.8rem,1.05vw,1rem)] italic leading-snug opacity-80 lg:block">
        {menu.tagline}
      </span>
      {/* La J de la casa, como sello discreto al pie del círculo */}
      <JMark className="mt-auto mb-[9%] hidden h-[13%] w-auto opacity-25 transition-opacity duration-500 group-hover/disc:opacity-70 md:block" />
    </button>
  );
};

/* El círculo sube y crece mientras la sección entra en pantalla; cada uno parte un poco después. */
const RisingDisc: React.FC<{ menu: Menu; index: number; progress: MotionValue<number> }> = ({
  menu,
  index,
  progress,
}) => {
  const start = index * 0.16;
  const y = useTransform(progress, [start, start + 0.6], ['55%', '0%']);
  const scale = useTransform(progress, [start, start + 0.6], [0.72, 1]);
  const opacity = useTransform(progress, [start, start + 0.3], [0, 1]);

  return (
    <motion.div style={{ y, scale, opacity }} className="will-change-transform">
      <MenuDisc menu={menu} />
    </motion.div>
  );
};

/* Qué trae el menú y su botón de cotización. */
const MenuInfo: React.FC<{ menu: Menu }> = ({ menu }) => {
  const { openQuote } = useSiteActions();

  return (
    <div className="flex h-full flex-col items-center text-center">
      <h3 className="display text-2xl leading-tight text-verde md:hidden">
        <span aria-hidden="true">{menu.numeral} · </span>
        {menu.name}
      </h3>
      <p className="mt-1 text-sm italic text-foreground/75 lg:hidden">{menu.tagline}</p>
      <p className="copy mt-3 max-w-[300px] text-sm md:mt-2 lg:mt-0">{menu.description}</p>
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => openQuote({ modality: MENU_MODALITY, menu: menu.name })}
          className="pill pill-ghost group/cta min-h-11 whitespace-nowrap border-verde/40 text-verde hover:border-verde hover:bg-verde hover:text-white"
        >
          Cotizar este menú
          <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

/* Menús del Evento Integral: franja de foto y, montados sobre su borde, tres
   círculos blancos (I, II, III) que suben a medida que la sección entra. */
const MenusSection: React.FC = () => {
  const discsRef = useRef<HTMLDivElement>(null);
  const motionOn = useMotionEnabled();
  const progress = useScrollProgress(discsRef, ['start 1', 'start 0.5']);

  return (
    <section id="menus" className="tone-marfil relative overflow-x-clip pb-20 md:pb-28">
      <div className="tone-foto group">
        <Photo src={menusImage} alt={menusImageAlt} className="h-[46svh] min-h-[230px] md:h-[55svh]" />
      </div>

      <div className="page relative">
        {/* Círculos: la mitad sobre la foto, la mitad sobre la lámina */}
        <div
          ref={discsRef}
          className="mx-auto -mt-[13vw] grid max-w-[1280px] grid-cols-3 gap-[4vw] px-[2vw] md:-mt-[10.5vw] md:gap-[8%] md:px-[1%] xl:-mt-[136px]"
        >
          {menus.map((menu, index) =>
            motionOn ? (
              <RisingDisc key={menu.name} menu={menu} index={index} progress={progress} />
            ) : (
              <MenuDisc key={menu.name} menu={menu} />
            )
          )}
        </div>

        <ul className="mx-auto mt-10 grid max-w-[1280px] gap-10 md:mt-8 md:grid-cols-3 md:gap-[8%] md:px-[1%]">
          {menus.map((menu, index) => (
            <li key={menu.name}>
              <Reveal delay={index * 0.08} className="h-full">
                <MenuInfo menu={menu} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-16 flex flex-col items-center text-center md:mt-24">
          <h2 className="display text-[clamp(1.9rem,4.4vw,4rem)] leading-[1.2] text-verde">
            {menusIntro[0]} <br className="md:hidden" />
            {menusIntro[1]}
          </h2>
          <p className="copy mt-5 max-w-[560px] text-[15px] md:text-base">{menusLead}</p>
          <p className="mt-3 max-w-[460px] text-sm font-medium text-muted-foreground">{menusNote}</p>
        </Reveal>
      </div>
    </section>
  );
};

export default MenusSection;
