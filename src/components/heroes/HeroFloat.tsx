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

export function HeroFloat() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      animate(
        '.float-hero-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      )

      await new Promise((r) => setTimeout(r, 300))

      const wordsAnim = animate(
        '.float-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )

      await new Promise((r) => setTimeout(r, 400))

      animate(
        '.float-hero-subheadline',
        { opacity: 1, x: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
      )

      await new Promise((r) => setTimeout(r, 300))

      await animate(
        '.float-hero-phone',
        { opacity: 1, y: 0, scale: 1 },
        { duration: 1, ease: [0.22, 1, 0.36, 1] }
      )

      animate(
        '.float-hero-cta',
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }
      )

      animate(
        '.float-hero-phone',
        { y: [0, -12, 0] },
        { duration: 4, ease: 'easeInOut', repeat: Infinity }
      )

      await wordsAnim
    })
  }, [prefersReducedMotion, animate])

  return (
    <section
      ref={scope}
      id="hero-float"
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
    >
      <HeroBackground filterId="float-grain" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-16 pt-28 lg:px-12">
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

        <div className="relative mt-12 flex items-center justify-center">
          <div
            className="pointer-events-none absolute inset-0 -z-10 scale-150"
            style={{
              background:
                'radial-gradient(circle, var(--color-orange-400) 0%, var(--color-orange-300) 30%, transparent 70%)',
              opacity: 0.25,
              filter: 'blur(48px)',
            }}
          />

          <div
            className="float-hero-phone w-[65vw] max-w-[300px] md:max-w-[280px] lg:max-w-[340px] xl:max-w-[380px]"
            style={
              prefersReducedMotion
                ? {}
                : { opacity: 0, transform: 'translateY(60px) scale(0.92)' }
            }
          >
            <div className="lg:[transform:perspective(1200px)_rotateY(-8deg)] transition-transform duration-500">
              <Image
                src="/mockups/weekly-plan-portrait.png"
                alt="Fenne weekly meal plan screenshot"
                width={1419}
                height={2796}
                sizes="(max-width: 768px) 65vw, (max-width: 1024px) 280px, 380px"
                priority
                className="h-auto w-full rounded-[2rem] shadow-2xl"
              />
            </div>
          </div>
        </div>

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
    </section>
  )
}
