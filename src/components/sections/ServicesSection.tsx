import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import {
  services,
  servicesImage,
  servicesImageAlt,
  servicesIntro,
  servicesLead,
  MENU_MODALITY,
  type Service,
} from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import { EASE_OUT } from '@/lib/motion';
import { scrollToSection } from '@/lib/utils';

/* Explicación de una opción y sus acciones. */
const ServiceDetail: React.FC<{ service: Service }> = ({ service }) => {
  const { openQuote } = useSiteActions();

  return (
    <>
      <p className="copy text-sm">{service.fullDescription}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          // Si la opción es una modalidad cotizable, el asistente parte con ella elegida.
          onClick={() => openQuote(service.modality ? { modality: service.modality } : {})}
          className="pill pill-brand group/cta min-h-11"
        >
          Cotizar esta opción
          <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </button>
        {service.modality === MENU_MODALITY && (
          <button type="button" onClick={() => scrollToSection('menus')} className="pill pill-ghost min-h-11">
            Ver los menús
          </button>
        )}
      </div>
    </>
  );
};

interface ServiceItemProps {
  service: Service;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

/* Opción: círculo verde con su letra y el nombre, como en la maqueta.
   Al elegirla se despliega su explicación justo debajo. */
const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isActive, onSelect }) => (
  <motion.li
    initial={{ opacity: 0, x: 28 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT }}
  >
    <button
      type="button"
      className="group flex w-full items-center gap-4 py-3 text-left md:gap-6 md:py-5"
      aria-expanded={isActive}
      onClick={onSelect}
    >
      <span
        className={`display flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-verde text-xl text-white transition-transform duration-500 ease-out md:h-[58px] md:w-[58px] md:text-[1.75rem] ${
          isActive ? 'scale-110' : 'group-hover:scale-105'
        }`}
      >
        {service.letter}
      </span>
      <span className="block">
        <span className="display block text-[clamp(1.35rem,2.4vw,2.1rem)] leading-tight text-verde">
          {service.title}
        </span>
        <span className="copy mt-0.5 block text-sm">{service.shortDescription}</span>
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="overflow-hidden"
        >
          <div className="max-w-[460px] pb-5 pl-[3.75rem] md:pl-[5.125rem]">
            <ServiceDetail service={service} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.li>
);

/* Formas de celebrar: franja de foto arriba; abajo, el titular a la izquierda
   y las tres opciones (A, B, C) a la derecha. */
const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="servicios" className="tone-marfil relative overflow-x-clip pb-20 md:pb-28">
      <div className="tone-foto group">
        <Photo src={servicesImage} alt={servicesImageAlt} position="50% 22%" className="h-[46svh] min-h-[230px] md:h-[55svh]" />
      </div>

      <div className="page grid gap-8 pt-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-14 md:pt-16">
        <Reveal className="md:self-center">
          <h2 className="display text-[clamp(2rem,4.4vw,4rem)] leading-[1.2] text-verde">
            {servicesIntro[0]} <br />
            {servicesIntro[1]}
          </h2>
          <p className="copy mt-4 max-w-[360px] text-[15px] md:text-base">{servicesLead}</p>
        </Reveal>

        <ul className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem
              key={service.letter}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ServicesSection;
