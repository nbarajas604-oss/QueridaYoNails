// ══ CATÁLOGO DE QUERIDA YO NAILS STUDIO ═════════════════════════════
// Para agregar un producto copia un bloque { ... }, pégalo y cambia los datos.
//   categoria: manicure | gelish | acrilicas | pedicure | nailart | extras
//   precio:    número sin "$" (ej. 250). Déjalo en '' para mostrar "Consultar"
//   desde:     true si el precio es "Desde $..."
//   foto:      nombre del archivo dentro de assets/img/catalogo/ (o galeria/)
// ═══════════════════════════════════════════════════════════════════

const CATEGORIAS = {
  manicure:  'Manicure',
  gelish:    'Gelish',
  acrilicas: 'Acrílicas',
  pedicure:  'Pedicure',
  nailart:   'Nail art',
  extras:    'Extras'
};

const CATALOGO = [
  {
    categoria: 'manicure',
    nombre: 'Manicure clásico',
    descripcion: 'Limado, cutícula, hidratación y esmaltado tradicional.',
    duracion: '45 min',
    precio: '',
    foto: 'galeria/unas-01.jpg'
  },
  {
    categoria: 'manicure',
    nombre: 'Manicure spa',
    descripcion: 'Exfoliación, mascarilla hidratante, masaje y esmaltado.',
    duracion: '1 h',
    precio: '',
    foto: 'galeria/unas-05.jpg'
  },
  {
    categoria: 'gelish',
    nombre: 'Gelish en manos',
    descripcion: 'Color semipermanente con brillo que dura de 2 a 3 semanas.',
    duracion: '1 h',
    precio: '',
    foto: 'galeria/unas-02.jpg',
    favorito: true
  },
  {
    categoria: 'gelish',
    nombre: 'Gelish francés',
    descripcion: 'El clásico francés en gelish: elegante y duradero.',
    duracion: '1 h 15 min',
    precio: '',
    foto: 'galeria/unas-03.jpg'
  },
  {
    categoria: 'gelish',
    nombre: 'Gelish en pies',
    descripcion: 'Color semipermanente en pies, perfecto para sandalias.',
    duracion: '45 min',
    precio: '',
    foto: 'galeria/unas-04.jpg'
  },
  {
    categoria: 'acrilicas',
    nombre: 'Acrílicas set completo',
    descripcion: 'Aplicación completa con la forma y el largo que prefieras.',
    duracion: '2 h',
    precio: '',
    desde: true,
    foto: 'galeria/unas-06.jpg',
    favorito: true
  },
  {
    categoria: 'acrilicas',
    nombre: 'Acrílicas con diseño',
    descripcion: 'Set completo con decoración, piedras o efectos especiales.',
    duracion: '2 h 30 min',
    precio: '',
    desde: true,
    foto: 'galeria/unas-02.jpg'
  },
  {
    categoria: 'acrilicas',
    nombre: 'Relleno de acrílico',
    descripcion: 'Mantenimiento de tu set para que luzca como nuevo.',
    duracion: '1 h 30 min',
    precio: '',
    foto: 'galeria/unas-03.jpg'
  },
  {
    categoria: 'pedicure',
    nombre: 'Pedicure spa',
    descripcion: 'Exfoliación, hidratación profunda y esmaltado.',
    duracion: '1 h',
    precio: '',
    foto: 'galeria/unas-04.jpg'
  },
  {
    categoria: 'nailart',
    nombre: 'Diseño a mano alzada',
    descripcion: 'Flores, líneas y figuras pintadas a mano. Precio por uña.',
    duracion: '',
    precio: '',
    desde: true,
    foto: 'galeria/unas-05.jpg'
  },
  {
    categoria: 'nailart',
    nombre: 'Efectos especiales',
    descripcion: 'Cromo, aurora, ojo de gato, encapsulado y más.',
    duracion: '',
    precio: '',
    desde: true,
    foto: 'galeria/unas-01.jpg'
  },
  {
    categoria: 'extras',
    nombre: 'Retiro de producto',
    descripcion: 'Retiro seguro de gelish o acrílico sin dañar tu uña natural.',
    duracion: '30 min',
    precio: '',
    foto: 'galeria/unas-06.jpg'
  }
];
