'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'motion/react'
import { steps, type Step } from './steps'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'

const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"

/* ─── Desktop S-Curve ─── */
const D_VB_W = 1200
const D_VB_H = 480

// S-curve path flowing left to right with vertical swings
const DESKTOP_PATH = [
  'M 40 240',
  'C 160 240, 200 400, 320 400',
  'C 440 400, 440 80, 560 80',
  'C 680 80, 680 400, 800 400',
  'C 920 400, 920 80, 1040 80',
  'C 1100 80, 1130 240, 1160 240',
].join(' ')

// Waypoints along the S-curve where cards anchor
const DESKTOP_WAYPOINTS = [
  { x: 40, y: 240, cardSide: 'above' as const },
  { x: 320, y: 400, cardSide: 'below' as const },
  { x: 560, y: 80, cardSide: 'above' as const },
  { x: 800, y: 400, cardSide: 'below' as const },
  { x: 1040, y: 80, cardSide: 'above' as const },
]

/* ─── Mobile Vertical Snake ─── */
const M_VB_W = 300
const M_VB_H = 900

const MOBILE_PATH = [
  'M 150 30',
  'C 150 30, 260 100, 260 180',
  'C 260 260, 40 260, 40 340',
  'C 40 420, 260 420, 260 500',
  'C 260 580, 40 580, 40 660',
  'C 40 740, 150 790, 150 870',
].join(' ')

const MOBILE_WAYPOINTS = [
  { x: 150, y: 30, cardSide: 'right' as const },
  { x: 260, y: 180, cardSide: 'left' as const },
  { x: 40, y: 340, cardSide: 'right' as const },
  { x: 260, y: 500, cardSide: 'left' as const },
  { x: 40, y: 660, cardSide: 'right' as const },
]

/* ─── Helpers ─── */

function usePathLength(pathD: string) {
  const [length, setLength] = useState(0)
  useEffect(() => {
    const svgNS = 'http://www.w3.org/2000/svg'
    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('d', pathD)
    setLength(path.getTotalLength())
  }, [pathD])
  return length
}

/* ─── Step Card (Desktop) ─── */

