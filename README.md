# Cubo3D — Interactive 3D WebGL Material Explorer

![React](https://img.shields.io/badge/React-19-blue)
![Three.js](https://img.shields.io/badge/Three.js-r186-black)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)

Aplicación web interactiva en 3D para la visualización, inspección física y renderizado en tiempo real de materiales PBR (Physically Based Rendering), desarrollada con React 19, Three.js, React Three Fiber y TypeScript.

---

## 📌 Descripción

**Cubo3D** es una experiencia visual interactiva diseñada para demostrar capacidades avanzadas en gráficos por computadora para la web y arquitectura frontend moderna. La aplicación presenta un cubo geométrico redondeado flotante sobre una plataforma tecnológica con iluminación dinámica, sombras de contacto, partículas de brillo y una interfaz flotante tipo *glassmorphism*.

Permite al usuario interactuar libremente mediante controles orbitales de cámara, alternar modos de rotación y estructura de alambre (*wireframe*), y explorar diferentes paletas de materiales físicos con respuesta en tiempo real.

---

## 🚀 Características principales

- **Materiales PBR realistas (`MeshPhysicalMaterial`):**
  - Parámetros físicos avanzados: rugosidad (*roughness*), metalicidad (*metalness*), reflectividad (*reflectivity*) y capa de barniz transparente (*clearcoat*).
  - Material emisivo sutil con respuesta lumínica al pasar el cursor (*hover*).
  - Modo alternable de estructura alámbrica (*wireframe*).
- **Animaciones armónicas y respuesta háptica visual:**
  - Animación sinusoidal suave de flotación vertical interpolada mediante *lerp*.
  - Micro-animación de escala y brillo emisivo al interactuar con el modelo.
  - Rotación continua suave en ejes X e Y con opción de pausa instantánea.
- **Entorno escénico de alta fidelidad:**
  - Plataforma circular multicapa con iluminación perimetral acentuada.
  - Sombras de contacto de alta precisión (`ContactShadows`).
  - Campo estelar de fondo (`Stars`) y partículas de destellos procedurales (`Sparkles`).
  - Sistema de iluminación compuesto: luz ambiental, luz direccional cenital y luz puntual (*point light*) focalizada.
- **Paletas y temas cromáticos configurables:**
  - **Zafiro Cyber:** Azul cobalto futurista con reflejos cian.
  - **Esmeralda Neón:** Verde esmeralda de alta saturación.
  - **Amatista Místico:** Púrpura eléctrico y violeta.
  - **Rubí Obsidiana:** Carmesí profundo y contrastado.
  - **Ámbar Solar:** Dorado cálido e incandescente.
  - La interfaz HTML adapta dinámicamente sus variables CSS (`--active-accent`) al tono seleccionado.
- **Controles tácticos e interactividad:**
  - Rotación orbital libre de 360°, paneo y zoom mediante `OrbitControls`.
  - Botón de restablecimiento de perspectiva de cámara.
  - Atajos de teclado:
    - <kbd>Espacio</kbd>: Pausar / reanudar rotación automática.
    - <kbd>W</kbd>: Alternar modo alambre (*wireframe*).
    - <kbd>R</kbd>: Restablecer cámara a posición inicial.

---

## 🛠️ Tecnologías

- **Framework UI:** React 19.2.8
- **Motor 3D & WebGL:** Three.js 0.186.1
- **Integración React-Three:** `@react-three/fiber` 9.8.1
- **Utilidades 3D:** `@react-three/drei` 10.7.9
- **Lenguaje:** TypeScript 6.0.2
- **Bundler:** Vite 8.3.2
- **Linter & Calidad de Código:** Oxlint 1.81.0
- **Estilos:** CSS3 nativo con efecto Glassmorphism (`backdrop-filter: blur`), CSS Custom Properties y diseño accesible.

---

## 🏛️ Arquitectura del proyecto

```text
src/
├── components/
│   └── CubeScene.tsx     # Escena 3D WebGL (Canvas, luces, cubo flotante, plataforma, sombras)
├── types/
│   └── scene.ts          # Interfaces y catálogo de presets de color
├── App.tsx               # Orquestación de estado, atajos de teclado e interfaz HUD
├── App.css               # Estilos del HUD flotante, controles y paneles glassmorphism
├── index.css             # Reseteo global, tipografías del sistema y variables base
└── main.tsx              # Punto de entrada de la aplicación
```

---

## 📦 Instalación y uso

### Requisitos previos
- **Node.js** v18 o superior.
- Gestor de paquetes: `pnpm` (recomendado) o `npm`.

### 1. Clonar o ingresar al directorio del proyecto
```powershell
cd Cubo3D
```

### 2. Instalar dependencias
```powershell
pnpm install
# O con npm:
npm install
```

### 3. Ejecutar en modo desarrollo
```powershell
pnpm dev
# O con npm:
npm run dev
```
Abre en tu navegador la dirección indicada en consola (habitualmente `http://localhost:5173/`).

### 4. Compilar para producción
```powershell
pnpm build
# O con npm:
npm run build
```
Valida los tipos TypeScript estrictos (`tsc -b`) y empaqueta el bundle optimizado en `dist/`.

---

## 👤 Autor

Proyecto desarrollado por **Jhonatan David** como parte de su portafolio de proyectos de desarrollo frontend, gráficos 3D interactivos y computación visual.
