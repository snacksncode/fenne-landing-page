'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'motion/react'
import {
  BookPlus,
  CalendarDays,
  ListChecks,
  ShoppingCart,
  Utensils,
} from 'lucide-react'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'
import type { LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
  time: string
  angle: number
}

const steps: Step[] = [
  {
    icon: BookPlus,
    title: 'Add Recipes',
    description: 'Save recipes you find online to your personal collection',
    time: 'Ongoing',
    angle: -90,
  },
  {
    icon: CalendarDays,
    title: 'Plan Your Week',
    description: 'Assign meals to days in under 10 minutes',
    time: '~10 min',
    angle: -90 + 72,
  },
  {
    icon: ListChecks,
    title: 'Generate List',
    description: 'One tap creates your grocery list, sorted by aisle',
    time: '1 tap',
    angle: -90 + 144,
  },
  {
    icon: ShoppingCart,
    title: 'Shop & Check Off',
    description: 'Pull up your list at the store, check off items as you go',
    time: 'At the store',
    angle: -90 + 216,
  },
  {
    icon: Utensils,
    title: 'Cook',
    description: 'Open the app, see today\'s meal, start cooking',
    time: 'Daily',
    angle: -90 + 288,
  },
]

function getPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

function getStepThreshold(index: number) {
  return (index + 1) / steps.length
}

const RING_SIZE = 340
const STROKE_WIDTH = 12
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const RING_SIZE_MOBILE = 260
const STROKE_WIDTH_MOBILE = 10
const RADIUS_MOBILE = (RING_SIZE_MOBILE - STROKE_WIDTH_MOBILE) / 2
const CIRCUMFERENCE_MOBILE = 2 * Math.PI * RADIUS_MOBILE

function StepIcon({
  step,
  index,
  ringRadius,
  progress,
}: {
  step: Step
  index: number
  ringRadius: number
  progress: MotionValue<number>
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0, 1])
  const scale = useTransform(progress, [threshold - 0.08, threshold], [0.5, 1])
  const pos = getPosition(step.angle, ringRadius)
  const Icon = step.icon

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        left: '50%',
        top: '50%',
        x: pos.x - 22,
        y: pos.y - 22,
        opacity,
        scale,
      }}
    >
      <div className="w-11 h-11 rounded-full bg-cream-100 border-2 border-orange-500 shadow-[0_2px_12px_rgba(249,149,77,0.25)] flex items-center justify-center">
        <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
      </div>
    </motion.div>
  )
}

function MobileStepCard({
  step,
  icon: Icon,
  threshold,
  progress,
}: {
  step: Step
  icon: LucideIcon
  threshold: number
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, [threshold - 0.1, threshold], [0.35, 1])
  const cardScale = useTransform(progress, [threshold - 0.1, threshold], [0.97, 1])

  return (
    <motion.div
      className="flex items-start gap-4 rounded-xl bg-cream-100 border border-orange-100/60 p-4 shadow-[0_1px_8px_rgba(73,61,52,0.04)]"
      style={{ opacity, scale: cardScale }}
    >
      <div className="w-9 h-9 shrink-0 rounded-lg bg-orange-500/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-orange-600" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <h4 className="font-sans text-sm font-bold text-brown-900">{step.title}</h4>
        <p className="text-xs text-brown-700 leading-relaxed mt-0.5">{step.description}</p>
        <span className="inline-block mt-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500">
          {step.time}
        </span>
      </div>
    </motion.div>
  )
}

function DesktopStepLabel({
  step,
  icon: Icon,
  index,
  progress,
}: {
  step: Step
  icon: LucideIcon
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0.3, 1])
  const y = useTransform(progress, [threshold - 0.08, threshold], [8, 0])

  return (
    <motion.div
      className="text-center"
      style={{ opacity, y }}
    >
      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
      </div>
      <h4 className="font-sans text-sm font-bold text-brown-900 mb-1">{step.title}</h4>
      <p className="text-xs text-brown-700 leading-relaxed">{step.description}</p>
      <span className="inline-block mt-2 text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500">
        {step.time}
      </span>
    </motion.div>
  )
}

