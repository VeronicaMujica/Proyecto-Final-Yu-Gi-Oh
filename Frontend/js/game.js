/**
 * ---------------------------------------------------------
 *  SISTEMA PRINCIPAL DEL JUEGO — LÓGICA, RENDER Y MECÁNICAS
 * ---------------------------------------------------------
 *
 * Este archivo controla:
 *  - Estados globales del duelo (turnos, fases, puntos de vida)
 *  - Administración de mazos, manos y campos
 *  - Invocaciones con modo (ATK / DEF)
 *  - Sistema de fusión
 *  - Resolución de batallas respetando ATK/DEF
 *  - Renderizado del estado del juego en el DOM
 *  - Utilidades de animación, logs y serialización del estado
 *
 * El flujo principal del turno es:
 *  1. El jugador roba carta y puede invocar o fusionar.
 *  2. El jugador decide atacar 
 *  3. El jugador termina el turno.
 *  4. La IA realiza sus acciones 
 *
 * El diseño permite integrar un motor Minimax ,
 * ya que el estado del juego es completamente serializable.
 */

// -----------------------------------------------------------------------------
// Constantes del sistema
// -----------------------------------------------------------------------------

const MAX_MONSTER_SLOTS = 5;  // número máximo de espacios de monstruos en el campo
const DEFAULT_DECK_SIZE = 20; // tamaño por defecto del mazo (máximo 40)
const INITIAL_HAND_SIZE = 5;  // cartas iniciales en la mano

// Tamaño actual del mazo 
let currentDeckSize = DEFAULT_DECK_SIZE;

// Pausa la ejecución un número de milisegundos. Usada para animaciones y turnos.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ---------- Estado global del juego (GameState Pattern) --------------

// Estado inicial del juego
const gameState = {
  turn: 'player',           // 'player' | 'ai' | 'ended'
  phase: 'main',
  player: {
    life: 8000,
    deck: [],
    hand: [],
    field: new Array(MAX_MONSTER_SLOTS).fill(null), // ahora cada slot es { id, mode } o null
  },
  ai: {
    life: 8000,
    deck: [],
    hand: [],
    field: new Array(MAX_MONSTER_SLOTS).fill(null),
  },
  fusionMode: false,        // ¿Player está intentando fusionar?
  fusionFirstIndex: null,   // índice de la primera carta seleccionada para fusión (mano del jugador)
};

// ---------- Utilidades generales ----------
// Agrega un mensaje al registro visual del juego.
function logMessage(msg) {
  const log = document.getElementById('log');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = msg;
  if (log) {
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  } else {
    console.log('[LOG]', msg);
  }
}

// Baraja un array in-place (Fisher–Yates) sin crear copias adicionales
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Construye un mazo aleatorio a partir del pool de cartas
function buildDeckFromPool(size) {
  const poolCopy = [...CARD_POOL];
  shuffle(poolCopy);
  return poolCopy.slice(0, size).map((card) => card.id);
}

// Roba la primera carta del deck y la pasa a la mano. Devuelve el id de la carta robada.
function drawCard(playerKey) {
  const player = gameState[playerKey];
  if (player.deck.length === 0) return null;
  const cardId = player.deck.shift();
  player.hand.push(cardId);
  return cardId;
}

// Devuelve el otro jugador: 'player' -> 'ai', 'ai' -> 'player'
function otherPlayer(key) {
  return key === 'player' ? 'ai' : 'player';
}

// Muestra efectos visuales de daño.
function showDamageFX(amount) {
  const fx = document.getElementById('damage-fx');
  if (!fx) return;
  fx.textContent = `-${amount}`;
  fx.classList.add('show');
  setTimeout(() => fx.classList.remove('show'), 600);
}

// Muestra el modal de fin de partida con el ganador y puntos de vida restantes.
function showEndModal(winner) {
  const modal = document.getElementById('end-modal');
  const resultEl = document.getElementById('end-result');
  const lpEl = document.getElementById('end-lp');
  if (!modal || !resultEl || !lpEl) return;

  resultEl.textContent =
    winner === 'Empate' ? 'Resultado: Empate' : `Ganador: ${winner}`;

  lpEl.textContent = `LP Jugador: ${gameState.player.life}   |   LP IA: ${gameState.ai.life}`;
  modal.classList.add('show');
}

