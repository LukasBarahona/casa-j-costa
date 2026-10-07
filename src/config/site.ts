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
  /* ⚠️ DATO DE PROTOTIPO (inventado) — reemplazar por el correo real antes de lanzar.
     Vacío = el sitio no ofrece correo y todo va por WhatsApp. */
  email: 'contacto@casajcosta.cl',
  /* ⚠️ DATO DE PROTOTIPO — enlaces a los perfiles del centro de eventos (URL completa).
     Hoy apuntan a la portada de cada red, para no enlazar la cuenta de un tercero.
     Reemplazar por los perfiles reales. Vacío = el ícono se muestra apagado y sin enlace. */
  social: {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    linkedin: 'https://www.linkedin.com/',
  },
  /* ⚠️ PENDIENTE — enlace a la ficha de Google (para "Ver todas las reseñas").
     Vacío = se usa el enlace del mapa. */
  googleReviewsUrl: '',

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
};

/* ── Capítulos: La Casa · El Jota · Qué celebramos ───────────────────────────
   Cada capítulo abre con una franja de foto y su titular, y al avanzar la
   franja se divide en cuatro columnas (las láminas de la maqueta).

   ⚠️ Los textos se redactaron a partir de las notas de la maqueta
   ("hablar de la capacidad, el diseño, estacionamiento…"). Revisarlos. */

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
    `Una casa en Chicureo con patio, jardín y antigüedades en cada rincón. Recibe todo tipo de celebraciones, de ${site.capacity.min} a ${site.capacity.max} personas, y cuenta con estacionamiento.`,
  ],
  image: img('banda-casa.webp'),
  imageAlt: 'El patio de Casa J Costa de noche, con guirnaldas de luces entre los árboles',
  imagePosition: '50% 60%',
  swipeHint: 'Desliza para seguir recorriendo la casa',
  columns: [
    {
      title: 'La Casa',
      text: `Madera, ventanas antiguas y rincones para sentarse a conversar. Recibe de ${site.capacity.min} a ${site.capacity.max} personas y tiene estacionamiento.`,
      image: img('col-casa.webp'),
      imageAlt: 'Sala de la casa con sillón, cojines y ventanas antiguas apoyadas en el muro',
    },
    {
      title: 'El Jardín',
      text: 'Un patio amplio e iluminado, entre árboles frutales, para celebrar de día o de noche.',
      image: img('col-jardin.webp'),
      imageAlt: 'Mesas y quitasoles en el jardín, bajo los árboles',
    },
    {
      title: 'El Bar',
      text: 'Un mesón de madera con estilo propio, decorado con el mismo cuidado que el resto de la casa.',
      image: img('col-bar.webp'),
      imageAlt: 'Mesón de madera del bar, con taburete y repisas',
    },
    {
      title: 'El Fogón',
      text: 'El rincón más cercano de la casa: un círculo alrededor del fuego, en un ambiente grato y personal.',
      image: img('col-fogon.webp'),
      imageAlt: 'Invitados sentados alrededor del fogón encendido, de noche',
    },
  ],
};

export const hostChapter: Chapter = {
  id: 'anfitrion',
  title: '¡El Jota!',
  lead: [
    'El anfitrión de la casa. Atiende cada celebración en persona, se preocupa de todos los detalles y siempre tiene una anécdota sobre los objetos que te rodean.',
    'Lleva más de 40 años recolectando antigüedades de distintos lugares.',
  ],
  image: img('banda-jota.webp'),
  imageAlt: 'El Jota, anfitrión de Casa J Costa, junto al mesón de la cocina',
  imagePosition: '0% 40%',
  portrait: img('anfitrion-jota.webp'),
  swipeHint: 'Desliza para ver más detalles',
  columns: [
    {
      title: 'Ventanas',
      text: 'Ventanas antiguas que hoy decoran la casa y cuentan historias.',
      image: img('col-casa.webp'),
      imageAlt: 'Ventanas antiguas apoyadas en el muro de madera de la sala',
    },
    {
      title: 'La Mesa',
      text: 'Detalles en cada mesa, pensados para tu celebración.',
      image: img('col-mesa.webp'),
      imageAlt: 'Mesa de madera con camino de mesa, velas y flores',
    },
    {
      title: 'Detalles',
      text: 'Pequeños detalles, gran diferencia: decoramos cada lugar con piezas únicas.',
      image: img('col-detalles.webp'),
      imageAlt: 'Postigo antiguo convertido en repisa, con toallas y frascos',
    },
    {
      title: 'Arco de novios',
      text: 'Para las fotos y para la entrada de los novios.',
      image: img('col-arco.webp'),
      imageAlt: 'Arco de puertas antiguas con telas blancas y flores en el jardín',
    },
  ],
};

