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

const MOCKUPS = [
  {
    src: '/mockups/weekly-plan-portrait.png',
    alt: 'Fenne weekly meal plan — plan your week at a glance',
    label: 'Weekly Plan',
  },
  {
    src: '/mockups/groceries-portrait.png',
    alt: 'Fenne grocery list — auto-generated from your meals',
    label: 'Grocery List',
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

      // 5. Mockups glide in from sides
      animate(
        '.floating-screenshot-left',
        { opacity: 1, x: 0 },
        { duration: 1, ease: [0.22, 1, 0.36, 1] }
      )
      animate(
        '.floating-screenshot-right',
        { opacity: 1, x: 0 },
        { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
      )

      // Wait for mockups to settle, then float
      await new Promise((r) => setTimeout(r, 1000))

      // 6. Gentle continuous float — offset timing for organic feel
      animate(
        '.floating-screenshot-left',
        { y: [0, -14, 0] },
        { duration: 5, ease: 'easeInOut', repeat: Infinity }
      )
      animate(
        '.floating-screenshot-right',
        { y: [0, -14, 0] },
        { duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay: 1.5 }
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

      {/* Left mockup — Weekly Plan */}
      <div
        className="floating-screenshot-left pointer-events-none absolute z-10 hidden lg:block"
        style={
          prefersReducedMotion
            ? {
                left: '5%',
                top: '50%',
                transform: 'translateY(-55%) rotate(-6deg)',
              }
            : {
                left: '5%',
                top: '50%',
                opacity: 0,
                transform: 'translateY(-55%) translateX(-80px) rotate(-6deg)',
              }
        }
      >
        <Image
          src={MOCKUPS[0].src}
          alt={MOCKUPS[0].alt}
          width={1419}
          height={2796}
          sizes="280px"
          className="h-auto w-[280px]"
          priority
        />
      </div>

      {/* Right mockup — Grocery List */}
      <div
        className="floating-screenshot-right pointer-events-none absolute z-10 hidden lg:block"
        style={
          prefersReducedMotion
            ? {
                right: '5%',
                top: '50%',
                transform: 'translateY(-45%) rotate(6deg)',
              }
            : {
                right: '5%',
                top: '50%',
                opacity: 0,
                transform: 'translateY(-45%) translateX(80px) rotate(6deg)',
              }
        }
      >
        <Image
          src={MOCKUPS[1].src}
          alt={MOCKUPS[1].alt}
          width={1419}
          height={2796}
          sizes="280px"
          className="h-auto w-[280px]"
          priority
        />
      </div>

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