// Devuelve una copia serializable del estado completo del juego.
function buildSerializableState() {
  return {
    turn: gameState.turn,
    phase: gameState.phase,
    player: {
      life: gameState.player.life,
      deck: gameState.player.deck.map((id) => CARD_BY_ID[id]),
      hand: gameState.player.hand.map((id) => CARD_BY_ID[id]),
      field: gameState.player.field.map((slot) => (slot ? { ...CARD_BY_ID[slot.id], mode: slot.mode } : null)),
    },
    ai: {
      life: gameState.ai.life,
      deck: gameState.ai.deck.map((id) => CARD_BY_ID[id]),
      hand: gameState.ai.hand.map((id) => CARD_BY_ID[id]),
      field: gameState.ai.field.map((slot) => (slot ? { ...CARD_BY_ID[slot.id], mode: slot.mode } : null)),
    },
  };
}

// ---------- Render ----------

// Crea visualmente una carta en HTML.
function createCardElement(
  maybeCard,
  { clickable = false, onClick = null, hidden = false, size = 'normal' } = {}
) {
  // determinar card id y modo si se recibe un objeto
  let cardId;
  let slotMode = null;
  if (!maybeCard && hidden) {
    cardId = null;
  } else if (typeof maybeCard === 'string') {
    cardId = maybeCard;
  } else if (typeof maybeCard === 'object' && maybeCard !== null) {
    // si es un slot: { id: 'C1', mode: 'atk' }
    cardId = maybeCard.id;
    slotMode = maybeCard.mode;
  } else {
    cardId = maybeCard;
  }

  const card = cardId ? CARD_BY_ID[cardId] : null;

  const el = document.createElement('div');
  el.className = 'card enter';
  if (size === 'mini') el.classList.add('card-mini');

  // Carta slot vacío
  if (hidden || !card) {
    el.style.background = 'linear-gradient(135deg, #0ea5e9, #6366f1)';
    el.style.border = '1px solid rgba(148, 163, 184, 0.8)';
    if (clickable && typeof onClick === 'function') {
      el.addEventListener('click', onClick);
    }
    return el;
  }

  const imgDiv = document.createElement('div');
  imgDiv.className = 'card-image';
  imgDiv.style.backgroundImage = `url(${card.image})`;

  const infoDiv = document.createElement('div');
  infoDiv.className = 'card-info';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'card-name';
  nameDiv.textContent = card.name;

  const statsDiv = document.createElement('div');
  statsDiv.className = 'card-stats';

  const atkSpan = document.createElement('span');
  atkSpan.textContent = `ATK ${card.atk}`;

  const defSpan = document.createElement('span');
  defSpan.textContent = `DEF ${card.def}`;

  const typeDiv = document.createElement('div');
  typeDiv.className = 'card-type';
  typeDiv.textContent = `${card.type} / ${card.element}`;

  statsDiv.appendChild(atkSpan);
  statsDiv.appendChild(defSpan);
  infoDiv.appendChild(nameDiv);
  infoDiv.appendChild(statsDiv);
  infoDiv.appendChild(typeDiv);

  el.appendChild(imgDiv);
  el.appendChild(infoDiv);

  // si la carta/slot tiene modo DEF la estilizamos
  if (slotMode === 'def') {
    el.classList.add('def-mode');
    // opcional: indicamos texto pequeño de "DEF"
    const modeBadge = document.createElement('div');
    modeBadge.className = 'mode-badge';
    modeBadge.textContent = 'DEF';
    el.appendChild(modeBadge);
  } else if (slotMode === 'atk') {
    const modeBadge = document.createElement('div');
    modeBadge.className = 'mode-badge atk';
    modeBadge.textContent = 'ATK';
    el.appendChild(modeBadge);
  }

  if (clickable && typeof onClick === 'function') {
    el.addEventListener('click', onClick);
  }

  return el;
}

