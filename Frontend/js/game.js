// game.js

const MAX_MONSTER_SLOTS = 5;
const DEFAULT_DECK_SIZE = 20; // configurable (máximo 40)
const INITIAL_HAND_SIZE = 5;

let currentDeckSize = DEFAULT_DECK_SIZE;

const gameState = {
  turn: 'player', // 'player' | 'ai' | 'ended'
  phase: 'main',
  player: {
    life: 8000,
    deck: [],
    hand: [],
    field: [],
  },
  ai: {
    life: 8000,
    deck: [],
    hand: [],
    field: [],
  },
  fusionMode: false,
  fusionFirstIndex: null,
};

// ---------- Utilidades generales ----------

function logMessage(msg) {
  const log = document.getElementById('log');
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = msg;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function buildDeckFromPool(size) {
  const poolCopy = [...CARD_POOL];
  shuffle(poolCopy);
  return poolCopy.slice(0, size).map((card) => card.id);
}

function drawCard(playerKey) {
  const player = gameState[playerKey];
  if (player.deck.length === 0) return null;
  const cardId = player.deck.shift();
  player.hand.push(cardId);
  return cardId;
}

function otherPlayer(key) {
  return key === 'player' ? 'ai' : 'player';
}

// FX daño
function showDamageFX(amount) {
  const fx = document.getElementById('damage-fx');
  if (!fx) return;
  fx.textContent = `-${amount}`;
  fx.classList.add('show');

  setTimeout(() => {
    fx.classList.remove('show');
  }, 600);
}

// Modal de fin de partida
function showEndModal(winner) {
  const modal = document.getElementById('end-modal');
  const resultEl = document.getElementById('end-result');
  const lpEl = document.getElementById('end-lp');
  if (!modal || !resultEl || !lpEl) return;

  if (winner === 'Empate') {
    resultEl.textContent = 'Resultado: Empate';
  } else {
    resultEl.textContent = `Ganador: ${winner}`;
  }

  lpEl.textContent = `LP Jugador: ${gameState.player.life}   |   LP IA: ${gameState.ai.life}`;

  modal.classList.add('show');
}

/**
 * Construye un estado serializable para enviar al backend Python.
 * No envía funciones ni referencias de DOM, solo datos.
 */
function buildSerializableState() {
  return {
    turn: gameState.turn,
    phase: gameState.phase,
    player: {
      life: gameState.player.life,
      deck: [...gameState.player.deck],
      hand: [...gameState.player.hand],
      field: [...gameState.player.field],
    },
    ai: {
      life: gameState.ai.life,
      deck: [...gameState.ai.deck],
      hand: [...gameState.ai.hand],
      field: [...gameState.ai.field],
    },
  };
}

/**
 * Aplica la decisión de la IA devuelta por el backend.
 * Estructura esperada (JSON):
 * {
 *   "summon": { "card": "ID_CARTA", "slot": 2 } | null,
 *   "battle_phase": true/false
 * }
 */
function applyAIDecision(decision) {
  if (!decision) return;

  // SUMMON
  if (decision.summon && decision.summon.card) {
    const { card, slot } = decision.summon;

    // quitar carta de la mano de la IA
    const idx = gameState.ai.hand.indexOf(card);
    if (idx !== -1) {
      gameState.ai.hand.splice(idx, 1);
    }

    // si no hay slot definido o está ocupado, buscamos el primero libre
    let targetSlot = slot;
    if (
      typeof targetSlot !== 'number' ||
      targetSlot < 0 ||
      targetSlot >= MAX_MONSTER_SLOTS ||
      gameState.ai.field[targetSlot]
    ) {
      targetSlot = gameState.ai.field.findIndex((c) => !c);
    }

    if (targetSlot !== -1) {
      gameState.ai.field[targetSlot] = card;
      logMessage(`La IA invoca ${CARD_BY_ID[card].name}.`);
    } else {
      logMessage('La IA intentó invocar, pero no tiene espacio en el campo.');
    }
  }

  // FASE DE BATALLA
  if (decision.battle_phase) {
    resolveBattlePhase('ai');
  }
}

/**
 * Fallback en JS por si el backend Python falla.
 * Equivale más o menos a tu IA anterior: invoca la carta con más ATK y ataca.
 */
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
    summon = { card: cardId, slot: firstEmptyIndex };
  }

  return {
    summon,
    battle_phase: true,
  };
}

