'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAnimate, stagger } from 'motion/react'
import {
  AnimatedWords,
  StoreCTAs,
  useReducedMotion,
  HeroBackground,
} from './_shared'

const FLOATING_SCREENSHOTS = [
  {
    src: '/mockups/weekly-plan-portrait.png',
    alt: 'Fenne weekly meal plan',
    position: 'top-[8%] left-[5%]',
    rotation: -12,
    scale: 0.35,
  },
  {
    src: '/mockups/recipes-list-portrait.png',
    alt: 'Fenne recipes list',
    position: 'top-[15%] right-[8%]',
    rotation: 8,
    scale: 0.32,
  },
  {
    src: '/mockups/groceries-portrait.png',
    alt: 'Fenne grocery list',
    position: 'bottom-[25%] left-[3%]',
    rotation: 15,
    scale: 0.28,
  },
  {
    src: '/mockups/meal-detail-portrait.png',
    alt: 'Fenne meal detail view',
    position: 'bottom-[20%] right-[5%]',
    rotation: -10,
    scale: 0.3,
  },
  {
    src: '/mockups/monthly-calendar-portrait.png',
    alt: 'Fenne monthly calendar',
    position: 'top-[45%] left-[2%]',
    rotation: -8,
    scale: 0.25,
  },
  {
    src: '/mockups/groceries-checked-portrait.png',
    alt: 'Fenne groceries checked off',
    position: 'top-[50%] right-[3%]',
    rotation: 12,
    scale: 0.27,
  },
] as const

export function HeroFloat() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      // 1. Badge fade in
      animate(
        '.float-hero-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      )

      await new Promise((r) => setTimeout(r, 300))

      // 2. Headline word stagger
      const wordsAnim = animate(
        '.float-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )

      await new Promise((r) => setTimeout(r, 400))

      // 3. Subheadline slide in
      animate(
        '.float-hero-subheadline',
        { opacity: 1, x: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
      )

      await new Promise((r) => setTimeout(r, 300))

      // 4. CTAs bounce in
      animate(
        '.float-hero-cta',
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
      )

      await new Promise((r) => setTimeout(r, 200))

      // 5. Floating screenshots stagger in
      animate(
        '.floating-screenshot',
        { opacity: 1, scale: 1 },
        {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
          delay: stagger(0.15),
        }
      )

      // Wait for screenshots to start appearing, then begin float
      await new Promise((r) => setTimeout(r, 800))

      // 6. Continuous floating motion
      animate(
        '.floating-screenshot',
        { y: [0, -20, 0] },
        {
          duration: 6,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: stagger(0.3),
        }
      )

      // 7. Scroll arrow pulse
      animate(
        '.scroll-arrow',
        { opacity: [0.4, 1, 0.4], y: [0, 8, 0] },
        { duration: 2, ease: 'easeInOut', repeat: Infinity }
      )

      await wordsAnim
    })
  }, [prefersReducedMotion, animate])

  return (
    <section
      ref={scope}
      id="hero-float"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <HeroBackground filterId="float-grain" />

      {/* Floating screenshots — desktop only */}
      {FLOATING_SCREENSHOTS.map((shot) => (
        <div
          key={shot.src}
          className={`floating-screenshot pointer-events-none absolute z-10 hidden lg:block ${shot.position}`}
          style={
            prefersReducedMotion
              ? {
                  transform: `rotate(${shot.rotation}deg) scale(${shot.scale})`,
                }
              : {
                  opacity: 0,
                  transform: `rotate(${shot.rotation}deg) scale(${shot.scale * 0.8})`,
                }
          }
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1419}
            height={2796}
            sizes="220px"
            className="h-auto w-[220px] rounded-[1.5rem] shadow-xl"
          />
        </div>
      ))}

      {/* Central content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 lg:px-12">
        <span
          className="float-hero-badge mb-6 inline-block rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600"
          style={
            prefersReducedMotion
              ? {}
              : { opacity: 0, transform: 'translateY(16px)' }
          }
        >
          Your Foxy Companion
        </span>

        <h1
          ref={headlineRef}
          className="text-center text-[clamp(3rem,8vw,6rem)] font-black leading-[1.02] tracking-tight text-brown-900"
        >
          <AnimatedWords
            text="Plan meals"
            reducedMotion={prefersReducedMotion}
            className="float-hero-word inline-block"
          />
          <br />
          <span className="text-orange-500">
            <AnimatedWords
              text="the cozy way."
              reducedMotion={prefersReducedMotion}
              className="float-hero-word inline-block"
            />
          </span>
        </h1>

        <p
          className="float-hero-subheadline mt-6 max-w-md text-center text-lg font-normal leading-relaxed text-brown-700 md:text-xl"
          style={
            prefersReducedMotion
              ? {}
              : { opacity: 0, transform: 'translateX(-40px)' }
          }
        >
          Your weekly meal planner with recipes and auto-generated grocery
          lists — all in one cozy app.
        </p>

        <div
          className="float-hero-cta"
          style={
            prefersReducedMotion
              ? {}
              : { opacity: 0, transform: 'scale(0.8)' }
          }
        >
          <StoreCTAs className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4" />
        </div>
      </div>

      {/* Scroll arrow */}
      <div className="scroll-arrow absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 opacity-40">
        <span className="text-sm font-semibold uppercase tracking-wide text-brown-900">
          Scroll
        </span>
        <svg
          className="h-6 w-6 text-brown-900"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