// Redibuja todo el estado visual del juego
function render() {
  document.getElementById('player-life').textContent = `LP: ${gameState.player.life}`;
  document.getElementById('ai-life').textContent = `LP: ${gameState.ai.life}`;
  document.getElementById('player-deck-count').textContent = gameState.player.deck.length;
  document.getElementById('ai-deck-count').textContent = gameState.ai.deck.length;

  document.getElementById('turn-info').textContent =
    gameState.turn === 'ended'
      ? 'Duelo terminado'
      : gameState.turn === 'player'
      ? 'Turno del jugador'
      : 'Turno de la IA';

  const playerHandDiv = document.getElementById('player-hand');
  const aiHandDiv = document.getElementById('ai-hand');
  const playerFieldDiv = document.getElementById('player-monster-zone');
  const aiFieldDiv = document.getElementById('ai-monster-zone');
  const playerDeckPreviewDiv = document.getElementById('player-deck-preview');
  const aiDeckPreviewDiv = document.getElementById('ai-deck-preview');

  if (playerHandDiv) playerHandDiv.innerHTML = '';
  if (aiHandDiv) aiHandDiv.innerHTML = '';
  if (playerFieldDiv) playerFieldDiv.innerHTML = '';
  if (aiFieldDiv) aiFieldDiv.innerHTML = '';
  if (playerDeckPreviewDiv) playerDeckPreviewDiv.innerHTML = '';
  if (aiDeckPreviewDiv) aiDeckPreviewDiv.innerHTML = '';

  // Mano jugador
  gameState.player.hand.forEach((cardId, index) => {
    const cardEl = createCardElement(cardId, {
      clickable: gameState.turn === 'player' && gameState.turn !== 'ended',
      onClick: () => handlePlayerHandClick(index),
    });
    if (gameState.fusionMode && gameState.fusionFirstIndex === index) {
      cardEl.classList.add('selected');
    }
    if (playerHandDiv) playerHandDiv.appendChild(cardEl);
  });

  // Mano IA 
  gameState.ai.hand.forEach((cardId) => {
    const cardEl = createCardElement(cardId);
    if (aiHandDiv) aiHandDiv.appendChild(cardEl);
  });

  // Campo jugador
  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const slotObj = gameState.player.field[i] ?? null;
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    if (slotObj) {
      slot.classList.add('has-card');
      const cardEl = createCardElement(slotObj);
      slot.appendChild(cardEl);
    }
    if (playerFieldDiv) playerFieldDiv.appendChild(slot);
  }

  // Campo IA
  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const slotObj = gameState.ai.field[i] ?? null;
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    if (slotObj) {
      slot.classList.add('has-card');
      const cardEl = createCardElement(slotObj);
      slot.appendChild(cardEl);
    }
    if (aiFieldDiv) aiFieldDiv.appendChild(slot);
  }

  // Preview de mazo jugador
  if (playerDeckPreviewDiv) {
    gameState.player.deck.forEach((cardId) => {
      const cardEl = createCardElement(cardId, {
        size: 'mini',
        clickable: false,
        hidden: false,
      });
      playerDeckPreviewDiv.appendChild(cardEl);
    });
  }

  // Preview de mazo IA
  if (aiDeckPreviewDiv) {
    gameState.ai.deck.forEach((cardId) => {
      const cardEl = createCardElement(cardId, {
        size: 'mini',
        clickable: false,
        hidden: false,
      });
      aiDeckPreviewDiv.appendChild(cardEl);
    });
  }
}

// ---------- Lógica de juego (acciones del jugador y resolución de batalla) ----------
// Maneja el click en una carta de la mano del jugador
function handlePlayerHandClick(index) {
  if (gameState.turn !== 'player' || gameState.turn === 'ended') return;

  if (gameState.fusionMode) {
    handleFusionClick(index);
  } else {
    handlePlayerPlayCard(index);
  }
}

