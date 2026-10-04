import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Wordmark } from '@/components/ui/Brand';
import NavMenu from '@/components/ui/NavMenu';
import { EASE_OUT } from '@/lib/motion';

// A partir de cuántos píxeles de scroll la barra deja de ser transparente.
const GLASS_AFTER = 40;
// Tonos de sección con fondo oscuro (ver `.tone-*` en index.css).
const DARK_TONES = '.tone-bosque, .tone-verde, .tone-ebano';

// 'top': transparente sobre la portada. 'dark' / 'light': vidrio según lo que hay debajo.
type HeaderLook = 'top' | 'dark' | 'light';

/* Qué aspecto debe tener la barra según la posición: mira qué sección queda
   justo debajo de ella y se adapta a su tono, para fundirse con la página.
   Se evalúa una vez por cuadro de scroll y solo cambia el estado si varía. */
function useHeaderLook(headerRef: React.RefObject<HTMLElement>): HeaderLook {
  const [look, setLook] = useState<HeaderLook>('top');

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      if (window.scrollY <= GLASS_AFTER) {
        setLook('top');
        return;
      }
      const below = (headerRef.current?.offsetHeight ?? 60) + 2;
      const element = document.elementFromPoint(window.innerWidth / 2, below);
      const tone = element?.closest('[class*="tone-"]');
      setLook(tone?.matches(DARK_TONES) ? 'dark' : 'light');
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [headerRef]);

  return look;
}

const barClass: Record<HeaderLook, string> = {
  top: 'border-transparent text-white',
  dark: 'header-glass-dark border-white/10 text-white',
  light: 'header-glass-light border-ebano/10 text-ebano',
};

/* Encabezado fijo y discreto: una franja delgada pegada al borde superior.
   - Arriba, sobre la foto de portada: transparente.
   - Al bajar: vidrio esmerilado que toma el tono de la sección que tiene debajo.
   Lleva el logotipo, la casita (volver al inicio), Cotizar (directo al
   formulario del final) y el menú de tres rayitas con el índice. */
const Header: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const look = useHeaderLook(ref);
  const onLight = look === 'light';

  const iconButton = `flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
    onLight ? 'hover:bg-ebano/10' : 'hover:bg-white/15'
  }`;

  return (
    <motion.header
      ref={ref}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,color] duration-500 ${barClass[look]}`}
    >
      <div className="page flex h-14 items-center justify-between md:h-[3.75rem]">
        <a href="#inicio" aria-label="Casa J Costa: volver al inicio" className="py-1 transition-opacity hover:opacity-70">
          <Wordmark className="text-[14px] md:text-[17px] lg:text-[19px]" />
        </a>

        <div className="-mr-2 flex items-center gap-0.5 md:gap-1">
          <a href="#inicio" aria-label="Volver al inicio" title="Volver al inicio" className={iconButton}>
            <Home size={17} />
          </a>
          <a
            href="#formulario"
            className={`pill mx-1 h-9 border px-4 py-0 text-[13px] md:px-5 ${
              onLight
                ? 'border-ebano/25 hover:bg-ebano hover:text-marfil'
                : 'border-white/45 hover:bg-white hover:text-ebano'
            }`}
          >
            Cotizar
          </a>
          <NavMenu buttonClassName={iconButton} />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