// ---------- Render ----------

function createCardElement(
  cardId,
  { clickable = false, onClick = null, hidden = false, size = 'normal' } = {}
) {
  const card = hidden ? null : CARD_BY_ID[cardId];

  const el = document.createElement('div');
  el.className = 'card enter';
  if (size === 'mini') {
    el.classList.add('card-mini');
  }

  if (hidden) {
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

  if (clickable && typeof onClick === 'function') {
    el.addEventListener('click', onClick);
  }

  return el;
}

function render() {
  document.getElementById('player-life').textContent = `LP: ${gameState.player.life}`;
  document.getElementById('ai-life').textContent = `LP: ${gameState.ai.life}`;
  document.getElementById('player-deck-count').textContent = gameState.player.deck.length;
  document.getElementById('ai-deck-count').textContent = gameState.ai.deck.length;

  if (gameState.turn === 'ended') {
    document.getElementById('turn-info').textContent = 'Duelo terminado';
  } else {
    document.getElementById('turn-info').textContent =
      gameState.turn === 'player' ? 'Turno del jugador' : 'Turno de la IA';
  }

  const playerHandDiv = document.getElementById('player-hand');
  const aiHandDiv = document.getElementById('ai-hand');
  const playerFieldDiv = document.getElementById('player-monster-zone');
  const aiFieldDiv = document.getElementById('ai-monster-zone');
  const playerDeckPreviewDiv = document.getElementById('player-deck-preview');
  const aiDeckPreviewDiv = document.getElementById('ai-deck-preview');

  playerHandDiv.innerHTML = '';
  aiHandDiv.innerHTML = '';
  playerFieldDiv.innerHTML = '';
  aiFieldDiv.innerHTML = '';
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

    playerHandDiv.appendChild(cardEl);
  });

  // Mano IA SIEMPRE visible
  gameState.ai.hand.forEach((cardId) => {
    const cardEl = createCardElement(cardId);
    aiHandDiv.appendChild(cardEl);
  });

  // Campo jugador
  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const slotCardId = gameState.player.field[i] ?? null;
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    if (slotCardId) {
      slot.classList.add('has-card');
      const cardEl = createCardElement(slotCardId);
      slot.appendChild(cardEl);
    }
    playerFieldDiv.appendChild(slot);
  }

  // Campo IA
  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const slotCardId = gameState.ai.field[i] ?? null;
    const slot = document.createElement('div');
    slot.className = 'card-slot';
    if (slotCardId) {
      slot.classList.add('has-card');
      const cardEl = createCardElement(slotCardId);
      slot.appendChild(cardEl);
    }
    aiFieldDiv.appendChild(slot);
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

// ---------- Lógica de juego ----------

function handlePlayerHandClick(index) {
  if (gameState.turn !== 'player' || gameState.turn === 'ended') return;

  if (gameState.fusionMode) {
    handleFusionClick(index);
  } else {
    handlePlayerPlayCard(index);
  }
}

