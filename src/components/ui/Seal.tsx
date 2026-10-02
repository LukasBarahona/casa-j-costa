import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface SealProps {
  // Texto que rodea el sello. Se reparte en toda la circunferencia.
  text?: string;
  className?: string;
  // Lo que va al centro (por defecto, la J del logotipo).
  children?: React.ReactNode;
}

const DEFAULT_TEXT = 'CASA J COSTA · CENTRO DE EVENTOS · CHICUREO · ';
const RADIUS = 76;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* Sello de lacre / timbre: texto circular que gira con el scroll.
   El giro es una animación nativa (clase `.seal-spin`), sin JavaScript. */
const Seal: React.FC<SealProps> = ({ text = DEFAULT_TEXT, className, children }) => {
  const id = useId();

  return (
    <div aria-hidden="true" className={cn('relative aspect-square select-none', className)}>
      <svg viewBox="0 0 200 200" className="seal-spin absolute inset-0 h-full w-full">
        <defs>
          <path
            id={id}
            d={`M100,100 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <text fill="currentColor" fontSize="13.5" fontWeight="600" style={{ fontFamily: 'Inter, sans-serif' }}>
          <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 6} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center">{children}</div>
      ) : (
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          <text
            x="100"
            y="126"
            textAnchor="middle"
            fill="currentColor"
            fontSize="76"
            fontWeight="900"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            J
          </text>
        </svg>
      )}
    </div>
  );
};

export default Seal;
