import React from 'react';

/* Filete de bronce en el borde superior: cuánto del recorrido llevas.
   Animación nativa ligada al scroll (clase `.scroll-bar`); donde el navegador
   no la soporta, el filete no se muestra. */
const ScrollProgress: React.FC = () => (
  <div aria-hidden="true" className="scroll-bar fixed inset-x-0 top-0 z-[45] h-[2px] bg-bronce" />
);

export default ScrollProgress;
