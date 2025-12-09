window.IMG_BASE = window.IMG_BASE || 'https://images.ygoprodeck.com/images/cards/';

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

// Cartas disponibles en el juego
window.CARD_POOL = window.CARD_POOL || [
  // Carta #1 - Blue-Eyes White Dragon
  {
    id: 'DRAGON_BLANCO_DE_OJOS_AZULES',
    name: 'Dragón Blanco de Ojos Azules',
    atk: 3000,
    def: 2500,
    type: 'Dragón',
    element: 'Luz',
    image: IMG_BASE + '89631139.jpg'
  },
  // Carta #2 - Mystical Elf
  {
    id: 'ELFO_MISTICO',
    name: 'Elfo Místico',
    atk: 800,
    def: 2000,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '15025844.jpg'
  },
  // Carta #3 - Hitotsu-Me Giant
  {
    id: 'GIGANTE_HITOTSU_ME',
    name: 'Gigante Hitotsu-Me',
    atk: 1200,
    def: 1000,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '76184692.jpg'
  },
  // Carta #4 - Baby Dragon
  {
    id: 'BEBE_DRAGON',
    name: 'Bebé Dragón',
    atk: 1200,
    def: 700,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '88819587.jpg'
  },
  // Carta #5 - Ryu-Kishin
  {
    id: 'RYU-KISHIN',
    name: 'Ryu-Kishin',
    atk: 1000,
    def: 500,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '15303296.jpg'
  },
  // Carta #6 - Feral Imp
  {
    id: 'DIABLO_SALVAJE',
    name: 'Diablo Salvaje',
    atk: 1300,
    def: 1400,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '41392891.jpg'
  },
  // Carta #7 - Winged Dragon, Guardian of the Fortress 1
  {
    id: 'DRAGON_ALADO',
    name: 'Dragón Alado, Guardián de la Fortaleza 1',
    atk: 1400,
    def: 1200,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '87796900.jpg'
  },
  // Carta #8 - Mushroom Man
  {
    id: 'HOMBRE_SETA',
    name: 'Hombre Seta',
    atk: 800,
    def: 600,
    type: 'Planta',
    element: 'Tierra',
    image: IMG_BASE + '14181608.jpg'
  },
  // Carta #9 - Shadow Specter
  {
    id: 'ESPECTRO_DE_SOMBRA',
    name: 'Espectro de Sombra',
    atk: 500,
    def: 200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '40575313.jpg'
  },
  // Carta #10 - Blackland Fire Dragon
  {
    id: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA',
    name: 'Dragón de Fuego de la Tierra Negra',
    atk: 1500,
    def: 800,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '87564352.jpg'
  },
  // Carta #11 - Sword Arm of Dragon
  {
    id: 'BRAZO_DE_ESPADA_DE_DRAGON',
    name: 'Brazo de Espada de Dragón',
    atk: 1750,
    def: 2030,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '13069066.jpg'
  },
  // Carta #12 - Swamp Battleguard
  {
    id: 'GUARDIAN_DE_BATALLA_DEL_PANTANO',
    name: 'Guardián de Batalla del Pantano',
    atk: 1800,
    def: 1500,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '40453765.jpg'
  },
  // Carta #13 - Tyhone
  {
    id: 'TYHONE',
    name: 'Tyhone',
    atk: 1200,
    def: 1400,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '72842870.jpg'
  },
  // Carta #14 - Tyhone #2
  {
    id: 'TYHONE_2',
    name: 'Tyhone #2',
    atk: 1700,
    def: 1900,
    type: 'Dragon',
    element: 'Fuego',
    image: IMG_BASE + '56789759.jpg'
  },
  // Carta #15 - Battle Steer
  {
    id: 'BUEY_DE_BATALLA',
    name: 'Buey de Batalla',
    atk: 1800,
    def: 1300,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '18246479.jpg'
  },
  // Carta #16 - Flame Swordsman
  {
    id: 'ESPADACHIN_DE_LA_LLAMA',
    name: 'Espadachín de la Llama',
    atk: 1800,
    def: 1600,
    type: 'Guerrero',
    element: 'Fuego',
    image: IMG_BASE + '45231177.jpg'
  },
  // Carta #17 - Time Wizard
  {
    id: 'MAGO_DEL_TIEMPO',
    name: 'Mago del Tiempo',
    atk: 500,
    def: 400,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '71625222.jpg'
  },
  // Carta #18 - Right Leg of the Forbidden One
  {
    id: 'PIERNA_DERECHA_DEL_PROHIBIDO',
    name: 'Pierna Derecha del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '8124921.jpg'
  },
  // Carta #19 - Left Leg of the Forbidden One
  {
    id: 'PIERNA_IZQUIERDA_DEL_PROHIBIDO',
    name: 'Pierna Izquierda del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '44519536.jpg'
  },
  // Carta #20 - Right Arm of the Forbidden One
  {
    id: 'BRAZO_DERECHO_DEL_PROHIBIDO',
    name: 'Brazo Derecho del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '70903634.jpg'
  },
  // Carta #21 - Left Arm of the Forbidden One
  {
    id: 'BRAZO_IZQUIERDO_DEL_PROHIBIDO',
    name: 'Brazo Izquierdo del Prohibido',
    atk: 200,
    def: 300,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '7902349.jpg'
  },
  // Carta #22 - Exodia the Forbidden One
  {
    id: 'EXODIA_EL_PROHIBIDO',
    name: 'Exodia el Prohibido',
    atk: 1000,
    def: 1000,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '33396948.jpg'
  },
  // Carta #23 - Summoned Skull
  {
    id: 'CRANEO_CONVOCADO',
    name: 'Cráneo Convocado',
    atk: 2500,
    def: 1200,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '70781052.jpg'
  },
  // Carta #24 - The Wicked Worm Beast
  {
    id: 'LA_PERVERSA_BESTIA_GUSANO',
    name: 'La Perversa Bestia-Gusano',
    atk: 1400,
    def: 700,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '6285791.jpg'
  },
  // Carta #25 - Skull Servant
  {
    id: 'SIRVIENTE_DE_LA_CALAVERA',
    name: 'Sirviente de la Calavera',
    atk: 300,
    def: 200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '32274490.jpg'
  },
  // Carta #26 - Horn Imp
  {
    id: 'DIABLILLO_DE_CUERNO',
    name: 'Diablillo de Cuerno',
    atk: 1300,
    def: 1000,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '69669405.jpg'
  },

  // Carta #27 - Monster Egg
  {
    id: 'HUEVO_MONSTRUO',
    name: 'Huevo Monstruo',
    atk: 600,
    def: 900,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '36121917.jpg'
  },
  // Carta #28 - Beaver Warrior
  {
    id: 'GUERRERO_CASTOR',
    name: 'Guerrero Castor',
    atk: 1200,
    def: 1500,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '32452818.jpg'
  },
  // Carta #29 - Rock Ogre Grotto #1
  {
    id: 'OGRO_DE_ROCA_GROTTO_1',
    name: 'Ogro de Roca Grotto 1',
    atk: 800,
    def: 1200,
    type: 'Roca',
    element: 'Tierra',
    image: IMG_BASE + '68846917.jpg'
  },
  // Carta #30 - Mountain Warrior
  {
    id: 'GUERRERO_DE_LA_MONTAÑA',
    name: 'Guerrero de la Montaña',
    atk: 600,
    def: 1000,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '4931562.jpg'
  },
  // Carta #31 - Zombie Warrior
  {
    id: 'ZOMBI_GUERRERO',
    name: 'Zombi Guerrero',
    atk: 1200,
    def: 900,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '31339260.jpg'
  },
  // Carta #32 - Koumori Dragon
  {
    id: 'DRAGON_DE_KOUMORI',
    name: 'Dragón de Koumori',
    atk: 1500,
    def: 1200,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '67724379.jpg'
  },
  // Carta #33 - Two-Headed King Rex
  {
    id: 'REY_DE_DOS_CABEZAS_REX',
    name: 'Rey de Dos Cabezas Rex',
    atk: 1600,
    def: 1200,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '94119974.jpg'
  },
  // Carta #34 - Judge Man
  {
    id: 'HOMBRE_JUEZ',
    name: 'Hombre Juez',
    atk: 2200,
    def: 1500,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '30113682.jpg'
  },
  // Carta #35 - The Judgment Hand
  {
    id: 'LA_MANO_DEL_JUICIO',
    name: 'La Mano del Juicio',
    atk: 1400,
    def: 700,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '28003512.jpg'
  },
  // Carta #36 - Saggi the Dark Clown
  {
    id: 'SAGGI_EL_PAYASO_OSCURO',
    name: 'Saggi el Payaso Oscuro',
    atk: 600,
    def: 1500,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '66602787.jpg'
  },
  // Carta #37 - Dark Magician
  {
    id: 'MAGO_OSCURO',
    name: 'Mago Oscuro',
    atk: 2500,
    def: 2100,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '46986414.jpg'
  },
  // Carta #38 - the Snake Hair
  {
    id: 'EL_PELO_DE_SERPIENTE',
    name: 'El Pelo de Serpiente',
    atk: 1500,
    def: 1200,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '29491031.jpg'
  },
  // Carta #39 - Gaia the Dragon Champion
  {
    id: 'GAIA_EL_CAMPEON_DRAGON',
    name: 'Gaia el Campeón Dragón',
    atk: 2600,
    def: 2100,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '66889139.jpg'
  },
  // Carta #40 - Gaia the Fierce Knight
  {
    id: 'GAIA_EL_CABALLERO_FEROZ',
    name: 'Gaia el Caballero Feroz',
    atk: 2300,
    def: 2100,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '6368038.jpg'
  },
  // Carta #41 - Curse of Dragon
  {
    id: 'MALDICION_DE_DRAGON',
    name: 'Maldición de Dragón',
    atk: 2000,
    def: 1500,
    type: 'Dragón',
    element: 'Oscuridad',
    image: IMG_BASE + '28279543.jpg'
  },
  // Carta #42 - Dragon Piper
  {
    id: 'GAITERO_DRAGON',
    name: 'Gaitero Dragón',
    atk: 200,
    def: 1800,
    type: 'Pyro',
    element: 'Fuego',
    image: IMG_BASE + '55763552.jpg'
  },
  // Carta #43 - Celtic Guardian
  {
    id: 'GUARDIAN_CELTA',
    name: 'Guardián Celta',
    atk: 1400,
    def: 1200,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '91152256.jpg'
  },
  // Carta #44 - Illusionist Faceless Mage
  {
    id: 'MAGO_ILUSIONISTA_SIN_ROSTRO',
    name: 'Mago Ilusionista sin Rostro',
    atk: 1200,
    def: 2200,
    type: 'Lanzador de Conjuros',
    element: 'Oscuridad',
    image: IMG_BASE + '28546905.jpg'
  },
  // Carta #45 - ROGUE DOLL
  {
    id: 'MUÑECA_PICARA',
    name: 'Muñeca Pícara',
    atk: 1600,
    def: 1000,
    type: 'Lanzador de Conjuros',
    element: 'Luz',
    image: IMG_BASE + '91939608.jpg'
  },
  // Carta #46 - Wattkid
  {
    id: 'WATTNINO',
    name: 'Wattniño',
    atk: 1000,
    def: 500,
    type: 'Trueno',
    element: 'Luz',
    image: IMG_BASE + '27324313.jpg'
  },
  // Carta #47 - Griffore
  {
    id: 'GRIFFORE',
    name: 'Griffore',
    atk: 1200,
    def: 1500,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '53829412.jpg'
  },
  // Carta #48 - Torike
  {
    id: 'TORIKE',
    name: 'Torike',
    atk: 1200,
    def: 600,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '80813021.jpg'
  },
  // Carta #49 - Sangan
  {
    id: 'SANGAN',
    name: 'Sangan',
    atk: 1000,
    def: 600,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '26202165.jpg'
  },
  // Carta #50 - Big Insect
  {
    id: 'INSECTO_GRANDE',
    name: 'Insecto Grande',
    atk: 1200,
    def: 1500,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '53606874.jpg'
  },
  // Carta #51 - Basic Insect
  {
    id: 'INSECTO_BASICO',
    name: 'Insecto Básico',
    atk: 500,
    def: 700,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '89091579.jpg'
  },
  // Carta #52 - Armored Lizard
  {
    id: 'LAGARTO_ACORAZADO',
    name: 'Lagarto Acorazado',
    atk: 1500,
    def: 1200,
    type: 'Reptil',
    element: 'Tierra',
    image: IMG_BASE + '15480588.jpg'
  },
  // Carta #53 - Hercules Beetle
  {
    id: 'ESCARABAJO_HERCULES',
    name: 'Escarabajo Hércules',
    atk: 1500,
    def: 2000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '52584282.jpg'
  },
  // Carta #54 - Killer Needle
  {
    id: 'AGUJA_ASESINA',
    name: 'Aguja Asesina',
    atk: 1200,
    def: 1000,
    type: 'Insecto',
    element: 'Viento',
    image: IMG_BASE + '88979991.jpg'
  },
  // Carta #55 - Gokibore
  {
    id: 'GOKIBORE',
    name: 'Gokibore',
    atk: 1200,
    def: 1400,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '15367030.jpg'
  },
  // Carta #56 - Giant Flea
  {
    id: 'PULGA_GIGANTE',
    name: 'Pulga Gigante',
    atk: 1500,
    def: 1200,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '41762634.jpg'
  },
  // Carta #57 - Larvae Moth
  {
    id: 'LARVA_DE_MOTH',
    name: 'Larva de Moth',
    atk: 500,
    def: 400,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '87756343.jpg'
  },
  // Carta #58 - Great Moth
  {
    id: 'GRAN_MOTH',
    name: 'Gran Moth',
    atk: 2600,
    def: 2500,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '14141448.jpg'
  },
  // Carta #59 - Wolf
  {
    id: 'LOBO',
    name: 'Lobo',
    atk: 1200,
    def: 800,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '49417509.jpg'
  },
  // Carta #60 - Harpie Lady
  {
    id: 'DAMA_ARPIA',
    name: 'Dama Arpía',
    atk: 1300,
    def: 1400,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '76812113.jpg'
  },
  // Carta #61 - Harpie Lady Sisters
  {
    id: 'HERMANAS_DE_LA_DAMA_ARPIA',
    name: 'Hermanas de la Dama Arpía',
    atk: 1950,
    def: 2100,
    type: 'Bestia Alada',
    element: 'Viento',
    image: IMG_BASE + '12206212.jpg'
  },
  // Carta #62 - Tiger Axe
  {
    id: 'HACHA_DEL_TIGRE',
    name: 'Hacha del Tigre',
    atk: 1300,
    def: 1100,
    type: 'Guerrero-Bestia',
    element: 'Tierra',
    image: IMG_BASE + '49791927.jpg'
  },
  // Carta #63 - Silver Fang
  {
    id: 'COLMILLO_PLATEADO',
    name: 'Colmillo Plateado',
    atk: 1200,
    def: 800,
    type: 'Bestia',
    element: 'Tierra',
    image: IMG_BASE + '90357090.jpg'
  },
  // Carta #64 - KojiKocy
  {
    id: 'KOJIKOCY',
    name: 'Gran Kojikocy',
    atk: 1500,
    def: 1200,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '1184620.jpg'
  },
  // Carta #65 - Perfectly Ultimate Great Moth
  {
    id: 'GRAN_MOTH_DEFINITIVO_PERFECTO',
    name: 'Gran Moth Definitivo Perfecto',
    atk: 3500,
    def: 3000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '48579379.jpg'
  },
  // Carta #66 - Job Change Mirror
  {
    id: 'ESPEJO_CAMBIO_DE_TRABAJO',
    name: 'Espejo Cambio de Trabajo',
    atk: 800,
    def: 1300,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '55337339.jpg'
  },
  // Carta #67 - Thousand Dragon
  {
    id: 'DRAGON_MILENARIO',
    name: 'Dragón Milenario',
    atk: 2400,
    def: 2000,
    type: 'Dragón',
    element: 'Viento',
    image: IMG_BASE + '41462083.jpg'
  },
  // Carta #68 - Fiend Kraken
  {
    id: 'ADICTO_KRAKEN',
    name: 'Adicto Kraken',
    atk: 1200,
    def: 1400,
    type: 'Aqua',
    element: 'Agua',
    image: IMG_BASE + '77456781.jpg'
  },
  // Carta #69 - Jellyfish
  {
    id: 'MEDUSA',
    name: 'Medusa',
    atk: 1200,
    def: 1500,
    type: 'Aqua',
    element: 'Agua',
    image: IMG_BASE + '14851496.jpg'
  },
  // Carta #70 - Cocoon of Evolution
  {
    id: 'CAPULLO_EVOLUTIVO',
    name: 'Capullo Evolutivo',
    atk: 0,
    def: 2000,
    type: 'Insecto',
    element: 'Tierra',
    image: IMG_BASE + '40240595.jpg'
  },
  // Carta #71 - Kairyu-Shin
  {
    id: 'KAIRYU_SHIN',
    name: 'Kairyu-Shin',
    atk: 1800,
    def: 1500,
    type: 'Serpiente Marina',
    element: 'Agua',
    image: IMG_BASE + '76634149.jpg'
  },
  // Carta #72 - Giant Soldier of Stone
  {
    id: 'SOLDADO_GIGANTE_DE_PIEDRA',
    name: 'Soldado Gigante de Piedra',
    atk: 1300,
    def: 2000,
    type: 'Roca',
    element: 'Tierra',
    image: IMG_BASE + '13039848.jpg'
  },
  // Carta #73 - Man-Eating Plant
  { 
    id: 'PLANTA_COME_HOMBRES',
    name: 'Planta Come-Hombres',
    atk: 800,
    def: 600,
    type: 'Planta',
    element: 'Tierra',
    image: IMG_BASE + '49127943.jpg'
  },
  // Carta #74 - Krokodilus
  {
    id: 'KROKODILUS',
    name: 'Krokodilus',
    atk: 1100,
    def: 1200,
    type: 'Reptil',
    element: 'Agua',
    image: IMG_BASE + '76512652.jpg'
  },
  // Carta #75 - Grappler
  {
    id: 'LUCHADOR',
    name: 'Luchador',
    atk: 1300,
    def: 1200,
    type: 'Reptil',
    element: 'Agua',
    image: IMG_BASE + '2906250.jpg'
  },
  // Carta #76 - Axe Raider
  {
    id: 'INCURSOR_DEL_HACHA',
    name: 'Incursor del Hacha',
    atk: 1700,
    def: 1150,
    type: 'Guerrero',
    element: 'Tierra',
    image: IMG_BASE + '48305365.jpg'
  },
  // Carta #77 - Embryonic Beast
    {
    id: 'BESTIA_EMBRIONARIA',
    name: 'Bestia Embrionaria',
    atk: 500,
    def: 750,
    type: 'Demonio',
    element: 'Oscuridad',
    image: IMG_BASE + '64154377.jpg'
  },
  // Carta #78 - Uraby
  {
    id: 'URABY',
    name: 'Uraby',
    atk: 1500,
    def: 800,
    type: 'Dinosaurio',
    element: 'Tierra',
    image: IMG_BASE + '1784619.jpg'
  },
  // Carta #79 - Fire Reaper
  {
    id: 'SEGADOR_DE_FUEGO',
    name: 'Segador de Fuego',
    atk: 700,
    def: 500,
    type: 'Zombi',
    element: 'Oscuridad',
    image: IMG_BASE + '53581214.jpg'
  },
  // Carta #80 - Hinotama Soul
  {
    id: 'ALMA_DE_HINOTAMA',
    name: 'Alma de Hinotama',
    atk: 600,
    def: 500,
    type: 'Piro',
    element: 'Fuego',
    image: IMG_BASE + '96851799.jpg'
  }
];


