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
import { steps } from './steps'

const SEGMENT_COUNT = steps.length
const SEGMENT_GAP = 6
const BAR_HEIGHT = 10
const PIP_SIZE = 20

function getSegmentThreshold(index: number) {
  return (index + 0.5) / SEGMENT_COUNT
}

function getSegmentFill(index: number) {
  const segStart = index / SEGMENT_COUNT
  const segEnd = (index + 1) / SEGMENT_COUNT
  return { start: segStart, end: segEnd }
}

function SegmentBar({ progress }: { progress: MotionValue<number> }) {
  const pipPosition = useTransform(progress, [0, 1], ['0%', '100%'])
  const pipOpacity = useTransform(progress, [0, 0.02], [0, 1])
  const pipScale = useTransform(progress, [0, 0.04], [0.4, 1])

  return (
    <div className="relative w-full">
      {/* Track container */}
      <div
        className="relative flex w-full"
        style={{ gap: SEGMENT_GAP, height: BAR_HEIGHT }}
      >
        {steps.map((_, i) => {
          const { start, end } = getSegmentFill(i)

          return (
            <Segment
              key={i}
              index={i}
              start={start}
              end={end}
              progress={progress}
            />
          )
        })}
      </div>

      {/* Progress pip/marker */}
      <motion.div
        className="pointer-events-none absolute -top-[5px] z-20"
        style={{
          left: pipPosition,
          opacity: pipOpacity,
          scale: pipScale,
          x: '-50%',
        }}
      >
        <div
          className="relative"
          style={{ width: PIP_SIZE, height: PIP_SIZE }}
        >
          {/* Glow ring */}
          <div className="absolute inset-[-4px] rounded-full bg-orange-400/25 blur-[3px]" />
          {/* Solid pip */}
          <div
            className="absolute inset-0 rounded-full border-2 border-cream-50 shadow-[0_1px_6px_rgba(249,115,22,0.5)]"
            style={{
              background:
                'linear-gradient(135deg, var(--color-orange-400), var(--color-orange-600))',
            }}
          />
          {/* Inner dot */}
          <div className="absolute inset-[5px] rounded-full bg-white/60" />
        </div>
      </motion.div>
    </div>
  )
}

function Segment({
  index,
  start,
  end,
  progress,
}: {
  index: number
  start: number
  end: number
  progress: MotionValue<number>
}) {
  const fillScaleX = useTransform(progress, [start, end], [0, 1], {
    clamp: true,
  })
  const fillOpacity = useTransform(progress, [start, start + 0.01], [0, 1])

  const isFirst = index === 0
  const isLast = index === SEGMENT_COUNT - 1

  const borderRadius = [
    isFirst ? '999px' : '3px',
    isLast ? '999px' : '3px',
    isLast ? '999px' : '3px',
    isFirst ? '999px' : '3px',
  ].join(' ')

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        height: BAR_HEIGHT,
        borderRadius,
        background: 'var(--color-orange-100)',
      }}
    >
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          scaleX: fillScaleX,
          opacity: fillOpacity,
          background:
            'linear-gradient(90deg, var(--color-orange-400), var(--color-orange-500))',
          borderRadius,
        }}
      />
      {/* Shimmer on top of fill */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          scaleX: fillScaleX,
          opacity: fillOpacity,
          background:
            'linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
          borderRadius,
        }}
      />
    </div>
  )
}

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getSegmentThreshold(index)
  const opacity = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.02],
    [0, 1]
  )
  const y = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.02],
    [20, 0]
  )
  const scale = useTransform(
    progress,
    [threshold - 0.06, threshold + 0.02],
    [0.94, 1]
  )

  const Icon = step.icon

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      style={{ opacity, y, scale }}
    >
      {/* Connector tick from bar */}
      <div className="mb-3 flex flex-col items-center">
        <div
          className="h-5 w-px"
          style={{ background: 'var(--color-orange-300)' }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: 'var(--color-orange-400)' }}
        />
      </div>

      {/* Card */}
      <div className="rounded-xl border border-orange-100 bg-white/90 p-4 shadow-[0_2px_16px_rgba(73,61,52,0.06)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
          <Icon className="h-5 w-5 text-orange-600" strokeWidth={2} />
        </div>
        <h4 className="font-sans text-sm font-bold text-brown-900">
          {step.title}
        </h4>
        <p className="mt-1 text-xs leading-relaxed text-brown-700">
          {step.description}
        </p>
        <span className="mt-2 inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-orange-500">
          {step.time}
        </span>
      </div>
    </motion.div>
  )
}

function MobileStepCard({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getSegmentThreshold(index)
  const opacity = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0, 1]
  )
  const y = useTransform(progress, [threshold - 0.08, threshold], [16, 0])
  const scale = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0.96, 1]
  )
  const Icon = step.icon

  return (
    <motion.div
      className="flex items-start gap-4 rounded-xl border border-orange-100/60 bg-white/90 p-4 shadow-[0_1px_8px_rgba(73,61,52,0.04)] backdrop-blur-sm"
      style={{ opacity, y, scale }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
        <Icon className="h-4 w-4 text-orange-600" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h4 className="font-sans text-sm font-bold text-brown-900">
          {step.title}
        </h4>
        <p className="mt-0.5 text-xs leading-relaxed text-brown-700">
          {step.description}
        </p>
        <span className="mt-1.5 inline-block font-mono text-[10px] font-bold uppercase tracking-wider text-orange-500">
          {step.time}
        </span>
      </div>
    </motion.div>
  )
}

export function HowItWorks10() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  })

  const barProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])
  const bottomNoteOpacity = useTransform(barProgress, [0.9, 1], [0, 1])

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
      <div
        ref={titleRef}
        className="relative mx-auto mb-16 max-w-5xl px-6 text-center md:mb-20"
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
          Five steps, one bar
        </motion.h2>
      </div>

      {/* Desktop layout */}
      <div className="relative mx-auto hidden max-w-5xl px-6 md:block">
        {/* Segmented progress bar */}
        <SegmentBar progress={barProgress} />

        {/* Step cards row below bar */}
        <div className="mt-0 grid grid-cols-5 gap-3">
          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              progress={barProgress}
            />
          ))}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="relative mx-auto max-w-md px-6 md:hidden">
        {/* Mobile progress bar */}
        <div className="mb-6">
          <SegmentBar progress={barProgress} />
        </div>

        {/* Stacked cards */}
        <div className="flex flex-col gap-3">
          {steps.map((step, i) => (
            <MobileStepCard
              key={step.title}
              step={step}
              index={i}
              progress={barProgress}
            />
          ))}
        </div>
      </div>

      {/* Bottom note */}
      <motion.div
        className="relative mx-auto mt-10 flex items-center justify-center gap-2"
        style={{
          opacity: bottomNoteOpacity,
        }}
      >
        <div className="h-px w-8 bg-orange-300" />
        <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange-500">
          Repeats weekly
        </p>
        <div className="h-px w-8 bg-orange-300" />
      </motion.div>
    </section>
  )
}