export function HowItWorks09() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  })

  const ringProgress = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  const pulseScale = useTransform(ringProgress, [0.95, 1], [1, 1.03])
  const pulseOpacity = useTransform(ringProgress, [0.95, 1], [0, 0.4])
  const centerOpacity = useTransform(ringProgress, [0.05, 0.2], [0.4, 1])

  const desktopDashOffset = useTransform(ringProgress, [0, 1], [CIRCUMFERENCE, 0])
  const mobileDashOffset = useTransform(ringProgress, [0, 1], [CIRCUMFERENCE_MOBILE, 0])

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
      <div ref={titleRef} className="relative mx-auto max-w-5xl px-6 text-center mb-16 md:mb-20">
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
          One complete cycle
        </motion.h2>
      </div>

      {/* Ring + Icons -- Desktop */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div
          className="relative mx-auto hidden md:block"
          style={{ width: RING_SIZE, height: RING_SIZE }}
        >
          <svg
            className="absolute inset-0"
            width={RING_SIZE}
            height={RING_SIZE}
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          >
            <defs>
              <linearGradient id="ring-gradient-09" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-orange-500)" />
                <stop offset="100%" stopColor="var(--color-orange-600)" />
              </linearGradient>
            </defs>

            <circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--color-orange-100)"
              strokeWidth={STROKE_WIDTH}
              opacity={0.5}
            />

            <motion.circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="url(#ring-gradient-09)"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{
                strokeDashoffset: desktopDashOffset,
                rotate: '-90deg',
                transformOrigin: 'center',
              }}
            />
          </svg>

          {/* Pulse ring on completion */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid var(--color-orange-500)',
              scale: pulseScale,
              opacity: pulseOpacity,
            }}
          />

          {/* Center content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: centerOpacity }}
          >
            <span className="text-4xl font-black text-brown-900 tracking-tight">10 min</span>
            <span className="text-sm font-medium text-brown-700 mt-1">per week</span>
            <span className="text-xs font-mono uppercase tracking-[0.15em] text-orange-500 mt-3">
              and repeat
            </span>
          </motion.div>

          {/* Step icons at ring positions */}
          {steps.map((step, i) => (
            <StepIcon
              key={step.title}
              step={step}
              index={i}
              ringRadius={RADIUS}
              progress={ringProgress}
            />
          ))}
        </div>

        {/* Ring -- Mobile */}
        <div className="md:hidden flex flex-col items-center">
          <div
            className="relative mx-auto mb-10"
            style={{ width: RING_SIZE_MOBILE, height: RING_SIZE_MOBILE }}
          >
            <svg
              className="absolute inset-0"
              width={RING_SIZE_MOBILE}
              height={RING_SIZE_MOBILE}
              viewBox={`0 0 ${RING_SIZE_MOBILE} ${RING_SIZE_MOBILE}`}
            >
              <defs>
                <linearGradient id="ring-gradient-09-m" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-orange-500)" />
                  <stop offset="100%" stopColor="var(--color-orange-600)" />
                </linearGradient>
              </defs>

              <circle
                cx={RING_SIZE_MOBILE / 2}
                cy={RING_SIZE_MOBILE / 2}
                r={RADIUS_MOBILE}
                fill="none"
                stroke="var(--color-orange-100)"
                strokeWidth={STROKE_WIDTH_MOBILE}
                opacity={0.5}
              />

              <motion.circle
                cx={RING_SIZE_MOBILE / 2}
                cy={RING_SIZE_MOBILE / 2}
                r={RADIUS_MOBILE}
                fill="none"
                stroke="url(#ring-gradient-09-m)"
                strokeWidth={STROKE_WIDTH_MOBILE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE_MOBILE}
                style={{
                  strokeDashoffset: mobileDashOffset,
                  rotate: '-90deg',
                  transformOrigin: 'center',
                }}
              />
            </svg>

            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: '2px solid var(--color-orange-500)',
                scale: pulseScale,
                opacity: pulseOpacity,
              }}
            />

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ opacity: centerOpacity }}
            >
              <span className="text-3xl font-black text-brown-900 tracking-tight">10 min</span>
              <span className="text-xs font-medium text-brown-700 mt-1">per week</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-orange-500 mt-2">
                and repeat
              </span>
            </motion.div>
          </div>

          {/* Step cards -- mobile list */}
          <div className="w-full max-w-sm space-y-3 px-2">
            {steps.map((step, i) => {
              const Icon = step.icon
              const threshold = getStepThreshold(i)
              return (
                <MobileStepCard
                  key={step.title}
                  step={step}
                  icon={Icon}
                  threshold={threshold}
                  progress={ringProgress}
                />
              )
            })}
          </div>
        </div>

        {/* Step labels -- Desktop (below ring) */}
        <div className="hidden md:grid grid-cols-5 gap-4 mt-14 max-w-4xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <DesktopStepLabel
                key={step.title}
                step={step}
                icon={Icon}
                index={i}
                progress={ringProgress}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
