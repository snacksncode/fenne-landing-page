'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { useState } from 'react'
import {
  StoreCTAs,
  useReducedMotion,
  HeroBackground,
} from './_shared'

/* ── Screen data ── */
const screens = [
  {
    src: '/mockups/weekly-plan-portrait.png',
    alt: 'Fenne weekly meal plan screenshot',
    caption: 'Plan your meals for the week',
    description:
      'Drag, drop, and organize your meals into a weekly plan that fits your lifestyle.',
  },
  {
    src: '/mockups/recipes-list-portrait.png',
    alt: 'Fenne recipes list screenshot',
    caption: 'Browse delicious recipes',
    description:
      'Discover new meals or save your family favorites — all in one cozy place.',
  },
  {
    src: '/mockups/groceries-portrait.png',
    alt: 'Fenne grocery list screenshot',
    caption: 'Auto-generated grocery lists',
    description:
      'Your weekly plan becomes a smart shopping list, automatically sorted by aisle.',
  },
  {
    src: '/mockups/monthly-calendar-portrait.png',
    alt: 'Fenne monthly calendar screenshot',
    caption: 'See the big picture',
    description:
      'Monthly view keeps you on track — no more "what\'s for dinner?" panic.',
  },
] as const

/* ── Progress Dots ── */
function ProgressDots({ active }: { active: number }) {
  return (
    <div className="flex gap-2.5">
      {screens.map((_, i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full transition-all duration-300"
          style={{
            backgroundColor:
              i === active
                ? 'var(--color-brown-900)'
                : 'color-mix(in srgb, var(--color-brown-900) 25%, transparent)',
            transform: i === active ? 'scale(1.3)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  )
}

/* ── Desktop: Sticky scroll-linked cascade ── */
function DesktopCascade({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /* ── Scroll-linked screen opacities ── */
  const screen1Opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25],
    [1, 1, 0]
  )
  const screen2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.45, 0.5],
    [0, 1, 1, 0]
  )
  const screen3Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.7, 0.75],
    [0, 1, 1, 0]
  )
  const screen4Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.75, 1],
    [0, 1, 1]
  )
  const screenOpacities = [
    screen1Opacity,
    screen2Opacity,
    screen3Opacity,
    screen4Opacity,
  ]

  /* ── Scroll-linked caption opacities ── */
  const caption1Opacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.15, 0.25],
    [1, 1, 1, 0]
  )
  const caption2Opacity = useTransform(
    scrollYProgress,
    [0.22, 0.27, 0.4, 0.5],
    [0, 1, 1, 0]
  )
  const caption3Opacity = useTransform(
    scrollYProgress,
    [0.47, 0.52, 0.65, 0.75],
    [0, 1, 1, 0]
  )
  const caption4Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.77, 0.9, 1],
    [0, 1, 1, 1]
  )
  const captionOpacities = [
    caption1Opacity,
    caption2Opacity,
    caption3Opacity,
    caption4Opacity,
  ]

  /* ── Caption slide-in transforms ── */
  const caption1Y = useTransform(
    scrollYProgress,
    [0, 0.01, 0.25],
    [0, 0, -10]
  )
  const caption2Y = useTransform(
    scrollYProgress,
    [0.22, 0.27, 0.5],
    [30, 0, -10]
  )
  const caption3Y = useTransform(
    scrollYProgress,
    [0.47, 0.52, 0.75],
    [30, 0, -10]
  )
  const caption4Y = useTransform(
    scrollYProgress,
    [0.72, 0.77, 1],
    [30, 0, 0]
  )
  const captionYs = [caption1Y, caption2Y, caption3Y, caption4Y]

  /* ── Active dot tracking ── */
  const [activeDot, setActiveDot] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.25) setActiveDot(0)
    else if (v < 0.5) setActiveDot(1)
    else if (v < 0.75) setActiveDot(2)
    else setActiveDot(3)
  })

  /* ── Caption positioning: alternate left/right ── */
  const captionPositions = [
    'right-[58%]', // left of phone
    'left-[58%]', // right of phone
    'right-[58%]', // left of phone
    'left-[58%]', // right of phone
  ]

  const captionAligns = [
    'text-right items-end', // left caption → right-aligned text
    'text-left items-start', // right caption → left-aligned text
    'text-right items-end',
    'text-left items-start',
  ]

  if (prefersReducedMotion) {
    return (
      <section className="relative z-10 hidden lg:block">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <div className="mb-16 text-center">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-brown-900 md:text-6xl lg:text-7xl">
              Everything you need,
              <br />
              <span className="text-orange-500">one scroll away.</span>
            </h1>
          </div>
          <div className="grid gap-16">
            {screens.map((screen, i) => (
              <div
                key={i}
                className="flex items-center gap-12"
                style={{
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                <div className="w-[280px] shrink-0">
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={1419}
                    height={2796}
                    sizes="280px"
                    className="h-auto w-full rounded-[2rem] shadow-2xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold text-brown-900">
                    {screen.caption}
                  </h3>
                  <p className="max-w-sm text-lg leading-relaxed text-brown-700">
                    {screen.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <StoreCTAs className="flex gap-4" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      className="relative z-10 hidden min-h-[400vh] lg:block"
    >
      {/* Sticky container: stays centered in viewport */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-center px-6 lg:px-12">
          {/* ── Captions (alternating left/right) ── */}
          {screens.map((screen, i) => (
            <motion.div
              key={i}
              className={`absolute top-1/2 flex w-[280px] -translate-y-1/2 flex-col gap-3 ${captionPositions[i]} ${captionAligns[i]}`}
              style={{
                opacity: captionOpacities[i],
                y: captionYs[i],
              }}
            >
              <span className="text-sm font-bold uppercase tracking-wide text-orange-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-semibold leading-tight text-brown-900">
                {screen.caption}
              </h3>
              <p className="text-base leading-relaxed text-brown-700">
                {screen.description}
              </p>
            </motion.div>
          ))}

          {/* ── Phone with crossfading screens ── */}
          <div className="relative z-10 w-full max-w-[380px]">
            {/* Warm glow behind phone */}
            <div
              className="pointer-events-none absolute -inset-16 -z-10 rounded-full opacity-25 blur-[60px]"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(251,146,60,0.35) 0%, rgba(251,146,60,0.15) 40%, transparent 70%)',
              }}
            />

            {/* Stacked phone screens */}
            <div className="relative aspect-[1419/2796]">
              {screens.map((screen, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  style={{ opacity: screenOpacities[i] }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt}
                    width={1419}
                    height={2796}
                    sizes="(max-width: 1024px) 280px, 380px"
                    priority={i === 0}
                    className="h-auto w-full rounded-[2rem] shadow-2xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Progress dots ── */}
          <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2">
            <ProgressDots active={activeDot} />
          </div>
        </div>
      </div>

      {/* ── CTAs at the very end of scroll ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center pb-24">
        <div className="pointer-events-auto">
          <StoreCTAs className="flex gap-4" />
        </div>
      </div>
    </section>
  )
}

/* ── Mobile: Stacked sections ── */
function MobileCascade({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean
}) {
  return (
    <section className="relative z-10 lg:hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 px-6 pb-16 pt-28 md:px-12">
        {/* Headline */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[clamp(2.4rem,7vw,4rem)] font-black leading-[1.05] tracking-tight text-brown-900">
            Everything you need,
            <br />
            <span className="text-orange-500">one scroll away.</span>
          </h1>
        </motion.div>

        {/* 4 Stacked phone + caption sections */}
        {screens.map((screen, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Phone image */}
            <div className="w-[70vw] max-w-[280px]">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={1419}
                height={2796}
                sizes="(max-width: 768px) 70vw, 280px"
                priority={i === 0}
                className="h-auto w-full rounded-[2rem] shadow-2xl"
              />
            </div>

            {/* Caption card */}
            <div className="w-full max-w-[320px] rounded-2xl bg-cream-100 p-6 shadow-sm">
              <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-orange-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-semibold text-brown-900">
                {screen.caption}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-brown-700">
                {screen.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* CTAs at the bottom */}
        <StoreCTAs className="flex flex-col gap-3 sm:flex-row sm:gap-4" />
      </div>
    </section>
  )
}

/* ── Main Export ── */
export function HeroCascade() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div id="hero-cascade" className="relative overflow-x-clip">
      <HeroBackground filterId="cascade-grain" />

      {/* Desktop: scroll-linked sticky cascade */}
      <DesktopCascade prefersReducedMotion={prefersReducedMotion} />

      {/* Mobile: stacked sections */}
      <MobileCascade prefersReducedMotion={prefersReducedMotion} />
    </div>
  )
}
