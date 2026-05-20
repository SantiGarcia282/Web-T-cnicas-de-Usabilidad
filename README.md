# Técnicas de Usabilidad (UX Research Methods)

Una aplicación web Single Page Application (SPA) interactiva diseñada para explorar, filtrar y consultar un catálogo completo de **34 Técnicas de Usabilidad** e Investigación de Experiencia de Usuario (UX Research).

## 🚀 Características

- **Catálogo Completo**: Contiene 34 fichas técnicas detalladas sobre métodos de investigación UX (ej. Análisis Heurístico, Card Sorting, Usability Testing, etc.).
- **Filtrado Dinámico**: Permite filtrar las técnicas por múltiples criterios como:
  - Categoría (Inspección, Prueba de Usuario, Indagación)
  - Momento de uso
  - Tipo de dato (Cualitativo, Cuantitativo, Mixto)
  - Coste y tiempo estimado
  - Necesidad de moderador o prueba piloto
- **Búsqueda Integrada**: Buscador en tiempo real para encontrar técnicas rápidamente por nombre o descripción.
- **Vista Detallada**: Cada técnica despliega una ficha con 24 puntos de análisis exhaustivo (objetivos, perfil de participantes, limitaciones, formato de informe, etc.).
- **Arquitectura SPA**: Navegación fluida y rápida sin recargas de página mediante manipulación dinámica del DOM.
- **Diseño Responsive**: Interfaz moderna y adaptable a dispositivos móviles, tablets y escritorio.

## 🛠️ Tecnologías Utilizadas

Este proyecto está construido íntegramente con tecnologías web estándar, sin dependencias externas pesadas:

- **HTML5**: Estructura semántica.
- **CSS3**: Estilos, variables CSS (Custom Properties), Flexbox, Grid y animaciones fluidas (Vanilla CSS).
- **JavaScript (ES6+)**: Lógica de renderizado, sistema de enrutamiento SPA, filtrado avanzado y manipulación del DOM.

## 📂 Estructura del Proyecto

```text
📦 WEB_Final
 ┣ 📜 index.html   # Archivo principal y estructura base de la web
 ┣ 📜 style.css    # Hoja de estilos de la interfaz
 ┗ 📜 script.js    # Lógica de la aplicación, motor de filtros y base de datos (JSON)
```

## ⚙️ Instalación y Uso

Dado que es una aplicación estática (Frontend Vanilla), no requiere compilación ni instalación de módulos complejos. Para ejecutarla localmente:

### Opción 1: Ejecución Directa
1. Clona o descarga el repositorio.
2. Haz doble clic en el archivo `index.html` para abrirlo directamente en tu navegador web.

### Opción 2: Servidor Local (Recomendado)
Para una mejor experiencia y evitar restricciones de CORS del navegador con módulos locales:

Usando **Node.js**:
```bash
npx serve .
```

Usando **Python**:
```bash
python -m http.server 8000
```
Luego visita `http://localhost:8000` en tu navegador.

## 📝 Datos de las Fichas

Toda la información de las 34 fichas ha sido volcada y estructurada como objetos en JavaScript (`script.js`). La extracción cubre 24 puntos fundamentales para estandarizar la ejecución de pruebas de usuario e investigación de campo en proyectos de HCI (Interacción Persona-Ordenador).
