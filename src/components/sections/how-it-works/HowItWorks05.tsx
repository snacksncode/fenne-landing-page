'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from 'motion/react'
import { steps } from './steps'
import { easeOutCubic, easeOutQuint } from '@/lib/easings'

const LAYER_RATES = [40, 90, 160, 240, 330] as const
const DESKTOP_X = [8, 28, 50, 72, 90] as const
const DESKTOP_Y_OFFSETS = [60, -20, -50, -10, 70] as const

function useLayerTransforms(scrollProgress: MotionValue<number>, layerIndex: number) {
  const rate = LAYER_RATES[layerIndex]
  const y = useTransform(scrollProgress, [0, 1], [rate, -rate])

  const bandStart = layerIndex / steps.length
  const bandEnd = (layerIndex + 1) / steps.length
  const peakCenter = (bandStart + bandEnd) / 2

  const scale = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.15),
      peakCenter,
      Math.min(1, peakCenter + 0.15),
    ],
    [0.82, 1.08, 0.82]
  )

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.18),
      peakCenter,
      Math.min(1, peakCenter + 0.18),
    ],
    [0.3, 1, 0.3]
  )

  const blur = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.15),
      peakCenter,
      Math.min(1, peakCenter + 0.15),
    ],
    [3, 0, 3]
  )

  const zIndex = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.12),
      peakCenter,
      Math.min(1, peakCenter + 0.12),
    ],
    [1, 10, 1]
  )

  return { y, scale, opacity, blur, zIndex }
}

function ParallaxCard({
  index,
  scrollProgress,
}: {
  index: number
  scrollProgress: MotionValue<number>
}) {
  const step = steps[index]
  const Icon = step.icon
  const { y, scale, opacity, blur, zIndex } = useLayerTransforms(scrollProgress, index)

  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`)

  return (
    <motion.div
      className="absolute w-52 md:w-56 lg:w-60"
      style={{
        left: `${DESKTOP_X[index]}%`,
        top: `calc(50% + ${DESKTOP_Y_OFFSETS[index]}px)`,
        x: '-50%',
        y,
        scale,
        opacity,
        filter: filterBlur,
        zIndex,
      }}
    >
      <div
        className="relative rounded-2xl border border-orange-200/40 px-5 py-6 backdrop-blur-sm"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,250,245,0.92) 0%, rgba(255,243,230,0.80) 100%)',
          boxShadow:
            '0 4px 32px rgba(73,61,52,0.06), 0 1px 4px rgba(73,61,52,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        <div
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--color-orange-500), var(--color-orange-600))',
            boxShadow: '0 2px 8px rgba(249,149,77,0.3)',
          }}
        >
          {index + 1}
        </div>

        <h4 className="mb-1.5 font-sans text-base font-bold text-brown-900">
          {step.title}
        </h4>
        <p className="text-sm leading-relaxed text-brown-700">
          {step.description}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-orange-500" strokeWidth={2.5} />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-500">
            {step.time}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function MobileParallaxCard({
  index,
  scrollProgress,
}: {
  index: number
  scrollProgress: MotionValue<number>
}) {
  const step = steps[index]
  const Icon = step.icon

  const rate = 15 + index * 18
  const y = useTransform(scrollProgress, [0, 1], [rate, -rate])

  const bandStart = index / steps.length
  const bandEnd = (index + 1) / steps.length
  const peakCenter = (bandStart + bandEnd) / 2

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.18),
      peakCenter,
      Math.min(1, peakCenter + 0.18),
    ],
    [0.4, 1, 0.4]
  )

  const scale = useTransform(
    scrollProgress,
    [
      Math.max(0, peakCenter - 0.15),
      peakCenter,
      Math.min(1, peakCenter + 0.15),
    ],
    [0.95, 1.02, 0.95]
  )

  return (
    <motion.div
      className="relative"
      style={{ y, opacity, scale }}
    >
      <div
        className="flex items-start gap-4 rounded-xl border border-orange-200/40 p-4"
        style={{
          background:
            'linear-gradient(160deg, rgba(255,250,245,0.95) 0%, rgba(255,243,230,0.85) 100%)',
          boxShadow:
            '0 2px 16px rgba(73,61,52,0.05), 0 1px 3px rgba(73,61,52,0.04)',
        }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white"
          style={{
            background:
              'linear-gradient(135deg, var(--color-orange-500), var(--color-orange-600))',
            boxShadow: '0 2px 8px rgba(249,149,77,0.25)',
          }}
        >
          {index + 1}
        </div>
        <div className="min-w-0">
          <h4 className="font-sans text-sm font-bold text-brown-900">
            {step.title}
          </h4>
          <p className="mt-0.5 text-xs leading-relaxed text-brown-700">
            {step.description}
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            <Icon className="h-3 w-3 text-orange-500" strokeWidth={2.5} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-500">
              {step.time}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorks05() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: 'var(--color-cream-50)' }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Atmospheric depth glow — background layer */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '80vw',
          height: '60vh',
          background:
            'radial-gradient(ellipse at center, rgba(249,149,77,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <div
        ref={titleRef}
        className="relative z-20 mx-auto mb-16 max-w-5xl px-6 text-center md:mb-20"
      >
        <motion.p
          className="mb-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-orange-500"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutCubic }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="font-sans text-4xl font-black tracking-tight text-brown-900 md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: easeOutQuint, delay: 0.1 }}
        >
          Layers of simplicity
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-md text-base text-brown-700"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.2 }}
        >
          Five steps at different depths. Scroll to bring each one into focus.
        </motion.p>
      </div>

      {/* Desktop parallax field */}
      <div className="relative mx-auto hidden h-[420px] max-w-6xl px-6 md:block">
        {steps.map((_, i) => (
          <ParallaxCard
            key={i}
            index={i}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Mobile stacked parallax */}
      <div className="relative mx-auto max-w-sm space-y-4 px-6 md:hidden">
        {steps.map((_, i) => (
          <MobileParallaxCard
            key={i}
            index={i}
            scrollProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
