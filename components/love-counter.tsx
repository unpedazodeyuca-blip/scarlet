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

const START_DATE = new Date("2025-10-03T00:00:00")

function getElapsed() {
  const now = new Date()

  let years = now.getFullYear() - START_DATE.getFullYear()
  let months = now.getMonth() - START_DATE.getMonth()
  let days = now.getDate() - START_DATE.getDate()
  let hours = now.getHours() - START_DATE.getHours()
  let minutes = now.getMinutes() - START_DATE.getMinutes()
  let seconds = now.getSeconds() - START_DATE.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes--
  }
  if (minutes < 0) {
    minutes += 60
    hours--
  }
  if (hours < 0) {
    hours += 24
    days--
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
    months--
  }
  if (months < 0) {
    months += 12
    years--
  }

  const totalMonths = years * 12 + months

  return { months: totalMonths, days, hours, minutes, seconds }
}

function CounterUnit({
  value,
  label,
  delay,
}: {
  value: number
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-2xl bg-white/80 backdrop-blur-sm border border-rose-200/60 shadow-lg">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-3xl md:text-5xl font-bold text-rose-700 tabular-nums"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </div>
      </div>
      <span className="font-sans text-xs md:text-sm font-medium text-rose-500 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  )
}

export function LoveCounter() {
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })
  const [elapsed, setElapsed] = useState(getElapsed)

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsed())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const petals = Array.from({ length: 20 }, (_, i) => ({
    delay: Math.random() * 10,
    startX: Math.random() * dimensions.width,
  }))

  const units = [
    { value: elapsed.months, label: "Meses" },
    { value: elapsed.days, label: "Dias" },
    { value: elapsed.hours, label: "Horas" },
    { value: elapsed.minutes, label: "Minutos" },
    { value: elapsed.seconds, label: "Segundos" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cherry-blossom-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-pink-50/60 backdrop-blur-[2px]" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-4">
        {/* Titulo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <p className="font-sans text-sm tracking-widest uppercase text-rose-400 mb-2">
            Nuestro amor lleva
          </p>
          <h1 className="font-sans text-3xl md:text-5xl font-bold text-rose-700 text-balance">
            Juntos desde ese dia
          </h1>
        </motion.div>

        {/* Contador */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          {units.map((unit, i) => (
            <CounterUnit
              key={unit.label}
              value={unit.value}
              label={unit.label}
              delay={0.5 + i * 0.15}
            />
          ))}
        </div>

        {/* Mensaje */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-lg md:text-xl text-rose-600/80 text-center max-w-md"
        >
          Y cada segundo a tu lado vale la pena.
        </motion.p>

        {/* Corazon decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
        >
          <motion.svg
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 md:w-14 md:h-14 text-rose-500"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Petalos cayendo por encima */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {petals.map((petal, i) => (
          <FallingPetal key={i} delay={petal.delay} startX={petal.startX} />
        ))}
      </div>
    </motion.div>
  )
}
