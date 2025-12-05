# 🃏 **Yu-Gi-Oh! Minimax**
Juego de cartas inspirado en **Yu-Gi-Oh! Forbidden Memories** con **IA Minimax**.

---

## 👨🏻‍💻 **Integrantes**

| Nombre                              | Código   |
|-------------------------------------|----------|
| **Sebastian Castro Rengifo**        | 2359435  |
| **Karol Tatiana Burbano Nasner**    | 2359305  |
| **Veronica Lorena Mujica**          | 2359406  |
| **Jeidy Nicol Murillo Murillo**     | 2359310  |

---

## 📌 **Descripción del Proyecto**

Este proyecto es una implementación web de un juego de cartas por turnos inspirado en **Yu-Gi-Oh! Forbidden Memories**, con reglas simplificadas:

- 🃑 **Invocación de monstruos**  
- ⚔️ **Batallas cuerpo a cuerpo**  
- 🔥 **Fusiones entre cartas** (según combinaciones predefinidas)  
- 🧠 **IA basada en Minimax con poda Alfa–Beta**  
- 📜 **Información perfecta**: ambos jugadores conocen todo el mazo desde el inicio  
- 🎮 **Juego completamente determinista**  

El objetivo principal es desarrollar una **IA competitiva**, capaz de evaluar estados futuros y tomar decisiones óptimas usando heurísticas y exploración del árbol de juego.

---

## 🎨 **Características Principales**

### 🔹 **Inteligencia Artificial (IA)**

La IA del juego se basa en:

- Algoritmo **Minimax** con **poda Alfa-Beta**
- Evaluación heurística de estados considerando:
  - ❤️ Puntos de vida restantes  
  - 💥 Fuerza total en el campo  
  - 🖐️ Tamaño de la mano  
  - 🔁 Potencial de fusión  
- Profundidad configurable para ajustar rendimiento vs. calidad estratégica  

---

### 🔹 **Reglas Especiales del Proyecto**

- 📘 Ambos jugadores conocen desde el inicio **todas las cartas y su orden en el mazo**  
- 🐉 Solo se utilizan **cartas de monstruo**  
- 🧬 Fusiones implementadas mediante **tabla de combinaciones**  
- ✨ No se incluyen cartas de magia ni trampa  

---

