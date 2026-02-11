'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export function MagneticCursor() {
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(true)
  const [hoveringMagnetic, setHoveringMagnetic] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const { clientX, clientY } = e

      const target = document.elementFromPoint(clientX, clientY)
      const magneticEl = target?.closest('[data-magnetic]') as HTMLElement | null

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const pullStrength = 0.35
        const magnetX = clientX + (centerX - clientX) * pullStrength
        const magnetY = clientY + (centerY - clientY) * pullStrength

        cursorX.set(magnetX)
        cursorY.set(magnetY)

        if (!hoveringMagnetic) setHoveringMagnetic(true)
      } else {
        cursorX.set(clientX)
        cursorY.set(clientY)

        if (hoveringMagnetic) setHoveringMagnetic(false)
      }

      if (!visible) setVisible(true)
    },
    [cursorX, cursorY, visible, hoveringMagnetic]
  )

  const handleMouseLeave = useCallback(() => {
    setVisible(false)
    setHoveringMagnetic(false)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia('(pointer: coarse)')
    if (mql.matches) {
      setIsTouch(true)
      return
    }
    setIsTouch(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  if (isTouch || prefersReducedMotion) return null

  return (
    <motion.div
      data-testid="custom-cursor"
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: hoveringMagnetic ? 2.5 : 1,
      }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      <div
        className="rounded-full bg-orange-500"
        style={{
          width: 16,
          height: 16,
        }}
      />
    </motion.div>
  )
}
