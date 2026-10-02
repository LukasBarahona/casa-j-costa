import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // Desplazamiento inicial en px.
  y?: number;
}

/* Aparición de lectura: el bloque sube y aparece.
   Solo opacidad y desplazamiento: se dibujan en la GPU y no frenan el scroll. */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 28 }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
