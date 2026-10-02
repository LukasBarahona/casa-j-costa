# Revisión V2.2 — 2026-10-02 (teléfono y preparación para publicar)

## Qué cambió

- **Portada**: el titular sigue el ancho de la pantalla; "Centro de eventos" cabe en una línea desde 320 px.
- **Formas de celebrar**: en teléfono la foto va arriba y las opciones son un acordeón; la explicación y los
  botones se abren bajo la opción tocada.
- **Menús**: en teléfono, carrusel que se desliza con el dedo (una carta por vez, con ajuste automático).
- **Visor de fotos**: se cambia de foto deslizando; fondo más opaco.
- **Galería**: en teléfono la etiqueta lleva solo la categoría.
- **Tacto**: botones y enlaces de al menos 44 px; botón de WhatsApp más chico y sobre la zona segura del iPhone.
- **Sitio privado por ahora**: `noindex` en `index.html` y `public/robots.txt` con `Disallow: /`.
- Repositorio git local creado en `web/` (rama `main`), sin `node_modules`, `dist` ni `capturas`.

## Verificado

- 16 pruebas de teléfono en 320×568, 360×740, 390×844 y 430×932: titular, presentación dentro de pantalla,
  sin desborde, sin imágenes rotas, áreas táctiles, acordeón, carrusel, visor por deslizamiento, desplegable.
- 30 pruebas de escritorio sobre el build de producción. Consola sin errores.

## No verificado

- Teléfono físico (solo emulación en Chrome). Safari de iPhone no probado.
