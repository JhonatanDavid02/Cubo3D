import { useState, useEffect, type CSSProperties } from 'react'
import { SceneCanvas } from './components/CubeScene'
import { COLOR_PRESETS, type ColorPreset } from './types/scene'
import './App.css'

export default function App() {
  const [isRotating, setIsRotating] = useState(true)
  const [isWireframe, setIsWireframe] = useState(false)
  const [activePreset, setActivePreset] = useState<ColorPreset>(COLOR_PRESETS[0])
  const [resetTrigger, setResetTrigger] = useState(0)

  // Atajos de teclado para mayor comodidad
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar si el usuario está interactuando con inputs (si los hubiera)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.code === 'Space') {
        e.preventDefault()
        setIsRotating((prev) => !prev)
      } else if (e.key === 'r' || e.key === 'R') {
        setResetTrigger((prev) => prev + 1)
      } else if (e.key === 'w' || e.key === 'W') {
        setIsWireframe((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const containerStyle = {
    '--active-accent': activePreset.accentColor,
  } as CSSProperties

  return (
    <main className="app-container" style={containerStyle}>
      {/* 1. Header minimalista flotante */}
      <header className="scene-header glass-panel" aria-label="Información de la escena">
        <div className="brand">
          <svg
            className="brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.9 6.4A2 2 0 0 0 2 8.18v7.64a2 2 0 0 0 .9 1.78l9.98 4.1a2 2 0 0 0 2.22 0l6.02-4.1a2 2 0 0 0 .88-1.78V8.18a2 2 0 0 0-.88-1.78Z" />
            <path d="M12 22V12" />
            <path d="m3.29 7 8.71 5 8.71-5" />
          </svg>
          <span className="brand-title">Cubo 3D</span>
        </div>
        <div className="status-badge">
          <span className="pulse-dot" />
          <span>R3F + Three.js</span>
        </div>
      </header>

      {/* 2. Indicadores de interacción superior derecho */}
      <div className="interaction-hint glass-panel" aria-hidden="true">
        <div className="hint-item">
          <span>Rotar:</span> <kbd>Arrastrar</kbd>
        </div>
        <div className="hint-item">
          <span>Zoom:</span> <kbd>Rueda</kbd>
        </div>
        <div className="hint-item">
          <span>Pausa:</span> <kbd>Espacio</kbd>
        </div>
      </div>

      {/* 3. Escena 3D WebGL Canvas */}
      <section className="canvas-wrapper" aria-label="Visualizador 3D interactivo">
        <SceneCanvas
          isRotating={isRotating}
          isWireframe={isWireframe}
          preset={activePreset}
          resetTrigger={resetTrigger}
        />
      </section>

      {/* 4. Barra de controles flotante inferior */}
      <nav className="controls-bar glass-panel" aria-label="Controles del modelo 3D">
        {/* Alternar Rotación */}
        <button
          type="button"
          className={`control-btn ${isRotating ? 'active' : ''}`}
          onClick={() => setIsRotating((prev) => !prev)}
          title={isRotating ? 'Pausar rotación (Espacio)' : 'Reanudar rotación (Espacio)'}
          aria-label={isRotating ? 'Pausar rotación' : 'Reanudar rotación'}
        >
          {isRotating ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
          <span>{isRotating ? 'Pausar' : 'Rotar'}</span>
        </button>

        {/* Modo Malla (Wireframe) */}
        <button
          type="button"
          className={`control-btn ${isWireframe ? 'active' : ''}`}
          onClick={() => setIsWireframe((prev) => !prev)}
          title="Alternar estructura alámbrica (W)"
          aria-label="Alternar modo alámbrico"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M3 15h18" />
            <path d="M9 3v18" />
            <path d="M15 3v18" />
          </svg>
          <span>Malla</span>
        </button>

        {/* Restablecer vista de cámara */}
        <button
          type="button"
          className="control-btn"
          onClick={() => setResetTrigger((prev) => prev + 1)}
          title="Centrar cámara (R)"
          aria-label="Restablecer vista inicial"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Centrar</span>
        </button>

        <div className="separator" aria-hidden="true" />

        {/* Selector de paleta de colores */}
        <div className="palette-group" role="radiogroup" aria-label="Selección de material y color">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              role="radio"
              aria-checked={activePreset.id === preset.id}
              className={`color-swatch ${activePreset.id === preset.id ? 'active' : ''}`}
              style={{
                backgroundColor: preset.color,
                '--swatch-color': preset.accentColor,
              } as CSSProperties}
              onClick={() => setActivePreset(preset)}
              title={preset.name}
              aria-label={`Color ${preset.name}`}
            />
          ))}
        </div>
      </nav>
    </main>
  )
}
