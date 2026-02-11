'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useAnimate, stagger, useScroll, useTransform } from 'motion/react'
import {
  AnimatedWords,
  StoreCTAs,
  useReducedMotion,
  HeroBackground,
} from './_shared'

export function HeroStage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scope, animate] = useAnimate()

  /* ── scroll-linked parallax ── */
  const { scrollY } = useScroll()
  const phoneY = useTransform(scrollY, [0, 800], [0, -120])

  /* ── animation orchestration ── */
  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      // 1. Left content slides in from left
      animate(
        '.stage-hero-content',
        { opacity: 1, x: 0 },
        { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      )
      await new Promise((r) => setTimeout(r, 300))

      // 2. Headline word stagger
      animate(
        '.stage-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )
      await new Promise((r) => setTimeout(r, 400))

      // 3. Subheadline slide
      animate(
        '.stage-hero-subheadline',
        { opacity: 1, x: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
      )
      await new Promise((r) => setTimeout(r, 300))

      // 4. Phone rises from below with parallax offset
      animate(
        '.stage-hero-phone',
        { opacity: 1, y: 0 },
        { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
      )

      // 5. Glow pulses subtly once then settles
      await new Promise((r) => setTimeout(r, 200))
      animate(
        '.stage-hero-glow',
        { opacity: [0, 0.3, 0.25] },
        { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
      )

      // 6. CTAs bounce in
      await new Promise((r) => setTimeout(r, 300))
      animate(
        '.stage-hero-ctas',
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      )
    })
  }, [prefersReducedMotion, animate])

  const hidden = (initial: React.CSSProperties): React.CSSProperties =>
    prefersReducedMotion ? {} : initial

  return (
    <section
      ref={scope}
      id="hero-stage"
      className="relative min-h-svh overflow-hidden"
    >
      <HeroBackground filterId="stage-grain" gradientAngle={135} />

      {/* ── Desktop layout (lg+): 55/45 split ── */}
      <div className="relative z-10 mx-auto hidden min-h-svh w-full max-w-7xl items-center gap-8 px-6 lg:flex lg:flex-row lg:px-12">
        {/* Left 55%: content */}
        <div
          className="stage-hero-content flex w-[55%] flex-col items-start text-left"
          style={hidden({ opacity: 0, transform: 'translateX(-60px)' })}
        >
          <span className="mb-6 inline-block rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600">
            Your Foxy Companion
          </span>

          <h1
            ref={headlineRef}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] tracking-tight text-brown-900"
          >
            <AnimatedWords
              text="Plan meals"
              reducedMotion={prefersReducedMotion}
              className="stage-hero-word inline-block"
            />
            <br />
            <span className="text-orange-500">
              <AnimatedWords
                text="the cozy way."
                reducedMotion={prefersReducedMotion}
                className="stage-hero-word inline-block"
              />
            </span>
          </h1>

          <p
            className="stage-hero-subheadline mt-6 max-w-md text-lg font-normal leading-relaxed text-brown-700 md:text-xl"
            style={hidden({ opacity: 0, transform: 'translateX(-40px)' })}
          >
            Your weekly meal planner with recipes and auto-generated grocery
            lists — all in one cozy app.
          </p>

          <div
            className="stage-hero-ctas"
            style={hidden({ opacity: 0, transform: 'translateY(20px) scale(0.95)' })}
          >
            <StoreCTAs className="mt-8 flex gap-4" />
          </div>
        </div>

        {/* Right 45%: phone with glow */}
        <div className="relative flex w-[45%] items-center justify-center">
          <div className="relative h-[700px] w-full max-w-[420px]">
            {/* Orange glow behind phone */}
            <div
              className="stage-hero-glow pointer-events-none absolute inset-0 -z-10 opacity-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.3) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Phone with 3D perspective */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ y: prefersReducedMotion ? 0 : phoneY }}
            >
              <div
                className="stage-hero-phone w-full max-w-[380px] [perspective:1000px]"
                style={hidden({ opacity: 0, transform: 'translateY(80px)' })}
              >
                <div className="[transform:rotateY(-5deg)] transition-transform duration-500">
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet layout (below lg) ── */}
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center px-6 pb-16 pt-28 md:px-12 lg:hidden">
        {/* Content */}
        <div
          className="stage-hero-content flex w-full flex-col items-center text-center"
          style={hidden({ opacity: 0, transform: 'translateX(-60px)' })}
        >
          <span className="mb-6 inline-block rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600">
            Your Foxy Companion
          </span>

          <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-black leading-[1.05] tracking-tight text-brown-900">
            <AnimatedWords
              text="Plan meals"
              reducedMotion={prefersReducedMotion}
              className="stage-hero-word inline-block"
            />
            <br />
            <span className="text-orange-500">
              <AnimatedWords
                text="the cozy way."
                reducedMotion={prefersReducedMotion}
                className="stage-hero-word inline-block"
              />
            </span>
          </h1>

          <p
            className="stage-hero-subheadline mt-6 max-w-md text-lg font-normal leading-relaxed text-brown-700 md:text-xl"
            style={hidden({ opacity: 0, transform: 'translateX(-40px)' })}
          >
            Your weekly meal planner with recipes and auto-generated grocery
            lists — all in one cozy app.
          </p>
        </div>

        {/* Phone with glow — NO 3D perspective on mobile */}
        <div className="relative mt-10 w-full max-w-[320px]">
          {/* Orange glow */}
          <div
            className="stage-hero-glow pointer-events-none absolute inset-0 -z-10 opacity-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.3) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          <div
            className="stage-hero-phone"
            style={hidden({ opacity: 0, transform: 'translateY(80px)' })}
          >
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

        {/* CTAs below phone */}
        <div
          className="stage-hero-ctas"
          style={hidden({ opacity: 0, transform: 'translateY(20px) scale(0.95)' })}
        >
          <StoreCTAs className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4" />
        </div>
      </div>
    </section>
  )
}
