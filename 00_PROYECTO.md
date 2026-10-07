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
CAPÍTULOS  (vigente: ver V2.3) Portada ★ · 01 Casa J Costa ★ · 02 La casa · Capacidad (balanza) · 03 Formas de celebrar ·
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
src/components/sections/  Hero · Presentation · Spaces · Services · Host · Menus · Experiences · Alliances · Quote
                          (orden de la página en `src/App.tsx`)
src/components/ui/        Photo · Reveal · NavMenu · CommandMenu · Lightbox · WhatsAppButton …
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

### V2.3 — 2026-10-04
Catorce ajustes del cliente (ver `qa/REVISION_V2_3.md`): capacidad 20–150, encabezado fijo con casita e índice
de tres rayitas, Cotizar directo al formulario, nombre obligatorio, detalle del evento "Otro", presentación sin
marco, galería en collage cuadrado, sin balanza ni sello giratorio, anfitrión antes de los menús y en cuadrado,
sección de alianzas, boletos de experiencias con fotos y fecha, abono destacado (30% desde la V3.2).

**Decisiones vigentes tras la V2.3** (reemplazan lo anterior donde se contradigan):
- Formas: cuadrados y rectángulos de esquinas suaves. Sin óvalos ni arcos en fotos (el arco queda solo en las cartas de menú).
- El encabezado es fijo; Cotizar lleva a `#formulario`; el índice está en las tres rayitas.
- No hay sección de capacidad ni sello giratorio.

### V3 — 2026-10-05
Fusión con la maqueta del cliente `WEB COSTA 2 (1).pdf` (ver `qa/REVISION_V3.md`). **Reemplaza la dirección
visual anterior**: crema `#F8F5F1` + verde `#526E4E` + blanco, Merriweather + Montserrat, franjas de foto rectas,
sello circular, J grande y filete ornamental (vectores del PDF). Sin secciones oscuras, bronce ni numeración "01 /".

Orden vigente: Portada ★ · La Casa ★ · ¡El Jota! ★ · frase · Qué Celebramos ★ · 3 Formas de celebrar · Tres menús ·
Experiencias · Alianzas · Cotiza · Pie. (★ = escena anclada; los tres capítulos comparten `ChapterSection.tsx`
y sus datos están en `houseChapter`, `hostChapter`, `celebrateChapter` de `site.ts`.)

### V3.1 — 2026-10-05
- La J de cada columna va en la capa de arriba, casi entera sobre la foto y al 80% de opacidad (pedido del cliente).
- WhatsApp real: +56 9 7987 8599. El formulario se envía directo por WhatsApp (botón principal); el correo
  quedó oculto en todo el sitio hasta tener uno real (`site.email` vacío).

### V3.2 — 2026-10-05
- La sección de boletos se llama **Experiencias Jota**; todos los boletos tienen el mismo alto (en teléfono "Invitada" quedaba más bajo).
- Abono para reservar: **30%** (antes 50%).

### V3.3 — 2026-10-07
Feedback del cliente en nueve puntos (ver `qa/REVISION_V3_3.md`): J del isologo en el logotipo, portada sin globitos y con
entrada fundida, El Jota en recuadro + texto, círculos de menú con hover, boletos estáticos con flechas verdes, alianzas
desplegables en dos grupos, sección de reseñas de Google, abono 50%, íconos de redes en el pie, Cotizar → paso a paso,
correo y modalidad obligatorios. Faltan: enlaces de redes, correo, reseñas reales y confirmar nombres de alianzas.

### V3.4 — 2026-10-07
**Datos de prototipo** (inventados a pedido del usuario, marcados ⚠️ en `site.ts`; reemplazar antes de lanzar):
correo `contacto@casajcosta.cl`, enlaces de redes (apuntan a la portada de cada red), cinco reseñas con etiqueta
"Ejemplo" y nombres de alianzas (salvo los tres del feedback).

## Publicación

- **Sitio en vivo**: https://lukasbarahona.github.io/casa-j-costa/
- **Repositorio (público)**: https://github.com/LukasBarahona/casa-j-costa — contiene solo `web/`.
- Publicado con **GitHub Pages** (2026-10-02). `.github/workflows/deploy.yml` construye y publica solo
  cada vez que se sube un cambio a `main` (tarda cerca de un minuto).
- `vite.config.ts` usa `base: './'` (rutas relativas) para que funcione en la subcarpeta `/casa-j-costa/`.
- Para publicar un cambio: `git add -A`, `git commit -m "..."`, `git push`.
- El sitio lleva `noindex` (no aparece en Google) mientras los datos de contacto sean de relleno.
  Al lanzar: quitar la línea `noindex` de `index.html` y borrar `public/robots.txt`.
- Se evaluó Vercel (útil si algún día hace falta servidor, formularios con backend o sitio con contraseña);
  para un sitio estático público, GitHub Pages basta.

## Pendientes del cliente

0. **Textos de los capítulos** (V3): redactados desde las notas de la maqueta; revisar. Confirmar licencia de las fotos de banco.
1. ~~WhatsApp real~~ ✅ `56979878599` (V3.1). Falta el correo real (`site.email`, hoy vacío: el sitio no muestra correo).
2. Instagram (`site.instagram`).
3. Nombre, relato y retrato del dueño (`host`, `public/imagenes/anfitrion.webp`, cuadrada).
4. Platos y valor por persona de cada menú.
5. **Alianzas**: nombres y logos (`partners`). Hoy se muestran cuadros "Próximamente".
6. **Experiencias**: fecha real y fotos de cada evento (`experiences`). Hoy "Fecha por confirmar" y fotos provisorias.
7. Autorización de fotos con invitados.
8. Recambio de fotos provisorias.