function DesktopStepCard({
  step,
  index,
  waypoint,
  progress,
  viewBoxW,
  viewBoxH,
}: {
  step: Step
  index: number
  waypoint: { x: number; y: number; cardSide: 'above' | 'below' }
  progress: MotionValue<number>
  viewBoxW: number
  viewBoxH: number
}) {
  const threshold = (index + 1) / steps.length
  const opacity = useTransform(progress, [threshold - 0.12, threshold - 0.02], [0, 1])
  const cardY = useTransform(progress, [threshold - 0.12, threshold - 0.02], [12, 0])

  const Icon = step.icon
  const xPercent = (waypoint.x / viewBoxW) * 100
  const yPercent = (waypoint.y / viewBoxH) * 100

  const isAbove = waypoint.cardSide === 'above'

  return (
    <motion.div
      className="absolute w-48 pointer-events-auto"
      style={{
        left: `${xPercent}%`,
        top: `${yPercent}%`,
        x: '-50%',
        y: isAbove ? 'calc(-100% - 36px)' : '36px',
        opacity,
      }}
    >
      <motion.div
        className="rounded-xl border border-orange-100/60 bg-cream-100 p-4 shadow-[0_2px_16px_rgba(73,61,52,0.06)]"
        style={{ y: cardY }}
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-orange-600" strokeWidth={2} />
          </div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-orange-500">
            {step.time}
          </span>
        </div>
        <h4 className="font-sans text-sm font-bold text-brown-900 mb-1">{step.title}</h4>
        <p className="text-xs text-brown-700 leading-relaxed">{step.description}</p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Step Card (Mobile) ─── */

function MobileStepCard({
  step,
  index,
  progress,
}: {
  step: Step
  index: number
  progress: MotionValue<number>
}) {
  const threshold = (index + 1) / steps.length
  const opacity = useTransform(progress, [threshold - 0.12, threshold - 0.02], [0, 1])
  const cardScale = useTransform(progress, [threshold - 0.12, threshold - 0.02], [0.95, 1])

  const Icon = step.icon

  return (
    <motion.div
      className="flex items-start gap-3 rounded-xl border border-orange-100/60 bg-cream-100 p-3.5 shadow-[0_1px_8px_rgba(73,61,52,0.04)]"
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

/* ─── Waypoint Dot ─── */

function WaypointDot({
  x,
  y,
  index,
  progress,
}: {
  x: number
  y: number
  index: number
  progress: MotionValue<number>
}) {
  const threshold = (index + 1) / steps.length
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0, 1])
  const scale = useTransform(progress, [threshold - 0.08, threshold], [0, 1])

  return (
    <motion.circle
      cx={x}
      cy={y}
      r={8}
      fill="var(--color-orange-500)"
      style={{ opacity, scale, transformOrigin: `${x}px ${y}px` }}
    />
  )
}

/* ─── Traveling Dot ─── */

function TravelingDot({
  pathD,
  pathLength,
  progress,
}: {
  pathD: string
  pathLength: number
  progress: MotionValue<number>
}) {
  const dotRef = useRef<SVGCircleElement>(null)
  const pathRef = useRef<SVGPathElement | null>(null)

  useEffect(() => {
    const svgNS = 'http://www.w3.org/2000/svg'
    const p = document.createElementNS(svgNS, 'path')
    p.setAttribute('d', pathD)
    pathRef.current = p
  }, [pathD])

  useEffect(() => {
    if (!pathLength) return
    const unsubscribe = progress.on('change', (v) => {
      const dot = dotRef.current
      const path = pathRef.current
      if (!dot || !path) return
      const dist = v * pathLength
      const point = path.getPointAtLength(dist)
      dot.setAttribute('cx', String(point.x))
      dot.setAttribute('cy', String(point.y))
    })
    return unsubscribe
  }, [progress, pathLength, pathD])

  return (
    <circle
      ref={dotRef}
      r={6}
      fill="var(--color-cream-50)"
      stroke="var(--color-orange-500)"
      strokeWidth={3}
    />
  )
}

/* ─── Main Component ─── */

export function HowItWorks02() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center start'],
  })

  const pathProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1])

  const desktopPathLength = usePathLength(DESKTOP_PATH)
  const mobilePathLength = usePathLength(MOBILE_PATH)

  const desktopDashOffset = useTransform(
    pathProgress,
    [0, 1],
    [desktopPathLength || 3000, 0]
  )
  const mobileDashOffset = useTransform(
    pathProgress,
    [0, 1],
    [mobilePathLength || 2400, 0]
  )

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
          backgroundImage: NOISE_BG,
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
          Follow the river
        </motion.h2>
      </div>

      {/* ─── Desktop: Horizontal S-Curve ─── */}
      <div className="relative mx-auto max-w-6xl px-6 hidden md:block">
        <div className="relative" style={{ aspectRatio: `${D_VB_W} / ${D_VB_H}` }}>
          {/* SVG River */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${D_VB_W} ${D_VB_H}`}
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="river-grad-02" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-orange-400)" />
                <stop offset="50%" stopColor="var(--color-orange-500)" />
                <stop offset="100%" stopColor="var(--color-orange-600)" />
              </linearGradient>
            </defs>

            {/* Ghost path (track) */}
            <path
              d={DESKTOP_PATH}
              stroke="var(--color-orange-100)"
              strokeWidth={6}
              fill="none"
              opacity={0.5}
              strokeLinecap="round"
            />

            {/* Animated path */}
            <motion.path
              d={DESKTOP_PATH}
              stroke="url(#river-grad-02)"
              strokeWidth={6}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={desktopPathLength || 3000}
              style={{ strokeDashoffset: desktopDashOffset }}
            />

            {/* Waypoint dots */}
            {DESKTOP_WAYPOINTS.map((wp, i) => (
              <WaypointDot key={i} x={wp.x} y={wp.y} index={i} progress={pathProgress} />
            ))}

            {/* Traveling dot */}
            {desktopPathLength > 0 && (
              <TravelingDot
                pathD={DESKTOP_PATH}
                pathLength={desktopPathLength}
                progress={pathProgress}
              />
            )}
          </svg>

          {/* Step cards */}
          {steps.map((step, i) => (
            <DesktopStepCard
              key={step.title}
              step={step}
              index={i}
              waypoint={DESKTOP_WAYPOINTS[i]}
              progress={pathProgress}
              viewBoxW={D_VB_W}
              viewBoxH={D_VB_H}
            />
          ))}
        </div>
      </div>

      {/* ─── Mobile: Vertical Snake ─── */}
      <div className="relative mx-auto max-w-sm px-6 md:hidden">
        {/* SVG Snake */}
        <div className="relative" style={{ aspectRatio: `${M_VB_W} / ${M_VB_H}` }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${M_VB_W} ${M_VB_H}`}
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="river-grad-02-m" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-orange-400)" />
                <stop offset="50%" stopColor="var(--color-orange-500)" />
                <stop offset="100%" stopColor="var(--color-orange-600)" />
              </linearGradient>
            </defs>

            {/* Ghost path */}
            <path
              d={MOBILE_PATH}
              stroke="var(--color-orange-100)"
              strokeWidth={4}
              fill="none"
              opacity={0.5}
              strokeLinecap="round"
            />

            {/* Animated path */}
            <motion.path
              d={MOBILE_PATH}
              stroke="url(#river-grad-02-m)"
              strokeWidth={4}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={mobilePathLength || 2400}
              style={{ strokeDashoffset: mobileDashOffset }}
            />

            {/* Waypoint dots */}
            {MOBILE_WAYPOINTS.map((wp, i) => (
              <WaypointDot key={i} x={wp.x} y={wp.y} index={i} progress={pathProgress} />
            ))}

            {/* Traveling dot */}
            {mobilePathLength > 0 && (
              <TravelingDot
                pathD={MOBILE_PATH}
                pathLength={mobilePathLength}
                progress={pathProgress}
              />
            )}
          </svg>
        </div>

        {/* Mobile step cards */}
        <div className="mt-8 space-y-3">
          {steps.map((step, i) => (
            <MobileStepCard
              key={step.title}
              step={step}
              index={i}
              progress={pathProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
