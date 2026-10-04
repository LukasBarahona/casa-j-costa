# Revisión V2.3 — 2026-10-04

## Qué cambió (14 pedidos del cliente)

1. Capacidad: **20 a 150 personas** en todo el sitio (`site.capacity`).
2. **El anfitrión** sube: queda entre Formas de celebrar y Menús.
3. **Encabezado fijo**: acompaña todo el recorrido (transparente sobre la portada, barra con fondo al bajar).
   La casita vuelve al inicio; el menú de tres rayitas muestra el índice completo.
4. **Cotizar** (encabezado) lleva directo al formulario de cotización.
5. **Nombre obligatorio** al cotizar: en el formulario y en el asistente paso a paso.
6. Tipo de evento **"Otro"**: pide explicar qué evento es (obligatorio) y lo envía en el mensaje.
7. Escena 01: sin el marco en arco; solo el logo y las fotos.
8. Galería: **collage de fotos cuadradas** (4 / 3 / 2 columnas), nombre y número sobre la foto.
9. Eliminada la sección de capacidad (balanza interactiva).
10. Eliminada "Experiencias Casa J Costa" de las formas de celebrar (quedan A, B y C).
11. Nueva sección **07 / Alianzas** ("Con quién hemos trabajado").
12. Experiencias: al tocar un boleto se abren las **fotos del evento con su fecha**.
13. Eliminado el sello circular giratorio de toda la página; la foto del anfitrión pasa de óvalo a **cuadrado**.
14. **"50% de abono"** destacado en grande, en el formulario y en el resumen del asistente.

Numeración nueva: 01 Casa J Costa · 02 La casa · 03 Formas de celebrar · 04 El anfitrión · 05 Menús ·
06 Experiencias · 07 Alianzas · 08 Cotiza.

## Interpretaciones

- Pedido 13, "ese círculo debe ser reemplazado por el cuadrado": se entendió como el retrato ovalado del anfitrión.
- Pedido 3: las píldoras de navegación ya no existen; el índice vive solo en las tres rayitas y en el pie.
- El menú de comandos (Ctrl + K) sigue existiendo, pero el botón Cotizar ya no lo abre.

## Datos de relleno (no inventados)

- **Alianzas**: `partners` está vacío; se muestran seis cuadros "Próximamente".
- **Experiencias**: sin fechas reales (se lee "Fecha por confirmar") y con fotos provisorias de la casa.

## Verificado

- 31 pruebas automáticas: los 14 pedidos, envío por WhatsApp con nombre y detalle, arrastre de boletos sin abrirlos,
  y sin desborde ni imágenes rotas en 320, 360, 390, 768, 1280 y 1920 px. Versión estática con movimiento reducido.
- Build de producción sin errores. Consola sin errores.

## No verificado

- Teléfono físico, Safari/iOS y Firefox (solo Chrome en emulación).
