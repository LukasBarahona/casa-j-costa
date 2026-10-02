import React from 'react';
import { motion } from 'framer-motion';
import { Wordmark } from '@/components/ui/Brand';
import NavMenu from '@/components/ui/NavMenu';
import { useSiteActions } from '@/hooks/useSiteActions';
import { EASE_OUT } from '@/lib/motion';

interface HeaderProps {
  // El encabezado va sobre la foto de portada: textos claros y fondos translúcidos.
  onImage?: boolean;
}

/* Encabezado: vive solo al inicio de la página (no acompaña el scroll).
   A la derecha, el botón de la casa (ir a una sección) y Cotizar.
   Más abajo, el contacto queda en el botón flotante de WhatsApp. */
const Header: React.FC<HeaderProps> = ({ onImage = false }) => {
  const { openMenu } = useSiteActions();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className={`page relative z-20 flex items-center justify-between py-4 md:py-5 ${
        onImage ? 'text-white' : 'text-foreground'
      }`}
    >
      <a href="#inicio" className="py-1 transition-opacity hover:opacity-70">
        <Wordmark className="text-[15px] md:text-[19px] lg:text-[22px]" />
      </a>

      <div className="flex items-center gap-2">
        <NavMenu onImage={onImage} />
        <button
          type="button"
          onClick={openMenu}
          title="Ctrl + K"
          className={`pill min-h-11 px-5 py-2 md:min-h-0 ${onImage ? 'bg-marfil text-ebano hover:opacity-90' : 'pill-solid'}`}
        >
          Cotizar
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
