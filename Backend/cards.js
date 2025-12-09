const IMG_BASE = 'https://images.ygoprodeck.com/images/cards/';

// Modelo de carta:
// {
//   id: 'DRAGON_BLANCO_DE_OJOS_AZULES',
//   name: 'Dragón Blanco de Ojos Azules',
//   atk: 3000,
//   def: 2500,
//   type: 'Dragón',
//   element: 'Luz',
//   image: IMG_BASE + '89631139.jpg'
// }

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
    id: 'RYU-KISHIN',
    name: 'Ryu-Kishin',
    atk: 1000,
    def: 500,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '15303296.jpg'
  },
  {
    id: 'DIABLO_SALVAJE',
    name: 'Diablo Salvaje',
    atk: 1300,
    def: 1400,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '41392891.jpg'
  },
  {
    id: 'DRAGON_ALADO',
    name: 'Dragón Alado, Guardián de la Fortaleza 1',
    atk: 1400,
    def: 1200,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '87796900.jpg'
  },
  {
    id: 'HOMBRE_SETA',
    name: 'Hombre Seta',
    atk: 800,
    def: 600,
    type: 'Planta',
    element: 'Tierra',
    image: IMG_BASE + '14181608.jpg'
  },
  {
    id: 'ESPECTRO_DE_SOMBRA',
    name: 'Espectro de Sombra',
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
    id: 'BRAZO_DE_ESPADA_DE_DRAGON',
    name: 'Brazo de Espada de Dragón',
    atk: 1750,
    def: 2030,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '13069066.jpg'
  },
  {
    id: 'GUARDIAN_DE_BATALLA_DEL_PANTANO',
    name: 'Guardián de Batalla del Pantano',
    atk: 1800,
    def: 1500,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '40453765.jpg'
  },
  {
    id: 'TYHONE',
    name: 'Tyhone',
    atk: 1200,
    def: 1400,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '72842870.jpg'
  },
  {
    id: 'GUIA_DE_BATALLA',
    name: 'Guía de Batalla',
    atk: 1800,
    def: 1300,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '18246479.jpg'
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
    id: 'MAGO_DEL_TIEMPO',
    name: 'Mago del Tiempo',
    atk: 500,
    def: 400,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '71625222.jpg'
  },
  {
    id: 'PIERNA_DERECHA_DEL_PROHIBIDO',
    name: 'Pierna Derecha del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '8124921.jpg'
  },
  {
    id: 'PIERNA_IZQUIERDA_DEL_PROHIBIDO',
    name: 'Pierna Izquierda del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '44519536.jpg'
  },
  {
    id: 'BRAZO_DERECHO_DEL_PROHIBIDO',
    name: 'Brazo Derecho del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '70903634.jpg'
  },
  {
    id: 'BRAZO_IZQUIERDO_DEL_PROHIBIDO',
    name: 'Brazo Izquierdo del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '7902349.jpg'
  },
  {
    id: 'EXODIA_EL_PROHIBIDO',
    name: 'Exodia el Prohibido',
    atk: 1000,
    def: 1000,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '33396948.jpg'
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
    id: 'LA_PERVERSA_BESTIA_GUSANO',
    name: 'La Perversa Bestia-Gusano',
    atk: 1400,
    def: 700,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '6285791.jpg'
  },
  {
    id: 'SIRVIENTE_DE_LA_CALAVERA',
    name: 'Sirviente de la Calavera',
    atk: 300,
    def: 200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '32274490.jpg'
  },
  {
    id: 'DIABLILLO_DE_CUERNO',
    name: 'Diablillo de Cuerno',
    atk: 1300,
    def: 1000,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '69669405.jpg'
  },
  {
    id: 'BUEY_DE_BATALLA',
    name: 'Buey de Batalla',
    atk: 1700,
    def: 1000,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '5053103.jpg'
  },
  {
    id: 'GUERRERO_CASTOR',
    name: 'Guerrero Castor',
    atk: 1200,
    def: 1500,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '32452818.jpg'
  },
  {
    id: 'OGRO_DE_ROCA_GROTTO_1',
    name: 'Ogro de Roca Grotto 1',
    atk: 800,
    def: 1200,
    type: 'Roca',
    element: 'Tierra',
    image: IMG_BASE + '68846917.jpg'
  },
  {
    id: 'GUERRERO_DE_LA_MONTAÑA',
    name: 'Guerrero de la Montaña',
    atk: 600,
    def: 1000,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '4931562.jpg'
  },
  {
    id: 'ZOMBI_GUERRERO',
    name: 'Zombi Guerrero',
    atk: 1200,
    def: 900,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '31339260.jpg'
  },
  {
    id: 'DRAGON_DE_KOUMORI',
    name: 'Dragón de Koumori',
    atk: 1500,
    def: 1200,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '67724379.jpg'
  },
  {
    id: 'REY_DE_DOS_CABEZAS_REX',
    name: 'Rey de Dos Cabezas Rex',
    atk: 1600,
    def: 1200,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '94119974.jpg'
  },
  {
    id: 'JUEZ',
    name: 'Juez',
    atk: 2200,
    def: 1500,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '30113682.jpg'
  },
  {
    id: 'SAGGI_EL_PAYASO_OSCURO',
    name: 'Saggi el Payaso Oscuro',
    atk: 600,
    def: 1500,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '66602787.jpg'
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
    id: 'EL_PELO_DE_SERPIENTE',
    name: 'El Pelo de Serpiente',
    atk: 1500,
    def: 1200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '29491031.jpg'
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
    id: 'GAIA_EL_CABALLERO_FEROZ',
    name: 'Gaia el Caballero Feroz',
    atk: 2300,
    def: 2100,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '6368038.jpg'
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
    id: 'GAITERO_DRAGON',
    name: 'Gaitero Dragón',
    atk: 200,
    def: 1800,
    type: 'Pyro',
    element: 'Fuego',
    image: IMG_BASE + '55763552.jpg'
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
    id: 'MAGO_ILUSIONISTA_SIN_ROSTRO',
    name: 'Mago Ilusionista sin Rostro',
    atk: 1200,
    def: 2200,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '28546905.jpg'
  },
  {
    id: 'GUERRERO_DE_KARBONALA',
    name: 'Guerrero de Karbonala',
    atk: 1500,
    def: 1200,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '91939608.jpg'
  },
  {
    id: 'MUÑECA_PICARA',
    name: 'Muñeca Pícara',
    atk: 1500,
    def: 1200,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '91152256.jpg'
  },
  {
    id: 'WATTNINO',
    name: 'Wattniño',
    atk: 1000,
    def: 500,
    type: 'Trueno',
    element: 'Luz',
    image: IMG_BASE + '27324313.jpg'
  },

  {
    id: 'GRIFFORE',
    name: 'Griffore',
    atk: 1200,
    def: 1500,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '53829412.jpg'
  },
  {
    id: 'TORIKE',
    name: 'Torike',
    atk: 1200,
    def: 600,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '80813021.jpg'
  },
  {
    id: 'SANGAN',
    name: 'Sangan',
    atk: 1000,
    def: 600,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '26202165.jpg'
  },
  {
    id: 'INSECTO_GRANDE',
    name: 'Insecto Grande',
    atk: 1200,
    def: 1500,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '53606874.jpg'
  },
  {
    id: 'INSECTO_BASICO',
    name: 'Insecto Básico',
    atk: 500,
    def: 700,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '89091579.jpg'
  },
  {
    id: 'LAGARTO_ACORAZADO',
    name: 'Lagarto Acorazado',
    atk: 1500,
    def: 1200,
    type: 'Reptil',
    element: 'Tierra',
    image: IMG_BASE + '15480588.jpg'
  },
  {
    id: 'ESCARABAJO_HERCULES',
    name: 'Escarabajo Hércules',
    atk: 1500,
    def: 2000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '52584282.jpg'
  },
  {
    id: 'AGUJA_ASESINA',
    name: 'Aguja Asesina',
    atk: 1200,
    def: 1000,
    type: 'Insecto',
    element: 'Viento',
    image: IMG_BASE + '88979991.jpg'
  },
  {
    id: 'GOKIBORE',
    name: 'Gokibore',
    atk: 1200,
    def: 1400,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '15367030.jpg'
  },
  {
    id: 'PULGA_GIGANTE',
    name: 'Pulga Gigante',
    atk: 1500,
    def: 1200,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '41762634.jpg'
  },
  {
    id: 'LARVA_DE_MOTH',
    name: 'Larva de Moth',
    atk: 500,
    def: 400,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '87756343.jpg'
  },
  {
    id: 'GRAN_MOTH',
    name: 'Gran Moth',
    atk: 2600,
    def: 2500,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '14141448.jpg'
  },

  {
    id: 'LOBO',
    name: 'Lobo',
    atk: 1200,
    def: 800,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '49417509.jpg'
  },
  {
    id: 'DAMA_ARPIA',
    name: 'Dama Arpía',
    atk: 1300,
    def: 1400,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '76812113.jpg'
  },
  {
    id: 'HERMANAS_DE_LA_DAMA_ARPIA',
    name: 'Hermanas de la Dama Arpía',
    atk: 1950,
    def: 2100,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '12206212.jpg'
  },
  {
    id: 'HACHA_DEL_TIGRE',
    name: 'Hacha del Tigre',
    atk: 1300,
    def: 1100,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '49791927.jpg'
  },
  {
    id: 'COLMILLO_PLATEADO',
    name: 'Colmillo Plateado',
    atk: 1200,
    def: 800,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '90357090.jpg'
  },
  {
    id: 'KOJIKOCY',
    name: 'Gran Kojikocy',
    atk: 1500,
    def: 1200,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '1184620.jpg'
  },
  {
    id: 'GRAN_MOTH_DEFINITIVO_PERFECTO',
    name: 'Gran Moth Definitivo Perfecto',
    atk: 3500,
    def: 3000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '48579379.jpg'
  },
  {
    id: 'GAROOZIS',
    name: 'Garoozis',
    atk: 1800,
    def: 1500,
    type: 'Guerrero-Bestia',
    element: 'Fuego',
    image: IMG_BASE + '14977074.jpg'
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
    id: 'ADICTO_KRAKEN',
    name: 'Adicto Kraken',
    atk: 1200,
    def: 1400,
    type: 'Aqua',
    element: 'Agua',
    image: IMG_BASE + '77456781.jpg'
  },
  {
    id: 'MEDUSA',
    name: 'Medusa',
    atk: 1200,
    def: 1500,
    type: 'Aqua',
    element: 'Agua',
    image: IMG_BASE + '14851496.jpg'
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
    name: 'Kairyu-Shin',
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
    id: 'PLANTA_COME_HOMBRES',
    name: 'Planta Come-Hombres',
    atk: 800,
    def: 600,
    type: 'Planta',
    element: 'Tierra',
    image: IMG_BASE + '49127943.jpg'
  },
  {
    id: 'KROKODILUS',
    name: 'Krokodilus',
    atk: 1100,
    def: 1200,
    type: 'Reptil',
    element: 'Agua',
    image: IMG_BASE + '76512652.jpg'
  },
  {
    id: 'LUCHADOR',
    name: 'Luchador',
    atk: 1300,
    def: 1200,
    type: 'Reptil',
    element: 'Agua',
    image: IMG_BASE + '2906250.jpg'
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
    id: 'MEGAZOWLER',
    name: 'Megazowler',
    atk: 1800,
    def: 2000,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '75390004.jpg'
  },
  
  {
    id: 'URABY',
    name: 'Uraby',
    atk: 1500,
    def: 800,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '1784619.jpg'
  }
];

