import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import {
  services,
  servicesIntro,
  servicesLead,
  modalities,
  MENU_MODALITY,
  type Service,
} from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import { EASE_OUT } from '@/lib/motion';
import { scrollToSection } from '@/lib/utils';

/* Explicación de una opción y sus acciones. */
const ServiceDetail: React.FC<{ service: Service }> = ({ service }) => {
  const { openQuote } = useSiteActions();

  const quote = () => {
    // Si el servicio es una modalidad cotizable, el asistente parte con ella elegida.
    const modality = modalities.find((m) => m.value === service.title)?.value;
    openQuote(modality ? { modality } : {});
  };

  return (
    <>
      <p className="text-sm leading-relaxed text-muted-foreground">{service.fullDescription}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={quote} className="pill pill-solid group/cta min-h-11">
          Cotizar esta opción
          <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
        </button>
        {service.title === MENU_MODALITY && (
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

const ServiceItem: React.FC<ServiceItemProps> = ({ service, index, isActive, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, x: 28 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
    className={`rounded-card transition-colors duration-500 ${
      isActive ? 'bg-verde-niebla/70' : 'hover:bg-foreground/[0.03]'
    }`}
  >
    <button
      type="button"
      className="flex w-full items-start gap-4 px-4 py-4 text-left md:gap-5 md:px-7 md:py-6"
      aria-expanded={isActive}
      onClick={onSelect}
      onMouseEnter={onSelect}
      onFocus={onSelect}
    >
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border font-display text-lg transition-colors duration-500 ${
          isActive ? 'border-verde bg-verde text-marfil' : 'border-foreground/20 text-muted-foreground'
        }`}
      >
        {service.letter}
      </span>
      <span className="block">
        <span
          className={`display block text-[clamp(1.4rem,2.4vw,2rem)] leading-tight transition-colors duration-500 ${
            isActive ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          {service.title}
        </span>
        <span className="mt-1 block text-sm font-medium text-muted-foreground">
          {service.shortDescription}
        </span>
      </span>
    </button>

    {/* En teléfono, la explicación se despliega bajo la opción tocada (acordeón) */}
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="overflow-hidden md:hidden"
        >
          <div className="px-4 pb-5 pl-[4.5rem]">
            <ServiceDetail service={service} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* Formas de celebrar: al elegir una opción cambia la foto y su explicación.
   - Escritorio: foto a la izquierda con la explicación debajo; opciones a la derecha.
   - Teléfono: foto arriba y opciones en acordeón, para que el cambio ocurra
     donde se tocó y no más abajo, fuera de pantalla. */
const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section id="servicios" className="relative overflow-x-clip py-20 md:py-36">
      <div className="page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">03 / Formas de celebrar</p>
            <h2 className="display mt-6 text-title text-foreground">
              {servicesIntro[0]} <br />
              <span className="text-verde">{servicesIntro[1]}</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-lead text-muted-foreground">{servicesLead}</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-6 md:mt-14 md:flex-row md:items-start md:gap-14 lg:gap-24">
          {/* Foto de la opción elegida (y, en escritorio, su explicación) */}
          <Reveal className="w-full flex-shrink-0 md:w-[min(40vw,440px)]">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-card bg-secondary md:aspect-[4/5] md:rounded-[2.5rem]">
              {services.map((service, index) => (
                <img
                  key={service.letter}
                  src={service.image}
                  alt={index === activeIndex ? service.title : ''}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
                    index === activeIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                  }`}
                />
              ))}
              <span className="glass absolute left-4 top-4 rounded-full px-3.5 py-1.5 font-display text-sm">
                Opción {activeService.letter}
              </span>
            </div>

            <div aria-live="polite" className="hidden min-h-[150px] px-1 pt-5 md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <ServiceDetail service={activeService} />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Opciones */}
          <div className="flex flex-1 flex-col gap-1 md:pt-4">
            {services.map((service, index) => (
              <ServiceItem
                key={service.letter}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
