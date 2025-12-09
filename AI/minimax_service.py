"""
====================================================
  MOTOR DE INTELIGENCIA ARTIFICIAL (Yu-Gi-Oh!)
  Descripción:
      Servicio Flask que implementa IA por Minimax,
      fusiones, jugadas posibles, simulación de turnos,
      y lógica de combate simplificada.
====================================================
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import copy
import time

app = Flask(__name__) # Iniciar aplicación Flask
CORS(app)             # Habilitar CORS para todas las rutas


# ====================================================
#                     REGLAS DE FUSIÓN
# ====================================================
"""
Cada entrada del arreglo FUSION_RULES tiene la forma:
    ((CARTA_A, CARTA_B), RESULTADO)

El orden de las cartas no importa.
"""
FUSION_RULES = [
    # 1) Mago del Tiempo + Bebé Dragón → Dragón Milenario
    (('MAGO_DEL_TIEMPO', 'BEBE_DRAGON'), 'DRAGON_MILENARIO'),
    
    # 2) Gaia el Caballero Feroz + Maldición de Dragón → Gaia el Campeón Dragón
    (('GAIA_EL_CABALLERO_FEROZ', 'MALDICION_DE_DRAGON'), 'GAIA_EL_CAMPEON_DRAGON'),
    
    # 3) Tyhone #2 + Sirviente de la Calavera → Maldición de Dragón
    (('TYHONE_2', 'SIRVIENTE_DE_LA_CALAVERA'), 'MALDICION_DE_DRAGON'),
    
    # 4) Buey de Batalla + Huevo Monstruo → Bebé Dragón
    (('BUEY_DE_BATALLA', 'HUEVO_MONSTRUO'), 'BEBE_DRAGON'),
    
    # 5) Bebé Dragón + Gigante Hitotsu-Me → Dragón de Koumori
    (('BEBE_DRAGON', 'GIGANTE_HITOTSU_ME'), 'DRAGON_DE_KOUMORI'),
    
    # 6) La Mano del Juicio + Guardián Celta → Hombre Juez
    (('LA_MANO_DEL_JUICIO', 'GUARDIAN_CELTA'), 'HOMBRE_JUEZ'),
    
    # 7) Alma de Hinotama + Sirviente de la Calavera → Segador de Fuego
    (('ALMA_DE_HINOTAMA', 'SIRVIENTE_DE_LA_CALAVERA'), 'SEGADOR_DE_FUEGO'),
    
    # 8–10) Evolución de insectos → Gran Moth
    (('LARVA_DE_MOTH', 'INSECTO_BASICO'), 'GRAN_MOTH'),
    (('LARVA_DE_MOTH', 'INSECTO_GRANDE'), 'GRAN_MOTH'),
    (('LARVA_DE_MOTH', 'ESCARABAJO_HERCULES'), 'GRAN_MOTH'),
    
    # 11–12) Gran Moth + Capullo / insecto tanque → Gran Moth Definitivo Perfecto
    (('GRAN_MOTH', 'CAPULLO_EVOLUTIVO'), 'GRAN_MOTH_DEFINITIVO_PERFECTO'),
    (('ESCARABAJO_HERCULES', 'CAPULLO_EVOLUTIVO'), 'GRAN_MOTH_DEFINITIVO_PERFECTO'),
    
    # 13–14) Espejo de cambio de trabajo + Demonios → Cráneo Convocado
    (('ESPEJO_CAMBIO_DE_TRABAJO', 'RYU-KISHIN'), 'CRANEO_CONVOCADO'),
    (('ESPEJO_CAMBIO_DE_TRABAJO', 'DIABLILLO_DE_CUERNO'), 'CRANEO_CONVOCADO'),
    
    # 15) Mago del Tiempo + Bestia Embrionaria → Cráneo Convocado
    (('MAGO_DEL_TIEMPO', 'BESTIA_EMBRIONARIA'), 'CRANEO_CONVOCADO'),
    
    # 16–17) Bebé Dragón + Piernas del Prohibido → Dragón de Fuego de la Tierra Negra
    (('BEBE_DRAGON', 'PIERNA_DERECHA_DEL_PROHIBIDO'), 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'),
    (('BEBE_DRAGON', 'PIERNA_IZQUIERDA_DEL_PROHIBIDO'), 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'),
    
    # 18–19) Dragón Alado + Brazos del Prohibido → Dragón de Fuego de la Tierra Negra
    (('DRAGON_ALADO', 'BRAZO_DERECHO_DEL_PROHIBIDO'), 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'),
    (('DRAGON_ALADO', 'BRAZO_IZQUIERDO_DEL_PROHIBIDO'), 'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA'),
    
    # 20) Brazo de Espada de Dragón + Adicto Kraken → Kairyu-Shin
    (('BRAZO_DE_ESPADA_DE_DRAGON', 'ADICTO_KRAKEN'), 'KAIRYU_SHIN'),
]


"""
    Determina si dos IDs de cartas producen una fusión válida.

    Parámetros:
        id1 (str) - ID de la primera carta.
        id2 (str) - ID de la segunda carta.

    Retorno:
        str | None - ID del resultado de la fusión, o None si no existe.
    """
def fusion_result_id(id1, id2):
    # Evitar fusionar la misma carta
    if id1 == id2:
        return None
    # Buscar en reglas de fusión
    for (pair, res) in FUSION_RULES:
        # Desempaquetar la pareja de cartas por fusionar
        a, b = pair
        # Verificar si coinciden (sin importar el orden)
        if (a == id1 and b == id2) or (a == id2 and b == id1):
            return res
    return None


# ============================================
#   DATOS DE CARTAS — SOLO STATS NECESARIOS
# ============================================
def lookup_card_stub(card_id):
    presets = {
        'DRAGON_MILENARIO': {'id':'DRAGON_MILENARIO','atk':2400,'def':2000},
        'GAIA_EL_CAMPEON_DRAGON': {'id':'GAIA_EL_CAMPEON_DRAGON','atk':2600,'def':2100},
        'MALDICION_DE_DRAGON': {'id':'MALDICION_DE_DRAGON','atk':2000,'def':1500},
        'BEBE_DRAGON': {'id':'BEBE_DRAGON','atk':1200,'def':700},
        'DRAGON_DE_KOUMORI': {'id':'DRAGON_DE_KOUMORI','atk':1500,'def':1200},
        'HOMBRE_JUEZ': {'id':'HOMBRE_JUEZ','atk':2200,'def':1500},
        'SEGADOR_DE_FUEGO': {'id':'SEGADOR_DE_FUEGO','atk':700,'def':500},
        'GRAN_MOTH': {'id':'GRAN_MOTH','atk':2600,'def':2500},
        'GRAN_MOTH_DEFINITIVO_PERFECTO': {'id':'GRAN_MOTH_DEFINITIVO_PERFECTO','atk':3500,'def':3000},
        'CRANEO_CONVOCADO': {'id':'CRANEO_CONVOCADO','atk':2500,'def':1200},
        'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA': {'id':'DRAGON_DE_FUEGO_DE_LA_TIERRA_NEGRA','atk':1500,'def':800},
        'KAIRYU_SHIN': {'id':'KAIRYU_SHIN','atk':1800,'def':1500},
    }
    # Si no está en presets, default genérico:
    return presets.get(card_id, {'id': card_id, 'atk': 1000, 'def': 1000})


# =========================================
#       CONVERSIONES DE ENTRADA
# =========================================

"""
El frontend puede enviar cartas como:
    "BEBE_DRAGON"
    { "id": "BEBE_DRAGON" }

