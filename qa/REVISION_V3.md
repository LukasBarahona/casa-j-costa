# Revisión V3 — 2026-10-05

Fusión de la landing V2.3.1 con la maqueta del cliente `WEB COSTA 2 (1).pdf` (9 láminas).

## Qué cambió
- **Estética de la maqueta**: fondo crema `#F8F5F1`, verde `#526E4E`, blanco; Merriweather en titulares y
  Montserrat liviana en textos; franjas de foto rectas de borde a borde; sin secciones oscuras ni bronce.
- **Vectores sacados del PDF**: sello circular (`public/logo-sello.svg`), la J (`JMark` en `ui/Brand.tsx`)
  y el filete ornamental (`public/ornamento.svg`).
- **Fotos sacadas del PDF** con el mismo encuadre de la maqueta (incluidas las que van espejadas):
  `public/imagenes/banda-*.webp` (franjas) y `col-*.webp` (columnas).
- **Portada**: parte con la foto completa y el sello; al bajar sube la lámina crema y queda la lámina 1 del PDF.
- **Capítulos** (`ChapterSection`, uno solo para los tres): La Casa, ¡El Jota! y Qué Celebramos. Entran como la
  lámina de presentación (franja + titular + J grande) y con el scroll la franja se divide en cuatro columnas
  (láminas 3, 5 y 7). En teléfono: lámina + carrusel de cuatro tarjetas.
- **3 Formas de celebrar** y **Tres menús** con la composición del PDF (círculos verdes A/B/C; círculos
  blancos I/II/III montados sobre la foto, que suben con el scroll).
- Se mantienen: frase que se enciende palabra por palabra, boletos de experiencias, alianzas, cotización,
  encabezado de vidrio y pie. Se eliminaron: escena "01 Casa J Costa", collage con filtros y sección oscura del anfitrión.

## Verificado
- `tsc` y `npm run build` sin errores; sin errores de consola.
- Capturas con Chrome en 1280×800, 1366×620, 768×1024 y 390×844: sin desborde horizontal; escenas ancladas
  completas al inicio, a la mitad y al final.

## No verificado / pendiente
- Fluidez medida sobre `vite preview` (solo se revisó visualmente).
- Textos de los capítulos: redactados desde las notas de la maqueta (que traía "lorem ipsum"); el cliente debe revisarlos.
- "Ventanas" y "La Casa" usan la misma foto, igual que en la maqueta.
- Varias fotos de la maqueta parecen de banco de imágenes (novios, arco, repisa, brindis): confirmar licencia o reemplazar.
- No publicado: falta `git commit` + `git push`.