function handlePlayerPlayCard(handIndex) {
  const firstEmptyIndex = gameState.player.field.findIndex((c) => !c);
  if (firstEmptyIndex === -1) {
    logMessage('No hay espacio en el campo para más monstruos.');
    return;
  }

  const [cardId] = gameState.player.hand.splice(handIndex, 1);
  gameState.player.field[firstEmptyIndex] = cardId;
  logMessage(`Jugador invoca ${CARD_BY_ID[cardId].name}.`);

  render();
}

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

  const indices = [gameState.fusionFirstIndex, handIndex].sort((a, b) => b - a);
  for (const idx of indices) {
    hand.splice(idx, 1);
  }
  hand.push(fusionResultId);

  logMessage(
    `Fusión exitosa: "${CARD_BY_ID[firstId].name}" + "${CARD_BY_ID[secondId].name}" → "${CARD_BY_ID[fusionResultId].name}".`
  );

  gameState.fusionFirstIndex = null;
  render();
}

function resolveBattlePhase(attackerKey) {
  if (gameState.turn === 'ended') return;

  const defenderKey = otherPlayer(attackerKey);
  const attackerField = gameState[attackerKey].field;
  const defenderField = gameState[defenderKey].field;

  logMessage(
    attackerKey === 'player'
      ? 'Fase de batalla: atacan tus monstruos.'
      : 'Fase de batalla: atacan los monstruos de la IA.'
  );

  for (let i = 0; i < MAX_MONSTER_SLOTS; i++) {
    const atkId = attackerField[i];
    if (!atkId) continue;

    const atkCard = CARD_BY_ID[atkId];
    const defId = defenderField[i];

    if (defId) {
      const defCard = CARD_BY_ID[defId];

      if (atkCard.atk > defCard.atk) {
        const damage = atkCard.atk - defCard.atk;
        defenderField[i] = null;
        gameState[defenderKey].life -= damage;
        showDamageFX(damage);
        logMessage(
          `${atkCard.name} destruye a ${defCard.name}. ${
            defenderKey === 'player' ? 'Tú' : 'La IA'
          } recibes ${damage} de daño.`
        );
      } else if (atkCard.atk < defCard.atk) {
        const damage = defCard.atk - atkCard.atk;
        attackerField[i] = null;
        gameState[attackerKey].life -= damage;
        showDamageFX(damage);
        logMessage(
          `${atkCard.name} es destruido por ${defCard.name}. ${
            attackerKey === 'player' ? 'Tú' : 'La IA'
          } recibes ${damage} de daño.`
        );
      } else {
        attackerField[i] = null;
        defenderField[i] = null;
        logMessage(`${atkCard.name} y ${defCard.name} se destruyen mutuamente.`);
      }
    } else {
      gameState[defenderKey].life -= atkCard.atk;
      showDamageFX(atkCard.atk);
      logMessage(
        `${atkCard.name} ataca directamente. ${
          defenderKey === 'player' ? 'Tú' : 'La IA'
        } recibes ${atkCard.atk} de daño.`
      );
    }

    if (checkGameEnd()) {
      render();
      return;
    }
  }

  render();
}

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

// ---------- Flujo de turnos ----------

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

function buildSerializableState() {
  return {
    turn: gameState.turn,
    phase: gameState.phase,
    player: {
      life: gameState.player.life,
      deck: gameState.player.deck.map(id => CARD_BY_ID[id]),
      hand: gameState.player.hand.map(id => CARD_BY_ID[id]),
      field: gameState.player.field.map(id => id ? CARD_BY_ID[id] : null),
    },
    ai: {
      life: gameState.ai.life,
      deck: gameState.ai.deck.map(id => CARD_BY_ID[id]),
      hand: gameState.ai.hand.map(id => CARD_BY_ID[id]),
      field: gameState.ai.field.map(id => id ? CARD_BY_ID[id] : null),
    }
  };
}

/**
 * Turno de la IA: ahora consulta al backend Python.
 */