// Invoca una carta al primer slot vacío pidiendo modo (ATK/DEF)
async function handlePlayerPlayCard(handIndex) {
  const firstEmptyIndex = gameState.player.field.findIndex((c) => !c);
  if (firstEmptyIndex === -1) {
    logMessage('No hay espacio en el campo para más monstruos.');
    return;
  }

  const cardId = gameState.player.hand[handIndex];

  // Pedir modo al jugador
  const mode = await askBattleMode();
  if (!mode) {
    logMessage('Invocación cancelada.');
    return;
  }

  // Remover de la mano y colocar en el campo con el modo escogido
  gameState.player.hand.splice(handIndex, 1);
  gameState.player.field[firstEmptyIndex] = { id: cardId, mode: mode };

  logMessage(`Jugador invoca ${CARD_BY_ID[cardId].name} en modo ${mode.toUpperCase()}.`);
  render();
}

// Lógica de selección y aplicación de fusión
function handleFusionClick(handIndex) {
  const hand = gameState.player.hand;

  if (gameState.fusionFirstIndex === null) {
    gameState.fusionFirstIndex = handIndex;
    logMessage(
      `Seleccionaste "${CARD_BY_ID[hand[handIndex]].name}" como primera carta de fusión. Elige otra.`
    );
    render();
    return;
  }

  if (gameState.fusionFirstIndex === handIndex) {
    gameState.fusionFirstIndex = null;
    logMessage('Selección de fusión cancelada.');
    render();
    return;
  }

  const firstId = hand[gameState.fusionFirstIndex];
  const secondId = hand[handIndex];
  const fusionResultId = getFusionResult(firstId, secondId);

  if (!fusionResultId) {
    logMessage(
      `No existe fusión entre "${CARD_BY_ID[firstId].name}" y "${CARD_BY_ID[secondId].name}".`
    );
    gameState.fusionFirstIndex = null;
    render();
    return;
  }

  // eliminamos las dos cartas usadas y añadimos la resultante
  const indices = [gameState.fusionFirstIndex, handIndex].sort((a, b) => b - a);
  for (const idx of indices) {
    hand.splice(idx, 1);
  }
  hand.push(fusionResultId);

  logMessage(
    `Fusión exitosa: "${CARD_BY_ID[firstId].name}" + "${CARD_BY_ID[secondId].name}" → "${CARD_BY_ID[fusionResultId].name}".`
  );

  //invocar automaticamente si hay espacio (invoca en modo ATK por defecto)
  const firstEmpty = gameState.player.field.findIndex(c => !c);
  if (firstEmpty !== -1) {
    const idxInHand = gameState.player.hand.indexOf(fusionResultId);
    if (idxInHand !== -1) gameState.player.hand.splice(idxInHand,1);
    gameState.player.field[firstEmpty] = { id: fusionResultId, mode: 'atk' };
    logMessage(`Invocas inmediatamente ${CARD_BY_ID[fusionResultId].name} (ATK) tras la fusión.`);
  }

  gameState.fusionFirstIndex = null;
  render();
}

// Resuelve la fase de batalla del jugador cuando presiona ATACAR
async function startPlayerBattle() {
  if (gameState.turn !== 'player') return;
  await resolveManualBattle('player');

  // tras la fase de batalla, el jugador puede terminar su turno con el botón "Terminar turno"
  render();
}