// Mapa rápido id -> carta
const CARD_BY_ID = {};
for (const c of CARD_POOL) {
  CARD_BY_ID[c.id] = c;
}

// Fusiones (usando solo cartas de CARD_POOL)
const FUSION_RULES = [
  // 1) Bebé Dragón + Mago del Tiempo → Dragón Milenario
  {
    inputs: ['BEBE_DRAGON', 'MAGO_DEL_TIEMPO'],
    result: 'DRAGON_MILENARIO'
  },

  // 2) Gaia el Caballero Feroz + Maldición de Dragón → Gaia el Campeón Dragón
  {
    inputs: ['GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'],
    result: 'GAIA_EL_CAMPEON_DRAGON'
  },

  // 3) Guardián Celta + Maldición de Dragón → Gaia el Campeón Dragón (variante)
  {
    inputs: ['GUARDIAN_CELTA', 'MALDICION_DE_DRAGON'],
    result: 'GAIA_EL_CAMPEON_DRAGON'
  },

  // 4–7) Bebé Dragón + cualquier dragón fuerte → Dragón Milenario
  {
    inputs: ['BEBE_DRAGON', 'DRAGON_ALADO'],
    result: 'DRAGON_MILENARIO'
  },
  {
    inputs: ['BEBE_DRAGON', 'DRAGON_DE_KOUMORI'],
    result: 'DRAGON_MILENARIO'
  },
  {
    inputs: ['BEBE_DRAGON', 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'],
    result: 'DRAGON_MILENARIO'
  },
  {
    inputs: ['BEBE_DRAGON', 'DRAGON_BLANCO_DE_OJOS_AZULES'],
    result: 'DRAGON_MILENARIO'
  },

  // 8–10) Evolución de insectos → Gran Moth
  {
    inputs: ['LARVA_DE_MOTH', 'INSECTO_BASICO'],
    result: 'GRAN_MOTH'
  },
  {
    inputs: ['LARVA_DE_MOTH', 'INSECTO_GRANDE'],
    result: 'GRAN_MOTH'
  },
  {
    inputs: ['LARVA_DE_MOTH', 'ESCARABAJO_HERCULES'],
    result: 'GRAN_MOTH'
  },

  // 11–12) Gran Moth + Capullo / insecto tanque → Gran Moth Definitivo Perfecto
  {
    inputs: ['GRAN_MOTH', 'CAPULLO_EVOLUTIVO'],
    result: 'GRAN_MOTH_DEFINITIVO_PERFECTO'
  },
  {
    inputs: ['ESCARABAJO_HERCULES', 'CAPULLO_EVOLUTIVO'],
    result: 'GRAN_MOTH_DEFINITIVO_PERFECTO'
  },

  // 13–15) Demonios + zombis → Cráneo Convocado
  {
    inputs: ['DIABLILLO_DE_CUERNO', 'SIRVIENTE_DE_LA_CALAVERA'],
    result: 'CRANEO_CONVOCADO'
  },
  {
    inputs: ['DIABLO_SALVAJE', 'ESPECTRO_DE_SOMBRA'],
    result: 'CRANEO_CONVOCADO'
  },
  {
    inputs: ['SANGAN', 'RYU-KISHIN'],
    result: 'CRANEO_CONVOCADO'
  },

  // 16–17) Bestias / bestia-guerrero → Garoozis
  {
    inputs: ['BUEY_DE_BATALLA', 'GUERRERO_DE_LA_MONTAÑA'],
    result: 'GAROOZIS'
  },
  {
    inputs: ['GRIFFORE', 'HACHA_DEL_TIGRE'],
    result: 'GAROOZIS'
  },

  // 18–19) Dinosaurios + Brazo de Espada de Dragón → Megazowler
  {
    inputs: ['REY_DE_DOS_CABEZAS_REX', 'BRAZO_DE_ESPADA_DE_DRAGON'],
    result: 'MEGAZOWLER'
  },
  {
    inputs: ['URABY', 'BRAZO_DE_ESPADA_DE_DRAGON'],
    result: 'MEGAZOWLER'
  },

  // 20) Reptil de agua + Aqua → Kairyu-Shin
  {
    inputs: ['KROKODILUS', 'ADICTO_KRAKEN'],
    result: 'KAIRYU_SHIN'
  }
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