import React from 'react';
import { cn } from '@/lib/utils';

interface PhotoProps {
  src: string;
  alt?: string;
  // Clases del marco (forma, proporción, tamaño).
  className?: string;
  // La foto se desliza dentro del marco al cruzar la pantalla.
  parallax?: boolean;
  // Qué parte de la foto se conserva al recortarla (CSS object-position).
  position?: string;
}

/* Foto enmarcada, siempre en color. Al pasar el cursor por su contenedor
   `.group` se acerca levemente.

   El parallax es una animación nativa ligada al scroll (clase `.parallax-y`):
   la mueve el navegador sin pasar por JavaScript. Donde no existe, la foto
   simplemente queda quieta. */
const Photo: React.FC<PhotoProps> = ({ src, alt = '', className, parallax = true, position }) => (
  <div className={cn('relative overflow-hidden bg-secondary', className)}>
    <div className={parallax ? 'parallax-y absolute inset-x-0 -inset-y-[8%]' : 'absolute inset-0'}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: position }}
        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
      />
    </div>
  </div>
);

export default Photo;
