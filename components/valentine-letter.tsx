"use client"

import { motion } from "framer-motion"
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

interface ValentineLetterProps {
  onCounter?: () => void
}

export function ValentineLetter({ onCounter }: ValentineLetterProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cherry-blossom-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-50/60 backdrop-blur-[2px]" />

      {/* Carta */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 max-w-2xl w-full mx-4 my-8 bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-200/60 overflow-hidden"
      >
        {/* Decoracion superior */}
        <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />

        <div className="px-6 py-8 md:px-10 md:py-12">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <p className="font-sans text-sm tracking-widest uppercase text-rose-400 mb-2">
              14 de febrero
            </p>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-rose-700 text-balance">
              Feliz San Valentin
            </h1>
          </motion.div>

          {/* Cuerpo de la carta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="space-y-5 font-sans text-base md:text-lg leading-relaxed text-rose-900/90"
          >
            <p className="font-semibold text-rose-700 text-lg md:text-xl">
              Mi amor, mi princesa, mi pequena hermosa:
            </p>

            <p>
              Hoy es San Valentin y aunque no te tenga cerquita, quiero que sepas que eres lo
              mas bonito que me ha pasado en la vida. No necesito flores caras ni regalos grandes
              para sentir este dia especial, porque con solo pensarte ya siento que el corazon se
              me llena completo.
            </p>

            <p>
              Desde que llegaste todo cambio, princesa. Llegaste como quien no hace ruido, pero
              termina moviendolo todo por dentro. Me hiciste sonreir mas, sonar mas, sentir mas. Y
              eso no lo logra cualquiera.
            </p>

            <p>
              Mi amor, tu tienes algo que no se explica con palabras. Tienes una forma de ser que
              calma, una risa que ilumina y una energia que enamora sin esfuerzo. A veces me
              pregunto como alguien puede ser tan especial sin intentarlo... y siempre llego a la
              misma respuesta: eres tu siendo tu.
            </p>

            <p>
              Hoy quiero agradecerle a la vida por haberte puesto en mi camino. Por cada
              conversacion, cada risa, cada momento bonito, cada pensamiento que me roba una
              sonrisa cuando te recuerdo.
            </p>

            <p>
              Pequena, contigo aprendi que el amor no es solo decir {'"'}te quiero{'"'}, sino
              pensar en alguien incluso cuando no esta, desearle lo mejor, cuidarla desde lejos y
              sentir paz solo con saber que existe.
            </p>

            <p>
              Yo no se que nos tenga preparado el futuro, pero si se algo: mientras tu estes en mi
              vida, mis dias seran mas bonitos. Quiero caminar contigo, crecer contigo, reir
              contigo y sonar contigo.
            </p>

            <p>
              Gracias por ser mi alegria, mi inspiracion y mi persona favorita.
            </p>

            <p>Gracias por existir.</p>

            <p className="font-semibold text-rose-700 text-lg md:text-xl">
              Feliz San Valentin, mi princesa hermosa.
            </p>

            <div className="pt-4 text-right">
              <p className="italic text-rose-600">Con todo mi corazon,</p>
              <p className="font-semibold text-rose-700 mt-1">
                tu loco enamorado que te quiere muchisimo.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Boton al contador */}
        {onCounter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="px-6 pb-8 md:px-10 flex justify-center"
          >
            <button
              onClick={onCounter}
              className="font-sans text-sm px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-shadow cursor-pointer border border-rose-400/30"
            >
              Ver nuestro tiempo juntos
            </button>
          </motion.div>
        )}

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
