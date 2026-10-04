import React, { useEffect, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
export interface LightboxItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  // Línea destacada sobre el título (p. ej. la fecha del evento).
  eyebrow?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  // Índice de la foto abierta; null = cerrado.
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

// Cuánto hay que deslizar el dedo para cambiar de foto.
const SWIPE_DISTANCE = 48;

const navButton =
  'flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30';

/* Visor de fotos. Se cambia de foto con las flechas, el teclado o deslizando el dedo. */
const Lightbox: React.FC<LightboxProps> = ({ items, index, onIndexChange }) => {
  const open = index !== null && index < items.length;
  const item = open ? items[index] : null;
  const touchStartX = useRef<number | null>(null);

  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  // El contenido ocupa toda la pantalla: cerrar al hacer clic fuera de la foto.
  const closeOnBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onIndexChange(null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) >= SWIPE_DISTANCE) step(distance < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/[0.93] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 pt-16 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:p-10"
          onClick={closeOnBackdrop}
        >
          {item && (
            <>
              <div
                className="relative flex min-h-0 w-full max-w-[1100px] flex-1 touch-pan-y items-center justify-center"
                onClick={closeOnBackdrop}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-full max-w-full rounded-2xl object-contain"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-4 flex w-full max-w-[1100px] items-center justify-between gap-4 text-white">
                <div className="text-sm">
                  {item.eyebrow && (
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronce-claro">
                      {item.eyebrow}
                    </p>
                  )}
                  <DialogPrimitive.Title className="font-display text-xl">{item.title}</DialogPrimitive.Title>
                  <p className="font-medium text-white/60">{item.caption}</p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <button type="button" aria-label="Foto anterior" onClick={() => step(-1)} className={navButton}>
                    <ChevronLeft size={20} />
                  </button>
                  <button type="button" aria-label="Foto siguiente" onClick={() => step(1)} className={navButton}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <DialogPrimitive.Close aria-label="Cerrar" className={`${navButton} absolute right-4 top-3`}>
                <X size={20} />
              </DialogPrimitive.Close>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Lightbox;
