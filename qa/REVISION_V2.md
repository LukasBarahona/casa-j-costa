# Revisión V2 — 2026-10-02

## Qué cambió

- **Portada anclada**: foto a pantalla completa con el nombre encima; al bajar, el nombre se va y aparece
  "Lo antiguo y lo contemporáneo conviven en la misma casa".
- **01 Historia anclada** (4 tiempos): La Cocina del J → mantuvimos lo importante → sumamos el fuego →
  hoy Casa J Costa. Marco en arco, barras de avance.
- **02 La casa**: galería tipo catálogo (N.º 01…), marcos en arco, sepia → color, filtro segmentado, visor.
- **Capacidad**: balanza antigua; la aguja y el contador van de 40 a 120 con el scroll.
- **03 Formas de celebrar**: opciones A–D con foto que cambia.
- **04 Menús** (nuevo): Jota Clásico, Jota Selección, Jota Costa; cartas en abanico; cotizar con ese menú.
- **Experiencias**: seis boletos que se deslizan lateralmente con el scroll.
- **05 El anfitrión**: camafeo ovalado, sello, frase que se enciende palabra por palabra.
- **06 Cotiza**: formulario en tarjeta curva, con selector de menú cuando se elige Evento Integral.
- Encabezado solo al inicio; pie revelado con borde curvo.
- Tipografía Fraunces en titulares; paleta con verdes; todo con curvas.

## Rendimiento

| | Antes | Después |
|---|---|---|
| JavaScript inicial | 516 KB (160 KB gzip) | 390 KB (124 KB gzip) + menú y visor bajo demanda |
| Fotos | 4,3 MB JPG | 2,1 MB WebP |
| Carga inicial (escritorio, local) | — | ~810 KB |
| Scroll, CPU ÷4, escritorio | 11 fps | 36 fps |
| Scroll, CPU ÷4, móvil | 12 fps | 28 fps |
| Scroll, CPU normal, escritorio | 48 fps | ~55 fps (2 % de cuadros lentos) |

Causa principal encontrada con el perfilador: `useScroll` de framer-motion medía cada elemento en cada
cuadro (~1,3 s de cálculo por recorrido). Se reemplazó por `src/lib/scroll-engine.ts`.
Medido en Chrome sin ventana, con la GPU integrada del equipo y desplazamiento programado a 1400 px/s:
es un escenario más duro que el scroll real con el dedo o la rueda.

## Verificado

- 22 pruebas automáticas sobre el build de producción: menú (botón y Ctrl+K), asistente con menú,
  tarjeta de menú → asistente preconfigurado → formulario, validaciones, WhatsApp y correo, filtros,
  visor, "Ver los menús", "Volver arriba".
- Sin desborde horizontal ni imágenes rotas en 390×844, 375×667, 768×1024, 1280×800, 1920×1080.
- Versión estática completa en teléfono horizontal (844×390) y con movimiento reducido.
- Escenas ancladas revisadas en 4–5 puntos de avance, en escritorio y móvil. Consola sin errores.

## No verificado

- Teléfono físico (solo emulación). Safari/iOS y Firefox: no probados; ahí el parallax de fotos y la
  barra de avance pueden no mostrarse (son decorativos) y el sello gira solo.
- Envío real de WhatsApp y correo: los datos de contacto son de relleno.
