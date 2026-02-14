"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Lock } from "lucide-react"

interface PasswordScreenProps {
  onSuccess: () => void
}

export function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const [answer, setAnswer] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (answer.trim().toLowerCase() === "scarlet") {
      setError(false)
      setSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 800)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo de cerezo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cherry-blossom-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-950/40 backdrop-blur-[3px]" />

      {/* Tarjeta de contrasena */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-4"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-rose-200/60 overflow-hidden">
          {/* Barra decorativa superior */}
          <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />

          <div className="px-8 py-10 flex flex-col items-center gap-6">
            {/* Icono de candado */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center border border-rose-200/60"
            >
              <Lock className="w-7 h-7 text-rose-500" />
            </motion.div>

            {/* Pregunta */}
            <div className="text-center space-y-2">
              <h2 className="font-sans text-xl font-bold text-rose-800">
                Antes de entrar...
              </h2>
              <p className="font-sans text-base text-rose-700/90 leading-relaxed">
                {"Como se llama mi pequena?"}
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-900 font-sans text-base placeholder:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-sans text-base font-semibold shadow-lg shadow-rose-500/25 hover:shadow-xl hover:shadow-rose-500/35 transition-shadow cursor-pointer border border-rose-400/30"
              >
                Entrar
              </motion.button>
            </form>

            {/* Mensajes de error/exito */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="error"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-sans text-sm text-rose-600 text-center"
                >
                  Esa no es la respuesta correcta, intenta de nuevo.
                </motion.p>
              )}
              {success && (
                <motion.p
                  key="success"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="font-sans text-sm text-emerald-600 text-center font-semibold"
                >
                  Correcto! Bienvenida, princesa.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Barra decorativa inferior */}
          <div className="h-2 bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300" />
        </div>
      </motion.div>
    </motion.div>
  )
}
