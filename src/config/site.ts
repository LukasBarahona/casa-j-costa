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

  /* ⚠️ PENDIENTE — reemplazar por los datos reales antes de publicar */
  // Número de WhatsApp en formato internacional, solo dígitos (56 + 9 + número).
  whatsapp: '56900000000',
  // Correo que recibe las cotizaciones.
  email: 'cotizaciones@example.com',
  // Usuario de Instagram sin @ (vacío = no se muestra).
  instagram: '',

  // Opcional: URL de un servicio de formularios (Formspree, Web3Forms, etc.).
  // Vacío = el formulario abre el programa de correo del visitante con todo escrito.
  formEndpoint: '',

  address: 'El Alba 3, Parcela 29, Sitio 9',
  city: 'Chicureo, Colina',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=-33.3048625,-70.6710228',

  capacity: { min: 40, max: 120 },
};

// Secciones a las que lleva el botón de la casa (encabezado) y el pie.
export const navigation = [
  { label: 'Inicio', section: 'inicio' },
  { label: 'Casa J Costa', section: 'casa-j-costa' },
  { label: 'La casa', section: 'la-casa' },
  { label: 'Formas de celebrar', section: 'servicios' },
  { label: 'Menús', section: 'menus' },
  { label: 'Experiencias', section: 'experiencias' },
  { label: 'Anfitrión', section: 'anfitrion' },
  { label: 'Cotiza', section: 'cotizar' },
];

/* ── Portada ─────────────────────────────────────────────────────────────── */

export const hero = {
  title: ['Casa J Costa', 'Centro de eventos'],
  subtitle: 'Una casa con historia en Chicureo, para celebrar de 40 a 120 personas.',
  image: img('01-portada.webp'),
  imageAlt: 'Cocina de madera de Casa J Costa, con mesón central y ventanales al jardín',
  facts: ['Chicureo, Colina', '40 a 120 personas', 'Cocina propia'],
  // Frase que aparece cuando la foto ocupa toda la pantalla.
  caption: ['Lo antiguo y lo contemporáneo', 'conviven en la misma casa.'],
};

/* ── 01 Casa J Costa (escena anclada en tres tiempos) ────────────────────── */

export interface PresentationBeat {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  // 'logo': se muestra completo y centrado. 'photo': llena el marco.
  kind: 'logo' | 'photo';
}

export const presentation: PresentationBeat[] = [
  {
    title: 'Casa J Costa.',
    text: 'Un centro de eventos en Chicureo que reúne recinto, gastronomía y experiencias, para celebrar de 40 a 120 personas.',
    image: `${import.meta.env.BASE_URL}logo-casa-j-costa.webp`,
    imageAlt: 'Logotipo de Casa J Costa, centro de eventos',
    kind: 'logo',
  },
  {
    title: 'El fogón.',
    text: 'Banquetería propia y cocina a las brasas: acá la comida se hace en casa.',
    image: img('11-fuego.webp'),
    imageAlt: 'Carne a las brasas en la parrilla de la casa',
    kind: 'photo',
  },
  {
    title: 'Las antigüedades.',
    text: 'Balanzas, pesas y objetos que ya estaban en la casa. Lo antiguo y lo contemporáneo conviven.',
    image: img('07-objetos-con-historia.webp'),
    imageAlt: 'Balanza antigua y rosas blancas sobre la mesa de madera',
    kind: 'photo',
  },
];

/* ── 02 La casa (galería tipo catálogo) ──────────────────────────────────── */

export type SpaceCategory = 'Espacios' | 'Gastronomía' | 'Objetos';
// Forma del marco: horizontal, vertical o arco.
export type SpaceShape = 'wide' | 'tall' | 'arch';

export interface Space {
  slug: string;
  image: string;
  title: string;
  category: SpaceCategory;
  moment: 'De día' | 'De noche';
  description: string;
  shape: SpaceShape;
}

export const spacesIntro = ['Madera, objetos antiguos', 'y un patio bajo los árboles.'];

export const spaces: Space[] = [
  {
    slug: 'patio-de-noche',
    image: img('02-patio-noche.webp'),
    title: 'El patio de noche',
    category: 'Espacios',
    moment: 'De noche',
    description: 'Guirnaldas de luces entre los árboles.',
    shape: 'wide',
  },
  {
    slug: 'objetos-con-historia',
    image: img('07-objetos-con-historia.webp'),
    title: 'Objetos con historia',
    category: 'Objetos',
    moment: 'De día',
    description: 'Balanzas y pesas que ya estaban en la casa.',
    shape: 'arch',
  },
  {
    slug: 'mesa-del-jardin',
    image: img('09-mesa-del-jardin.webp'),
    title: 'La mesa del jardín',
    category: 'Espacios',
    moment: 'De día',
    description: 'Sombra, pasto y mesa larga.',
    shape: 'tall',
  },
  {
    slug: 'mesa-de-la-casa',
    image: img('03-mesa-de-la-casa.webp'),
    title: 'La mesa de la casa',
    category: 'Gastronomía',
    moment: 'De día',
    description: 'Cocina propia, servida en greda y madera.',
    shape: 'wide',
  },
  {
    slug: 'cortadora-de-fiambre',
    image: img('12-cortadora.webp'),
    title: 'La cortadora a manivela',
    category: 'Objetos',
    moment: 'De día',
    description: 'Ya estaba en la casa. No se compró para decorar.',
    shape: 'tall',
  },
  {
    slug: 'vino-y-quesos',
    image: img('05-vino-y-quesos.webp'),
    title: 'Vino y quesos',
    category: 'Gastronomía',
    moment: 'De noche',
    description: 'La tabla de la casa al caer la tarde.',
    shape: 'arch',
  },
  {
    slug: 'mesas-en-el-jardin',
    image: img('08-mesas-en-el-jardin.webp'),
    title: 'Mesas en el jardín',
    category: 'Espacios',
    moment: 'De día',
    description: 'El recinto montado y listo para recibir.',
    shape: 'tall',
  },
  {
    slug: 'fuego',
    image: img('11-fuego.webp'),
    title: 'El fuego',
    category: 'Gastronomía',
    moment: 'De día',
    description: 'Carne a las brasas en la parrilla de la casa.',
    shape: 'wide',
  },
];

