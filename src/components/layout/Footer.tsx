import React from 'react';
import { Instagram, Mail, MapPin } from 'lucide-react';
import { Wordmark, WhatsAppIcon } from '@/components/ui/Brand';
import { site } from '@/config/site';
import { whatsappUrl } from '@/lib/quote';

const linkClass = 'inline-flex items-center gap-2.5 transition-opacity hover:opacity-70';

/* Pie "revelado": queda fijo al fondo y la página, con su borde curvo,
   se desliza hacia arriba dejándolo a la vista al llegar al final.
   Es compacto: marca a un lado, contacto al otro. La navegación vive en el
   menú del encabezado, que acompaña todo el recorrido. */
const Footer: React.FC = () => {
  return (
    <footer className="tone-bosque sticky bottom-0 z-0 pb-5 pt-10 md:pt-12">
      <div className="page">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-12">
          <a href="#inicio" className="flex-shrink-0 text-foreground transition-opacity hover:opacity-70">
            {/* El margen inferior deja pasar la J, que baja de la línea */}
            <span className="mb-[0.75em] block text-[1.5rem] md:text-[1.75rem]">
              <Wordmark className="text-[1em]" />
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {site.tagline}
            </span>
          </a>

          <ul className="flex flex-col items-start gap-x-8 gap-y-2.5 text-sm font-medium md:flex-row md:flex-wrap md:items-center md:justify-end">
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MapPin size={15} className="flex-shrink-0 text-accent" />
                {site.address}, {site.city}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl(`Hola, quiero cotizar un evento en ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <WhatsAppIcon className="h-[15px] w-[15px] flex-shrink-0 text-accent" />
                Escríbenos por WhatsApp
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={linkClass}>
                  <Mail size={15} className="flex-shrink-0 text-accent" />
                  {site.email}
                </a>
              </li>
            )}
            {site.instagram && (
              <li>
                <a
                  href={`https://www.instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Instagram size={15} className="flex-shrink-0 text-accent" />
                  @{site.instagram}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* El margen derecho deja libre el botón flotante de WhatsApp */}
        <p className="mt-7 border-t border-foreground/15 pr-16 pt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. Centro de eventos en Chicureo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