window.CARD_BY_ID = window.CARD_BY_ID || {};
for (const c of window.CARD_POOL) {
  window.CARD_BY_ID[c.id] = c;
}


// Fusiones (usando solo cartas de CARD_POOL)
window.FUSION_RULES = window.FUSION_RULES || [
  // 1)  Mago del Tiempo + Bebé Dragón → Dragón Milenario
  {
    inputs: ['MAGO_DEL_TIEMPO', 'BEBE_DRAGON'],
    result: 'DRAGON_MILENARIO'
  },

  // 2) Gaia el Caballero Feroz + Maldición de Dragón → Gaia el Campeón Dragón
  {
    inputs: ['GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'],
    result: 'GAIA_EL_CAMPEON_DRAGON'
  },

  // 3) Tyhone #2 + Sirviente de la Calavera → Maldición de Dragón
  {
    inputs: ['TYHONE_2', 'SIRVIENTE_DE_LA_CALAVERA'],
    result: 'MALDICION_DE_DRAGON'
  },

  // 4) Buey de Batalla + Huevo Monstruo → Bebé Dragón 
  {
    inputs: ['BUEY_DE_BATALLA', 'HUEVO_MONSTRUO'],
    result: 'BEBE_DRAGON'
  },
  // 5) Bebé Dragón + Gigante Hitotsu-Me → Dragón de Koumori
  {
    inputs: ['BEBE_DRAGON', 'GIGANTE_HITOTSU_ME'],
    result: 'DRAGON_DE_KOUMORI'
  },
  // 6) La Mano del Juicio + Guardián Celta → Hombre Juez
  {
    inputs: ['LA_MANO_DEL_JUICIO', 'GUARDIAN_CELTA'],
    result: 'HOMBRE_JUEZ'
  },
  // 7) Alma de Hinotama + Sirviente de la Calavera → Segador de Fuego
  {
    inputs: ['ALMA_DE_HINOTAMA', 'SIRVIENTE_DE_LA_CALAVERA'],
    result: 'SEGADOR_DE_FUEGO'
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

  // 13–14) Espejo de cambio de trabajo + Demonios → Cráneo Convocado
  {
    inputs: ['ESPEJO_CAMBIO_DE_TRABAJO', 'RYU-KISHIN'],
    result: 'CRANEO_CONVOCADO'
  },
  {
    inputs: ['ESPEJO_CAMBIO_DE_TRABAJO', 'DIABLILLO_DE_CUERNO'],
    result: 'CRANEO_CONVOCADO'
  },
  // 15) Mago del Tiempo + Bestia Embrionaria → Cráneo Convocado
  {
    inputs: ['MAGO_DEL_TIEMPO', 'BESTIA_EMBRIONARIA'],
    result: 'CRANEO_CONVOCADO'
  },

  // 16–17) Bebé Dragón + Piernas del Prohibido → Dragón de Fuego de la Tierra Negra
  {
    inputs: ['BEBE_DRAGON', 'PIERNA_DERECHA_DEL_PROHIBIDO'],
    result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'
  },
  {
    inputs: ['BEBE_DRAGON', 'PIERNA_IZQUIERDA_DEL_PROHIBIDO'],
    result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'
  },

  // 18–19) Dragón Alado + Brazos del Prohibido → Dragón de Fuego de la Tierra Negra
  {
    inputs: ['DRAGON_ALADO', 'BRAZO_DERECHO_DEL_PROHIBIDO'],
    result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'
  },
  {
    inputs: ['DRAGON_ALADO', 'BRAZO_IZQUIERDO_DEL_PROHIBIDO'],
    result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'
  },

  // 20) Reptil de agua + Aqua → Kairyu-Shin
  {
    inputs: ['BRAZO_DE_ESPADA_DE_DRAGON', 'ADICTO_KRAKEN'],
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