import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Wordmark } from '@/components/ui/Brand';
import NavMenu from '@/components/ui/NavMenu';
import { EASE_OUT } from '@/lib/motion';

// A partir de cuántos píxeles de scroll la barra deja de ser transparente.
const SOLID_AFTER = 40;

/* ¿Ya se bajó lo suficiente para que la barra necesite fondo propio?
   Solo cambia el estado al cruzar el umbral, no en cada cuadro. */
function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SOLID_AFTER);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrolled;
}

/* Encabezado fijo: acompaña todo el recorrido.
   - Arriba, sobre la foto de portada: transparente, con textos claros.
   - Al bajar: barra flotante con fondo propio, para leerse sobre cualquier sección.
   Lleva el logotipo, la casita (volver al inicio), Cotizar (directo al
   formulario del final) y el menú de tres rayitas con el índice de la página. */
const Header: React.FC = () => {
  const scrolled = useScrolled();
  const buttonTone = scrolled
    ? 'border border-ebano/15 text-ebano hover:bg-ebano/5'
    : 'border border-white/30 bg-black/25 text-white hover:bg-black/40';

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-40 px-2 pt-2 md:px-4 md:pt-3"
    >
      <div
        className={`mx-auto flex max-w-[1380px] items-center justify-between rounded-full py-1.5 pl-4 pr-1.5 transition-[background-color,box-shadow,color] duration-500 md:py-2 md:pl-7 md:pr-2 ${
          scrolled ? 'bg-marfil text-ebano shadow-lg shadow-ebano/10' : 'text-white'
        }`}
      >
        <a href="#inicio" aria-label="Casa J Costa: volver al inicio" className="py-1 transition-opacity hover:opacity-70">
          <Wordmark className="text-[14px] md:text-[18px] lg:text-[20px]" />
        </a>

        <div className="flex items-center gap-1.5 md:gap-2">
          <a
            href="#inicio"
            aria-label="Volver al inicio"
            title="Volver al inicio"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors md:h-11 md:w-11 ${buttonTone}`}
          >
            <Home size={17} />
          </a>
          <a
            href="#formulario"
            className={`pill h-10 px-4 py-0 md:h-11 md:px-6 ${
              scrolled ? 'bg-ebano text-marfil hover:opacity-85' : 'bg-marfil text-ebano hover:opacity-90'
            }`}
          >
            Cotizar
          </a>
          <NavMenu buttonClassName={buttonTone} />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
