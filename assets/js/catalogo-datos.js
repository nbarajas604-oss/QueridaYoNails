// ══ CATÁLOGO DE QUERIDA YO NAILS STUDIO ═════════════════════════════
// Mismo contenido que el catálogo de WhatsApp Business.
// Para agregar un servicio copia un bloque { ... }, pégalo y cambia los datos.
//   categoria: manos | fortalecimiento | acrilico | pies | retiro
//   servicio:  qué es, en palabras sencillas (se muestra bajo el nombre)
//   precio:    número sin "$" (ej. 250). Déjalo en '' para mostrar "Consultar"
//   fotos:     archivos dentro de assets/img/catalogo/
//   portada:   número de la foto que se muestra primero (1 = la primera)
// ═══════════════════════════════════════════════════════════════════

const CATEGORIAS = {
  manos:           'Manos',
  fortalecimiento: 'Fortalecimiento',
  acrilico:        'Acrílico',
  pies:            'Pies',
  retiro:          'Retiro'
};

// Genera la lista de fotos: fotos('elijo-brillar', 3) → elijo-brillar-01.jpg … -03.jpg
const fotos = (base, n) =>
  Array.from({ length: n }, (_, i) => `${base}-${String(i + 1).padStart(2, '0')}.jpg`);

// Fotos de la galería en la página principal (en este orden)
const GALERIA = [
  'elijo-brillar-05.jpg', 'soy-fuerte-04.jpg', 'rompo-mis-limites-03.jpg',
  'elijo-brillar-10.jpg', 'cuido-cada-detalle-01.jpg', 'rompo-mis-limites-04.jpg',
  'elijo-brillar-06.jpg', 'soy-fuerte-03.jpg', 'elijo-brillar-08.jpg'
];

// Reels de Facebook en "Lo más nuevo" (número que aparece en facebook.com/reel/NÚMERO)
// Pon primero el más reciente. Se muestran los primeros 3.
const PUBLICACIONES = [
  '1095477813357165',   // Halloween
  '3045423175818691',   // ¡Un sueño más que se cumple en casa!
  '28963847196639416'   // Pasos firmes y llenos de luz
];

