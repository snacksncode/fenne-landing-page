'use client'

import { useEffect, useState } from 'react'

/**
 * GrainOverlay - SVG noise pattern overlay
 * Accepts filterId prop to avoid ID collisions across multiple instances
 */
export function GrainOverlay({ filterId }: { filterId: string }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-20"
      style={{ opacity: 0.03 }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id={filterId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
    </div>
  )
}

/**
 * AnimatedWords - Splits text into words and wraps each in a span
 * Accepts className for variant-specific styling (e.g., 'marquee-hero-word')
 */
export function AnimatedWords({
  text,
  reducedMotion,
  className = '',
}: {
  text: string
  reducedMotion: boolean
  className?: string
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className={className}
          style={
            reducedMotion
              ? {}
              : { opacity: 0, transform: 'translateY(30px)' }
          }
        >
          {word}
          {'\u00A0'}
        </span>
      ))}
    </>
  )
}

/**
 * useReducedMotion - Hook to detect prefers-reduced-motion media query
 * Returns boolean indicating if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

/**
 * AppleIcon - Apple App Store icon SVG
 */
export function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11" />
    </svg>
  )
}

/**
 * PlayStoreIcon - Google Play Store icon SVG
 */
export function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.196 12l2.502-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  )
}

/**
 * StoreCTAs - App Store and Google Play buttons
 * Uses exact URLs from plan
 */
export function StoreCTAs({
  className,
}: {
  className?: string
}) {
  return (
    <div className={className}>
      <a
        href="https://apps.apple.com/app/fenne-meal-planner/id6739899701"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-brown-900 px-6 py-3 text-base font-semibold text-cream-100 transition-all hover:scale-105 hover:bg-brown-800 active:scale-95"
      >
        <AppleIcon className="h-5 w-5" />
        <span>App Store</span>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=app.fenne"
        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brown-900 bg-transparent px-6 py-3 text-base font-semibold text-brown-900 transition-all hover:scale-105 hover:bg-brown-900/5 active:scale-95"
      >
        <PlayStoreIcon className="h-5 w-5" />
        <span>Google Play</span>
      </a>
    </div>
  )
}

/**
 * HeroBackground - Gradient background with grain overlay
 * Accepts gradientAngle (default 135) and filterId for customization
 */
export function HeroBackground({
  gradientAngle = 135,
  filterId,
}: {
  gradientAngle?: number
  filterId: string
}) {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(${gradientAngle}deg, var(--color-cream-50) 0%, var(--color-cream-100) 50%, var(--color-orange-100) 100%)`,
        }}
      />
      <GrainOverlay filterId={filterId} />
    </>
  )
}
