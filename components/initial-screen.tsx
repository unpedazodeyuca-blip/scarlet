"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

interface InitialScreenProps {
  onStart: () => void
}

export function InitialScreen({ onStart }: InitialScreenProps) {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 overflow-hidden"
    >
      {/* Particulas flotantes decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * dimensions.height],
              x: [null, Math.random() * dimensions.width],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Sparkles className="text-white/30" size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-lg" />
          </motion.div>

          {/* Brillo alrededor del corazon */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="w-24 h-24 bg-rose-400/50 rounded-full blur-xl" />
          </motion.div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button
            onClick={onStart}
            size="lg"
            className="font-cursive text-2xl px-8 py-6 bg-white text-rose-600 hover:bg-rose-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-rose-300"
          >
            {"Quieres un regalo?"}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-cursive text-rose-700 text-lg"
        >
          {"Haz clic para descubrir..."}
        </motion.p>
      </div>
    </motion.div>
  )
}