const CATALOGO = [
  {
    categoria: 'manos',
    nombre: 'Querida Yo, elijo brillar',
    servicio: 'Esmaltado semipermanente',
    descripcion: 'Dale color a tus días con un esmaltado semipermanente de alta durabilidad sobre tu uña natural. Ideal para recordarte que estás lista para brillar en tu rutina diaria con unas manos impecables, cuidadas y llenas de vida.',
    precio: 130,
    fotos: fotos('elijo-brillar', 10),
    portada: 3
  },
  {
    categoria: 'fortalecimiento',
    nombre: 'Querida Yo, soy fuerte',
    servicio: 'Nivelación y fortalecimiento',
    descripcion: 'Un tratamiento premium de nivelación que refuerza, estructura y da grosor a tus uñas naturales. Es el escudo perfecto si tus uñas son delgadas o quebradizas, ayudándolas a crecer sanas y firmes mientras tú te enfocas en tus metas. ¡La fuerza también empieza en tus manos!',
    precio: 230,
    fotos: fotos('soy-fuerte', 7),
    portada: 6
  },
  {
    categoria: 'fortalecimiento',
    nombre: 'Querida Yo, celebro mi crecimiento',
    servicio: 'Gel de construcción',
    descripcion: 'Un ritual de alta resistencia diseñado para proteger y acompañar el crecimiento natural de tus uñas. El gel de construcción aporta una capa de soporte cristalina, flexible y ligera que evita que tus uñas se quiebren o doblen en el día a día, permitiéndote alcanzar el largo que siempre has deseado con un aspecto ultra natural y saludable. El recordatorio perfecto de que todo gran crecimiento lleva su propio tiempo y cuidado.',
    precio: 280,
    fotos: fotos('celebro-mi-crecimiento', 1)
  },
  {
    categoria: 'acrilico',
    nombre: 'Querida Yo, rompo mis límites',
    servicio: 'Uñas acrílicas con diseño',
    descripcion: 'Un ritual de transformación y diseño creado para elevar tu seguridad al máximo. Diseñamos estructuras perfectas a la longitud y forma de tu preferencia (coffin, almendra, stiletto o cuadrada) utilizando acrílico de alta resistencia y acabados artísticos en tendencia. Es el lienzo ideal para reflejar tu personalidad, recordarte que eres capaz de lograr todo lo que te propongas y lucir unas manos espectaculares que atraparán todas las miradas.',
    precio: 300,
    fotos: fotos('rompo-mis-limites', 6),
    portada: 2
  },
  {
    categoria: 'manos',
    nombre: 'Querida Yo, cuido cada detalle',
    servicio: 'Manicure ruso (en seco con torno)',
    descripcion: 'Un ritual de alta gama enfocado en la perfección y el cuidado milimétrico de tus manos. Limpiamos profundamente la zona de la cutícula y los laterales en seco utilizando el torno y fresas especializadas, logrando una superficie impecable, suave y libre de impurezas. Esta técnica permite un esmaltado perfecto desde la raíz, garantizando que tus uñas luzcan impecables, estilizadas y como recién hechas por mucho más tiempo. Porque la verdadera belleza se encuentra en los pequeños detalles.',
    precio: 200,
    fotos: fotos('cuido-cada-detalle', 2),
    portada: 2
  },
  {
    categoria: 'pies',
    nombre: 'Querida Yo, elijo la perfección',
    servicio: 'Pedicure ruso (en seco con torno)',
    descripcion: 'Un ritual de alta precisión dedicado a la salud y estética impecable de tus pies. Este servicio se enfoca en una limpieza milimétrica y profunda de canales y cutículas utilizando únicamente el torno (dril) y fresas especializadas, logrando un acabado limpio, libre de asperezas y de máxima durabilidad. Finalizamos con una hidratación focalizada y un esmaltado perfectamente integrado desde la raíz. El cuidado exacto que tus pies necesitan para lucir impecables día con día.',
    precio: 300,
    fotos: fotos('elijo-la-perfeccion', 4),
    portada: 1
  },
  {
    categoria: 'pies',
    nombre: 'Querida Yo, hoy descanso mis pies',
    servicio: 'Pedicure spa relajante',
    descripcion: 'Un respiro profundo para quienes sostienen el mundo día con día. Este ritual inicia con una inmersión en agua tibia con sales aromáticas, seguido de una exfoliación suave para renovar tu piel y un masaje relajante que alivia la tensión. Finalizamos con hidratación profunda y un esmaltado impecable. El momento perfecto para agradecer a tus pies por cada camino recorrido y regalarles el descanso que merecen.',
    precio: 350,
    fotos: fotos('hoy-descanso-mis-pies', 1)
  },
  {
    categoria: 'pies',
    nombre: 'Querida Yo, elijo dar pasos firmes',
    servicio: 'Pedicure ruso + spa',
    descripcion: 'Un ritual de alta precisión y bienestar absoluto para tus pies. Limpiamos y estilizamos minuciosamente tus cutículas con técnica rusa (torno) para un acabado limpio y duradero, mientras consientes tu piel con una exfoliación profunda, mascarilla hidratante y un masaje relajante. El recordatorio perfecto de que mereces caminar con comodidad, ligereza y seguridad en cada paso de tu vida.',
    precio: 400,
    fotos: fotos('elijo-dar-pasos-firmes', 3),
    portada: 1
  },
  {
    categoria: 'retiro',
    nombre: 'Querida Yo, sé paciente conmigo',
    servicio: 'Retiro profesional de producto',
    descripcion: 'Todo proceso de belleza tiene un inicio y un final que deben cuidarse con amor. Retirar tu set de forma profesional con nosotras garantiza que tu uña natural permanezca sana, fuerte y sin daños. Arrancarlas en casa lastima las capas de tu uña; permítenos cuidar tu salud de principio a fin con un retiro suave y consciente.',
    precio: 110,
    fotos: fotos('se-paciente-conmigo', 1)
  }
];