// Manera de resolver batalla respetando modos ATK/DEF
async function resolveManualBattle(attackerKey) {
  if (gameState.turn === 'ended') return;

  const defenderKey = otherPlayer(attackerKey);
  const attackerField = gameState[attackerKey].field;
  const defenderField = gameState[defenderKey].field;

  logMessage(
    attackerKey === 'player'
      ? 'Fase de batalla: atacan tus monstruos (solo los en ATK).'
      : 'Fase de batalla: atacan los monstruos de la IA (solo los en ATK).'
  );

  render();
  await sleep(300);

  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const atkSlot = attackerField[i];
    if (!atkSlot) continue;
    if (atkSlot.mode !== 'atk') continue; // solo atacan si están en ATK

    const atkCard = CARD_BY_ID[atkSlot.id];
    const defSlot = defenderField[i];

    // Si no hay monstruo defensor -> ataque directo
    if (!defSlot) {
      gameState[defenderKey].life -= atkCard.atk;
      showDamageFX(atkCard.atk);
      logMessage(`${atkCard.name} ataca directamente. ${otherPlayer(attackerKey) === 'player' ? 'Tú' : 'La IA'} recibes ${atkCard.atk} de daño.`);
      render();
      if (checkGameEnd()) return;
      await sleep(300);
      continue;
    }

    const defCard = CARD_BY_ID[defSlot.id];

    if (defSlot.mode === 'def') {
      // Ataque vs Defensa -> atk vs def
      if (atkCard.atk > defCard.def) {
        defenderField[i] = null;
        logMessage(`${atkCard.name} destruye a ${defCard.name} colocado en DEF. No hay daño a LP.`);
      } else if (atkCard.atk < defCard.def) {
        const damage = defCard.def - atkCard.atk;
        attackerField[i] = null;
        gameState[attackerKey].life -= damage;
        showDamageFX(damage);
        logMessage(`${atkCard.name} es derrotado por la defensa de ${defCard.name}. ${attackerKey === 'player' ? 'Tú' : 'La IA'} recibes ${damage} de daño.`);
      } else {
        // igual
        logMessage(`${atkCard.name} y ${defCard.name} quedan en empate contra DEF (ninguno muere si quieres; en esta implementación no se destruyen).`);
        // Para mantener simple, no destruimos en empate contra DEF
      }
    } else {
      // ATK vs ATK -> comparar ATK
      if (atkCard.atk > defCard.atk) {
        const damage = atkCard.atk - defCard.atk;
        defenderField[i] = null;
        gameState[defenderKey].life -= damage;
        showDamageFX(damage);
        logMessage(`${atkCard.name} destruye a ${defCard.name}. ${defenderKey === 'player' ? 'Tú' : 'La IA'} recibes ${damage} de daño.`);
      } else if (atkCard.atk < defCard.atk) {
        const damage = defCard.atk - atkCard.atk;
        attackerField[i] = null;
        gameState[attackerKey].life -= damage;
        showDamageFX(damage);
        logMessage(`${atkCard.name} es destruido por ${defCard.name}. ${attackerKey === 'player' ? 'Tú' : 'La IA'} recibes ${damage} de daño.`);
      } else {
        attackerField[i] = null;
        defenderField[i] = null;
        logMessage(`${atkCard.name} y ${defCard.name} se destruyen mutuamente.`);
      }
    }

    render();
    if (checkGameEnd()) return;
    await sleep(350);
  }

  logMessage('Fase de batalla finalizada.');
}

// Comprueba si la partida termina
function checkGameEnd() {
  if (gameState.player.life <= 0 || gameState.ai.life <= 0) {
    const playerLP = Math.max(gameState.player.life, 0);
    const aiLP = Math.max(gameState.ai.life, 0);

    gameState.player.life = playerLP;
    gameState.ai.life = aiLP;

    const winner =
      playerLP > aiLP ? 'Jugador' : playerLP < aiLP ? 'IA' : 'Empate';

    logMessage(`El duelo ha terminado. Ganador: ${winner}.`);
    gameState.turn = 'ended';
    showEndModal(winner);
    return true;
  }
  return false;
}

// ---------- Flujo de turnos + IA ----------

function endTurn() {
  if (gameState.turn === 'ended') return;

  if (gameState.turn === 'player') {
    gameState.turn = 'ai';
    logMessage('Terminas tu turno. Turno de la IA.');
    aiTurn();
  } else if (gameState.turn === 'ai') {
    gameState.turn = 'player';
    const drawn = drawCard('player');
    if (drawn) {
      logMessage(`Robas carta: ${CARD_BY_ID[drawn].name}.`);
    }
    render();
  }
}

