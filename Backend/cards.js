// data/cards.js

const IMG_BASE = 'https://images.ygoprodeck.com/images/cards/';

// Modelo de carta:
// {
//   id: 'DRAGON_BLANCO_DE_OJOS_AZULES',
//   name: 'Dragón Blanco de Ojos Azules',
//   atk: 3000,
//   def: 2500,
//   type: 'Dragón',
//   element: 'Luz',
//   image: 'https://images.ygoprodeck.com/images/cards/89631139.jpg'
// }

// Subconjunto de cartas reales de Forbidden Memories.
// Puedes ampliarlo hasta 80 siguiendo la misma estructura.
const CARD_POOL = [
  {
    id: 'DRAGON_BLANCO_DE_OJOS_AZULES',
    name: 'Dragón Blanco de Ojos Azules',
    atk: 3000,
    def: 2500,
    type: 'Dragón',
    element: 'Luz',
    image: IMG_BASE + '89631139.jpg'
  },
  {
    id: 'DUENDE_MISTICO',
    name: 'Duende Místico',
    atk: 800,
    def: 2000,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '15025844.jpg'
  },
  {
    id: 'GIGANTE_HITOTSU_ME',
    name: 'Gigante Hitotsu-Me',
    atk: 1200,
    def: 1000,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '76184692.jpg'
  },
  {
    id: 'BEBE_DRAGON',
    name: 'Bebé Dragón',
    atk: 1200,
    def: 700,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '88819587.jpg'
  },
  {
    id: 'ESPECTRO_DE_SOMBRA',
    name: 'Espectro de sombra',
    atk: 500,
    def: 200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '40575313.jpg'
  },
  {
    id: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA',
    name: 'Dragón de Fuego de la Tierra Negra',
    atk: 1500,
    def: 800,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '87564352.jpg'
  },
  {
    id: 'ESPADACHIN_DE_LA_LLAMA',
    name: 'Espadachín de la Llama',
    atk: 1800,
    def: 1600,
    type: 'Guerrero',
    element: 'Fuego',
    image: IMG_BASE + '45231177.jpg'
  },
  {
    id: 'CRANEO_CONVOCADO',
    name: 'Cráneo Convocado',
    atk: 2500,
    def: 1200,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '70781052.jpg'
  },
  {
    id: 'MAGO_OSCURO',
    name: 'Mago Oscuro',
    atk: 2500,
    def: 2100,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '46986414.jpg'
  },
  {
    id: 'GAIA_EL_CABALLERO_FEROZ',
    name: 'Gaia el Caballero Feroz',
    atk: 2300,
    def: 2100,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '06368038.jpg'
  },
  {
    id: 'MALDICION_DE_DRAGON',
    name: 'Maldición de Dragón',
    atk: 2000,
    def: 1500,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '28279543.jpg'
  },
  {
    id: 'GAIA_EL_CAMPEON_DRAGON',
    name: 'Gaia el Campeón Dragón',
    atk: 2600,
    def: 2100,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '66889139.jpg'
  },
  {
    id: 'GUARDIAN_CELTA',
    name: 'Guardián Celta',
    atk: 1400,
    def: 1200,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '91152256.jpg'
  },
  {
    id: 'DRAGON_MILENARIO',
    name: 'Dragón Milenario',
    atk: 2400,
    def: 2000,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '41462083.jpg'
  },
  {
    id: 'CAPULLO_EVOLUTIVO',
    name: 'Capullo Evolutivo',
    atk: 0,
    def: 2000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '40240595.jpg'
  },
  {
    id: 'KAIRYU_SHIN',
    name: 'Kairyu - Shin',
    atk: 1800,
    def: 1500,
    type: 'Serpiente Marina',
    element: 'Agua',
    image: IMG_BASE + '76634149.jpg'
  },
  {
    id: 'SOLDADO_GIGANTE_DE_PIEDRA',
    name: 'Soldado Gigante de Piedra',
    atk: 1300,
    def: 2000,
    type: 'Roca',
    element: 'Tierra',
    image: IMG_BASE + '13039848.jpg'
  },
  {
    id: 'INCURSOR_DEL_HACHA',
    name: 'Incursor del Hacha',
    atk: 1700,
    def: 1150,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '48305365.jpg'
  },
  {
    id: 'URABY',
    name: 'Uraby',
    atk: 1500,
    def: 800,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '01784619.jpg'
  },
  {
    id: 'LOBO',
    name: 'Lobo',
    atk: 1200,
    def: 800,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '49417509.jpg'
  }
  // ... aquí puedes seguir añadiendo hasta llegar a las 80 cartas que quieras
];

// Mapa rápido id -> carta
const CARD_BY_ID = {};
for (const c of CARD_POOL) {
  CARD_BY_ID[c.id] = c;
}

// Fusiones (ejemplos reales / coherentes con YGO)
const FUSION_RULES = [
  // Bebé Dragón + Mago del Tiempo -> Dragón Milenario
  {
    inputs: ['BEBE_DRAGON', 'MAGO_DEL_TIEMPO'],
    result: 'DRAGON_MILENARIO'
  },
  // Gaia el Caballero Feroz + Maldición de Dragón -> Gaia el Campeón Dragón
  {
    inputs: ['GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'],
    result: 'GAIA_EL_CAMPEON_DRAGON'
  },
  // Guardián Celta + Maldición de Dragón -> Gaia el Campeón Dragón (regla extra, inspirada en FM)
  {
    inputs: ['GUARDIAN_CELTA', 'MALDICION_DE_DRAGON'],
    result: 'GAIA_EL_CAMPEON_DRAGON'
  }
  // ... añade más hasta llegar a mínimo 15
];

// Devuelve el id de la carta fusión si existe regla para (id1, id2)
function getFusionResult(id1, id2) {
  if (id1 === id2) return null;

  for (const rule of FUSION_RULES) {
    const [a, b] = rule.inputs;
    const match =
      (a === id1 && b === id2) ||
      (a === id2 && b === id1);

    if (match) return rule.result;
  }
  return null;
}