Estas funciones normalizan el formato.
"""
# función para convertir la mano
def convert_hand(hand_list):
    result = []
    # Iterar cartas en mano
    for c in hand_list:
        if c is None:
            continue

        # Si viene como {"id": "..."}
        if isinstance(c, dict) and "id" in c:
            # Hace extracto del ID como card_id
            card_id = c["id"]
        # Si viene como "ID"
        elif isinstance(c, str):
            # Asigna directamente el ID
            card_id = c
        else:
            # Ignorar formato inválido
            continue
        # Agregar extracto de carta al resultado
        result.append(lookup_card_stub(card_id))
    # Retornar lista de cartas convertidas
    return result

# función para convertir el campo de juego
def convert_field(field_list):
    result = []
    for c in field_list:

        if c is None:
            result.append(None)
            continue

        # Si viene como {"id": "..."}
        if isinstance(c, dict) and "id" in c:
            card_id = c["id"]
        # Si viene como string
        elif isinstance(c, str):
            card_id = c
        else:
            result.append(None)
            continue

        result.append(lookup_card_stub(card_id))

    return result


# ====================================================
#            EVALUACIÓN DEL ESTADO (Heurística)
# ====================================================
"""
Evalúa un estado del tablero desde la perspectiva de la IA:

Factores:
- Diferencia de vida
- Fuerza total en campo
- Monstruos en campo
- Fusiones disponibles en mano

