"use client"

import { useState, useRef } from "react"
import { PasswordScreen } from "@/components/password-screen"
import { InitialScreen } from "@/components/initial-screen"
import { LoveLetter } from "@/components/love-letter"
import { SolarSystem } from "@/components/solar-system"
import { ValentineLetter } from "@/components/valentine-letter"
import { LoveCounter } from "@/components/love-counter"

const AUDIO_URL = "https://files.catbox.moe/f12xpy.mp3"

export default function Page() {
  const [currentSection, setCurrentSection] = useState<"password" | "initial" | "letter" | "solar" | "valentine" | "counter">("password")
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioError, setAudioError] = useState(false)

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir audio:", error.message)
        setAudioError(true)
      })
    }
    setCurrentSection("letter")
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => setAudioError(true)}
        onCanPlay={() => setAudioError(false)}
      >
        <source src={AUDIO_URL} type="audio/mpeg" />
      </audio>

      {audioError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-rose-500/90 text-white px-6 py-3 rounded-lg text-sm backdrop-blur-sm max-w-md text-center shadow-lg">
          <p className="font-semibold mb-1">Musica no disponible</p>
          <p className="text-xs opacity-90">No se pudo cargar el audio. Verifica la conexion.</p>
        </div>
      )}

      {currentSection === "password" && <PasswordScreen onSuccess={() => setCurrentSection("initial")} />}
      {currentSection === "initial" && <InitialScreen onStart={handleStart} />}
      {currentSection === "letter" && <LoveLetter onNext={() => setCurrentSection("solar")} />}
      {currentSection === "solar" && <SolarSystem onValentine={() => setCurrentSection("valentine")} />}
      {currentSection === "valentine" && <ValentineLetter onCounter={() => setCurrentSection("counter")} />}
      {currentSection === "counter" && <LoveCounter />}
    </main>
  )
}
