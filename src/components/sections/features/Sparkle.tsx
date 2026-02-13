'use client'

import { motion } from 'motion/react'

interface SparkleProps {
  width: string
  delay?: number
}

export function Sparkle({ width, delay = 0 }: SparkleProps) {
  return (
    <motion.svg
      className={`${width} text-orange-200 origin-center`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{
        opacity: [0.2, 1, 0.2],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </motion.svg>
  )
}