async function aiTurn() {
  if (gameState.turn === 'ended') return;

  const drawn = drawCard('ai');
  if (drawn) {
    logMessage('La IA roba una carta.');
  }

  let decision = null;

  try {
    const payload = buildSerializableState();

    const response = await fetch('http://localhost:8000/ai-move', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
  }

  applyAIDecision(decision);
  render();

  if (gameState.turn !== 'ended') {
    gameState.turn = 'player';
    const drawnP = drawCard('player');
    if (drawnP) {
      logMessage(`Robas carta: ${CARD_BY_ID[drawnP].name}.`);
    }
    render();
  }
}

function applyAIDecision(decision) {
  if (!decision) return;

  // SUMMON
  if (decision.summon && decision.summon.card) {
    const { card, slot } = decision.summon;

    // quitar carta de la mano de la IA
    const idx = gameState.ai.hand.indexOf(card);
    if (idx !== -1) {
      gameState.ai.hand.splice(idx, 1);
    }

    // si slot no es válido, buscamos el primero libre
    let targetSlot = slot;
    if (
      typeof targetSlot !== 'number' ||
      targetSlot < 0 ||
      targetSlot >= MAX_MONSTER_SLOTS ||
      gameState.ai.field[targetSlot]
    ) {
      targetSlot = gameState.ai.field.findIndex((c) => !c);
    }

    if (targetSlot !== -1) {
      gameState.ai.field[targetSlot] = card;
      logMessage(`La IA invoca ${CARD_BY_ID[card].name}.`);
    } else {
      logMessage('La IA intentó invocar pero no tiene espacio en el campo.');
    }
  }

  // FASE DE BATALLA
  if (decision.battle_phase) {
    resolveBattlePhase('ai');
  }
}


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
    summon = { card: cardId, slot: firstEmptyIndex };
  }

  return {
    summon,
    battle_phase: true,
  };
}

// ---------- Inicialización ----------

function initGame(deckSize = null) {
  // Si viene un valor desde fuera, lo usamos; si no, usamos el actual
  if (typeof deckSize === 'number') {
    // clamp 15–40
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

// ---------- Listeners de UI ----------

document.addEventListener('DOMContentLoaded', () => {
  const endTurnBtn = document.getElementById('btn-end-turn');
  const playAgainBtn = document.getElementById('btn-play-again');
  const exitBtn = document.getElementById('btn-exit');
  const startGameBtn = document.getElementById('btn-start-game');
  const deckSizeInput = document.getElementById('deck-size-input');

  // Si quieres que al cargar la página ya haya un duelo creado,
  // puedes descomentar esto:
  // if (deckSizeInput) {
  //   const val = parseInt(deckSizeInput.value, 10);
  //   currentDeckSize = isNaN(val) ? DEFAULT_DECK_SIZE : Math.max(15, Math.min(val, 40));
  // }
  // initGame(currentDeckSize);

  // 🔹 Iniciar duelo según el valor del input
  if (startGameBtn && deckSizeInput) {
    startGameBtn.addEventListener('click', () => {
      let val = parseInt(deckSizeInput.value, 10);
      if (isNaN(val)) val = DEFAULT_DECK_SIZE;

      // clamp 15–40
      val = Math.max(15, Math.min(val, 40));
      deckSizeInput.value = val; // reflejar el clamp en el input

      initGame(val);
    });
  }

  if (endTurnBtn) {
    endTurnBtn.addEventListener('click', endTurn);
  }

  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', () => {
      // Usa siempre el tamaño actualmente configurado / mostrado
      let val = DEFAULT_DECK_SIZE;
      if (deckSizeInput) {
        const parsed = parseInt(deckSizeInput.value, 10);
        if (!isNaN(parsed)) val = Math.max(15, Math.min(parsed, 40));
      }
      initGame(val);
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      const app = document.querySelector('.app');
      if (app) app.style.display = 'none';

      const msg = document.createElement('div');
      msg.style.color = '#e5e7eb';
      msg.style.fontSize = '1.2rem';
      msg.style.margin = '2rem auto';
      msg.style.textAlign = 'center';
      msg.textContent = 'Gracias por jugar. Puedes cerrar la pestaña.';
      document.body.appendChild(msg);
    });
  }
});