// Aplica la decisión de la IA devuelta por el backend
async function applyAIDecision(decision) {
  if (!decision) return;

  console.group('AI Decision apply');
  console.log('Decision recibida:', decision);
  console.log('AI hand antes:', JSON.parse(JSON.stringify(gameState.ai.hand)));
  console.log('AI field antes:', JSON.parse(JSON.stringify(gameState.ai.field)));

  const normalizeId = (maybe) => {
    if (!maybe) return null;
    if (typeof maybe === 'string') return maybe;
    if (typeof maybe === 'object') {
      if (maybe.id) return maybe.id;
      return maybe;
    }
    return null;
  };

  const removeCardFromHandOrField = (cardId) => {
    let idx = gameState.ai.hand.findIndex(h => {
      if (!h) return false;
      if (typeof h === 'string') return h === cardId;
      if (typeof h === 'object') return h.id === cardId || h === cardId;
      return false;
    });
    if (idx !== -1) {
      const removed = gameState.ai.hand.splice(idx, 1)[0];
      return { removedFrom: 'hand', removed };
    }

    idx = gameState.ai.field.findIndex(f => {
      if (!f) return false;
      if (typeof f === 'string') return f === cardId;
      if (typeof f === 'object') return f.id === cardId || f === cardId;
      return false;
    });
    if (idx !== -1) {
      const removed = gameState.ai.field[idx];
      gameState.ai.field[idx] = null;
      return { removedFrom: 'field', removed };
    }

    return null;
  };

  const pushResultToHandOnce = (resultId) => {
    const exists = gameState.ai.hand.find(h => (typeof h === 'string' ? h === resultId : (h && h.id === resultId)));
    if (!exists) {
      gameState.ai.hand.push(resultId);
      return true;
    }
    return false;
  };

  // Heurística para elegir modo: preferir ATK si ATK >= DEF, sino DEF
  const chooseModeFor = (cardId) => {
    const c = CARD_BY_ID[cardId];
    if (!c) return 'atk';
    return (c.atk >= c.def) ? 'atk' : 'def';
  };

  // Caso fusión
  if (decision.summon && decision.summon.fusion) {
    const fus = decision.summon.fusion;
    const c1id = normalizeId(fus.c1);
    const c2id = normalizeId(fus.c2);
    const resid = normalizeId(fus.result);

    console.log('IA pidió fusión:', { c1id, c2id, resid });

    const r1 = removeCardFromHandOrField(c1id);
    const r2 = removeCardFromHandOrField(c2id);

    if (!r1) console.warn('No se encontró c1 para remover:', c1id);
    if (!r2) console.warn('No se encontró c2 para remover:', c2id);

    const added = pushResultToHandOnce(resid);
    console.log('Result añadido a mano?', added, 'resultId:', resid);

    logMessage(
      `La IA fusiona "${CARD_BY_ID[c1id]?.name ?? c1id}" + "${CARD_BY_ID[c2id]?.name ?? c2id}" → "${CARD_BY_ID[resid]?.name ?? resid}".`
    );

    if (decision.summon.slot !== undefined && decision.summon.slot !== null) {
      const desiredSlot = decision.summon.slot;
      const idxResInHand = gameState.ai.hand.findIndex(h => (typeof h === 'string' ? h === resid : (h && h.id === resid)));
      if (idxResInHand !== -1) {
        gameState.ai.hand.splice(idxResInHand, 1);
      } else {
        console.warn('Result no encontrado en mano al intentar invocar, pero continuamos intentando invocar.', resid);
      }

      let targetSlot = desiredSlot;
      if (
        typeof targetSlot !== 'number' ||
        targetSlot < 0 ||
        targetSlot >= MAX_MONSTER_SLOTS ||
        gameState.ai.field[targetSlot]
      ) {
        targetSlot = gameState.ai.field.findIndex(c => !c);
      }
      if (targetSlot !== -1) {
        const mode = chooseModeFor(resid);
        gameState.ai.field[targetSlot] = { id: resid, mode };
        logMessage(`La IA invoca ${CARD_BY_ID[resid].name} en modo ${mode.toUpperCase()}.`);
      } else {
        logMessage('La IA intentó invocar pero no tiene espacio en el campo.');
      }
    }
  }
  // Caso summon simple - invocación normal
  else if (decision.summon && decision.summon.card) {
    const cardId = normalizeId(decision.summon.card);
    const desiredSlot = decision.summon.slot;
    const idx = gameState.ai.hand.findIndex(h => (typeof h === 'string' ? h === cardId : (h && h.id === cardId)));
    if (idx !== -1) gameState.ai.hand.splice(idx, 1);

    let targetSlot = desiredSlot;
    if (
      typeof targetSlot !== 'number' ||
      targetSlot < 0 ||
      targetSlot >= MAX_MONSTER_SLOTS ||
      gameState.ai.field[targetSlot]
    ) {
      targetSlot = gameState.ai.field.findIndex((c) => !c);
    }

    if (targetSlot !== -1) {
      const mode = chooseModeFor(cardId);
      gameState.ai.field[targetSlot] = { id: cardId, mode };
      logMessage(`La IA invoca ${CARD_BY_ID[cardId].name} en modo ${mode.toUpperCase()}.`);
    } else {
      logMessage('La IA intentó invocar pero no tiene espacio en el campo.');
    }

    await sleep(600);
  }

  if (decision.battle_phase) {
    await sleep(600);
    await resolveManualBattle('ai');
  }

  console.log('AI hand después:', JSON.parse(JSON.stringify(gameState.ai.hand)));
  console.log('AI field después:', JSON.parse(JSON.stringify(gameState.ai.field)));
  console.groupEnd();
}

