'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { useAnimate, stagger } from 'motion/react'
import {
  AnimatedWords,
  StoreCTAs,
  useReducedMotion,
  HeroBackground,
} from './_shared'

const PHONES = [
  {
    src: '/mockups/recipes-list-left.png',
    alt: 'Fenne recipes list screenshot',
    position: 'left' as const,
  },
  {
    src: '/mockups/weekly-plan-left.png',
    alt: 'Fenne weekly meal plan screenshot',
    position: 'center' as const,
  },
  {
    src: '/mockups/groceries-left.png',
    alt: 'Fenne grocery list screenshot',
    position: 'right' as const,
  },
]

export function HeroTriptych() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scope, animate] = useAnimate()
  const [activePhone, setActivePhone] = useState(0)

  /* ── scroll-snap observer (mobile) ── */
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft
      const itemWidth = el.offsetWidth
      const idx = Math.round(scrollLeft / itemWidth)
      setActivePhone(Math.min(idx, 2))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── animation orchestration ── */
  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      // 1. Badge fade in
      animate(
        '.triptych-hero-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      )
      await new Promise((r) => setTimeout(r, 300))

      // 2. Headline word stagger
      animate(
        '.triptych-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )
      await new Promise((r) => setTimeout(r, 400))

      // 3. Subheadline slide
      animate(
        '.triptych-hero-subheadline',
        { opacity: 1, x: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1] }
      )
      await new Promise((r) => setTimeout(r, 300))

      // 4. CTAs fade
      animate(
        '.triptych-hero-ctas',
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
      )
      await new Promise((r) => setTimeout(r, 200))

      // 5. Three phones stagger in from bottom
      animate(
        '.triptych-hero-phone',
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger(0.2) }
      )
    })
  }, [prefersReducedMotion, animate])

  const hidden = (initial: React.CSSProperties) =>
    prefersReducedMotion ? {} : initial

  return (
    <section
      ref={scope}
      id="hero-triptych"
      className="relative min-h-svh overflow-hidden"
    >
      <HeroBackground filterId="triptych-grain" />

      {/* ── Desktop / Tablet: side-by-side ── */}
      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center px-6 pb-16 pt-28 md:px-12 lg:flex-row lg:items-center lg:gap-8 lg:pb-0 lg:pt-0">
        {/* Left content — 45% on desktop */}
        <div className="flex w-full flex-col items-center text-center lg:w-[45%] lg:items-start lg:text-left">
          <span
            className="triptych-hero-badge mb-6 inline-block rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600"
            style={hidden({ opacity: 0, transform: 'translateY(16px)' })}
          >
            Your Foxy Companion
          </span>

          <h1
            ref={headlineRef}
            className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.05] tracking-tight text-brown-900"
          >
            <AnimatedWords
              text="Plan meals"
              reducedMotion={prefersReducedMotion}
              className="triptych-hero-word inline-block"
            />
            <br />
            <span className="text-orange-500">
              <AnimatedWords
                text="the cozy way."
                reducedMotion={prefersReducedMotion}
                className="triptych-hero-word inline-block"
              />
            </span>
          </h1>

          <p
            className="triptych-hero-subheadline mt-6 max-w-md text-lg font-normal leading-relaxed text-brown-700 md:text-xl"
            style={hidden({ opacity: 0, transform: 'translateX(-40px)' })}
          >
            Your weekly meal planner with recipes and auto-generated grocery
            lists — all in one cozy app.
          </p>

          <div
            className="triptych-hero-ctas"
            style={hidden({ opacity: 0, transform: 'translateY(20px)' })}
          >
            <StoreCTAs className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4" />
          </div>
        </div>

        {/* Right side — 55% on desktop: fanned phones */}
        {/* Desktop fan layout (hidden below lg) */}
        <div className="relative mt-12 hidden w-full lg:mt-0 lg:block lg:w-[55%]">
          <div className="relative mx-auto h-[600px] w-full max-w-[560px]">
            {/* Warm glow behind fan */}
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255,200,100,0.3) 0%, rgba(255,180,80,0.15) 40%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Left phone — rotated -12° */}
            <div
              className="triptych-hero-phone absolute left-[5%] top-[8%] z-10 w-[42%] transition-transform duration-300 hover:-translate-y-1"
              style={{
                transform: prefersReducedMotion
                  ? 'rotate(-12deg)'
                  : 'rotate(-12deg) translateY(60px) scale(0.85)',
                ...hidden({ opacity: 0 }),
              }}
            >
              <Image
                src={PHONES[0].src}
                alt={PHONES[0].alt}
                width={1857}
                height={3096}
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 200px, 280px"
                className="h-auto w-full rounded-[2rem] shadow-xl"
              />
            </div>

            {/* Center phone — straight, largest, z-20 */}
            <div
              className="triptych-hero-phone absolute left-1/2 top-0 z-20 w-[48%] -translate-x-1/2 transition-transform duration-300 hover:-translate-y-1"
              style={hidden({
                opacity: 0,
                transform: 'translateX(-50%) translateY(60px) scale(0.85)',
              })}
            >
              <Image
                src={PHONES[1].src}
                alt={PHONES[1].alt}
                width={1857}
                height={3096}
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 200px, 280px"
                priority
                className="h-auto w-full rounded-[2rem] shadow-2xl"
              />
            </div>

            {/* Right phone — rotated +12° */}
            <div
              className="triptych-hero-phone absolute right-[5%] top-[8%] z-10 w-[42%] transition-transform duration-300 hover:-translate-y-1"
              style={{
                transform: prefersReducedMotion
                  ? 'rotate(12deg)'
                  : 'rotate(12deg) translateY(60px) scale(0.85)',
                ...hidden({ opacity: 0 }),
              }}
            >
              <Image
                src={PHONES[2].src}
                alt={PHONES[2].alt}
                width={1857}
                height={3096}
                sizes="(max-width: 768px) 70vw, (max-width: 1024px) 200px, 280px"
                className="h-auto w-full rounded-[2rem] shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet scroll-snap layout (visible below lg) */}
        <div className="mt-10 w-full lg:hidden">
          {/* Warm glow behind phones */}
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255,200,100,0.3) 0%, rgba(255,180,80,0.15) 40%, transparent 70%)',
                filter: 'blur(32px)',
              }}
            />

            <div
              ref={scrollRef}
              className="triptych-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-[15%] pb-4"
              style={{ scrollbarWidth: 'none' }}
            >
              <style>{`#hero-triptych .triptych-scroll::-webkit-scrollbar { display: none; }`}</style>
              {PHONES.map((phone, i) => (
                <div
                  key={phone.src}
                  className="triptych-hero-phone w-[70vw] max-w-[280px] flex-shrink-0 snap-center"
                  style={hidden({
                    opacity: 0,
                    transform: 'translateY(60px) scale(0.85)',
                  })}
                >
                  <Image
                    src={phone.src}
                    alt={phone.alt}
                    width={1857}
                    height={3096}
                    sizes="(max-width: 768px) 70vw, (max-width: 1024px) 200px, 280px"
                    priority={i === 1}
                    className="h-auto w-full rounded-[2rem] shadow-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 3-dot scroll indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {PHONES.map((_, i) => (
              <span
                key={i}
                className={`block h-2 w-2 rounded-full transition-colors duration-300 ${
                  activePhone === i ? 'bg-brown-900' : 'bg-brown-900/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
