import React from 'react';
import { cn } from '@/lib/utils';

/* La J del logotipo, sola (trazado de la maqueta). Toma el color del texto. */
export const JMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 482.4 597.19" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M324.96 562.30C294.00 582.75 260.75 594.71 224.05 596.24C201.59 597.19 179.69 595.75 156.60 589.47C248.22 569.73 309.43 487.33 303.48 394.08L303.07 63.03C303.03 28.61 273.00 4.26 241.51 0.34L468.85 0.00L482.40 0.93C449.81 2.92 423.48 28.09 419.91 61.58L419.55 387.97C419.52 410.31 414.60 431.42 408.37 452.31C394.64 498.34 365.15 535.73 324.96 562.30z" />
    <path d="M38.45 364.44C81.49 315.54 157.08 316.15 199.49 364.79C237.06 407.89 233.86 472.65 193.18 512.03C152.09 551.81 86.42 552.09 45.06 512.65C3.82 473.33 0.00 408.12 38.45 364.44z" />
  </svg>
);

/* Logotipo en texto: CASA J COSTA, con la misma J del isologo (con su punto).
   Las proporciones salen del sello: la J mide unas tres veces el alto de las
   letras, asoma sobre ellas y baja bajo la línea; el punto queda bajo "CASA". */
export const Wordmark: React.FC<{ className?: string }> = ({ className }) => (
  <span
    aria-label="Casa J Costa"
    className={cn(
      'inline-flex items-baseline font-serif font-normal leading-none tracking-[0.05em] whitespace-nowrap',
      className
    )}
  >
    <span aria-hidden="true">CASA</span>
    <span aria-hidden="true" className="relative inline-block h-[0.7em] w-[0.92em]">
      <JMark className="absolute right-[0.02em] top-[-0.27em] h-[2.2em] w-auto" />
    </span>
    <span aria-hidden="true">COSTA</span>
  </span>
);

/* Filete ornamental que cierra cada columna (trazado de la maqueta). */
export const Ornament: React.FC<{ className?: string }> = ({ className }) => (
  <img
    src={`${import.meta.env.BASE_URL}ornamento.svg`}
    alt=""
    aria-hidden="true"
    loading="lazy"
    width={113}
    height={20}
    className={className}
  />
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.12V9a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.33 6.34 6.34 0 0 0 6.33-6.33V8.69a8.18 8.18 0 0 0 4.78 1.53V6.77a4.85 4.85 0 0 1-1.01-.08Z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.27-.2-.57-.34Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41Z" />
  </svg>
);
