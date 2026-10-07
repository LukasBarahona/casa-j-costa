import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/Brand';
import { site } from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import { EASE_OUT as EASE } from '@/lib/motion';

/* Botón flotante de WhatsApp. Al tocarlo pregunta si quieres cotizar y te
   lleva a la cotización paso a paso, que al final se envía por WhatsApp. */
const WhatsAppButton: React.FC = () => {
  const { openQuote } = useSiteActions();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const startQuote = () => {
    setOpen(false);
    openQuote();
  };

  return (
    <div ref={containerRef} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 md:bottom-5 md:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            id="whatsapp-panel"
            role="dialog"
            aria-label={`Cotizar con ${site.name}`}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-[min(320px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-papel shadow-2xl"
          >
            <div className="bg-verde px-5 py-4 text-marfil">
              <p className="text-sm font-semibold">{site.name}</p>
              <p className="text-xs opacity-80">Te respondemos por WhatsApp</p>
            </div>

            <div className="p-3">
              <p className="rounded-2xl rounded-tl-md bg-verde-niebla px-4 py-2.5 text-sm text-verde-profundo">
                Hola 👋 ¿Quieres cotizar tu evento? Son cuatro pasos y al final nos llega por WhatsApp.
              </p>

              <button type="button" onClick={startQuote} className="pill pill-brand group mt-3 min-h-11 w-full">
                Sí, quiero cotizar
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2 w-full pb-1 pt-1 text-center text-xs font-medium text-ebano/60 underline underline-offset-4 hover:text-ebano"
              >
                Ahora no
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2, ease: EASE }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={open ? 'Cerrar' : 'Cotizar por WhatsApp'}
        className="relative flex h-12 w-12 items-center justify-center rounded-full md:h-14 md:w-14 bg-verde text-marfil shadow-lg shadow-black/25 ring-1 ring-white/20"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-verde opacity-40 motion-safe:animate-ping [animation-duration:2.5s] [animation-delay:2s] [animation-iteration-count:3] [animation-fill-mode:both]" />
        )}
        {open ? <X size={22} className="relative" /> : <WhatsAppIcon className="relative h-6 w-6 md:h-7 md:w-7" />}
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
