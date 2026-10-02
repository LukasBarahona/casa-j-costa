# Revisión V2.1 — 2026-10-02

## Qué cambió

1. **Escena 01**: se eliminó "Historia" (y el nombre antiguo). Ahora presenta, en tres tiempos:
   Casa J Costa (qué es) → El fogón → Las antigüedades. La frase del anfitrión tampoco menciona el nombre antiguo.
2. **La casa**: fotos más chicas (4 columnas en escritorio, 3 en tablet, 2 en teléfono) y siempre en color.
   Se quitó el efecto sepia y el grano de toda la página; el retrato del anfitrión también va en color.
3. **Experiencias**: la tira de boletos sigue moviéndose con el scroll de la página y además se recorre a mano
   sin moverse del lugar: arrastrando con el mouse, con las flechas, deslizando el dedo o el trackpad,
   o con las flechas del teclado. Ambas cosas se suman.
4. **Encabezado**: Cotizar sin símbolo de WhatsApp; a su lado, botón con una casa que despliega las ocho
   secciones. Se quitaron las píldoras de navegación del centro y el grupo "Ir a" del menú de Cotizar,
   que ahora solo ofrece: cotizar paso a paso, WhatsApp y correo.

## Verificado

- 30 pruebas automáticas (servidor de desarrollo) y build de producción sin errores:
  botón de la casa (lista y salto a Menús), Cotizar sin icono, menú sin "Ir a", boletos con flechas,
  arrastre y scroll de página, galería de 4 columnas en color, y todas las de la V2.
- Sin desborde horizontal en 390×844, 375×667, 768×1024, 1280×800 y 1920×1080.
- Versión estática (teléfono horizontal y movimiento reducido) con los tres tiempos.

## No verificado

- Teléfono físico, Safari/iOS y Firefox (solo Chrome en emulación).
- El botón de la casa vive en el encabezado, que solo está al inicio de la página: más abajo no hay navegación
  salvo el pie.
