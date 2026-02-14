"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

function FallingPetal({ delay, startX }: { delay: number; startX: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: startX,
        y: -40,
        rotate: 0,
        opacity: 0.7,
      }}
      animate={{
        y: "110vh",
        x: [startX, startX + 60, startX - 40, startX + 30],
        rotate: [0, 120, 240, 360],
        opacity: [0.7, 0.9, 0.8, 0],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 md:w-6 md:h-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={`rgba(255, ${140 + Math.floor(Math.random() * 60)}, ${160 + Math.floor(Math.random() * 40)}, ${0.4 + Math.random() * 0.3})`}
        />
      </svg>
    </motion.div>
  )
}

interface LoveLetterProps {
  onNext: () => void
}

export function LoveLetter({ onNext }: LoveLetterProps) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  const petals = Array.from({ length: 25 }, (_, i) => ({
    delay: Math.random() * 10,
    startX: Math.random() * dimensions.width,
  }))

  const letterParagraphs = [
    "Una chica linda, hermosa y preciosa que conoci por internet. Con sus inseguridades, sus miedos y sus defectos, pero aun asi es una persona increible.",
    "Nunca supe que palabras decirle, pero todos los dias pienso en ella, aunque quizas no lo sepa.",
    "Me encanta su risa, su voz, su acento... practicamente todo de ella.",
    "A veces me manda regalitos hermosos --aunque no sean cosas materiales, sino fotos suyas-- que no tienen precio alguno, porque lo que me da es un pedacito de su carino.",
    "Y aunque no pueda tenerla cerca, se que la amo con cada parte de mi. No la veo como un objeto o una posesion, sino como alguien unica, dificil de describir con palabras.",
    "Ella es hermosa tal y como es, y no cambiaria nada de ella.",
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo de cerezo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cherry-blossom-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-50/60 backdrop-blur-[2px]" />

      {/* Carta */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full mx-4 my-8 bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-200/60 overflow-hidden"
      >
        {/* Decoracion superior */}
        <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />

        <div className="px-6 py-8 md:px-10 md:py-12">
          {/* Titulo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-rose-700 text-balance">
              Corazon
            </h1>
          </motion.div>

          {/* Contenido de la carta */}
          <div className="space-y-5">
            {letterParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
                className="font-sans text-base md:text-lg leading-relaxed text-rose-900/90 text-center"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Boton siguiente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + letterParagraphs.length * 0.3 + 0.5 }}
            className="mt-10 flex justify-center"
          >
            <Button
              onClick={onNext}
              size="lg"
              className="font-sans text-base px-8 py-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Siguiente
            </Button>
          </motion.div>
        </div>

        {/* Decoracion inferior */}
        <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />
      </motion.div>

      {/* Petalos cayendo por encima de la carta */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {petals.map((petal, i) => (
          <FallingPetal key={i} delay={petal.delay} startX={petal.startX} />
        ))}
      </div>
    </motion.div>
  )
}
