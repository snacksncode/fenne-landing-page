'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'




function LeafSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 4C16 4 8 8 6 16C4 24 10 28 16 28C22 28 28 24 26 16C24 8 16 4 16 4Z"
        fill="currentColor"
      />
      <path
        d="M16 8V24M16 16C13 13 10 12 10 12M16 20C19 17 22 16 22 16"
        stroke="white"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

function SmallLeafSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C12 3 6 7 5 12C4 17 8 20 12 20C16 20 20 17 19 12C18 7 12 3 12 3Z"
        fill="currentColor"
      />
      <path
        d="M12 6V18"
        stroke="white"
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  )
}

function SparkleSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ForkSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 2V14C6 16.2 7.8 18 10 18H11V36M14 2V14C14 16.2 12.2 18 10 18M10 2V14M18 2V14C18 16.2 16.2 18 14 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SpoonSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="10" cy="8" rx="7" ry="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 15V36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BlobShape({ className = '', size = 80 }: { className?: string; size?: number }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
        background: 'var(--color-orange-100)',
      }}
    />
  )
}

function BlobShapeAlt({ className = '', size = 60 }: { className?: string; size?: number }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        background: 'var(--color-orange-100)',
      }}
    />
  )
}

interface DecorElement {
  id: string
  type: 'leaf' | 'small-leaf' | 'sparkle' | 'fork' | 'spoon' | 'blob' | 'blob-alt'
  top: string
  left?: string
  right?: string
  size: number
  opacity: number
  depth: 1 | 2 | 3
  rotate?: number
}

const elements: DecorElement[] = [
  // --- Hero area (sparse — Hero has its own floating emojis) ---
  { id: 'hero-sparkle-1', type: 'sparkle', top: '5vh', right: '12%', size: 14, opacity: 0.12, depth: 2, rotate: 15 },

  // --- Between Hero & Value Prop ---
  { id: 'vp-leaf-1', type: 'leaf', top: '105vh', left: '5%', size: 28, opacity: 0.1, depth: 2, rotate: -25 },
  { id: 'vp-blob-1', type: 'blob', top: '115vh', right: '8%', size: 90, opacity: 0.06, depth: 1 },
  { id: 'vp-sparkle-1', type: 'sparkle', top: '120vh', left: '15%', size: 12, opacity: 0.15, depth: 3 },

  // --- Value Prop area (sparse near content) ---
  { id: 'vp-leaf-2', type: 'small-leaf', top: '140vh', right: '6%', size: 20, opacity: 0.08, depth: 1, rotate: 40 },
  { id: 'vp-fork', type: 'fork', top: '150vh', left: '3%', size: 32, opacity: 0.05, depth: 1, rotate: 12 },

  // --- Features section area (sparse — pinned section is content-heavy) ---
  { id: 'feat-blob-1', type: 'blob-alt', top: '200vh', right: '4%', size: 70, opacity: 0.05, depth: 1, rotate: 30 },
  { id: 'feat-sparkle-1', type: 'sparkle', top: '230vh', left: '8%', size: 16, opacity: 0.12, depth: 2, rotate: -10 },
  { id: 'feat-leaf-1', type: 'small-leaf', top: '280vh', right: '10%', size: 22, opacity: 0.08, depth: 2, rotate: -35 },

  // --- How It Works area ---
  { id: 'hiw-leaf-1', type: 'leaf', top: '350vh', right: '5%', size: 30, opacity: 0.1, depth: 3, rotate: 20 },
  { id: 'hiw-spoon', type: 'spoon', top: '370vh', left: '4%', size: 28, opacity: 0.05, depth: 1, rotate: -15 },
  { id: 'hiw-blob-1', type: 'blob', top: '380vh', left: '85%', size: 100, opacity: 0.04, depth: 1 },
  { id: 'hiw-sparkle-1', type: 'sparkle', top: '400vh', right: '15%', size: 13, opacity: 0.14, depth: 3, rotate: 25 },

  // --- Testimonials area ---
  { id: 'test-leaf-1', type: 'small-leaf', top: '440vh', left: '6%', size: 24, opacity: 0.08, depth: 2, rotate: -45 },
  { id: 'test-blob-1', type: 'blob-alt', top: '460vh', right: '5%', size: 80, opacity: 0.05, depth: 1 },
  { id: 'test-sparkle-1', type: 'sparkle', top: '470vh', left: '20%', size: 11, opacity: 0.13, depth: 3, rotate: 5 },
  { id: 'test-fork', type: 'fork', top: '490vh', right: '3%', size: 30, opacity: 0.04, depth: 1, rotate: -20 },

  // --- CTA area (sparse — important conversion zone) ---
  { id: 'cta-leaf-1', type: 'leaf', top: '530vh', left: '4%', size: 26, opacity: 0.09, depth: 2, rotate: 30 },
  { id: 'cta-sparkle-1', type: 'sparkle', top: '540vh', right: '12%', size: 15, opacity: 0.12, depth: 2, rotate: -15 },
  { id: 'cta-blob-1', type: 'blob', top: '560vh', left: '90%', size: 60, opacity: 0.04, depth: 1 },
]

function getParallaxY(depth: 1 | 2 | 3): number {
  const DEPTH_TO_Y: Record<1 | 2 | 3, number> = { 1: -20, 2: -50, 3: -80 }
  return DEPTH_TO_Y[depth]
}

function renderElement(el: DecorElement) {
  switch (el.type) {
    case 'leaf':
      return <LeafSVG className={`text-green-500`} />
    case 'small-leaf':
      return <SmallLeafSVG className={`text-green-500`} />
    case 'sparkle':
      return <SparkleSVG className={`text-orange-500`} />
    case 'fork':
      return <ForkSVG className={`text-brown-700`} />
    case 'spoon':
      return <SpoonSVG className={`text-brown-700`} />
    case 'blob':
      return <BlobShape size={el.size} />
    case 'blob-alt':
      return <BlobShapeAlt size={el.size} />
  }
}

function ParallaxDecorElement({ el, prefersReducedMotion }: { el: DecorElement; prefersReducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yVal = getParallaxY(el.depth)
  const y = useTransform(scrollYProgress, [0, 1], [0, yVal])

  const wh = el.type === 'blob' || el.type === 'blob-alt' ? undefined : el.size

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: el.top,
        left: el.left,
        right: el.right,
        width: wh,
        height: wh,
        transform: el.rotate ? `rotate(${el.rotate}deg)` : undefined,
        opacity: el.opacity,
        pointerEvents: 'none',
        y: prefersReducedMotion ? 0 : y,
      }}
    >
      {renderElement(el)}
    </motion.div>
  )
}

export function DecorativeElements() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-x-clip"
      aria-hidden="true"
    >
      {elements.map((el) => (
        <ParallaxDecorElement key={el.id} el={el} prefersReducedMotion={prefersReducedMotion} />
      ))}
    </div>
  )
}