/* ── Capacidad (la balanza) ──────────────────────────────────────────────── */

export const capacityCopy = {
  title: ['La medida', 'la pones tú.'],
  text: 'Desde una celebración de 40 hasta la casa completa con 120 personas. Eventos sociales, privados y de empresa.',
};

/* ── 03 Formas de celebrar ───────────────────────────────────────────────── */

export interface Service {
  letter: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

export const servicesIntro = ['Tres formas', 'de celebrar.'];
export const servicesLead =
  'Arrienda solo el recinto, o encárgate únicamente de llegar.';

export const services: Service[] = [
  {
    letter: 'A',
    title: 'Arriendo del recinto',
    shortDescription: 'La casa lista. Tú organizas la comida.',
    fullDescription:
      'Arriendas la casa y traes tu propia banquetería. Incluye recinto, mesas, sillas, baños, estacionamiento y limpieza final. Precio fijo, sin sorpresas.',
    image: img('08-mesas-en-el-jardin.webp'),
  },
  {
    letter: 'B',
    title: 'Evento Integral',
    shortDescription: 'Recinto, banquetería propia y operación completa.',
    fullDescription:
      'Nos encargamos de todo: recinto, cocina y servicio. Eliges uno de nuestros tres menús —Jota Clásico, Jota Selección o Jota Costa— y tú solo llegas a celebrar.',
    image: img('05-vino-y-quesos.webp'),
  },
  {
    letter: 'C',
    title: 'Experiencias Casa J Costa',
    shortDescription: 'Catas, cenas y encuentros con cupos limitados.',
    fullDescription:
      'Producimos nuestros propios encuentros: catas, cenas con chefs invitados, noches patrimoniales y cenas secretas cuyo concepto se revela en la mesa.',
    image: img('04-cocina-propia.webp'),
  },
  {
    letter: 'D',
    title: 'A tu medida',
    shortDescription: 'Eventos sociales, privados y de empresa.',
    fullDescription:
      '¿No sabes cuál te conviene? Escríbenos con tu fecha y tu número de invitados y te decimos qué opción calza mejor con lo que quieres celebrar.',
    image: img('06-mesa-con-invitados.webp'),
  },
];

/* ── 04 Menús del Evento Integral ────────────────────────────────────────── */

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

/* ── Experiencias (boletos) ──────────────────────────────────────────────── */

export const experiencesTitle = 'Experiencias con cupos limitados';

export const experiences = [
  { name: 'Cata', description: 'Vinos y sabores locales acompañados por expertos.' },
  { name: 'Colecciones', description: 'Antigüedades y objetos únicos, con sus historias.' },
  { name: 'Patrimonial', description: 'Gastronomía, historia e identidad de la casa.' },
  { name: 'Gourmet', description: 'Menús especiales junto a chefs invitados.' },
  { name: 'Secreta', description: 'Una cena cuyo concepto se revela en la mesa.' },
  { name: 'Invitada', description: 'Exhibición y venta de productos locales.' },
];

/* ── 05 El anfitrión ─────────────────────────────────────────────────────── */

export const host = {
  /* ⚠️ PENDIENTE — nombre, foto y relato reales del dueño.
     Foto: reemplazar `public/imagenes/anfitrion.webp` (vertical, proporción 3:4). */
  name: '',
  role: 'Anfitrión de Casa J Costa',
  image: img('anfitrion.webp'),
  imageAlt: 'El anfitrión de Casa J Costa',
  // Frase grande de la sección: se va encendiendo palabra por palabra con el scroll.
  statement:
    'Mantuvimos la madera, los objetos antiguos y la historia del lugar. Sumamos cocina propia y fogón, para recibir como se recibe en casa.',
  // Párrafos cortos junto a la foto: quién es, de dónde viene la casa, qué cocina.
  bio: [
    'Aquí va la historia de quien abre la puerta: cómo llegó a esta casa, por qué guarda cada objeto y qué le gusta poner en la mesa.',
    'Detrás de cada evento hay una persona que lo recibe, lo cocina y lo cuida de principio a fin.',
  ],
};

/* ── 06 Cotización ───────────────────────────────────────────────────────── */

export const eventTypes = [
  { value: 'Matrimonio', description: 'La fiesta, de principio a fin' },
  { value: 'Celebración familiar', description: 'Cumpleaños, aniversarios, bautizos' },
  { value: 'Evento de empresa', description: 'Almuerzos, cierres de año, jornadas' },
  { value: 'Otro', description: 'Cuéntanos qué tienes en mente' },
];

// Modalidad que se cotiza con uno de los menús.
export const MENU_MODALITY = 'Evento Integral';

export const modalities = [
  { value: 'Arriendo del recinto', description: 'Solo la casa; yo organizo la comida' },
  { value: MENU_MODALITY, description: 'Recinto + banquetería + operación' },
  { value: 'Aún no lo sé', description: 'Prefiero que me orienten' },
];

export const quoteTerms = 'La fecha se reserva con un 50% de abono.';
