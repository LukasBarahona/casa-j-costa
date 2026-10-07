# Revisión V3.3 — 2026-10-07

Feedback del cliente (capturas en `Pagina_Web/Feedback/1.png`–`8.png`) más nueve indicaciones.

## Qué cambió
1. **Logotipo**: el "CASA J COSTA" del encabezado y del pie usa la J del isologo, con su punto (`Wordmark` → `JMark`).
2. **Portada**: sin los tres globitos (Chicureo / 20 a 150 / cocina propia); filete bajo la bajada. La franja de
   La Casa entra fundida con la lámina crema (`softTop`) en vez de un corte recto.
3. **El Jota** (pantallas anchas): retrato cuadrado a la izquierda y texto a la derecha (`hostChapter.portrait`,
   `public/imagenes/anfitrion-jota.webp`). En teléfono no cambia. Texto de deslizar por capítulo (`swipeHint`).
4. **Menús**: círculos con filete interior, J al pie y respuesta al cursor (se levantan y se tiñen de verde);
   al tocarlos abren la cotización de ese menú. **Experiencias Jota**: la tira ya no se mueve con el scroll;
   flechas verdes y más grandes (`CarouselArrows`, `useCarousel`).
5. **Alianzas**: dos grupos que se despliegan al tocarlos ("Con quién hemos trabajado" / "Con quiénes trabajamos").
   **Reseñas de Google**: sección nueva con tarjetas, estrellas y flechas (`ReviewsSection`).
6. Abono: vuelve a **50%**.
7. Pie: íconos de Instagram, TikTok, LinkedIn y correo.
8. "Cotizar" del encabezado abre el paso a paso. El botón flotante de WhatsApp pregunta si quieres cotizar y lleva al paso a paso.
9. Formulario final y paso a paso piden lo mismo: nombre, correo, tipo de evento, invitados y qué necesitas.

## Verificado
- `tsc` y build sin errores. Capturas en 1280×800 y 390×844 de cada sección cambiada.
- Recorrido automático: Cotizar → paso a paso → WhatsApp abre `wa.me/56979878599` con todos los datos;
  el envío queda bloqueado sin nombre y correo; el formulario final marca los cinco campos obligatorios.

## Pendiente (faltan datos del cliente)
- **Enlaces** de Instagram, TikTok y LinkedIn y **correo** (`site.social`, `site.email`): los íconos se ven apagados
  y sin enlace, y el botón "Cotizar por correo" no aparece, hasta tenerlos.
- **Reseñas reales** de Google (`reviews`) y enlace a la ficha (`site.googleReviewsUrl`): hoy hay tarjetas de muestra rotuladas.
- **Alianzas**: los tres nombres salen del feedback, dados como ejemplo; confirmar lista y ortografía, sumar logos.
