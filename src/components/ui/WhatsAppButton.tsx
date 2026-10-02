import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/Brand';
import { site } from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import { openWhatsApp } from '@/lib/quote';
import { EASE_OUT as EASE } from '@/lib/motion';

// Respuestas rápidas: cada una abre WhatsApp con el mensaje ya escrito.
const quickReplies = [
  { label: 'Quiero cotizar un matrimonio', message: 'Hola, quiero cotizar un matrimonio' },
  { label: 'Una celebración familiar', message: 'Hola, quiero cotizar una celebración familiar' },
  { label: 'Un evento de empresa', message: 'Hola, quiero cotizar un evento de empresa' },
  { label: 'Solo arrendar el recinto', message: 'Hola, quiero cotizar el arriendo del recinto' },
];

/* Botón flotante de WhatsApp con respuestas rápidas. */
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

  const send = (message: string) => {
    openWhatsApp(`${message} en ${site.name}. ¿Tienen disponibilidad?`);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex flex-col items-end gap-3 md:bottom-5 md:right-5">
      <AnimatePresence>
        {open && (
          <motion.div
            id="whatsapp-panel"
            role="dialog"
            aria-label={`Escribir a ${site.name} por WhatsApp`}
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
                Hola 👋 ¿Qué quieres celebrar?
              </p>

              <div className="mt-3 space-y-1.5">
                {quickReplies.map((reply) => (
                  <button
                    key={reply.label}
                    type="button"
                    onClick={() => send(reply.message)}
                    className="group flex w-full items-center justify-between gap-3 min-h-11 rounded-full border border-ebano/15 px-4 py-2.5 text-left text-sm font-medium text-ebano transition-colors hover:border-verde hover:bg-verde-niebla/60"
                  >
                    {reply.label}
                    <ArrowRight size={14} className="flex-shrink-0 text-ebano/50 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
                className="mt-3 w-full pb-1 text-center text-xs font-medium text-ebano/60 underline underline-offset-4 hover:text-ebano"
              >
                Prefiero armar mi cotización paso a paso
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
        aria-label={open ? 'Cerrar WhatsApp' : 'Escribir por WhatsApp'}
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