Mientras mayor sea el valor → mejor para la IA.
"""
def evaluate_state(state):
    # Calcular puntuación heurística
    score = 0

    # Bonus por vida
    ai_lp = state["ai"]["life"]
    p_lp = state["player"]["life"]
    score += (ai_lp - p_lp) * 0.05

    # Bonus por ataque total en campo
    ai_atk = sum(c["atk"] for c in state["ai"]["field"] if c)
    p_atk = sum(c["atk"] for c in state["player"]["field"] if c)
    score += (ai_atk - p_atk) * 2.0

    # Bonus por número de monstruos
    ai_count = sum(1 for c in state["ai"]["field"] if c)
    p_count = sum(1 for c in state["player"]["field"] if c)
    score += (ai_count - p_count) * 150

    # Bonus por resultados posibles de fusiones
    hand = state["ai"]["hand"]
    for i in range(len(hand)):
        for j in range(i+1, len(hand)):
            res = fusion_result_id(hand[i]["id"], hand[j]["id"])
            if res:
                stats = lookup_card_stub(res)
                score += stats["atk"] * 0.5

    return score


# ====================================================
#                 GENERAR MOVIMIENTOS
# ====================================================
"""
Devuelve la lista de todas las acciones posibles:
- Jugar un monstruo
- Hacer una fusión
- Atacar
- Pasar turno
"""
MAX_MONSTER_SLOTS = 5
# Generar movimientos posibles
def generate_moves(state, is_ai):
    hand = state["ai"]["hand"] if is_ai else state["player"]["hand"]
    field = state["ai"]["field"] if is_ai else state["player"]["field"]
    moves = []

    # Invocar monstruo si hay espacio
    if any(c is None for c in field):
        for c in hand:
            moves.append({"type": "play", "card_id": c["id"]})

    # Fusiones posibles
    for i in range(len(hand)):
        for j in range(i+1, len(hand)):
            res = fusion_result_id(hand[i]["id"], hand[j]["id"])
            if res:
                moves.append({
                    "type": "fusion",
                    "c1": hand[i]["id"],
                    "c2": hand[j]["id"],
                    "result": res
                })
    # Combatir y pasar turno
    moves.append({"type": "attack"})
    moves.append({"type": "pass"})
    return moves


# ====================================================
#         APLICAR UNA JUGADA AL ESTADO (Simulación)
# ====================================================
def apply_move(state, move, is_ai):
    """
    Devuelve un nuevo estado luego de aplicar la acción.
    Sirve para que el Minimax pueda simular escenarios.
    """
    s = copy.deepcopy(state)
    hand = s["ai"]["hand"] if is_ai else s["player"]["hand"]
    field = s["ai"]["field"] if is_ai else s["player"]["field"]
    
    # ------------------------------
    # Invocar carta
    # ------------------------------
    if move["type"] == "play":
        card = next((c for c in hand if c["id"] == move["card_id"]), None)
        if card:
            hand.remove(card)
            slot = next((i for i,c in enumerate(field) if c is None), None)
            if slot is not None:
                field[slot] = card

    # ------------------------------
    # Fusión
    # ------------------------------
    elif move["type"] == "fusion":
        c1 = next((c for c in hand if c["id"]==move["c1"]), None)
        c2 = next((c for c in hand if c["id"]==move["c2"]), None)

        if c1 and c2:
            hand.remove(c1)
            if c2 in hand:
                hand.remove(c2)

            result = lookup_card_stub(move["result"])
            slot = next((i for i,c in enumerate(field) if c is None), None)

            if slot is not None:
                field[slot] = result
            else:
                hand.append(result)

    # ------------------------------
    # Ataque directo o por posiciones
    # ------------------------------
    elif move["type"] == "attack":
        atk_field = s["ai"]["field"] if is_ai else s["player"]["field"]
        def_field = s["player"]["field"] if is_ai else s["ai"]["field"]
        def_lp = "player" if is_ai else "ai"

        for i in range(MAX_MONSTER_SLOTS):
            atk = atk_field[i]
            if not atk:
                continue

            df = def_field[i]
            if df:
                # combate 1v1
                if atk["atk"] > df["atk"]:
                    def_field[i] = None
                    s[def_lp]["life"] -= atk["atk"] - df["atk"]
                elif atk["atk"] < df["atk"]:
                    atk_field[i] = None
                    s["ai" if is_ai else "player"]["life"] -= df["atk"] - atk["atk"]
                else:
                    atk_field[i] = None
                    def_field[i] = None
            else:
                # ataque directo
                s[def_lp]["life"] -= atk["atk"]

    return s


# ====================================================
#                     MINIMAX + PODA
# ====================================================
"""
Algoritmo Minimax con poda alfa-beta.

