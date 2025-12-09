// Reglas de fusión (la lista que proporcionaste)
const FUSION_RULES = window.FUSION_RULES || [
   // 1) Mago del Tiempo + Bebé Dragón → Dragón Milenario
  { inputs: ['MAGO_DEL_TIEMPO', 'BEBE_DRAGON'], result: 'DRAGON_MILENARIO' },

  // 2) Gaia el Caballero Feroz + Maldición de Dragón → Gaia el Campeón Dragón
  { inputs: ['GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'], result: 'GAIA_EL_CAMPEON_DRAGON' },

  // 3) Tyhone #2 + Sirviente de la Calavera → Maldición de Dragón
  { inputs: ['TYHONE_2', 'SIRVIENTE_DE_LA_CALAVERA'], result: 'MALDICION_DE_DRAGON' },

  // 4) Buey de Batalla + Huevo Monstruo → Bebé Dragón
  { inputs: ['BUEY_DE_BATALLA', 'HUEVO_MONSTRUO'], result: 'BEBE_DRAGON' },

  // 5) Bebé Dragón + Gigante Hitotsu-Me → Dragón de Koumori
  { inputs: ['BEBE_DRAGON', 'GIGANTE_HITOTSU_ME'], result: 'DRAGON_DE_KOUMORI' },

  // 6) La Mano del Juicio + Guardián Celta → Hombre Juez
  { inputs: ['LA_MANO_DEL_JUICIO', 'GUARDIAN_CELTA'], result: 'HOMBRE_JUEZ' },

  // 7) Alma de Hinotama + Sirviente de la Calavera → Segador de Fuego
  { inputs: ['ALMA_DE_HINOTAMA', 'SIRVIENTE_DE_LA_CALAVERA'], result: 'SEGADOR_DE_FUEGO' },

  // 8–10) Evolución de insectos → Gran Moth
  { inputs: ['LARVA_DE_MOTH', 'INSECTO_BASICO'], result: 'GRAN_MOTH', generic: 'Insecto' },
  { inputs: ['LARVA_DE_MOTH', 'INSECTO_GRANDE'], result: 'GRAN_MOTH', generic: 'Insecto' },
  { inputs: ['LARVA_DE_MOTH', 'ESCARABAJO_HERCULES'], result: 'GRAN_MOTH', generic: 'Insecto' },

  // 11–12) Gran Moth + Capullo / insecto tanque → Gran Moth Definitivo Perfecto
  { inputs: ['GRAN_MOTH', 'CAPULLO_EVOLUTIVO'], result: 'GRAN_MOTH_DEFINITIVO_PERFECTO', generic: 'Capullo o Insecto fuerte' },
  { inputs: ['ESCARABAJO_HERCULES', 'CAPULLO_EVOLUTIVO'], result: 'GRAN_MOTH_DEFINITIVO_PERFECTO', generic: 'Capullo o Insecto fuerte' },

  // 13–15) Espejo de cambio + Demonios → Cráneo Convocado
  { inputs: ['ESPEJO_CAMBIO_DE_TRABAJO', 'RYU_KISHIN'], result: 'CRANEO_CONVOCADO', generic: 'Demonio' },
  { inputs: ['ESPEJO_CAMBIO_DE_TRABAJO', 'DIABLILLO_DE_CUERNO'], result: 'CRANEO_CONVOCADO', generic: 'Demonio' },
  { inputs: ['MAGO_DEL_TIEMPO', 'BESTIA_EMBRIONARIA'], result: 'CRANEO_CONVOCADO', generic: 'Demonio o Criatura oscura' },

  // 16–17) Bebé Dragón + Piernas del Prohibido → Dragón de Fuego de la Tierra Negra
  { inputs: ['BEBE_DRAGON', 'PIERNA_DERECHA_DEL_PROHIBIDO'], result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA', generic: 'Parte del Prohibido' },
  { inputs: ['BEBE_DRAGON', 'PIERNA_IZQUIERDA_DEL_PROHIBIDO'], result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA', generic: 'Parte del Prohibido' },

  // 18–19) Dragón Alado + Brazos del Prohibido → Dragón de Fuego de la Tierra Negra
  { inputs: ['DRAGON_ALADO', 'BRAZO_DERECHO_DEL_PROHIBIDO'], result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA', generic: 'Parte del Prohibido' },
  { inputs: ['DRAGON_ALADO', 'BRAZO_IZQUIERDO_DEL_PROHIBIDO'], result: 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA', generic: 'Parte del Prohibido' },

  // 20) Brazo de Espada de Dragón + Adicto Kraken → Kairyu-Shin
  { inputs: ['BRAZO_DE_ESPADA_DE_DRAGON', 'ADICTO_KRAKEN'], result: 'KAIRYU-SHIN' }
];


// Mapea el CARD_POOL (cargado desde cards.js) para búsqueda rápida.
// Asume que CARD_POOL es una variable global definida en cards.js
const CARD_MAP = (window.CARD_POOL || []).reduce((map, card) => {
  map[card.id] = card;
  return map;
}, {});


function getCardDetails(id) {
    // Busca la carta por ID en el mapa, o devuelve un objeto de fallback
    return CARD_MAP[id] || { name: id, image: 'img/card-back.webp' }; 
}

function createFusionCardHTML(rule) {
    const input1 = getCardDetails(rule.inputs[0]);
    const input2 = getCardDetails(rule.inputs[1]);
    const resultCard = getCardDetails(rule.result);
    
    let genericSpan = '';
    // Usa la propiedad 'generic' que añadimos para reglas genéricas
    if (rule.generic) {
        genericSpan = `<span class="generic-rule">(${rule.generic})</span>`;
    }

    return `
      <div class="fusion-card">
        <div class="inputs-container">
          
          <div class="input-card-wrapper">
            <span class="card-name">${input1.name}</span>
            <img src="${input1.image}" class="card-img" alt="${input1.name}">
          </div>
          
          <span class="fusion-operator">+</span>
          
          <div class="input-card-wrapper">
            <span class="card-name">${input2.name}</span>
            <img src="${input2.image}" class="card-img" alt="${input2.name}">
          </div>
          
        </div>
        <div class="arrow">↓</div>
        <div class="result">
          <img src="${resultCard.image}" class="card-img" alt="${resultCard.name}">
          <p>${resultCard.name}</p>
          ${genericSpan}
        </div>
      </div>
    `;
}

function renderFusions() {
    const fusionGrid = document.querySelector('.fusion-grid');
    if (!fusionGrid) return;
    
    // Limpiar el contenido existente (si hay hardcodeado)
    fusionGrid.innerHTML = ''; 

    let htmlContent = '';
    FUSION_RULES.forEach(rule => {
        htmlContent += createFusionCardHTML(rule);
    });

    fusionGrid.innerHTML = htmlContent;
}

// Ejecutar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', renderFusions);