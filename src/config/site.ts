/* ────────────────────────────────────────────────────────────────────────────
   CONTENIDO DEL SITIO — Casa J Costa

   Todo lo que se edita con frecuencia vive en este archivo:
   datos de contacto, textos, fotos, servicios y menús.

   Para cambiar una foto: reemplaza el archivo en `public/imagenes/`
   manteniendo el nombre, o cambia la ruta aquí.
   ──────────────────────────────────────────────────────────────────────────── */

// Ruta de una foto de `public/imagenes/` (funciona también si el sitio se publica en una subcarpeta).
const img = (file: string) => `${import.meta.env.BASE_URL}imagenes/${file}`;

export const site = {
  name: 'Casa J Costa',
  tagline: 'Centro de eventos · Chicureo',

  // Número de WhatsApp que recibe las cotizaciones (+56 9 7987 8599):
  // formato internacional, solo dígitos (56 + 9 + número).
  whatsapp: '56979878599',
  // Correo del centro de eventos. Vacío = la cotización sale solo por WhatsApp
  // (no hay botón "Cotizar por correo" y el ícono del pie queda sin enlace).
  email: '',
  // Perfiles del centro de eventos (URL completa). Vacío = el ícono se ve, pero sin enlace.
  social: {
    instagram: 'https://www.instagram.com/del_jota/',
    tiktok: '',
    linkedin: '',
  },
  // Calificación en Google, tal como se muestra sobre las reseñas.
  googleRating: '4,8',

  // Opcional: URL de un servicio de formularios (Formspree, Web3Forms, etc.).
  // Vacío = el formulario abre el programa de correo del visitante con todo escrito.
  formEndpoint: '',

  address: 'El Alba 3, Parcela 29, Sitio 9',
  city: 'Chicureo, Colina',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-33.3048625,-70.6710228',

  capacity: { min: 20, max: 150 },
};

// Índice de la página: lo muestra el menú del encabezado (tres rayitas).
export const navigation = [
  { label: 'Inicio', section: 'inicio' },
  { label: 'La casa', section: 'la-casa' },
  { label: 'El Jota', section: 'anfitrion' },
  { label: 'Qué celebramos', section: 'celebramos' },
  { label: 'Formas de celebrar', section: 'servicios' },
  { label: 'Menús', section: 'menus' },
  { label: 'Experiencias Jota', section: 'experiencias' },
  { label: 'Alianzas', section: 'alianzas' },
  { label: 'Reseñas', section: 'resenas' },
  { label: 'Cotiza', section: 'cotizar' },
];

/* ── Portada ─────────────────────────────────────────────────────────────── */

export const hero = {
  title: 'Centro de eventos',
  subtitle: 'Una casa en Chicureo, con mucha historia que contar',
  image: img('01-portada.webp'),
  imageAlt: 'Cocina de madera de Casa J Costa, con mesón central y ventanales al jardín',
  // Sello circular de la marca, montado entre la foto y el texto.
  seal: `${import.meta.env.BASE_URL}logo-sello.svg`,
  // Burbujas bajo el titular, cuando sube la lámina crema.
  bubbles: ['Reliquias', `${site.capacity.min} a ${site.capacity.max} personas`, 'Cocina propia'],
};

/* ── Capítulos: La Casa · El Jota · Qué celebramos ───────────────────────────
   Cada capítulo abre con una franja de foto y su titular, y al avanzar la
   franja se divide en cuatro columnas (las láminas de la maqueta).

   Textos definitivos del cliente (2026-10). En `lead`, lo que va entre
   **dobles asteriscos** se muestra en negrita. */

