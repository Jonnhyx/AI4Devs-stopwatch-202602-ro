# ⏱️ Pro Chrono Elite v4.0 — Analytics Edition

**Pro Chrono Elite** es una herramienta de cronometraje de alto rendimiento diseñada para profesionales que exigen precisión absoluta y análisis de datos inmediato. Olvida los cronómetros básicos; esta aplicación combina la precisión de la **Web Audio API** y **performance.now()** con visualización de datos en tiempo real mediante **Canvas HTML5**.

---

## ✨ Características Destacadas

### 🎯 Precisión Quirúrgica
A diferencia de los cronómetros estándar que usan `setInterval`, Pro Chrono Elite utiliza un motor basado en `requestAnimationFrame` y el diferencial de `performance.now()`.

### 📊 Análisis de Rendimiento (Smart Laps)
* **Gráfica en tiempo real:** Visualiza tu tendencia de velocidad mediante una gráfica de líneas generada dinámicamente en Canvas.
* **Delta Tracking:** El sistema calcula automáticamente la diferencia de tiempo ($\\Delta$) entre la serie actual y la anterior.

### ⏲️ Modo Dual Inteligente
* **Cronómetro:** Con sistema de series ilimitadas.
* **Cuenta Atrás Reactiva:** Interfaz inspirada en *Google Clock* con "Auto-tabbing", validación numérica estricta y botones de incremento rápido (+1m, +5m, etc.).

---

## 🛠️ Tecnologías Utilizadas

* **Motor:** JavaScript Vanilla (ES6+).
* **Renderizado:** HTML5 Canvas API.
* **Sonido:** Web Audio API.
* **Estilos:** CSS3 Moderno con variables personalizadas. 

---

## 🚀 Uso

Abre el archivo `index.html` en cualquier navegador moderno. ¡Empieza a medir tus récords!