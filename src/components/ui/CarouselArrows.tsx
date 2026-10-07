import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const arrowClass =
  'flex h-12 w-12 items-center justify-center rounded-full bg-verde text-white shadow-md shadow-verde-profundo/20 transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-verde-profundo active:scale-95 disabled:pointer-events-none disabled:bg-verde/25 disabled:shadow-none';

interface CarouselArrowsProps {
  // Qué se recorre, para los nombres accesibles ("Boletos anteriores").
  label: string;
  atStart: boolean;
  atEnd: boolean;
  onStep: (direction: 1 | -1) => void;
}

/* Flechas verdes para recorrer una tira (boletos, reseñas). */
const CarouselArrows: React.FC<CarouselArrowsProps> = ({ label, atStart, atEnd, onStep }) => (
  <div className="flex flex-shrink-0 gap-2.5">
    <button
      type="button"
      onClick={() => onStep(-1)}
      disabled={atStart}
      aria-label={`${label} anteriores`}
      className={arrowClass}
    >
      <ChevronLeft size={24} strokeWidth={2.25} />
    </button>
    <button
      type="button"
      onClick={() => onStep(1)}
      disabled={atEnd}
      aria-label={`${label} siguientes`}
      className={arrowClass}
    >
      <ChevronRight size={24} strokeWidth={2.25} />
    </button>
  </div>
);

export default CarouselArrows;
