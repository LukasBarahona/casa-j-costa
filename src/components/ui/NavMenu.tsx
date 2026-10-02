import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Home } from 'lucide-react';
import { navigation } from '@/config/site';
import { EASE_OUT } from '@/lib/motion';

interface NavMenuProps {
  // El botón va sobre la foto de portada: textos claros y fondo translúcido.
  onImage?: boolean;
}

/* Botón de la casa: despliega las secciones de la página para ir a cualquiera.
   Es un desplegable simple (botón + lista de enlaces): los enlaces son anclas
   normales, así que el salto a la sección lo hace el navegador. */
const NavMenu: React.FC<NavMenuProps> = ({ onImage = false }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Ir a una sección"
        aria-expanded={open}
        aria-controls={panelId}
        className={`pill min-h-11 gap-1 px-3 py-2 md:min-h-0 ${
          onImage ? 'border border-white/25 bg-black/30 text-white hover:bg-black/45' : 'pill-ghost'
        }`}
      >
        <Home size={17} />
        <ChevronDown
          size={14}
          className={`opacity-70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={panelId}
            aria-label="Secciones"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="tone-marfil absolute right-0 top-full z-50 mt-2.5 min-w-[240px] origin-top-right rounded-[1.75rem] border border-foreground/10 !bg-papel p-2 shadow-2xl"
          >
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Ir a
            </p>
            <ul>
              {navigation.map((item, index) => (
                <li key={item.section}>
                  <a
                    href={`#${item.section}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center gap-3 rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-verde-niebla/70 focus-visible:bg-verde-niebla/70"
                  >
                    <span className="w-5 font-display text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;
