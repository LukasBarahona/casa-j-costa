# Casa J Costa — Landing page

Landing de una sola página, con scrolltelling, para el centro de eventos Casa J Costa (Chicureo).
Partió como réplica de la plantilla "RAUM Studio" del proyecto Lovable `Casa_Jota_Costa` y evolucionó
a un diseño propio: patrimonial, con curvas y la paleta #3 de la marca.

Stack: Vite + React + TypeScript + Tailwind CSS + framer-motion.
Decisiones, reglas y pendientes: [`00_PROYECTO.md`](00_PROYECTO.md). Revisiones: [`qa/`](qa/).

## Cómo verla

```bash
npm install
```

```bash
npm run dev
```

Abre <http://localhost:5173>. Para generar la versión publicable: `npm run build` (queda en `dist/`).

El servidor de desarrollo es más lento que la versión publicada. Para juzgar la fluidez real:

```bash
npm run build
```

```bash
npm run preview
```

## Qué editar y dónde

Casi todo se cambia en **un solo archivo**: [`src/config/site.ts`](src/config/site.ts).

| Qué | Dónde |
|---|---|
| WhatsApp, correo, Instagram, dirección | `site` |
| Secciones del botón de la casa | `navigation` |
| Título, bajada, datos y frase de la portada | `hero` |
| Los tres tiempos de la presentación (qué es, fogón, antigüedades) | `presentation` |
| Fotos y textos de la galería "La casa" | `spaces` |
| Servicios (A, B, C, D) | `services` |
| Los tres menús | `menus` |
| Boletos de experiencias | `experiences` |
| Nombre, foto y relato del anfitrión | `host` |
| Opciones del cotizador | `eventTypes`, `modalities` |
| Colores, formas y animaciones nativas | `src/index.css` |

### Cambiar una foto

Las fotos están en `public/imagenes/`, en formato WebP. Reemplaza el archivo manteniendo el mismo nombre,
o guarda uno nuevo (WebP o JPG) y cambia el nombre en `src/config/site.ts`.

- `01-portada.webp` — portada, horizontal, ~1920 px de ancho.
- `anfitrion.webp` — retrato del anfitrión, vertical (3:4). **Hoy es una foto provisoria.**
- Las demás: ~1000–1400 px de ancho y bajo 300 KB para que la página cargue rápido.

## Pendiente antes de publicar

En `src/config/site.ts`, marcados con ⚠️:

1. `site.whatsapp` — hoy es un número de relleno (`56900000000`). Formato: `569XXXXXXXX`, solo dígitos.
2. `site.email` — hoy es `cotizaciones@example.com`.
3. `site.instagram` — vacío (no se muestra hasta completarlo).
4. `host.name`, `host.bio` y `public/imagenes/anfitrion.webp` — nombre, relato y retrato reales del dueño.
5. `menus` — platos y valor por persona de cada menú.
6. Autorización para usar las fotos donde aparecen invitados.

## Cómo se envían las cotizaciones

- **WhatsApp**: abre `wa.me` con el mensaje ya escrito (tipo de evento, fecha, invitados, modalidad, menú).
- **Correo**: sin configuración adicional, el formulario abre el programa de correo del visitante
  con todo redactado. Para que el envío ocurra desde la misma página (sin abrir el correo),
  pega en `site.formEndpoint` la URL de un servicio de formularios (Formspree, Web3Forms, etc.).
