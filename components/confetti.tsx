"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

export function useConfetti() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [showConfetti])

  return { triggerConfetti: () => setShowConfetti(true) }
}

