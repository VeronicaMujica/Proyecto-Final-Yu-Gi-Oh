// game.js

const MAX_MONSTER_SLOTS = 5;
const DEFAULT_DECK_SIZE = 20; // configurable (máximo 40)
const INITIAL_HAND_SIZE = 5;

const gameState = {
  turn: 'player', // 'player' | 'ai' | 'ended'
  phase: 'main', // por si luego quieres separarlo mejor
  player: {
    life: 8000,
    deck: [],
    hand: [],
    field: [], // array de ids o null
  },
  ai: {
    life: 8000,
    deck: [],
    hand: [],
    field: [],
  },
  debugShowAIHand: false,
  fusionMode: false,
  fusionFirstIndex: null, // índice en la mano del jugador
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

// Construye un mazo tomando cartas aleatorias del pool
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
    // Carta boca abajo (IA por defecto)
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

  // Mano IA (oculta por defecto)
  gameState.ai.hand.forEach((cardId) => {
    const cardEl = createCardElement(cardId, {
      hidden: !gameState.debugShowAIHand,
    });
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
      const cardEl = createCardElement(slotCardId, {
        hidden: !gameState.debugShowAIHand,
      });
      slot.appendChild(cardEl);
    }
    aiFieldDiv.appendChild(slot);
  }

  // Preview de mazo: mostrar TODA la secuencia de cartas que quedan
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

  aiHandDiv.classList.toggle('debug-visible', gameState.debugShowAIHand);
}

// ---------- Lógica de juego: invocación, fusiones, batalla ----------

function handlePlayerHandClick(index) {
  if (gameState.turn !== 'player' || gameState.turn === 'ended') return;

  if (gameState.fusionMode) {
    handleFusionClick(index);
  } else {
    handlePlayerPlayCard(index);
  }
}

// Invocación simple al primer slot vacío
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

// Modo fusión: seleccionar dos cartas de la mano
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
    // cancelar selección
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

  // Aplicar fusión: quitar las dos cartas de la mano y añadir la resultante
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

// Resolver fase de batalla para 'player' o 'ai'
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
    if (!atkId) continue; // no hay monstruo en ese slot

    const atkCard = CARD_BY_ID[atkId];
    const defId = defenderField[i];

    if (defId) {
      const defCard = CARD_BY_ID[defId];

      if (atkCard.atk > defCard.atk) {
        const damage = atkCard.atk - defCard.atk;
        defenderField[i] = null; // destruye defensor
        gameState[defenderKey].life -= damage;
        showDamageFX(damage);
        logMessage(
          `${atkCard.name} destruye a ${defCard.name}. ${
            defenderKey === 'player' ? 'Tú' : 'La IA'
          } recibes ${damage} de daño.`
        );
      } else if (atkCard.atk < defCard.atk) {
        const damage = defCard.atk - atkCard.atk;
        attackerField[i] = null; // se destruye el atacante
        gameState[attackerKey].life -= damage;
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
      // ataque directo
      gameState[defenderKey].life -= atkCard.atk;
      logMessage(
        `${atkCard.name} ataca directamente. ${
          defenderKey === 'player' ? 'Tú' : 'La IA'
        } recibes ${atkCard.atk} de daño.`
      );
    }

    // Comprobamos fin de duelo tras cada ataque
    if (checkGameEnd()) {
      render();
      return;
    }
  }

  render();
}

// Devuelve true si el duelo ha terminado
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

// Turno IA (por ahora: robo + invocar + batalla simple)
function aiTurn() {
  if (gameState.turn === 'ended') return;

  const drawn = drawCard('ai');
  if (drawn) {
    logMessage('La IA roba una carta.');
  }

  // IA invoca la carta con mayor ATK que tenga en mano, si hay espacio
  const field = gameState.ai.field;
  const hand = gameState.ai.hand;
  const firstEmptyIndex = field.findIndex((c) => !c);

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

    const [chosenId] = hand.splice(bestIdx, 1);
    field[firstEmptyIndex] = chosenId;
    logMessage(`La IA invoca ${CARD_BY_ID[chosenId].name}.`);
  }

  render();

  // Fase de batalla IA
  resolveBattlePhase('ai');

  if (gameState.turn !== 'ended') {
    // Pasa turno al jugador y robas una carta
    gameState.turn = 'player';
    const drawnP = drawCard('player');
    if (drawnP) {
      logMessage(`Robas carta: ${CARD_BY_ID[drawnP].name}.`);
    }
    render();
  }
}

function showDamageFX(amount) {
  const fx = document.getElementById('damage-fx');
  fx.textContent = `-${amount}`;
  fx.classList.add('show');

  setTimeout(() => {
    fx.classList.remove('show');
  }, 600);
}

// ---------- Inicialización ----------

function initGame(deckSize = DEFAULT_DECK_SIZE) {
  deckSize = Math.min(deckSize, 40); // requisito del enunciado

  gameState.turn = 'player';
  gameState.phase = 'main';
  gameState.player.life = 8000;
  gameState.ai.life = 8000;
  gameState.debugShowAIHand = false;
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

  document.getElementById('log').innerHTML = '';
  logMessage(`Juego iniciado. Decks de ${deckSize} cartas.`);

  render();
}

// ---------- Listeners de UI ----------

document.addEventListener('DOMContentLoaded', () => {
  initGame();

  document.getElementById('btn-end-turn').addEventListener('click', endTurn);

  document.getElementById('btn-toggle-debug').addEventListener('click', () => {
    gameState.debugShowAIHand = !gameState.debugShowAIHand;
    logMessage(
      gameState.debugShowAIHand
        ? 'Modo debug activado: ves la mano y campo de la IA.'
        : 'Modo debug desactivado: mano IA oculta.'
    );
    render();
  });

  document.getElementById('btn-fusion-mode').addEventListener('click', (e) => {
    if (gameState.turn === 'ended') return;
    gameState.fusionMode = !gameState.fusionMode;
    gameState.fusionFirstIndex = null;
    e.target.textContent = gameState.fusionMode
      ? 'Modo fusión: ON'
      : 'Modo fusión: OFF';
    logMessage(
      gameState.fusionMode
        ? 'Modo fusión activado. Haz clic en dos cartas de tu mano para intentar fusionarlas.'
        : 'Modo fusión desactivado.'
    );
    render();
  });

  document.getElementById('btn-battle-phase').addEventListener('click', () => {
    if (gameState.turn !== 'player') {
      logMessage('No es tu turno para declarar batalla.');
      return;
    }
    resolveBattlePhase('player');
  });
});
