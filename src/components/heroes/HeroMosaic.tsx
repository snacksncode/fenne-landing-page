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

/* ── Mosaic cell data ── */
const mockups = [
  {
    src: '/mockups/weekly-plan-portrait.png',
    alt: 'Fenne weekly meal plan — portrait view',
    width: 1419,
    height: 2796,
    sizes: '(max-width: 768px) 90vw, 300px',
    priority: true,
  },
  {
    src: '/mockups/recipes-list-left.png',
    alt: 'Fenne recipes list — angled view',
    width: 1857,
    height: 3096,
    sizes: '(max-width: 768px) 90vw, 280px',
    priority: false,
  },
  {
    src: '/mockups/groceries-landscape.png',
    alt: 'Fenne grocery list — landscape view',
    width: 3096,
    height: 1857,
    sizes: '(max-width: 768px) 90vw, 600px',
    priority: false,
  },
  {
    src: '/mockups/meal-detail-left.png',
    alt: 'Fenne meal detail — angled view',
    width: 1857,
    height: 3096,
    sizes: '(max-width: 768px) 90vw, 280px',
    priority: false,
  },
] as const

/* ── Desktop: Asymmetric CSS Grid mosaic ── */
function DesktopMosaic({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      /* Badge */
      animate(
        '.mosaic-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      )

      await new Promise((r) => setTimeout(r, 200))

      /* Headline words */
      animate(
        '.mosaic-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )

      await new Promise((r) => setTimeout(r, 300))

      /* Subheadline */
      animate(
        '.mosaic-subheadline',
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      )

      /* CTAs */
      animate(
        '.mosaic-cta',
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }
      )

      await new Promise((r) => setTimeout(r, 200))

      /* Grid cells stagger in */
      animate(
        '.mosaic-cell',
        { opacity: 1, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) }
      )
    })
  }, [prefersReducedMotion, animate])

  const hidden = prefersReducedMotion
    ? {}
    : { opacity: 0, scale: 0.95 }

  return (
    <section
      ref={scope}
      className="relative z-10 hidden lg:block"
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 lg:py-32">
        {/* ── Asymmetric 3-column grid ── */}
        <div className="grid grid-cols-3 gap-5">
          {/* Cell 1: Headline + CTAs (2 cols × 1 row) */}
          <div className="col-span-2 flex flex-col justify-center rounded-3xl bg-cream-100 border border-cream-200/60 p-8 shadow-sm lg:p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <span
              className="mosaic-badge mb-4 inline-block self-start rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600"
              style={
                prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(20px)' }
              }
            >
              Meal Planning, Simplified
            </span>

            <h1
              ref={headlineRef}
              className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.02] tracking-tight text-brown-900"
            >
              <AnimatedWords
                text="Plan meals"
                reducedMotion={prefersReducedMotion}
                className="mosaic-hero-word"
              />
              <br />
              <span className="text-orange-500">
                <AnimatedWords
                  text="the cozy way"
                  reducedMotion={prefersReducedMotion}
                  className="mosaic-hero-word"
                />
              </span>
            </h1>

            <p
              className="mosaic-subheadline mt-5 max-w-md text-lg leading-relaxed text-brown-700 md:text-xl"
              style={
                prefersReducedMotion ? {} : { opacity: 0, transform: 'translateY(20px)' }
              }
            >
              Your weekly meal planner with recipes and auto-generated grocery
              lists — all in one cozy app.
            </p>

            <StoreCTAs
              className="mosaic-cta mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4"
            />
          </div>

          {/* Cell 2: Large portrait (1 col × 2 rows) */}
          <div
            className="mosaic-cell row-span-2 flex items-center justify-center overflow-hidden rounded-3xl bg-brown-100 border border-cream-200/60 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={hidden}
          >
            <Image
              src={mockups[0].src}
              alt={mockups[0].alt}
              width={mockups[0].width}
              height={mockups[0].height}
              sizes={mockups[0].sizes}
              priority
              className="h-auto w-full max-w-[280px] rounded-[1.5rem] shadow-lg"
            />
          </div>

          {/* Cell 3: Left-angle mockup (1 col × 1 row) */}
          <div
            className="mosaic-cell flex items-center justify-center overflow-hidden rounded-3xl bg-cream-100 border border-cream-200/60 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={hidden}
          >
            <Image
              src={mockups[1].src}
              alt={mockups[1].alt}
              width={mockups[1].width}
              height={mockups[1].height}
              sizes={mockups[1].sizes}
              className="h-auto w-full max-w-[240px] rounded-[1.5rem] shadow-lg"
            />
          </div>

          {/* Cell 4: Landscape mockup (2 cols × 1 row) */}
          <div
            className="mosaic-cell col-span-2 flex items-center justify-center overflow-hidden rounded-3xl bg-brown-100 border border-cream-200/60 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={hidden}
          >
            <Image
              src={mockups[2].src}
              alt={mockups[2].alt}
              width={mockups[2].width}
              height={mockups[2].height}
              sizes={mockups[2].sizes}
              className="h-auto w-full rounded-[1.5rem] shadow-lg"
            />
          </div>

          {/* Cell 5: Left-angle mockup (1 col × 1 row) */}
          <div
            className="mosaic-cell flex items-center justify-center overflow-hidden rounded-3xl bg-cream-100 border border-cream-200/60 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            style={hidden}
          >
            <Image
              src={mockups[3].src}
              alt={mockups[3].alt}
              width={mockups[3].width}
              height={mockups[3].height}
              sizes={mockups[3].sizes}
              className="h-auto w-full max-w-[240px] rounded-[1.5rem] shadow-lg"
            />
          </div>
        </div>

        {/* Warm glow behind grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-20"
          style={{
            background:
              'radial-gradient(circle at 50% 30%, rgba(251,146,60,0.25) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
    </section>
  )
}

/* ── Mobile: Full-width card stack ── */
function MobileMosaic({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (prefersReducedMotion) return

    document.fonts.ready.then(async () => {
      if (!headlineRef.current) return

      animate(
        '.mosaic-m-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
      )

      await new Promise((r) => setTimeout(r, 200))

      animate(
        '.mosaic-m-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.33, 1, 0.68, 1], delay: stagger(0.05) }
      )

      await new Promise((r) => setTimeout(r, 300))

      animate(
        '.mosaic-m-sub',
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      )

      animate(
        '.mosaic-m-cta',
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }
      )

      await new Promise((r) => setTimeout(r, 200))

      animate(
        '.mosaic-m-cell',
        { opacity: 1, scale: 1 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) }
      )
    })
  }, [prefersReducedMotion, animate])

  const hidden = prefersReducedMotion
    ? {}
    : { opacity: 0, scale: 0.95 }

  return (
    <section
      ref={scope}
      className="relative z-10 lg:hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 pb-16 pt-28 md:px-12">
        {/* Headline card */}
        <div className="w-full rounded-3xl bg-cream-100 border border-cream-200/60 p-6 shadow-sm md:p-8">
          <span
            className="mosaic-m-badge mb-4 inline-block rounded-full bg-orange-500/15 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-orange-600"
            style={
              prefersReducedMotion
                ? {}
                : { opacity: 0, transform: 'translateY(20px)' }
            }
          >
            Meal Planning, Simplified
          </span>

          <h1
            ref={headlineRef}
            className="text-[clamp(2.2rem,7vw,3.5rem)] font-black leading-[1.05] tracking-tight text-brown-900"
          >
            <AnimatedWords
              text="Plan meals"
              reducedMotion={prefersReducedMotion}
              className="mosaic-m-word"
            />
            <br />
            <span className="text-orange-500">
              <AnimatedWords
                text="the cozy way"
                reducedMotion={prefersReducedMotion}
                className="mosaic-m-word"
              />
            </span>
          </h1>

          <p
            className="mosaic-m-sub mt-4 max-w-md text-base leading-relaxed text-brown-700 md:text-lg"
            style={
              prefersReducedMotion
                ? {}
                : { opacity: 0, transform: 'translateY(20px)' }
            }
          >
            Your weekly meal planner with recipes and auto-generated grocery
            lists — all in one cozy app.
          </p>

          <StoreCTAs className="mosaic-m-cta mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4" />
        </div>

        {/* Portrait mockup card */}
        <div
          className="mosaic-m-cell flex w-full items-center justify-center overflow-hidden rounded-3xl bg-brown-100 border border-cream-200/60 p-5 shadow-sm"
          style={hidden}
        >
          <Image
            src={mockups[0].src}
            alt={mockups[0].alt}
            width={mockups[0].width}
            height={mockups[0].height}
            sizes="90vw"
            priority
            className="h-auto w-full max-w-[260px] rounded-[1.5rem] shadow-lg"
          />
        </div>

        {/* Left-angle mockup card */}
        <div
          className="mosaic-m-cell flex w-full items-center justify-center overflow-hidden rounded-3xl bg-cream-100 border border-cream-200/60 p-5 shadow-sm"
          style={hidden}
        >
          <Image
            src={mockups[1].src}
            alt={mockups[1].alt}
            width={mockups[1].width}
            height={mockups[1].height}
            sizes="90vw"
            className="h-auto w-full max-w-[260px] rounded-[1.5rem] shadow-lg"
          />
        </div>

        {/* Landscape mockup card */}
        <div
          className="mosaic-m-cell flex w-full items-center justify-center overflow-hidden rounded-3xl bg-brown-100 border border-cream-200/60 p-5 shadow-sm"
          style={hidden}
        >
          <Image
            src={mockups[2].src}
            alt={mockups[2].alt}
            width={mockups[2].width}
            height={mockups[2].height}
            sizes="90vw"
            className="h-auto w-full rounded-[1.5rem] shadow-lg"
          />
        </div>

        {/* Left-angle mockup card */}
        <div
          className="mosaic-m-cell flex w-full items-center justify-center overflow-hidden rounded-3xl bg-cream-100 border border-cream-200/60 p-5 shadow-sm"
          style={hidden}
        >
          <Image
            src={mockups[3].src}
            alt={mockups[3].alt}
            width={mockups[3].width}
            height={mockups[3].height}
            sizes="90vw"
            className="h-auto w-full max-w-[260px] rounded-[1.5rem] shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

/* ── Main Export ── */
export function HeroMosaic() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div id="hero-mosaic" className="relative overflow-x-clip">
      <HeroBackground filterId="mosaic-grain" />

      {/* Desktop: asymmetric CSS Grid mosaic */}
      <DesktopMosaic prefersReducedMotion={prefersReducedMotion} />

      {/* Mobile: full-width card stack */}
      <MobileMosaic prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}