// Frase que sigue al capítulo del anfitrión: se enciende palabra por palabra con el scroll.
export const hostStatement =
  'Mantuvimos la madera, los objetos antiguos y la historia del lugar. Sumamos cocina propia y fogón, para recibir como se recibe en casa.';

export const celebrateChapter: Chapter = {
  id: 'celebramos',
  title: 'Qué Celebramos',
  lead: [
    `Desde celebraciones íntimas, como un cumpleaños, hasta matrimonios de ${site.capacity.max} personas.`,
  ],
  image: img('banda-celebramos.webp'),
  imageAlt: 'Mesa de la casa servida con quesos, vino y una cortadora antigua',
  imagePosition: '50% 55%',
  swipeHint: 'Desliza para ver qué más celebramos',
  columns: [
    {
      title: 'Matrimonios',
      text: `Tu matrimonio en una casa con historia, para hasta ${site.capacity.max} invitados.`,
      image: img('col-matrimonios.webp'),
      imageAlt: 'Novios sentados en una escalera de piedra',
    },
    {
      title: 'Cumpleaños',
      text: `Celebraciones íntimas, en familia o con amigos, desde ${site.capacity.min} personas.`,
      image: img('col-cumpleanos.webp'),
      imageAlt: 'Invitados conversando en el patio durante una celebración',
    },
    {
      title: 'Empresas',
      text: 'Almuerzos, cierres de año y jornadas de equipo, lejos de la oficina.',
      image: img('col-empresas.webp'),
      imageAlt: 'Grupo reunido en el jardín escuchando al anfitrión',
    },
    {
      title: 'Catas de Vino',
      text: 'Vinos y sabores locales para compartir alrededor de la mesa.',
      image: img('col-catas.webp'),
      imageAlt: 'Brindis con copas de vino tinto al aire libre',
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
export const servicesImage = img('banda-formas.webp');
export const servicesImageAlt = 'Novios sonriendo en el jardín';
export const servicesLead =
  'Arrienda solo el recinto, o encárgate únicamente de llegar.';

export const services: Service[] = [
  {
    letter: 'A',
    title: 'Arriendo casa',
    shortDescription: 'La casa lista. Tú organizas la comida.',
    fullDescription:
      'Arriendas la casa y traes tu propia banquetería. Incluye recinto, mesas, sillas, baños, estacionamiento y limpieza final. Precio fijo, sin sorpresas.',
    modality: 'Arriendo del recinto',
  },
  {
    letter: 'B',
    title: 'Evento integral',
    shortDescription: 'Recinto, banquetería propia y operación completa.',
    fullDescription:
      'Nos encargamos de todo: recinto, cocina y servicio. Eliges uno de nuestros tres menús —Jota Clásico, Jota Selección o Jota Costa— y tú solo llegas a celebrar.',
    modality: 'Evento Integral',
  },
  {
    letter: 'C',
    title: 'A tu medida',
    shortDescription: 'Eventos sociales, privados y de empresa.',
    fullDescription:
      '¿No sabes cuál te conviene? Escríbenos con tu fecha y tu número de invitados y te decimos qué opción calza mejor con lo que quieres celebrar.',
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
  'El Evento Integral se arma sobre uno de nuestros tres menús. Mientras más arriba, más cuidada la experiencia.';
/* ⚠️ PENDIENTE — platos y valor por persona de cada menú */
export const menusNote =
  'El detalle de cada menú y su valor por persona se envían con la cotización.';

export const menus: Menu[] = [
  {
    name: 'Jota Clásico',
    numeral: 'I',
    level: 1,
    tagline: 'Lo esencial, bien hecho',
    description: 'Nuestro menú de entrada: funcional y de calidad, para celebrar sin complicarse.',
  },
  {
    name: 'Jota Selección',
    numeral: 'II',
    level: 2,
    tagline: 'Más variedad en la mesa',
    description: 'Mayor variedad y calidad, con más opciones gastronómicas para elegir.',
  },
  {
    name: 'Jota Costa',
    numeral: 'III',
    level: 3,
    tagline: 'El más premium',
    description: 'Nuestra experiencia gastronómica más cuidada, con calidad superior de principio a fin.',
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
export const experiencesEyebrow = 'Cupos limitados';

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
export const alliancesLead = 'Toca cada grupo para ver quiénes han pasado por la casa y con quiénes trabajamos.';

/* ⚠️ DATOS DE PROTOTIPO — los tres primeros nombres vienen del feedback del
   cliente (dados como ejemplo); el resto es inventado para mostrar el diseño.
   Reemplazar por la lista real antes de lanzar, y sumar logos.
   Ejemplo con logo: { name: 'Viña Ejemplo', logo: img('aliado-vina-ejemplo.webp') } */
export const allianceGroups: AllianceGroup[] = [
  {
    title: 'Con quién hemos trabajado',
    lead: 'Clientes que han celebrado en la casa.',
    partners: [
      { name: 'Alumni Colegio Apoquindo', logo: '' },
      { name: 'Estudio Quillay', logo: '' },
      { name: 'Constructora Los Maitenes', logo: '' },
      { name: 'Club de Lectura Chicureo', logo: '' },
      { name: 'Agencia Peumo', logo: '' },
    ],
  },
  {
    title: 'Con quiénes trabajamos',
    lead: 'Viñas, productores y marcas que nos acompañan en cada evento.',
    partners: [
      { name: 'Viña Matetic', logo: '' },
      { name: 'Pisco La Pizka', logo: '' },
      { name: 'Flores del Alba', logo: '' },
      { name: 'Quesos El Canelo', logo: '' },
      { name: 'Panadería La Hornada', logo: '' },
    ],
  },
];

/* ── Reseñas de Google ───────────────────────────────────────────────────── */

export interface Review {
  author: string;
  // 1 a 5 estrellas.
  rating: number;
  text: string;
  // Cuándo se publicó, tal como se quiere mostrar (p. ej. "Marzo de 2026").
  date: string;
  // Reseña de muestra (inventada para el prototipo): la tarjeta lo indica con una etiqueta.
  sample?: boolean;
}

export const reviewsIntro = ['Lo que dicen', 'quienes celebraron aquí.'];

/* ⚠️ DATOS DE PROTOTIPO — estas reseñas son inventadas para mostrar el diseño
   (`sample: true` les pone la etiqueta "Ejemplo"). Antes de lanzar, reemplazarlas
   por reseñas reales copiadas de Google tal como fueron escritas, sin `sample`.
   Con la lista vacía, la sección muestra tarjetas "Próximamente". */
export const reviews: Review[] = [
  {
    author: 'Camila R.',
    rating: 5,
    text: 'Celebramos nuestro matrimonio aquí y fue todo lo que queríamos. La casa es preciosa, llena de detalles, y el Jota estuvo pendiente de cada cosa.',
    date: 'Marzo de 2026',
    sample: true,
  },
  {
    author: 'Felipe A.',
    rating: 5,
    text: 'Hicimos el cierre de año de la empresa. Buena comida, el fogón encendido y un patio increíble de noche. El equipo todavía lo comenta.',
    date: 'Diciembre de 2025',
    sample: true,
  },
  {
    author: 'Josefina M.',
    rating: 5,
    text: 'El cumpleaños de mi mamá quedó hermoso. Las mesas, las flores y las antigüedades le dan un ambiente que no se encuentra en otro lugar.',
    date: 'Enero de 2026',
    sample: true,
  },
  {
    author: 'Tomás V.',
    rating: 4,
    text: 'Muy buena atención y un lugar con mucha historia. Fuimos a una cata de vinos y la pasamos excelente. Volveríamos sin pensarlo.',
    date: 'Noviembre de 2025',
    sample: true,
  },
  {
    author: 'Antonia S.',
    rating: 5,
    text: 'Desde la cotización hasta el último invitado, todo fluyó. Se nota el cariño con que reciben. Cien por ciento recomendado.',
    date: 'Abril de 2026',
    sample: true,
  },
];
// Cuántas tarjetas de muestra mostrar mientras no haya reseñas cargadas.
export const reviewPlaceholders = 4;

/* ── Cotización ───────────────────────────────────────────────────────── */

// Opción que pide explicar el tipo de evento.
export const OTHER_EVENT = 'Otro';

export const eventTypes = [
  { value: 'Matrimonio', description: 'La fiesta, de principio a fin' },
  { value: 'Celebración familiar', description: 'Cumpleaños, aniversarios, bautizos' },
  { value: 'Evento de empresa', description: 'Almuerzos, cierres de año, jornadas' },
  { value: OTHER_EVENT, description: 'Cuéntanos qué tipo de evento es' },
];

// Modalidad que se cotiza con uno de los menús.
export const MENU_MODALITY = 'Evento Integral';

export const modalities = [
  { value: 'Arriendo del recinto', description: 'Solo la casa; yo organizo la comida' },
  { value: MENU_MODALITY, description: 'Recinto + banquetería + operación' },
  { value: 'Aún no lo sé', description: 'Prefiero que me orienten' },
];

// Condición de reserva: se muestra destacada, es lo primero que hay que saber.
export const deposit = { amount: '50% de abono', detail: 'para reservar tu fecha' };
