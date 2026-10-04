import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Sparkles, RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { ColorPreset } from '../types/scene'

interface FloatingCubeProps {
  isRotating: boolean
  isWireframe: boolean
  preset: ColorPreset
}

function FloatingCube({ isRotating, isWireframe, preset }: FloatingCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const elapsedRef = useRef(0)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!meshRef.current) return

    // Rotación lenta y elegante
    if (isRotating) {
      meshRef.current.rotation.x += delta * 0.35
      meshRef.current.rotation.y += delta * 0.45
    }

    // Efecto de flotación armónica vertical acumulando delta
    elapsedRef.current += delta
    const t = elapsedRef.current
    const targetY = Math.sin(t * 1.5) * 0.12 + 0.15
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      targetY,
      delta * 4
    )

    // Respuesta visual suave al pasar el cursor (micro-animación)
    const targetScale = hovered ? 1.08 : 1.0
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 8
    )
  })

  return (
    <group position={[0, 0.2, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[1.5, 1.5, 1.5]}
        radius={0.07}
        smoothness={4}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        {isWireframe ? (
          <meshStandardMaterial
            wireframe
            color={preset.accentColor}
            emissive={preset.accentColor}
            emissiveIntensity={0.7}
          />
        ) : (
          <meshPhysicalMaterial
            color={preset.color}
            emissive={preset.emissive}
            emissiveIntensity={hovered ? 0.35 : 0.08}
            metalness={0.75}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        )}
      </RoundedBox>
    </group>
  )
}

function Platform({ accentColor }: { accentColor: string }) {
  return (
    <group position={[0, -1.35, 0]}>
      {/* Cilindro superior de la plataforma */}
      <mesh receiveShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[2.3, 2.45, 0.14, 64]} />
        <meshStandardMaterial
          color="#121622"
          metalness={0.65}
          roughness={0.32}
        />
      </mesh>

      {/* Base biselada inferior */}
      <mesh receiveShadow position={[0, -0.15, 0]}>
        <cylinderGeometry args={[2.5, 2.62, 0.08, 64]} />
        <meshStandardMaterial
          color="#0b0d13"
          metalness={0.8}
          roughness={0.5}
        />
      </mesh>

      {/* Anillo de luz en la superficie */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[2.08, 2.14, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Anillo concéntrico interno tenue */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.011, 0]}>
        <ringGeometry args={[1.38, 1.41, 64]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sombra de contacto suave proyectada en la base */}
      <ContactShadows
        position={[0, 0.015, 0]}
        opacity={0.8}
        scale={4.8}
        blur={2.2}
        far={3.2}
        color="#000000"
      />
    </group>
  )
}

interface SceneCanvasProps {
  isRotating: boolean
  isWireframe: boolean
  preset: ColorPreset
  resetTrigger: number
}

export function SceneCanvas({
  isRotating,
  isWireframe,
  preset,
  resetTrigger,
}: SceneCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null)

  // Restablece la posición de la cámara cuando cambia resetTrigger
  useEffect(() => {
    if (resetTrigger > 0 && controlsRef.current) {
      controlsRef.current.reset()
    }
  }, [resetTrigger])

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [3.8, 2.5, 4.3], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Fondo oscuro espacial */}
      <color attach="background" args={['#08090e']} />

      {/* Niebla tenue para profundidad visual */}
      <fog attach="fog" args={['#08090e', 11, 25]} />

      {/* 1. Iluminación ambiental uniforme */}
      <ambientLight intensity={0.45} />

      {/* 2. Luz principal direccional para sombras dinámicas y relieve */}
      <directionalLight
        position={[5, 7.5, 4.5]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-3.5}
        shadow-camera-right={3.5}
        shadow-camera-top={3.5}
        shadow-camera-bottom={-3.5}
        shadow-bias={-0.0004}
      />

      {/* 3. Luz de contorno (Rim light) con color de acento para volumen */}
      <directionalLight
        position={[-5, 3.5, -4]}
        intensity={0.95}
        color={preset.accentColor}
      />

      {/* 4. Luz puntual inferior para realzar el pedestal */}
      <pointLight
        position={[0, -0.8, 0]}
        intensity={0.8}
        distance={3.5}
        color={preset.accentColor}
      />

      {/* Partículas y estrellas sutiles de fondo */}
      <Stars
        radius={50}
        depth={40}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.8}
      />
      <Sparkles
        count={50}
        scale={6}
        size={2.2}
        speed={0.35}
        opacity={0.55}
        color={preset.accentColor}
      />

      {/* Objetos 3D */}
      <FloatingCube
        isRotating={isRotating}
        isWireframe={isWireframe}
        preset={preset}
      />
      <Platform accentColor={preset.accentColor} />

      {/* Controles orbitales con inercia y límites naturales */}
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.05}
        minDistance={2.4}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2 + 0.05}
      />
    </Canvas>
  )
}
