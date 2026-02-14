'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'
import { steps, type Step } from './steps'
import { useScrollTo } from '@/lib/scroll-utils'

const STEP_ANGLES = steps.map((_, i) => -90 + (360 / steps.length) * i)

const RING_SIZE = 340
const STROKE_WIDTH = 12
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

// --- Helpers ---

function getPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  }
}

function getStepThreshold(index: number) {
  return index / steps.length
}

// --- Shared Props ---

interface MobileVariantProps {
  progress: MotionValue<number>
  currentStepIndex: number
  scrollToStep: (index: number) => void
}

// ============================================================
// Desktop Components (unchanged behavior)
// ============================================================

function StepIcon({
  step,
  index,
  angle,
  ringRadius,
  progress,
  iconContainerSize = 44,
  iconSize = 'w-5 h-5',
}: {
  step: Step
  index: number
  angle: number
  ringRadius: number
  progress: MotionValue<number>
  iconContainerSize?: number
  iconSize?: string
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(progress, [threshold - 0.03, threshold], [0, 1])
  const scale = useTransform(progress, [threshold - 0.03, threshold], [0.5, 1])
  const pos = getPosition(angle, ringRadius)
  const Icon = step.icon
  const half = iconContainerSize / 2

  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{
        left: '50%',
        top: '50%',
        x: pos.x - half,
        y: pos.y - half,
        opacity,
        scale,
      }}
    >
      <div
        className="rounded-full bg-cream-100 border-2 border-orange-500 shadow-[0_2px_12px_rgba(249,149,77,0.25)] flex items-center justify-center"
        style={{ width: iconContainerSize, height: iconContainerSize }}
      >
        <Icon className={`${iconSize} text-orange-600`} strokeWidth={2} />
      </div>
    </motion.div>
  )
}

function DesktopStepLabel({
  step,
  index,
  progress,
  onClick,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
  onClick?: () => void
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0.3, 1]
  )
  const Icon = step.icon

  return (
    <div className="relative">
      <motion.div className="inset-0 absolute bg-cream-50 -z-1" />
      <motion.div className="md:justify-center flex" style={{ opacity }}>
        <button
          className="text-center px-3 lg:px-4 flex md:flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={onClick}
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 mb-3 flex items-center justify-center mx-auto">
            <Icon className="w-5 h-5 text-orange-600" strokeWidth={2} />
          </div>
          <h4 className="font-sans text-sm font-bold text-brown-900">
            {step.title}
          </h4>
          <span className="inline-block mt-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500">
            {step.step}
          </span>
        </button>
      </motion.div>
    </div>
  )
}

