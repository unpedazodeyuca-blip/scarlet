"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Html } from "@react-three/drei"
import { motion } from "framer-motion"
import { useRef } from "react"
import type * as THREE from "three"

function CentralText() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={10}>
        <div className="text-6xl font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 whitespace-nowrap animate-pulse">
          {"Scarlet \u2764\uFE0F"}
        </div>
      </Html>
    </group>
  )
}

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color="#ff69b4" transparent opacity={0.2} />
    </mesh>
  )
}

function OrbitingWord({
  text,
  radius,
  speed,
  offset,
}: { text: string; radius: number; speed: number; offset: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      const angle = time * speed + offset

      groupRef.current.position.x = Math.cos(angle) * radius
      groupRef.current.position.z = Math.sin(angle) * radius
      groupRef.current.position.y = Math.sin(time * 0.5 + offset) * 1.5

      groupRef.current.lookAt(0, groupRef.current.position.y, 0)
    }
  })

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8}>
        <div className="text-2xl font-sans font-semibold text-white drop-shadow-[0_0_10px_rgba(255,105,180,0.8)] whitespace-nowrap">
          {text}
        </div>
      </Html>
    </group>
  )
}

function Scene() {
  const words = [
    { text: "amor", radius: 5, speed: 0.5, offset: 0 },
    { text: "pequena", radius: 6, speed: 0.4, offset: Math.PI / 3 },
    { text: "corazon", radius: 7, speed: 0.6, offset: Math.PI / 2 },
    { text: "te amo", radius: 5.5, speed: 0.45, offset: Math.PI },
    { text: "mi vida", radius: 6.5, speed: 0.55, offset: Math.PI * 1.5 },
    { text: "hermosa", radius: 8, speed: 0.35, offset: Math.PI / 4 },
    { text: "preciosa", radius: 5.8, speed: 0.48, offset: Math.PI * 0.7 },
    { text: "carino", radius: 7.5, speed: 0.42, offset: Math.PI * 1.2 },
    { text: "dulzura", radius: 6.8, speed: 0.52, offset: Math.PI * 0.9 },
    { text: "tesoro", radius: 8.5, speed: 0.38, offset: Math.PI * 1.8 },
    { text: "princesa", radius: 7.2, speed: 0.46, offset: Math.PI / 6 },
    { text: "angel", radius: 6.3, speed: 0.44, offset: Math.PI * 1.4 },
    { text: "luz", radius: 5.3, speed: 0.58, offset: Math.PI * 0.5 },
    { text: "estrella", radius: 8.2, speed: 0.36, offset: Math.PI * 1.6 },
    { text: "cielo", radius: 7.8, speed: 0.41, offset: Math.PI / 8 },
    { text: "alma", radius: 6.6, speed: 0.49, offset: Math.PI * 1.1 },
    { text: "sueno", radius: 5.6, speed: 0.54, offset: Math.PI * 0.8 },
    { text: "felicidad", radius: 8.8, speed: 0.33, offset: Math.PI * 1.9 },
    { text: "sonrisa", radius: 7.4, speed: 0.43, offset: Math.PI * 1.3 },
    { text: "milagro", radius: 6.9, speed: 0.47, offset: Math.PI / 5 },
    { text: "regalo", radius: 5.4, speed: 0.56, offset: Math.PI * 0.6 },
    { text: "magia", radius: 8.3, speed: 0.37, offset: Math.PI * 1.7 },
    { text: "inspiracion", radius: 7.6, speed: 0.39, offset: Math.PI / 7 },
    { text: "pasion", radius: 6.4, speed: 0.51, offset: Math.PI * 1.05 },
    { text: "ternura", radius: 5.7, speed: 0.53, offset: Math.PI * 0.75 },
    { text: "belleza", radius: 8.6, speed: 0.34, offset: Math.PI * 1.85 },
    { text: "encanto", radius: 7.1, speed: 0.45, offset: Math.PI * 1.25 },
    { text: "adoracion", radius: 6.7, speed: 0.5, offset: Math.PI / 9 },
    { text: "devocion", radius: 8.4, speed: 0.4, offset: Math.PI * 1.65 },
    { text: "eternidad", radius: 7.9, speed: 0.32, offset: Math.PI / 10 },
  ]

  const uniqueRadii = Array.from(new Set(words.map((w) => w.radius))).sort((a, b) => a - b)

  return (
    <>
      {/* Iluminacion */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff69b4" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ff1493" />

      {/* Estrellas de fondo */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Texto central */}
      <CentralText />

      {/* Lineas de orbita */}
      {uniqueRadii.map((radius, index) => (
        <OrbitRing key={index} radius={radius} />
      ))}

      {/* Palabras orbitando */}
      {words.map((word, index) => (
        <OrbitingWord key={index} {...word} />
      ))}

      {/* Controles de orbita */}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

interface SolarSystemProps {
  onValentine?: () => void
}

export function SolarSystem({ onValentine }: SolarSystemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black"
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>

      {/* Overlay con instrucciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="font-cursive text-pink-300 text-xl drop-shadow-lg">
          Arrastra para explorar el universo de nuestro amor
        </p>
      </motion.div>

      {/* Boton hacia la carta de San Valentin */}
      {onValentine && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onValentine}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-sans text-sm font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-shadow cursor-pointer border border-rose-400/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          Carta de San Valentin
        </motion.button>
      )}
    </motion.div>
  )
}