export interface ChapterColumn {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

export interface Chapter {
  // Ancla del índice.
  id: string;
  title: string;
  lead: string[];
  image: string;
  imageAlt: string;
  // Qué parte de la foto se conserva cuando la franja la recorta (CSS object-position).
  imagePosition?: string;
  // Retrato cuadrado: en pantallas anchas el capítulo abre con la foto en un
  // recuadro a la izquierda y el texto a la derecha (en vez de la franja ancha).
  portrait?: string;
  // Invitación a deslizar las columnas, solo en teléfono.
  swipeHint: string;
  columns: ChapterColumn[];
}

export const houseChapter: Chapter = {
  id: 'la-casa',
  title: 'La Casa',
  lead: [
    '**No es un centro de eventos cualquiera: es una casa.**',
    'Y como en toda buena casa, aquí te recibe el dueño. El Jota abre la puerta con una sonrisa, te muestra cada rincón y, si le das tiempo, te cuenta la historia de cada reliquia que encuentras en el camino. Algunas tienen más años que todos tus invitados juntos.',
    'Madera noble, ventanas antiguas y piezas reunidas durante más de 40 años, con cada detalle elegido con cuidado. Afuera, un jardín amplio y lleno de verde y un fogón para alargar la noche. Y en la cocina, lo nuestro: buena mesa, hecha en casa.',
    `Celebra de ${site.capacity.min} a ${site.capacity.max} personas, con estacionamiento para todos tus invitados. **Tú pones la fecha; nosotros, la casa.**`,
  ],
  image: img('banda-casa.webp'),
  imageAlt: 'El patio de Casa J Costa de noche, con guirnaldas de luces entre los árboles',
  imagePosition: '50% 60%',
  // El texto es largo: abre con la foto en recuadro y el texto al lado, como El Jota.
  portrait: img('casa-portada.webp'),
  swipeHint: 'Desliza para seguir recorriendo la casa',
  columns: [
    {
      title: 'El Salón',
      text: 'Madera noble, ventanas antiguas y reliquias en cada rincón. Un salón con alma de casa para comer, bailar o simplemente sentarse a conversar.',
      image: img('col-casa.webp'),
      imageAlt: 'Salón de la casa con sillón, cojines y ventanas antiguas apoyadas en el muro',
    },
    {
      title: 'El Jardín',
      text: 'Áreas verdes amplias e iluminadas para celebrar de día o de noche. Sol y sombra a la hora de almuerzo, luces cálidas cuando cae la tarde.',
      image: img('col-jardin.webp'),
      imageAlt: 'Mesas y quitasoles en el jardín, bajo los árboles',
    },
    {
      title: 'El Bar',
      text: 'Un mesón de madera con estilo propio, donde empiezan los brindis y terminan las mejores conversaciones.',
      image: img('col-bar.webp'),
      imageAlt: 'Mesón de madera del bar, con taburete y repisas',
    },
    {
      title: 'El Fogón',
      text: 'El fuego siempre reúne a la gente. Un círculo alrededor de las llamas, buena conversación y nadie con ganas de irse.',
      image: img('col-fogon.webp'),
      imageAlt: 'Invitados sentados alrededor del fogón encendido, de noche',
    },
  ],
};

export const hostChapter: Chapter = {
  id: 'anfitrion',
  title: '¡El Jota!',
  lead: [
    'El anfitrión de la casa, y probablemente la persona con la que más vas a querer conversar en toda la noche.',
    'Te recibe como uno más de la familia, te saluda como si te conociera de toda la vida y siempre tiene una anécdota bajo la manga: de dónde salió esa ventana, quién se sentó en ese sillón, cómo llegó esa lámpara a la casa. Está en cada celebración en persona, pendiente de que no falte nada y de que nadie se quede sin su copa.',
    'Lleva más de 40 años reuniendo reliquias, y una sola regla: **en esta casa, nadie es visita.**',
  ],
  image: img('banda-jota.webp'),
  imageAlt: 'El Jota, anfitrión de Casa J Costa, junto al mesón de la cocina',
  imagePosition: '0% 40%',
  portrait: img('anfitrion-jota.webp'),
  swipeHint: 'Desliza para ver más detalles',
  columns: [
    {
      title: 'Ventanas',
      text: 'Ventanas antiguas, rescatadas una a una. Hoy decoran la casa y cada una tiene algo que contar.',
      image: img('col-casa.webp'),
      imageAlt: 'Ventanas antiguas apoyadas en el muro de madera de la sala',
    },
    {
      title: 'La Mesa',
      text: 'Cada mesa se arma pensando en tu celebración, porque una buena mesa también entra por los ojos.',
      image: img('col-mesa.webp'),
      imageAlt: 'Mesa de madera con camino de mesa, velas y flores',
    },
    {
      title: 'Detalles',
      text: 'Pequeños detalles, gran diferencia: reliquias únicas que no vas a encontrar en otro lugar.',
      image: img('col-detalles.webp'),
      imageAlt: 'Postigo antiguo convertido en repisa, con toallas y frascos',
    },
    {
      title: 'Arco de novios',
      text: 'El marco perfecto para la entrada de los novios y para la foto que va a quedar colgada en el living por años.',
      image: img('col-arco.webp'),
      imageAlt: 'Arco de puertas antiguas con telas blancas y flores en el jardín',
    },
  ],
};

// Frase que sigue al capítulo del anfitrión: se enciende palabra por palabra con el scroll.
export const hostStatement =
  'Mantuvimos la madera, las reliquias y la historia del lugar. Sumamos cocina propia y fogón, porque las mejores fiestas siempre terminan en la cocina o alrededor del fuego.';

export const celebrateChapter: Chapter = {
  id: 'celebramos',
  title: 'Qué Celebramos',
  lead: [
    'Un “sí, acepto”, un año más, un cierre de año, una buena copa de vino… o lo que se te ocurra. Aquí todo se celebra mejor.',
  ],
  image: img('banda-celebramos.webp'),
  imageAlt: 'Mesa de la casa servida con quesos, vino y una cortadora antigua',
  imagePosition: '50% 55%',
  swipeHint: 'Desliza para ver qué más celebramos',
  columns: [
    {
      title: 'Matrimonios',
      text: 'El “sí, acepto” en una casa con historia, para que tu matrimonio no se parezca a ningún otro.',
      image: img('col-matrimonios.webp'),
      imageAlt: 'Novios sentados en una escalera de piedra',
    },
    {
      title: 'Cumpleaños y familia',
      text: 'Cumpleaños, aniversarios, bautizos o ese almuerzo familiar que todos venían postergando.',
      image: img('col-cumpleanos.webp'),
      imageAlt: 'Invitados conversando en el patio durante una celebración',
    },
    {
      title: 'Empresas',
      text: 'Cierres de año, almuerzos y jornadas de equipo, lejos de la oficina y entre áreas verdes.',
      image: img('col-empresas.webp'),
      imageAlt: 'Grupo reunido en el jardín escuchando al anfitrión',
    },
    {
      title: 'Otras ocasiones',
      text: 'Despedidas, lanzamientos, reencuentros o cualquier fecha que merezca celebrarse. Si tienes algo en mente, aquí tiene su lugar.',
      image: img('col-catas.webp'),
      imageAlt: 'Brindis con copas de vino al aire libre',
    },
  ],
};

/* ── Formas de celebrar ───────────────────────────────────────────────── */

export interface Service {
  letter: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  // Modalidad con la que parte el cotizador (vacío = sin preselección). Ver `modalities`.
  modality?: string;
}

export const servicesIntro = ['3 Formas', 'de celebrar.'];
export const servicesLead =
  'Arrienda solo la casa, encárgate únicamente de llegar o armemos juntos algo a tu medida. Toca cada opción y descubre todo lo que incluye.';

export const services: Service[] = [
  {
    letter: 'A',
    title: 'Arriendo casa',
    shortDescription: 'La casa lista. Tú organizas la comida.',
    fullDescription:
      'Arriendas la casa y traes tu propia banquetería. Incluye recinto, mesas, sillas, baños, estacionamiento y limpieza final. Y si celebras de lunes a jueves, la tarifa es aún más conveniente.',
    modality: 'Arriendo de la casa',
  },
  {
    letter: 'B',
    title: 'Evento integral',
    shortDescription: 'Recinto, banquetería propia y operación completa.',
    fullDescription:
      'Tú solo llegas: nosotros ponemos la casa, la cocina y el equipo. Elige entre nuestros tres menús: Jota Clásico, Jota Selección o Jota Costa.',
    modality: 'Evento integral',
  },
  {
    letter: 'C',
    title: 'A tu medida',
    shortDescription: 'Eventos sociales, privados y de empresa.',
    fullDescription:
      '¿No sabes cuál te conviene? Escríbenos con tu fecha y tu número de invitados y te decimos qué opción calza mejor con lo que quieres celebrar.',
    modality: 'A tu medida',
  },
];

/* ── Menús del Evento Integral ────────────────────────────────────────── */

export interface Menu {
  // Nombre que viaja en la cotización.
  name: string;
  numeral: 'I' | 'II' | 'III';
  // 1 a 3: qué tan premium es.
  level: 1 | 2 | 3;
  tagline: string;
  description: string;
}

export const menusIntro = ['Tres menús,', 'una misma cocina.'];
export const menusImage = img('banda-menus.webp');
export const menusImageAlt = 'Mesa montada con copas y un centro de flores';
export const menusLead =
  'El Evento Integral se arma sobre uno de nuestros tres menús. Todos salen de la misma cocina; lo que cambia es la variedad que llega a la mesa. Te enviamos el detalle de cada uno y su valor por persona junto con tu cotización.';

export const menus: Menu[] = [
  {
    name: 'Jota Clásico',
    numeral: 'I',
    level: 1,
    tagline: 'Los sabores de siempre',
    description: 'Una selección de preparaciones tradicionales, pensada para celebrar sin complicaciones.',
  },
  {
    name: 'Jota Selección',
    numeral: 'II',
    level: 2,
    tagline: 'Más opciones en la mesa',
    description: 'Una propuesta más amplia, con más preparaciones para que cada invitado encuentre su favorito.',
  },
  {
    name: 'Jota Costa',
    numeral: 'III',
    level: 3,
    tagline: 'La mesa completa',
    description: 'Nuestra propuesta más amplia, con más variedad y preparaciones especiales para las ocasiones que lo merecen.',
  },
];

/* ── Experiencias (boletos) ───────────────────────────────────────────── */

export interface Experience {
  name: string;
  description: string;
  // Fecha del evento, tal como se quiere mostrar (p. ej. "Sábado 14 de noviembre de 2026").
  // Vacío = se muestra "Fecha por confirmar".
  date: string;
  // Fotos del evento: se muestran al tocar el boleto.
  photos: string[];
}

export const experiencesTitle = 'Experiencias Jota';
export const experiencesEyebrow = 'Próximamente';

/* ⚠️ PENDIENTE — fecha real de cada experiencia y fotos de ese evento.
   Las fotos de abajo son provisorias (material general de la casa). */
export const experiences: Experience[] = [
  {
    name: 'Cata',
    description: 'Vinos y sabores locales acompañados por expertos.',
    date: '',
    photos: [img('05-vino-y-quesos.webp'), img('03-mesa-de-la-casa.webp'), img('04-cocina-propia.webp')],
  },
  {
    name: 'Colecciones',
    description: 'Antigüedades y objetos únicos, con sus historias.',
    date: '',
    photos: [img('07-objetos-con-historia.webp'), img('12-cortadora.webp')],
  },
  {
    name: 'Patrimonial',
    description: 'Gastronomía, historia e identidad de la casa.',
    date: '',
    photos: [img('01-portada.webp'), img('07-objetos-con-historia.webp'), img('02-patio-noche.webp')],
  },
  {
    name: 'Gourmet',
    description: 'Menús especiales junto a chefs invitados.',
    date: '',
    photos: [img('04-cocina-propia.webp'), img('11-fuego.webp'), img('03-mesa-de-la-casa.webp')],
  },
  {
    name: 'Secreta',
    description: 'Una cena cuyo concepto se revela en la mesa.',
    date: '',
    photos: [img('02-patio-noche.webp'), img('05-vino-y-quesos.webp')],
  },
  {
    name: 'Invitada',
    description: 'Exhibición y venta de productos locales.',
    date: '',
    photos: [img('03-mesa-de-la-casa.webp'), img('09-mesa-del-jardin.webp')],
  },
];

/* ── Alianzas ────────────────────────────────────────────────────────────
   Dos grupos que se despliegan al tocarlos:
   - clientes: con quién hemos trabajado (colegios, empresas, familias);
   - colaboradores: con quiénes trabajamos (viñas, productores, auspicios). */

export interface Partner {
  name: string;
  // Logo en `public/imagenes/` (vacío = se muestra el nombre en texto).
  logo: string;
}

export interface AllianceGroup {
  title: string;
  lead: string;
  partners: Partner[];
}

export const alliancesIntro = ['Quiénes nos', 'acompañan.'];

/* Cada grupo es una lista de espacios. Un espacio sin `logo` (ni `name`)
   muestra la J de la casa como reserva. Para sumar un cliente o aliado,
   completa uno de los espacios, por ejemplo:
   { name: 'Viña Ejemplo', logo: img('aliado-vina-ejemplo.webp') }
   (el logo va en `public/imagenes/`; el nombre se usa como texto alternativo). */
const reserved = (count: number): Partner[] => Array.from({ length: count }, () => ({ name: '', logo: '' }));

export const allianceGroups: AllianceGroup[] = [
  {
    title: 'Con quién hemos trabajado',
    lead: 'Clientes que han celebrado en la casa.',
    partners: reserved(5),
  },
  {
    title: 'Con quiénes trabajamos',
    lead: 'Viñas, productores y marcas que nos acompañan en cada evento.',
    partners: reserved(5),
  },
];

/* ── Reseñas de Google ───────────────────────────────────────────────────── */

export interface Review {
  author: string;
  // 1 a 5 estrellas.
  rating: number;
  text: string;
  // Línea bajo el nombre.
  detail: string;
}

export const reviewsIntro = ['Lo que dicen', 'quienes celebraron aquí.'];

/* Reseñas de Google, copiadas tal como fueron escritas. Para sumar una nueva,
   agrégala a la lista: con dos se muestran lado a lado; con más, en filas de tres. */
export const reviews: Review[] = [
  {
    author: 'María Cecilia P.',
    rating: 5,
    text: 'Lugar precioso para cualquier celebración. ¡El Jota, un tremendo anfitrión! Fácil de llegar, todo muy lindo y rico. ¡Y a 15 minutos de Vitacura!',
    detail: 'Reseña de Google',
  },
  {
    author: 'Magdalena M.',
    rating: 5,
    text: 'Increíble lugar, todo hecho por su dueño. Exquisito, muy profesional y acogedor.',
    detail: 'Reseña de Google',
  },
];

/* ── Cotización ───────────────────────────────────────────────────────── */

// Opción que pide explicar el tipo de evento.
export const OTHER_EVENT = 'Otra ocasión';

export const eventTypes = [
  { value: 'Matrimonio', description: 'La fiesta, de principio a fin' },
  { value: 'Cumpleaños y familia', description: 'Cumpleaños, aniversarios, bautizos' },
  { value: 'Evento de empresa', description: 'Cierres de año, almuerzos, jornadas' },
  { value: OTHER_EVENT, description: 'Cuéntanos qué quieres celebrar' },
];

// Modalidad que se cotiza con uno de los menús.
export const MENU_MODALITY = 'Evento integral';

export const modalities = [
  { value: 'Arriendo de la casa', description: 'Solo la casa; yo organizo la comida' },
  { value: MENU_MODALITY, description: 'La casa, la cocina y el equipo' },
  { value: 'A tu medida', description: 'Armemos juntos algo especial' },
  { value: 'Aún no lo sé', description: 'Prefiero que me orienten' },
];

// Opciones de menú al cotizar el Evento integral: solo los nombres.
export const MENU_UNDECIDED = 'Aún no lo sé';
export const menuOptions = ['Jota Clásico', 'Jota Selección', 'Jota Costa', MENU_UNDECIDED];

// Condición de reserva: se muestra destacada, es lo primero que hay que saber.
export const deposit = { amount: '50% de abono', detail: 'para reservar tu fecha' };
