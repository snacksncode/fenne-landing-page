'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'motion/react'
import { easeOutCubic, easeOutQuint } from '@/lib/easings'
import { steps, type Step } from './steps'

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`

function getStepThreshold(index: number) {
  return (index + 1) / steps.length
}

/* ------------------------------------------------------------------ */
/*  Timeline dot: sits on the vertical line, activates on scroll       */
/* ------------------------------------------------------------------ */
function TimelineDot({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getStepThreshold(index)
  const Icon = step.icon

  const bgColor = useTransform(progress, [threshold - 0.12, threshold], [
    'var(--color-brown-200)',
    'var(--color-orange-500)',
  ])
  const iconColor = useTransform(progress, [threshold - 0.12, threshold], [
    'var(--color-brown-400)',
    'var(--color-cream-50)',
  ])
  const ringOpacity = useTransform(progress, [threshold - 0.05, threshold + 0.02], [0, 0.35])

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring on activation */}
      <motion.div
        className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full"
        style={{
          border: '2px solid var(--color-orange-500)',
          opacity: ringOpacity,
        }}
      />
      {/* Dot */}
      <motion.div
        className="relative z-10 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-md"
        style={{
          backgroundColor: bgColor,
        }}
      >
        <motion.div style={{ color: iconColor }}>
          <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step card: fades in from left or right                             */
/* ------------------------------------------------------------------ */
function StepCard({
  step,
  index,
  progress,
  side,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
  side: 'left' | 'right'
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(progress, [threshold - 0.15, threshold], [0, 1])
  const x = useTransform(
    progress,
    [threshold - 0.15, threshold],
    [side === 'left' ? -40 : 40, 0]
  )
  const cardScale = useTransform(progress, [threshold - 0.15, threshold], [0.96, 1])

  const Icon = step.icon

  return (
    <motion.div
      className="rounded-2xl bg-cream-100/80 border border-orange-100/50 p-5 shadow-[0_2px_16px_rgba(73,61,52,0.05)] backdrop-blur-sm"
      style={{ opacity, x, scale: cardScale }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-orange-600" strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-orange-500">
          {step.time}
        </span>
      </div>
      <h4 className="font-sans text-base font-black text-brown-900 mb-1">{step.title}</h4>
      <p className="text-sm text-brown-700 leading-relaxed">{step.description}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile step card: always right of line                             */
/* ------------------------------------------------------------------ */
function MobileStepCard({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(progress, [threshold - 0.12, threshold], [0.3, 1])
  const x = useTransform(progress, [threshold - 0.12, threshold], [24, 0])
  const cardScale = useTransform(progress, [threshold - 0.12, threshold], [0.97, 1])
  const Icon = step.icon

  return (
    <motion.div
      className="rounded-xl bg-cream-100 border border-orange-100/60 p-4 shadow-[0_1px_8px_rgba(73,61,52,0.04)]"
      style={{ opacity, x, scale: cardScale }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-3.5 h-3.5 text-orange-600" strokeWidth={2} />
        </div>
        <span className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-orange-500">
          {step.time}
        </span>
      </div>
      <h4 className="font-sans text-sm font-bold text-brown-900">{step.title}</h4>
      <p className="text-xs text-brown-700 leading-relaxed mt-0.5">{step.description}</p>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export function HowItWorks01() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])

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
          backgroundImage: NOISE_SVG,
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
          Five steps, one flow
        </motion.h2>
        <motion.p
          className="mt-4 mx-auto max-w-md text-brown-700 text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.18 }}
        >
          Scroll through your weekly rhythm from first recipe to final bite.
        </motion.p>
      </div>

      {/* ============================================================ */}
      {/*  DESKTOP TIMELINE: Centered line, alternating cards           */}
      {/* ============================================================ */}
      <div className="relative mx-auto max-w-4xl px-6 hidden md:block">
        {/* Background track line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] rounded-full"
          style={{ backgroundColor: 'var(--color-brown-100)' }}
        />

        {/* Filled progress line */}
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[3px] rounded-full origin-top"
          style={{
            background: 'linear-gradient(to bottom, var(--color-orange-400), var(--color-orange-600))',
            scaleY: lineProgress,
            height: '100%',
          }}
        />

        {/* Steps */}
        <div className="relative">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={step.title}
                className="relative grid items-center"
                style={{
                  gridTemplateColumns: '1fr 44px 1fr',
                  marginBottom: i < steps.length - 1 ? '4rem' : 0,
                }}
              >
                {/* Left card or spacer */}
                <div className={isLeft ? 'pr-8' : ''}>
                  {isLeft && (
                    <StepCard step={step} index={i} progress={lineProgress} side="left" />
                  )}
                </div>

                {/* Center dot */}
                <div className="flex justify-center">
                  <TimelineDot step={step} index={i} progress={lineProgress} />
                </div>

                {/* Right card or spacer */}
                <div className={!isLeft ? 'pl-8' : ''}>
                  {!isLeft && (
                    <StepCard step={step} index={i} progress={lineProgress} side="right" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  MOBILE TIMELINE: Line on left, cards stacked right           */}
      {/* ============================================================ */}
      <div className="relative mx-auto max-w-sm px-6 md:hidden">
        {/* Background track line */}
        <div
          className="absolute left-[38px] top-0 bottom-0 w-[2px] rounded-full"
          style={{ backgroundColor: 'var(--color-brown-100)' }}
        />

        {/* Filled progress line */}
        <motion.div
          className="absolute left-[38px] top-0 w-[2px] rounded-full origin-top"
          style={{
            background: 'linear-gradient(to bottom, var(--color-orange-400), var(--color-orange-600))',
            scaleY: lineProgress,
            height: '100%',
          }}
        />

        {/* Steps */}
        <div className="relative space-y-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-4">
              {/* Dot */}
              <div className="shrink-0 pt-2">
                <TimelineDot step={step} index={i} progress={lineProgress} />
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <MobileStepCard step={step} index={i} progress={lineProgress} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
