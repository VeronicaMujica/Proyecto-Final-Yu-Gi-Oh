// js/fusiones.js

// Reglas de fusión (la lista que proporcionaste)
const FUSION_RULES = [
    // 1) Bebé Dragón + Mago del Tiempo → Dragón Milenario
    { inputs: ['BEBE_DRAGON', 'MAGO_DEL_TIEMPO'], result: 'DRAGON_MILENARIO' },

    // 2) Gaia el Caballero Feroz + Maldición de Dragón → Gaia el Campeón Dragón
    { inputs: ['GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'], result: 'GAIA_EL_CAMPEON_DRAGON' },

    // 3) Guardián Celta + Maldición de Dragón → Gaia el Campeón Dragón (variante)
    { inputs: ['GUARDIAN_CELTA', 'MALDICION_DE_DRAGON'], result: 'GAIA_EL_CAMPEON_DRAGON' },

    // 4–7) Bebé Dragón + cualquier dragón fuerte → Dragón Milenario
    { inputs: ['BEBE_DRAGON', 'DRAGON_ALADO'], result: 'DRAGON_MILENARIO', generic: 'Cualquier Dragón fuerte' },
    { inputs: ['BEBE_DRAGON', 'DRAGON_DE_KOUMORI'], result: 'DRAGON_MILENARIO', generic: 'Cualquier Dragón fuerte' },
    { inputs: ['BEBE_DRAGON', 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'], result: 'DRAGON_MILENARIO', generic: 'Cualquier Dragón fuerte' },
    { inputs: ['BEBE_DRAGON', 'DRAGON_BLANCO_DE_OJOS_AZULES'], result: 'DRAGON_MILENARIO', generic: 'Cualquier Dragón fuerte' },

    // 8–10) Evolución de insectos → Gran Moth
    { inputs: ['LARVA_DE_MOTH', 'INSECTO_BASICO'], result: 'GRAN_MOTH', generic: 'Insecto grande / escarabajo' },
    { inputs: ['LARVA_DE_MOTH', 'INSECTO_GRANDE'], result: 'GRAN_MOTH', generic: 'Insecto grande / escarabajo' },
    { inputs: ['LARVA_DE_MOTH', 'ESCARABAJO_HERCULES'], result: 'GRAN_MOTH', generic: 'Insecto grande / escarabajo' },

    // 11–12) Gran Moth + Capullo / insecto tanque → Gran Moth Definitivo Perfecto
    { inputs: ['GRAN_MOTH', 'CAPULLO_EVOLUTIVO'], result: 'GRAN_MOTH_DEFINITIVO_PERFECTO', generic: 'Capullo o Insecto Tanque' },
    { inputs: ['ESCARABAJO_HERCULES', 'CAPULLO_EVOLUTIVO'], result: 'GRAN_MOTH_DEFINITIVO_PERFECTO', generic: 'Capullo o Insecto Tanque' },

    // 13–15) Demonios + zombis → Cráneo Convocado
    { inputs: ['DIABLILLO_DE_CUERNO', 'SIRVIENTE_DE_LA_CALAVERA'], result: 'CRANEO_CONVOCADO', generic: 'Demonio / Zombi' },
    { inputs: ['DIABLO_SALVAJE', 'ESPECTRO_DE_SOMBRA'], result: 'CRANEO_CONVOCADO', generic: 'Demonio / Zombi' },
    { inputs: ['SANGAN', 'RYU-KISHIN'], result: 'CRANEO_CONVOCADO', generic: 'Demonio / Zombi' },

    // 16–17) Bestias / bestia-guerrero → Garoozis
    { inputs: ['BUEY_DE_BATALLA', 'GUERRERO_DE_LA_MONTAÑA'], result: 'GAROOZIS', generic: 'Bestia / Bestia-Guerrero' },
    { inputs: ['GRIFFORE', 'HACHA_DEL_TIGRE'], result: 'GAROOZIS', generic: 'Bestia / Bestia-Guerrero' },

    // 18–19) Dinosaurios + Brazo de Espada de Dragón → Megazowler
    { inputs: ['REY_DE_DOS_CABEZAS_REX', 'BRAZO_DE_ESPADA_DE_DRAGON'], result: 'MEGAZOWLER', generic: 'Dinosaurio' },
    { inputs: ['URABY', 'BRAZO_DE_ESPADA_DE_DRAGON'], result: 'MEGAZOWLER', generic: 'Dinosaurio' },

    // 20) Reptil de agua + Aqua → Kairyu-Shin
    { inputs: ['KROKODILUS', 'ADICTO_KRAKEN'], result: 'KAIRYU_SHIN' }
];


// Mapea el CARD_POOL (cargado desde cards.js) para búsqueda rápida.
// Asume que CARD_POOL es una variable global definida en cards.js
const CARD_MAP = window.CARD_POOL ? window.CARD_POOL.reduce((map, card) => {
    map[card.id] = card;
    return map;
}, {}) : {};


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