import React from 'react';
import { ArrowUp, Instagram, Mail, MapPin } from 'lucide-react';
import { Wordmark, WhatsAppIcon } from '@/components/ui/Brand';
import { navigation, site } from '@/config/site';
import { whatsappUrl } from '@/lib/quote';

const linkClass = 'inline-flex items-center gap-2.5 transition-opacity hover:opacity-70';

/* Pie "revelado": queda fijo al fondo y la página, con su borde curvo,
   se desliza hacia arriba dejándolo a la vista al llegar al final. */
const Footer: React.FC = () => {
  return (
    <footer className="tone-bosque sticky bottom-0 z-0 pb-8 pt-20">
      <div className="page">
        <div>
          <a href="#inicio" className="text-foreground transition-opacity hover:opacity-70">
            {/* El margen inferior deja pasar la J, que baja de la línea */}
            <span className="mb-[0.8em] block text-[clamp(1.5rem,5.2vw,4.25rem)]">
              <Wordmark className="text-[1em]" />
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {site.tagline}
            </span>
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-8 border-t border-foreground/15 pt-8 text-sm font-medium md:mt-14 md:flex-row md:justify-between">
          <div className="flex flex-col items-start gap-3">
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <MapPin size={15} className="flex-shrink-0 text-accent" />
              {site.address}, {site.city}
            </a>
            <a
              href={whatsappUrl(`Hola, quiero cotizar un evento en ${site.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <WhatsAppIcon className="h-[15px] w-[15px] flex-shrink-0 text-accent" />
              Escríbenos por WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className={linkClass}>
              <Mail size={15} className="flex-shrink-0 text-accent" />
              {site.email}
            </a>
            {site.instagram && (
              <a
                href={`https://www.instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Instagram size={15} className="flex-shrink-0 text-accent" />
                @{site.instagram}
              </a>
            )}
          </div>

          <nav aria-label="Secciones (pie)">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground md:justify-end">
              {navigation.map((item) => (
                <li key={item.section}>
                  <a href={`#${item.section}`} className="transition-colors hover:text-foreground">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pr-16 text-sm text-muted-foreground md:pr-20">
          <p>
            © {new Date().getFullYear()} {site.name}. Centro de eventos en Chicureo.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pill pill-ghost px-4 py-2"
          >
            Volver arriba
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
