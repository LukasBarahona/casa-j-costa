import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { allianceGroups, alliancesIntro, alliancesLead, site, type AllianceGroup } from '@/config/site';
import { EASE_OUT } from '@/lib/motion';
import { whatsappUrl } from '@/lib/quote';

interface GroupProps {
  group: AllianceGroup;
  open: boolean;
  onToggle: () => void;
}

/* Grupo de alianzas: una fila que se toca y despliega hacia abajo sus nombres,
   que entran uno tras otro. */
const Group: React.FC<GroupProps> = ({ group, open, onToggle }) => {
  const panelId = useId();

  return (
    <li className="border-b border-verde/25">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center justify-between gap-5 py-6 text-left md:py-8"
      >
        <span>
          <span className="display block text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight text-verde">
            {group.title}
          </span>
          <span className="copy mt-1.5 block text-sm md:text-base">{group.lead}</span>
        </span>
        <span
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-500 ease-out ${
            open ? 'rotate-45 bg-verde-profundo text-white' : 'bg-verde text-white group-hover:scale-105'
          }`}
          aria-hidden="true"
        >
          <Plus size={24} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <ul className="grid grid-cols-2 gap-2 pb-8 sm:grid-cols-3 md:gap-3 lg:grid-cols-5">
              {group.partners.map((partner, index) => (
                <motion.li
                  key={partner.name}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.07, ease: EASE_OUT }}
                  className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-papel p-5 text-center"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="display text-lg leading-tight text-verde md:text-xl">{partner.name}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

/* Alianzas: dos grupos cerrados (con quién hemos trabajado / con quiénes
   trabajamos). Al tocar uno, baja y muestra sus nombres; solo hay uno abierto a la vez. */
const AlliancesSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="alianzas" className="relative overflow-x-clip pb-8 pt-4 md:pb-12">
      <div className="page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Alianzas</p>
            <h2 className="display mt-6 text-title text-verde">
              {alliancesIntro[0]} <br />
              {alliancesIntro[1]}
            </h2>
          </div>
          <p className="max-w-[360px] text-lead text-muted-foreground">{alliancesLead}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 border-t border-verde/25">
            {allianceGroups.map((group, index) => (
              <Group
                key={group.title}
                group={group}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="text-sm text-muted-foreground">¿Tienes una marca o un proyecto y quieres sumarte?</p>
          <a
            href={whatsappUrl(`Hola, me gustaría conversar una alianza con ${site.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="pill pill-ghost group/cta min-h-11"
          >
            Conversemos una alianza
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default AlliancesSection;
