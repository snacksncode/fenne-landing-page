'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'motion/react'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'
import { steps, type Step } from './steps'

/* ─── Fan layout config ─── */

// Desktop: cards fan from center into a horizontal arc
const DESKTOP_FAN = [
  { rotation: -20, x: -340, y: 18 },
  { rotation: -10, x: -170, y: 4 },
  { rotation: 0, x: 0, y: 0 },
  { rotation: 10, x: 170, y: 4 },
  { rotation: 20, x: 340, y: 18 },
]

// Initial deck: tiny rotation hints for depth
const DECK_HINTS = [
  { rotation: -3, y: -2 },
  { rotation: -1.5, y: -1 },
  { rotation: 0, y: 0 },
  { rotation: 1.5, y: -1 },
  { rotation: 3, y: -2 },
]

/* ─── Desktop Card ─── */

function DesktopCard({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const fan = DESKTOP_FAN[index]
  const hint = DECK_HINTS[index]
  const Icon = step.icon

  // Each card fans with slight stagger
  const start = 0.05 + index * 0.06
  const end = start + 0.45

  const rotation = useTransform(progress, [start, end], [hint.rotation, fan.rotation])
  const x = useTransform(progress, [start, end], [0, fan.x])
  const y = useTransform(progress, [start, end], [hint.y, fan.y])
  const scale = useTransform(progress, [start, end], [0.95, 1])
  const opacity = useTransform(progress, [start, start + 0.1], [0.7, 1])

  // Shadow grows as card lifts out
  const shadowOpacity = useTransform(progress, [start, end], [0.04, 0.12])

  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[260px]"
      style={{
        x,
        y,
        rotate: rotation,
        scale,
        opacity,
        marginLeft: -130,
        zIndex: index === 2 ? 10 : 10 - Math.abs(index - 2),
        transformOrigin: 'center bottom',
      }}
    >
      <motion.div
        className="relative rounded-2xl bg-cream-100 border border-orange-100/60 p-6"
        style={{
          boxShadow: useTransform(
            shadowOpacity,
            (v) => `0 8px 32px rgba(73,61,52,${v}), 0 2px 8px rgba(73,61,52,${v * 0.5})`
          ),
        }}
      >
        {/* Step number badge */}
        <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_2px_8px_rgba(249,149,77,0.4)]">
          <span className="text-xs font-black text-cream-50">{index + 1}</span>
        </div>

        <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
          <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
        </div>
        <h3 className="font-sans text-base font-black text-brown-900 mb-1.5">
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-brown-700 mb-3">
          {step.description}
        </p>
        <span className="inline-block rounded-full bg-orange-500/8 px-3 py-1 text-xs font-bold text-orange-600 tracking-wide font-mono">
          {step.time}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Mobile Card ─── */

function MobileCard({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const Icon = step.icon
  const total = steps.length

  // Staggered reveal thresholds
  const start = 0.1 + (index / total) * 0.5
  const end = start + 0.2

  const y = useTransform(progress, [start, end], [40, 0])
  const opacity = useTransform(progress, [start, end], [0, 1])
  const scale = useTransform(progress, [start, end], [0.96, 1])
  const rotation = useTransform(progress, [start, end], [3, 0])

  return (
    <motion.div
      style={{ y, opacity, scale, rotate: rotation }}
    >
      <div className="relative rounded-2xl bg-cream-100 border border-orange-100/60 p-5 shadow-[0_2px_16px_rgba(73,61,52,0.06)]">
        {/* Step number badge */}
        <div className="absolute -top-2.5 right-4 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_2px_6px_rgba(249,149,77,0.35)]">
          <span className="text-[10px] font-black text-cream-50">{index + 1}</span>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h4 className="font-sans text-sm font-bold text-brown-900">{step.title}</h4>
            <p className="text-xs text-brown-700 leading-relaxed mt-0.5">{step.description}</p>
            <span className="inline-block mt-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500">
              {step.time}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Main Section ─── */

export function HowItWorks03() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const fanProgress = useTransform(scrollYProgress, [0.1, 0.55], [0, 1])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-44"
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

      {/* Header */}
      <div ref={titleRef} className="relative mx-auto max-w-5xl px-6 text-center mb-16 md:mb-24">
        <motion.p
          className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-4 font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOutCubic }}
        >
          How it works
        </motion.p>
        <motion.h2
          className="font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: easeOutQuint, delay: 0.1 }}
        >
          Deal yourself in
        </motion.h2>
      </div>

      {/* Desktop — Fanning card deck */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div
          className="relative mx-auto hidden md:block"
          style={{ height: 340, maxWidth: 800 }}
        >
          {steps.map((step, i) => (
            <DesktopCard
              key={step.title}
              step={step}
              index={i}
              progress={fanProgress}
            />
          ))}
        </div>

        {/* Mobile — Vertical reveal with overlap */}
        <div className="md:hidden">
          <div className="mx-auto max-w-sm space-y-4 px-2">
            {steps.map((step, i) => (
              <MobileCard
                key={step.title}
                step={step}
                index={i}
                progress={fanProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
