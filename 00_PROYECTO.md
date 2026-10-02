# Casa J Costa — Landing con scrolltelling

Archivo de proyecto: permite retomar el trabajo en otra sesión o con otra herramienta.

## Brief

```
PROYECTO   Landing publicable · Casa J Costa (centro de eventos, Chicureo) · firma la propia marca:
           logotipo "CASA J COSTA" en encabezado, sello circular en historia, cotización y pie.
OBJETIVO   Que el visitante entienda la casa y cotice su fecha · acción principal: WhatsApp
           (secundaria: formulario por correo) · se envía por link y redes: celular primero.
DIRECCIÓN  Base: plantilla "RAUM Studio" (Lovable), evolucionada a premium/patrimonial ·
           paleta #3 + verdes derivados · Fraunces (titulares) + Inter · sobrio, cálido ·
           movimiento medio: 2 escenas ancladas y varias ligadas al scroll.
CAPÍTULOS  Portada ★ · 01 Casa J Costa ★ (qué es · fogón · antigüedades) · 02 La casa · Capacidad (balanza) · 03 Formas de celebrar ·
           04 Menús · Experiencias · 05 El anfitrión · 06 Cotiza · Pie
MATERIAL   Textos: redactados desde los documentos del cliente (modelo de negocio, grilla IG) ·
           fotos reales del cliente (Imagenes_Web, Fotos_Semana1_IG), provisorias hasta el recambio.
TÉCNICA    Vite + React + TypeScript + Tailwind + framer-motion (se mantuvo el stack de la V1) ·
           contenido en un solo archivo · sin base de datos.
ENTREGA    Carpeta `web/` lista para hosting estático (`npm run build` → `dist/`).
PENDIENTES Ver "Pendientes del cliente".
```

## Decisiones cerradas

- **Cotizar** solo en el encabezado (no acompaña el scroll), sin símbolo de WhatsApp. A su lado, el botón de
  la casa despliega las secciones. El menú de Cotizar no lleva navegación. Abajo queda el flotante de WhatsApp.
- **Sin sección de historia ni nombre antiguo**: la escena 01 presenta Casa J Costa, el fogón y las antigüedades.
- **Fotos siempre en color** y chicas en la galería (4 columnas en escritorio, 3 en tablet, 2 en teléfono).
- **Boletos de experiencias**: se mueven con el scroll y también a mano (arrastre, flechas, deslizar).
- **Portada**: foto a pantalla completa desde el inicio, con nombre y presentación encima.
- **Tres menús** del Evento Integral: Jota Clásico (I), Jota Selección (II), Jota Costa (III, el más premium).
  El menú elegido viaja en la cotización (WhatsApp y correo).
- **Formas**: arcos, óvalos, píldoras, esquinas muy redondeadas; secciones como láminas con borde curvo.
- **Color**: marfil de base; verde profundo, verde de marca y salvia en bandas; ébano en el anfitrión;
  bronce como acento ("latón"); gris azulado solo en un boleto.
- **Motivos patrimoniales**: sello circular giratorio, etiquetas de catálogo "N.º 01", boletos antiguos
  para las experiencias, balanza con aguja, camafeo del anfitrión, marcos en arco.
- Se eliminó el selector de temas de la plantilla original.
- No se inventan datos: precios, platos, nombre y relato del dueño quedan pendientes y marcados.

## Estructura

```
src/config/site.ts        Contenido editable (contacto, textos, fotos, servicios, menús)
src/lib/scroll-engine.ts  Motor de scroll: mide una vez, un solo listener
src/lib/motion.ts         useScrollProgress, useMotionEnabled
src/lib/quote.ts          Validación y armado de mensajes de cotización
src/components/sections/  Hero · Presentation · Spaces · Capacity · Services · Menus · Experiences · Host · Quote
src/components/ui/        Seal · Photo · Reveal · NavMenu · CommandMenu · Lightbox · WhatsAppButton …
src/index.css             Tokens, tonos de sección, formas, animaciones nativas
public/imagenes/          Fotos en WebP
```

## Reglas de movimiento y rendimiento

- Estado = función de la posición: todo es reversible. No se secuestra el scroll.
- Solo se animan `transform` y `opacity`. Sin desenfoques ni mezclas de capa sobre áreas grandes.
- No usar `useScroll` de framer-motion: vuelve a medir cada elemento en cada cuadro. Usar `useScrollProgress`.
- Lo decorativo (parallax de fotos, giro del sello, barra de avance) son animaciones CSS ligadas al scroll.
- Los temas/tonos (`.tone-*`) van fuera de `@layer`: Tailwind elimina las clases que no ve escritas.
- Con `prefers-reduced-motion` o alto ≤ 500 px (teléfono horizontal) cada escena entrega su versión estática.

## Versiones

### V1 — 2026-10-02
Réplica fiel de la plantilla RAUM con la marca: Inter, grilla con filtros, servicios, anfitrión,
formulario, menú interactivo, selector de temas.

### V2 — 2026-10-02
Rediseño premium con scrolltelling (ver `qa/REVISION_V2.md`): portada e historia ancladas, balanza,
menús en abanico, boletos, camafeo, tipografía serif, paleta de verdes, curvas. Optimización de
rendimiento: motor de scroll propio, WebP, carga diferida, fuentes recortadas.

### V2.1 — 2026-10-02
Ajustes pedidos por el cliente (ver `qa/REVISION_V2_1.md`): presentación en tres tiempos en vez de
historia, galería chica y en color, boletos recorribles a mano, botón de la casa junto a Cotizar.

### V2.2 — 2026-10-02
Pasada de teléfono (ver `qa/REVISION_V2_2.md`): acordeón en servicios, carrusel de menús, visor por
deslizamiento, áreas táctiles, titular fluido. Sitio marcado como no indexable. Repositorio git local.

## Publicación

- El cliente lo quiere **privado, solo por link**. Recomendado: repositorio **privado** en GitHub + Vercel
  (el repositorio es solo `web/`). GitHub Pages gratis exige repositorio público, por eso se descartó.
- En Vercel: importar el repositorio; detecta Vite solo (build `npm run build`, salida `dist`).
- El link de Vercel no es secreto: quien lo tenga puede entrar. No aparece en buscadores (`noindex` + `robots.txt`).
  Protección con contraseña es de pago en Vercel.
- Al lanzar al público: quitar `noindex` de `index.html` y borrar `public/robots.txt`.

## Pendientes del cliente

1. WhatsApp real (`site.whatsapp`, hoy `56900000000`) y correo real (`site.email`).
2. Instagram (`site.instagram`).
3. Nombre, relato y retrato del dueño (`host`, `public/imagenes/anfitrion.webp`).
4. Platos y valor por persona de cada menú (hoy solo descripción general).
5. Confirmar qué experiencias se publican (hoy las seis del modelo de negocio).
6. Autorización de fotos con invitados (`06-mesa-con-invitados`, `05-vino-y-quesos`).
7. Recambio de fotos provisorias.