// IA de respaldo en JS si falla el backend Python
function fallbackLocalAIDecision() {
  const field = gameState.ai.field;
  const hand = gameState.ai.hand;
  const firstEmptyIndex = field.findIndex((c) => !c);

  let summon = null;

  if (firstEmptyIndex !== -1 && hand.length > 0) {
    let bestIdx = 0;
    let bestAtk = -Infinity;
    hand.forEach((cardId, idx) => {
      const atk = CARD_BY_ID[cardId].atk;
      if (atk > bestAtk) {
        bestAtk = atk;
        bestIdx = idx;
      }
    });

    const cardId = hand[bestIdx];
    // elegir modo simple: atk si atk >= def
    const mode = CARD_BY_ID[cardId].atk >= CARD_BY_ID[cardId].def ? 'atk' : 'def';
    summon = { card: cardId, slot: firstEmptyIndex, mode };
  }

  return {
    summon,
    battle_phase: true,
  };
}

// Turno de la IA: pide decisión al backend Python
async function aiTurn() {
  if (gameState.turn === 'ended') return;

  const drawn = drawCard('ai');
  if (drawn) {
    logMessage('La IA roba una carta.');
    render();
    await sleep(500); // Pausa leve al robar carta
  }

  let decision = null;

  try {
    const payload = buildSerializableState();

    const response = await fetch('http://localhost:8000/ai-move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Respuesta no OK del backend');
    }

    decision = await response.json();
    logMessage('La IA ha calculado su jugada (Python).');

  } catch (err) {
    console.error('Error llamando a la IA en Python:', err);
    logMessage('Error con la IA en Python. Usando IA local de respaldo.');
    decision = fallbackLocalAIDecision();
    render();
    await sleep(400);
  }

  await applyAIDecision(decision);
  render();

  if (gameState.turn !== 'ended') {
    gameState.turn = 'player';

    const drawnP = drawCard('player');
    if (drawnP) {
      logMessage(`Robas carta: ${CARD_BY_ID[drawnP].name}.`);
    }

    render();
    await sleep(300); // Pausa ligera de transición de turno
  }
}

// ---------- Inicialización ----------

