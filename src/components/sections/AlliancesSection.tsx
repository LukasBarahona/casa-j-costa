import React from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { alliancesIntro, alliancesLead, partnerPlaceholders, partners, site } from '@/config/site';
import { whatsappUrl } from '@/lib/quote';

const tileClass =
  'flex aspect-square items-center justify-center rounded-2xl p-4 text-center transition-colors';

/* Alianzas: marcas y personas con las que ha trabajado la casa, en cuadrados.
   Mientras `partners` esté vacío se muestran espacios reservados, sin inventar nombres. */
const AlliancesSection: React.FC = () => {
  const hasPartners = partners.length > 0;

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
          <ul className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
            {hasPartners
              ? partners.map((partner) => (
                  <li key={partner.name} className={`${tileClass} bg-papel`}>
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="display text-xl leading-tight text-foreground">{partner.name}</span>
                    )}
                  </li>
                ))
              : Array.from({ length: partnerPlaceholders }, (_, index) => (
                  <li
                    key={index}
                    className={`${tileClass} border border-dashed border-foreground/25 text-muted-foreground`}
                  >
                    <span>
                      <span className="block font-display text-2xl text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em]">
                        Próximamente
                      </span>
                    </span>
                  </li>
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