depth  - Profundidad de búsqueda.
maximizing - Si la IA está maximizando o minimizando.
limit - Tiempo máximo por cálculo (seguridad).

"""
def minimax(state, depth, alpha, beta, maximizing, start_time, limit=0.45):
    # Condición de parada
    if depth == 0 or time.time() - start_time > limit:
        return evaluate_state(state), None

    moves = generate_moves(state, maximizing)
    best = None

    # --------------------------------
    # MAX (IA)
    # --------------------------------

    if maximizing:
        best_val = -1e9
        for m in moves:
            c = apply_move(state, m, True)
            val, _ = minimax(c, depth-1, alpha, beta, False, start_time)
            if val > best_val:
                best_val = val
                best = m
            alpha = max(alpha, val)
            if alpha >= beta:
                break
        return best_val, best
    
    # --------------------------------
    # MIN (Jugador)
    # --------------------------------
    else:
        best_val = 1e9 
        for m in moves:
            c = apply_move(state, m, False)
            val, _ = minimax(c, depth-1, alpha, beta, True, start_time)
            if val < best_val:
                best_val = val
                best = m
            beta = min(beta, val)
            if alpha >= beta:
                break
        return best_val, best


# ====================================================
#               ENDPOINT DE MOVIMIENTO IA
# ====================================================
@app.post("/ai-move")
def ai_move():
    payload = request.get_json()

    if not payload:
        return jsonify({"error": "no state received"}), 400
    
    # Normalizar estructura del estado
    state = {
        "ai": {
            "life": payload["ai"]["life"],
            "hand": convert_hand(payload["ai"]["hand"]),
            "field": convert_field((payload["ai"]["field"] + [None]*5)[:5]),
        },
        "player": {
            "life": payload["player"]["life"],
            "hand": convert_hand(payload["player"]["hand"]),
            "field": convert_field((payload["player"]["field"] + [None]*5)[:5]),
        },
    }

    score, best = minimax(state, 3, -1e9, 1e9, True, time.time())

    decision = {"summon": None, "battle_phase": False}

    # Construcción de la respuesta según la mejor jugada
    if best:
        # Fusión
        if best["type"] == "fusion":
            decision["summon"] = {
                "fusion": {
                    "c1": best["c1"],
                    "c2": best["c2"],
                    "result": best["result"]
                },
                "slot": next((i for i,c in enumerate(state["ai"]["field"]) if c is None), None)
            }
            decision["battle_phase"] = True
        # Invocación 
        elif best["type"] == "play":
            decision["summon"] = {
                "card": best["card_id"],
                "slot": next((i for i,c in enumerate(state["ai"]["field"]) if c is None), 0)
            }
            decision["battle_phase"] = True
        # Ataque
        elif best["type"] == "attack":
            decision["battle_phase"] = True

    return jsonify(decision)


# ====================================================
#                   INICIO DEL SERVIDOR
# ====================================================
if __name__ == "__main__":
    # Ejecutar la aplicación Flask
    app.run(host="0.0.0.0", port=8000)
