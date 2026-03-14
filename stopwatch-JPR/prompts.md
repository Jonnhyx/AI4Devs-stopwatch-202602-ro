#Primer prompt

Rol:
Eres un Principal Software Engineer & Data Visualization Expert. Tu misión es construir una herramienta de cronometraje de grado profesional, con alta precisión, análisis de series y visualización de datos en tiempo real.

Contexto:
Debes desarrollar una SPA (Single Page Application) que combine un cronómetro/cuenta atrás inspirado en stopwatch.png con un panel de analíticas avanzadas.

Resultado Deseado (Arquitectura de Élite):

Motor de Tiempo de Alta Fidelidad:

Usa requestAnimationFrame y la diferencia de marcas de tiempo (performance.now()) para evitar el drift (desfase) de los temporizadores estándar.

Soporte para Cronómetro (Count-up) y Cuenta Atrás (Countdown).

Módulo de Análisis y Gráficas (Data Viz):

Gráfica de Tendencia: Implementa una gráfica lineal simple usando HTML5 Canvas (sin librerías externas para máxima ligereza).

La gráfica debe actualizarse automáticamente cada vez que se registre una Serie (Lap), mostrando la evolución de los tiempos.

Identificación de Récords: Resalta automáticamente en la tabla de series cuál ha sido la vuelta más rápida (Verde) y la más lenta (Rojo).

Sistema de Audio Sintetizado (Web Audio API):

Genera tonos de frecuencia (Oscillators) por código: un "beep" corto para Laps y una secuencia de alerta para el final de la cuenta atrás. No uses archivos .mp3.

UX y UI de Alto Nivel:

Diseño: Estética "Dark Mode" profesional con los colores de la referencia (#4CAF50 y #F44336) para los estados activos.

Tipografía: Obligatorio el uso de fuentes monoespaciadas para que los dígitos no oscilen.

Hotkeys: Space (Start/Stop), L (Lap), R (Reset).

Persistencia y Exportación:

Sincronización con localStorage.

Botón para Exportar a CSV con el historial de series y sus deltas (diferencias de tiempo).

Estructura del Código:

Modularidad: Divide el código en objetos claros: TimerEngine, AudioEngine, ChartEngine y UIManager.

Documentación: Comentarios JSDoc detallando la lógica de los cálculos de tiempo y el renderizado del Canvas.

Salida:

index.html: Estructura semántica con el contenedor del Canvas y la tabla de datos.

styles.css: Estilos modernos, responsive, con variables CSS y transiciones fluidas.

script.js: El corazón lógico, incluyendo el dibujo en Canvas y el sintetizador de audio.


# Segundo prompt

Rol:
Eres un Senior Frontend Developer & UI/UX Specialist. Tu misión es refactorizar un prototipo de cronómetro para convertirlo en una herramienta funcional, robusta y con una interfaz de usuario "pixel-perfect".

Contexto:
El prototipo actual presenta fallos críticos en la lógica de la cuenta atrás, el cambio de tema y la exportación de datos. Se requiere una reconstrucción de estos módulos siguiendo las mejores prácticas de usabilidad.

Resultado Deseado (Mejoras Técnicas Obligatorias):

Módulo de Cuenta Atrás (Fix & UX):

Sustituir los inputs genéricos por un Selector de Tiempo Amigable (puedes usar botones predefinidos de +1m, +5m, +10s y un campo de texto con validación tipo HH:MM:SS).

Asegurar que al iniciar la cuenta atrás, el motor descuente el tiempo correctamente y dispare el evento de finalización.

Sistema de Temas (Theming Engine):

Refactorizar el botón #theme-toggle. Debe alternar entre Modo Día (Sol ☀️) y Modo Noche (Luna 🌙).

El cambio de tema debe afectar a toda la paleta de colores (variables CSS) y guardarse en localStorage para que persista al recargar.

Exportación de Datos (CSV Fix):

Implementar la función de descarga real. Al pulsar "Exportar CSV", el navegador debe generar un archivo .csv descargable con las columnas: Serie #, Tiempo de Serie, Diferencia (Delta), Tiempo Total.

UI/UX Amigable (Basado en estándares modernos):

Feedback Visual: Los botones deben cambiar de estado (color/escala) al pasar el cursor y al ser pulsados.

Microinteracciones: Añadir una transición suave (0.3s) al cambiar entre modo Cronómetro y Cuenta Atrás.

Jerarquía Visual: El display principal debe ser el elemento más destacado, usando sombras sutiles (neumorfismo o diseño plano moderno).

Tono y Estilo:
Profesional, enfocado en la solución de errores y en la estética visual. El código debe ser modular y estar listo para producción.

Salida Requerida:

HTML: Actualizado con los nuevos selectores de tiempo y el toggle de tema corregido.

CSS: Incluyendo las definiciones completas para :root (Light) y [data-theme="dark"].

JS: Lógica corregida para la cuenta atrás, el manejo de eventos del tema y la función de exportación de archivos mediante un Blob.

# Tercer prompt

Rol:
Eres un Lead UI/UX Engineer. Tu objetivo es pulir la interactividad de la aplicación "Pro Chrono Elite", asegurando que cada acción del usuario tenga una respuesta visual clara y que todas las funciones analíticas (gráficas) sean robustas.

Contexto:
Estamos refinando la versión 2.0. Aunque la estructura es buena, hay fallos de visibilidad en los controles de tiempo, la gráfica de rendimiento no se renderiza y la respuesta táctil/visual de los botones es insuficiente.

Instrucciones Técnicas y de Diseño (Correcciones Críticas):

Feedback Visual y Estados (CSS):

Botones de Modo: Al seleccionar "Cronómetro" o "Cuenta Atrás", el botón activo debe cambiar drásticamente de color (ej. un fondo sólido vibrante vs. uno traslúcido para el inactivo) para que el usuario sepa dónde está.

Interacción Global: Todos los elementos interactivos (button, input, .tab-btn) deben mostrar cursor: pointer al pasar el ratón.

Theme Toggle: Duplica el tamaño del botón de cambio de tema y añade un efecto de rotación suave al cambiar entre ☀️ y 🌙.

Módulo de Cuenta Atrás (UI Fix):

Asegúrate de que los botones de incremento rápido (+1s, +5s, +10s, +30s) sean claramente visibles, con un diseño tipo "píldora" y bien alineados bajo el display.

El panel de configuración debe ser el foco visual principal cuando el modo "Cuenta Atrás" esté activo.

Restauración de la Gráfica (Canvas Engine):

Re-implementa la lógica de dibujo en el canvas. La gráfica debe:

Dibujar una línea de tendencia basada en la duración de las series (laps).

Ajustar su escala automáticamente según el tiempo máximo registrado.

Limpiarse correctamente al presionar "Reiniciar".

Pulido de Código:

Asegúrate de que la clase ProTimer gestione correctamente la actualización del Canvas cada vez que se ejecute addLap().

El botón de exportación CSV debe capturar todos los datos actuales del array de laps.

Tono y Estilo:
Foco absoluto en la usabilidad. Cada interacción debe sentirse "viva". Código limpio, modular y sin dependencias externas.

Salida Requerida:

index.html: Con la estructura de botones de tiempo corregida.

styles.css: Con los estados :hover, :active, los cursores y el nuevo diseño de pestañas.

script.js: Con la lógica de la gráfica (Canvas) totalmente integrada en la clase principal.