function VariantAStepItem({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const threshold = getStepThreshold(index)
  const opacity = useTransform(
    progress,
    [threshold - 0.08, threshold],
    [0.3, 1]
  )
  const Icon = step.icon

  return (
    <motion.div className="flex items-start gap-4">
      <div className="relative z-10 w-10 aspect-square shrink-0 rounded-full bg-cream-100 shadow-[0_2px_12px_rgba(249,149,77,0.25)] flex items-center justify-center">
        <motion.div
          className="inset-0 absolute border-2 border-orange-500 rounded-full"
          style={{ opacity }}
        />
        <motion.div style={{ opacity }}>
          <Icon className="w-4 h-4 text-orange-600" strokeWidth={2} />
        </motion.div>
      </div>
      <div className="pt-1 min-w-0">
        <h4 className="font-sans text-sm font-bold text-brown-900">
          {step.title}
        </h4>
        <p className="text-xs text-brown-700 leading-relaxed mt-0.5">
          {step.description}
        </p>
        <span className="inline-block mt-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-orange-500">
          {step.step}
        </span>
      </div>
    </motion.div>
  )
}

function MobileVariant({ progress }: MobileVariantProps) {
  const lineScaleY = useTransform(progress, [0, 1], [0, 1])

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="relative">
        <div className="absolute left-4.75 top-0 bottom-0 w-0.5 bg-orange-100 rounded-full" />
        <motion.div
          className="absolute left-4.75 bottom-0 top-1 w-0.5 bg-orange-500 rounded-full origin-top"
          style={{ scaleY: lineScaleY }}
        />
        <div className="relative flex flex-col gap-6">
          {steps.map((step, i) => (
            <VariantAStepItem
              key={step.title}
              step={step}
              index={i}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function HowItWorks09() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef })
  const { scrollTo } = useScrollTo()
  const ringProgress = useTransform(scrollYProgress, [0, 0.95], [0, 1])

  const activeStepIndex = useTransform(ringProgress, (value) => {
    return Math.min(Math.floor(value * steps.length), steps.length - 1)
  })

  useMotionValueEvent(activeStepIndex, 'change', (latest) => {
    setCurrentStepIndex(latest)
  })

  const scrollToStep = (stepIndex: number) => {
    if (!sectionRef.current) return

    const sectionRect = sectionRef.current.getBoundingClientRect()
    const sectionTop = sectionRect.top + window.scrollY
    const sectionHeight = sectionRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const scrollableDistance = sectionHeight - viewportHeight
    const stepThreshold = stepIndex / steps.length
    const targetScrollY =
      sectionTop +
      stepThreshold * 0.93 * scrollableDistance +
      (stepIndex > 0 ? 50 : 0)
    scrollTo(targetScrollY)
  }

  const pulseScale = useTransform(ringProgress, [0.95, 1], [1, 1.03])
  const pulseOpacity = useTransform(ringProgress, [0.95, 1], [0, 0.4])
  const desktopDashOffset = useTransform(
    ringProgress,
    [0, 1],
    [CIRCUMFERENCE, 0]
  )

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative h-[300vh] md:h-[400vh]"
      style={{ background: 'var(--color-cream-50)' }}
    >
      <div className="sticky h-screen flex flex-col items-center justify-center top-0">
        <div
          ref={titleRef}
          className="relative mx-auto max-w-5xl px-6 text-center mb-16 md:mb-20"
        >
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

        <div className="md:hidden w-full px-6">
          <MobileVariant
            progress={ringProgress}
            currentStepIndex={currentStepIndex}
            scrollToStep={scrollToStep}
          />
        </div>

        <div className="hidden md:block relative mx-auto max-w-5xl px-6">
          <div
            className="relative mx-auto"
            style={{ width: RING_SIZE, height: RING_SIZE }}
          >
            <svg
              className="absolute inset-0"
              width={RING_SIZE}
              height={RING_SIZE}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            >
              <defs>
                <linearGradient
                  id="ring-gradient-09"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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

            <motion.div
              className="absolute border-2 border-orange-500 inset-0 rounded-full"
              style={{ scale: pulseScale, opacity: pulseOpacity }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {steps[currentStepIndex] && (
                  <motion.div
                    key={`step-${currentStepIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ ease: easeOutCubic, duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    {(() => {
                      const Icon = steps[currentStepIndex].icon
                      return (
                        <>
                          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
                            <Icon
                              className="w-7 h-7 text-orange-600"
                              strokeWidth={2}
                            />
                          </div>
                          <h3 className="text-2xl font-black text-brown-900 tracking-tight">
                            {steps[currentStepIndex].title}
                          </h3>
                          <p className="text-sm text-brown-700 mt-2 max-w-50 text-balance w-full text-center leading-normal">
                            {steps[currentStepIndex].description}
                          </p>
                        </>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {steps.map((step, i) => (
              <StepIcon
                key={step.title}
                step={step}
                index={i}
                angle={STEP_ANGLES[i]}
                ringRadius={RADIUS}
                progress={ringProgress}
              />
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4 lg:gap-8 mt-14 md:max-w-4xl relative text-gray-300">
            <div className="top-1/2 -translate-y-1/2 absolute left-0 right-0 -z-10 h-0.5 bg-[repeating-linear-gradient(90deg,#d1d5dc,#d1d5dc_4px,transparent_4px,transparent_8px)]" />
            {steps.map((step, i) => (
              <DesktopStepLabel
                key={step.title}
                step={step}
                index={i}
                progress={ringProgress}
                onClick={() => scrollToStep(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