function initGame(deckSize = null) {
  if (typeof deckSize === 'number') {
    deckSize = Math.max(15, Math.min(deckSize, 40));
    currentDeckSize = deckSize;
  } else {
    deckSize = currentDeckSize;
  }

  gameState.turn = 'player';
  gameState.phase = 'main';
  gameState.player.life = 8000;
  gameState.ai.life = 8000;
  gameState.fusionMode = false;
  gameState.fusionFirstIndex = null;

  gameState.player.deck = buildDeckFromPool(deckSize);
  gameState.ai.deck = buildDeckFromPool(deckSize);

  gameState.player.hand = [];
  gameState.ai.hand = [];
  gameState.player.field = new Array(MAX_MONSTER_SLOTS).fill(null);
  gameState.ai.field = new Array(MAX_MONSTER_SLOTS).fill(null);

  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    drawCard('player');
    drawCard('ai');
  }

  const log = document.getElementById('log');
  if (log) log.innerHTML = '';
  logMessage(`Juego iniciado. Decks de ${deckSize} cartas.`);

  const modal = document.getElementById('end-modal');
  if (modal) modal.classList.remove('show');

  render();
}

// ---------- Modal y UI relacionados ----------

// askBattleMode muestra un modal (HTML abajo) y devuelve 'atk' o 'def' (o null si cancel)
function askBattleMode() {
  return new Promise((resolve) => {
    const modal = document.getElementById("mode-modal");
    if (!modal) {
      // si no existe el modal, asumimos ATK por defecto
      resolve('atk');
      return;
    }
    modal.classList.add("show");

    const btnAtk = document.getElementById("mode-atk");
    const btnDef = document.getElementById("mode-def");
    const btnCancel = document.getElementById("mode-cancel");

    const cleanup = () => {
      modal.classList.remove("show");
      btnAtk.onclick = null;
      btnDef.onclick = null;
      if (btnCancel) btnCancel.onclick = null;
    };

    btnAtk.onclick = () => {
      cleanup();
      resolve('atk');
    };

    btnDef.onclick = () => {
      cleanup();
      resolve('def');
    };

    if (btnCancel) {
      btnCancel.onclick = () => {
        cleanup();
        resolve(null);
      };
    }
  });
}

// ---------- Listeners de UI ----------

document.addEventListener('DOMContentLoaded', () => {
  const endTurnBtn = document.getElementById('btn-end-turn');
  const playAgainBtn = document.getElementById('btn-play-again');
  const exitBtn = document.getElementById('btn-exit');
  const startGameBtn = document.getElementById('btn-start-game');
  const deckSizeInput = document.getElementById('deck-size-input');
  const fusionToggleBtn = document.getElementById('btn-toggle-fusion');
  const battleBtn = document.getElementById('btn-battle');

  if (startGameBtn && deckSizeInput) {
    startGameBtn.addEventListener('click', () => {
      let val = parseInt(deckSizeInput.value, 10);
      if (isNaN(val)) val = DEFAULT_DECK_SIZE;
      val = Math.max(15, Math.min(val, 40));
      deckSizeInput.value = val;
      initGame(val);
    });
  }

  if (endTurnBtn) {
    endTurnBtn.addEventListener('click', endTurn);
  }

  if (battleBtn) {
    battleBtn.addEventListener('click', startPlayerBattle);
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      let val = DEFAULT_DECK_SIZE;
      if (deckSizeInput) {
        const parsed = parseInt(deckSizeInput.value, 10);
        if (!isNaN(parsed)) val = Math.max(15, Math.min(parsed, 40));
      }

      initGame(val);

      const endModal = document.getElementById('game-end-modal');
      if (endModal) {
        endModal.classList.remove('show');
      }
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  if (fusionToggleBtn) {
    fusionToggleBtn.addEventListener('click', () => {
      gameState.fusionMode = !gameState.fusionMode;
      fusionToggleBtn.textContent = `Modo Fusión: ${gameState.fusionMode ? 'ON' : 'OFF'}`;
      if (!gameState.fusionMode) {
        gameState.fusionFirstIndex = null;
      }
      render();
    });
  }

  // iniciar con valores por defecto si hay botón start automático
  render();
});
