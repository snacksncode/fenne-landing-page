'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from 'motion/react'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'
import { steps, type Step } from './steps'

/* ─── Layout constants ─── */
const COLLAPSED_HEIGHT = 64
const EXPANDED_HEIGHT_DESKTOP = 200
const EXPANDED_HEIGHT_MOBILE = 180

/* Each step occupies an even slice of the 0-1 scroll progress.
   Small buffer at start so first strip expands after entering viewport. */
function getStepRange(index: number): [number, number] {
  const sliceSize = 0.85 / steps.length
  const start = 0.08 + index * sliceSize
  const end = start + sliceSize
  return [start, end]
}

/* ─── Single Accordion Strip ─── */
function AccordionStrip({
  step,
  index,
  progress,
  isMobile,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
  isMobile?: boolean
}) {
  const Icon = step.icon
  const [start, end] = getStepRange(index)
  const midpoint = start + (end - start) * 0.45

  const expandedHeight = isMobile
    ? EXPANDED_HEIGHT_MOBILE
    : EXPANDED_HEIGHT_DESKTOP
  const height = useTransform(
    progress,
    [start, end],
    [COLLAPSED_HEIGHT, expandedHeight]
  )
  const contentOpacity = useTransform(progress, [midpoint, end], [0, 1])
  const contentY = useTransform(progress, [midpoint, end], [10, 0])

  /* Progress fill — orange accent bar on left edge */
  const fillHeight = useTransform(progress, [start, end], ['0%', '100%'])

  /* Step number + icon activation */
  const numberOpacity = useTransform(progress, [start, midpoint], [0.3, 1])
  const iconScale = useTransform(progress, [start, midpoint], [0.85, 1])

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl border border-brown-900/8"
      style={{
        height,
        background: 'var(--color-cream-100)',
      }}
    >
      {/* Orange progress fill bar — left edge */}
      <motion.div
        className="absolute left-0 top-0 w-1 rounded-full"
        style={{
          height: fillHeight,
          background: 'var(--color-orange-500)',
        }}
      />

      {/* Collapsed row — always visible */}
      <div className="relative flex items-center gap-4 px-5 md:px-7 h-16">
        {/* Step number */}
        <motion.span
          className="font-mono text-xs font-bold tabular-nums text-orange-500 shrink-0 w-5 text-center"
          style={{ opacity: numberOpacity }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Icon */}
        <motion.div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10"
          style={{ scale: iconScale }}
        >
          <Icon className="h-5 w-5 text-orange-600" strokeWidth={2} />
        </motion.div>

        {/* Title */}
        <h3 className="font-sans text-base md:text-lg font-bold text-brown-900 leading-tight">
          {step.title}
        </h3>

        {/* Time badge — pushed right, desktop only */}
        <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-brown-700/50 shrink-0 hidden sm:block">
          {step.time}
        </span>
      </div>

      {/* Expanded content — description + metadata */}
      <motion.div
        className="px-5 md:px-7 pb-5"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Separator */}
        <div className="mb-4 ml-5 mr-0 md:ml-[4.25rem] h-px bg-brown-900/6" />

        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 ml-0 md:ml-[4.25rem]">
          <p className="text-sm md:text-base text-brown-700 leading-relaxed max-w-md">
            {step.description}
          </p>
          {/* Time badge — visible on mobile in expanded state */}
          <div className="sm:hidden">
            <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-orange-500 font-semibold bg-orange-500/8 px-2.5 py-1 rounded-full">
              {step.time}
            </span>
          </div>
          {/* Desktop time detail */}
          <div className="hidden sm:block shrink-0">
            <span className="inline-block font-mono text-[11px] uppercase tracking-wider text-orange-500 font-semibold bg-orange-500/8 px-2.5 py-1 rounded-full">
              {step.time}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Progress Dots ─── */
function StepDot({
  index,
  progress,
}: {
  index: number
  progress: MotionValue<number>
}) {
  const [start, end] = getStepRange(index)
  const mid = start + (end - start) * 0.5

  const bg = useTransform(
    progress,
    [start, mid],
    ['var(--color-brown-900)', 'var(--color-orange-500)']
  )
  const opacity = useTransform(progress, [start, mid], [0.15, 1])
  const scale = useTransform(progress, [start, mid], [1, 1.3])

  return (
    <motion.div
      className="h-2 w-2 rounded-full"
      style={{ backgroundColor: bg, opacity, scale }}
    />
  )
}

/* ─── Main Component ─── */
export function HowItWorks04() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: 'var(--color-cream-50)' }}
    >
      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-[5] mx-auto max-w-3xl px-5 md:px-8">
        {/* Header */}
        <div className="mb-14 md:mb-20 text-center">
          <motion.p
            className="font-mono text-sm uppercase tracking-[0.2em] text-orange-500 mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutCubic }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: easeOutQuint, delay: 0.05 }}
          >
            Five steps, zero stress
          </motion.h2>
          <motion.p
            className="mt-4 mx-auto max-w-md text-brown-700 text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.12 }}
          >
            Scroll down and watch each step unfold
          </motion.p>
        </div>

        {/* Accordion strips */}
        <div className="relative flex flex-col gap-3">
          {steps.map((step, index) => (
            <AccordionStrip
              key={step.title}
              step={step}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom progress dots */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.6 }}
        >
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <StepDot key={i} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
