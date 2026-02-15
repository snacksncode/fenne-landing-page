'use client'

import { useRef, useState, type RefObject } from 'react'
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

// ============================================================
// Shared Components
// ============================================================

function SectionHeader({
  titleRef,
  titleInView,
}: {
  titleRef: RefObject<HTMLDivElement | null>
  titleInView: boolean
}) {
  return (
    <div
      ref={titleRef}
      className="relative mx-auto max-w-5xl px-6 text-center mb-12 md:mb-20"
    >
      <motion.p
        className="text-sm font-bold uppercase mb-1 tracking-[0.2em] text-orange-500 md:mb-4 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: easeOutCubic }}
      >
        How it works
      </motion.p>
      <motion.h2
        className="font-sans text-3xl md:text-5xl font-black tracking-tight text-brown-900"
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: easeOutQuint, delay: 0.1 }}
      >
        One complete cycle
      </motion.h2>
    </div>
  )
}

function MobileStepCardV3({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const Icon = step.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.975 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: easeOutCubic, delay: 0.05 }}
      className="relative pt-8"
    >
      <div
        className="absolute left-6 top-0 z-10 w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background:
            'linear-gradient(135deg, var(--color-orange-500), var(--color-orange-600))',
          boxShadow:
            '0 8px 28px rgba(249,149,77,0.35), 0 2px 8px rgba(249,149,77,0.2)',
        }}
      >
        <Icon className="w-8 h-8 text-white" strokeWidth={1.8} />
      </div>

      <div className="relative rounded-2xl bg-white border border-brown-900/6 pt-12 pb-5 px-6 shadow-[0_4px_24px_rgba(73,61,52,0.06)] overflow-hidden">
        <span className="absolute right-2 -top-2 text-[110px] font-black leading-none font-mono select-none pointer-events-none text-orange-500/5">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="relative text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-orange-500/70">
          {step.step}
        </span>
        <h4 className="relative text-lg font-bold text-brown-900 leading-tight mt-0.5">
          {step.title}
        </h4>
        <p className="relative text-base text-brown-800 text-pretty max-w-3/4 mt-1.5">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export function HowItWorks09() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })
  const mobileTitleRef = useRef<HTMLDivElement>(null)
  const mobileTitleInView = useInView(mobileTitleRef, {
    once: true,
    margin: '-15% 0px',
  })
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
      className="relative md:h-[400vh]"
      style={{ background: 'var(--color-cream-50)' }}
    >
      <div className="md:hidden pb-20 p-6">
        <SectionHeader
          titleRef={mobileTitleRef}
          titleInView={mobileTitleInView}
        />

        <div className="flex mt-12 flex-col gap-4 max-w-md mx-auto">
          {steps.map((step, i) => (
            <MobileStepCardV3 key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>

      <div className="hidden md:flex sticky h-[calc(100vh-64px)] flex-col items-center justify-center top-16">
        <SectionHeader titleRef={titleRef} titleInView={titleInView} />

        <div className="relative mx-auto max-w-5xl px-6">
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
