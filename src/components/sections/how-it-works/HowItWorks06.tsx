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

// ── Sprocket Hole Decorations ──────────────────────────────────────
function SprocketRow({ count, side }: { count: number; side: 'top' | 'bottom' }) {
  return (
    <div
      className={`pointer-events-none absolute left-0 right-0 flex justify-around px-4 ${
        side === 'top' ? 'top-2 md:top-3' : 'bottom-2 md:bottom-3'
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-5 rounded-sm border border-brown-900/15 bg-cream-50/40 md:h-4 md:w-6 md:rounded"
          style={{
            boxShadow: 'inset 0 1px 2px rgba(73,61,52,0.12)',
          }}
        />
      ))}
    </div>
  )
}

function SprocketColumn({ count, side }: { count: number; side: 'left' | 'right' }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 bottom-0 flex flex-col justify-around py-4 ${
        side === 'left' ? 'left-1.5' : 'right-1.5'
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-2.5 rounded-sm border border-brown-900/15 bg-cream-50/40"
          style={{
            boxShadow: 'inset 0 1px 2px rgba(73,61,52,0.12)',
          }}
        />
      ))}
    </div>
  )
}

// ── Film Frame (Desktop) ───────────────────────────────────────────
function FilmFrame({
  step,
  index,
  scrollProgress,
}: {
  step: (typeof steps)[number]
  index: number
  scrollProgress: MotionValue<number>
}) {
  const Icon = step.icon
  const threshold = index / (steps.length - 1)

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, threshold - 0.18),
      Math.max(0, threshold - 0.06),
      threshold,
      Math.min(1, threshold + 0.06),
      Math.min(1, threshold + 0.18),
    ],
    [0.3, 0.6, 1, 0.6, 0.3]
  )

  const scale = useTransform(
    scrollProgress,
    [
      Math.max(0, threshold - 0.18),
      Math.max(0, threshold - 0.06),
      threshold,
      Math.min(1, threshold + 0.06),
      Math.min(1, threshold + 0.18),
    ],
    [0.88, 0.94, 1.05, 0.94, 0.88]
  )

  const borderOpacity = useTransform(
    scrollProgress,
    [Math.max(0, threshold - 0.08), threshold, Math.min(1, threshold + 0.08)],
    [0, 1, 0]
  )

  return (
    <motion.div
      className="relative flex h-full shrink-0 flex-col items-center justify-center px-3"
      style={{
        width: '320px',
        opacity,
        scale,
      }}
    >
      <motion.div
        className="absolute inset-3 rounded-xl border-2 border-orange-500"
        style={{ opacity: borderOpacity }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <div className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-brown-700/40">
          {String(index + 1).padStart(2, '0')}
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, var(--color-orange-100), var(--color-cream-100))',
            boxShadow: '0 4px 12px rgba(249,149,77,0.15), inset 0 1px 0 rgba(255,255,255,0.6)',
          }}
        >
          <Icon className="h-7 w-7 text-orange-600" strokeWidth={1.8} />
        </div>

        <h3 className="text-lg font-black tracking-tight text-brown-900">{step.title}</h3>

        <p className="max-w-[200px] text-sm leading-relaxed text-brown-700/70">
          {step.description}
        </p>

        <div
          className="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
          style={{
            background: 'var(--color-orange-100)',
            color: 'var(--color-orange-600)',
          }}
        >
          {step.time}
        </div>
      </div>
    </motion.div>
  )
}

// ── Film Frame (Mobile) ────────────────────────────────────────────
function MobileFilmFrame({
  step,
  index,
}: {
  step: (typeof steps)[number]
  index: number
}) {
  const Icon = step.icon

  return (
    <motion.div
      className="relative mx-auto w-full max-w-sm"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: easeOutCubic, duration: 0.7 }}
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-brown-900/10 px-8 py-8"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(254,247,234,0.6) 100%)',
          boxShadow: '0 2px 12px rgba(73,61,52,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <SprocketColumn count={4} side="left" />
        <SprocketColumn count={4} side="right" />

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brown-700/35">
            {String(index + 1).padStart(2, '0')}
          </div>

          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: 'linear-gradient(135deg, var(--color-orange-100), var(--color-cream-100))',
              boxShadow: '0 3px 8px rgba(249,149,77,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
            }}
          >
            <Icon className="h-6 w-6 text-orange-600" strokeWidth={1.8} />
          </div>

          <h3 className="text-base font-black tracking-tight text-brown-900">{step.title}</h3>
          <p className="text-sm leading-relaxed text-brown-700/65">{step.description}</p>

          <div
            className="rounded-full px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{
              background: 'var(--color-orange-100)',
              color: 'var(--color-orange-600)',
            }}
          >
            {step.time}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Connector between mobile frames ────────────────────────────────
function MobileConnector({ index }: { index: number }) {
  return (
    <motion.div
      className="flex justify-center py-1"
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      transition={{ delay: index * 0.08 + 0.04, ease: easeOutCubic, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="h-6 w-px bg-gradient-to-b from-orange-300/60 to-orange-200/20" />
    </motion.div>
  )
}

// ── Progress Dot ───────────────────────────────────────────────────
function ProgressDot({
  progress,
  threshold,
}: {
  progress: MotionValue<number>
  threshold: number
}) {
  const scale = useTransform(
    progress,
    [Math.max(0, threshold - 0.1), threshold, Math.min(1, threshold + 0.1)],
    [1, 1.6, 1]
  )
  const dotOpacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.1), threshold, Math.min(1, threshold + 0.1)],
    [0.25, 1, 0.25]
  )
  const bg = useTransform(
    progress,
    [Math.max(0, threshold - 0.08), threshold, Math.min(1, threshold + 0.08)],
    ['var(--color-brown-700)', 'var(--color-orange-500)', 'var(--color-brown-700)']
  )

  return (
    <motion.div
      className="h-2 w-2 rounded-full"
      style={{ scale, opacity: dotOpacity, backgroundColor: bg }}
    />
  )
}

// ── Main Component ─────────────────────────────────────────────────
export function HowItWorks06() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll → horizontal strip movement
  // Strip is 5 frames wide. At progress=0 frame 0 is centered, at progress=1 frame 4 is centered.
  // Each frame is 20% of strip width, so we shift by -80% total (4 frames).
  const stripX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '-80%']
  )

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative"
      style={{ background: 'var(--color-cream-50)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      {/* ═══ DESKTOP ═══ */}
      <div className="hidden md:block">
        <div className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
            <div ref={titleRef} className="relative z-10 mb-10 text-center">
              <motion.p
                className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-orange-500"
                initial={{ opacity: 0, y: 12 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ease: easeOutQuint, duration: 0.8 }}
              >
                The process
              </motion.p>
              <motion.h2
                className="font-sans text-4xl font-black tracking-tight text-brown-900 md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ ease: easeOutQuint, duration: 0.9, delay: 0.08 }}
              >
                Five frames.{' '}
                <span className="text-orange-500">One rhythm.</span>
              </motion.h2>
            </div>

            <div className="relative w-full">
              <motion.div
                className="relative flex h-[420px] items-center"
                style={{
                  width: `${steps.length * 320}px`,
                  marginLeft: 'calc(50vw - 160px)',
                  x: stripX,
                }}
              >
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'linear-gradient(180deg, rgba(73,61,52,0.06) 0%, rgba(73,61,52,0.03) 50%, rgba(73,61,52,0.06) 100%)',
                    border: '1px solid rgba(73,61,52,0.08)',
                  }}
                />

                <SprocketRow count={steps.length * 4} side="top" />
                <SprocketRow count={steps.length * 4} side="bottom" />

                {steps.map((_, i) =>
                  i > 0 ? (
                    <div
                      key={`divider-${i}`}
                      className="absolute top-8 bottom-8"
                      style={{
                        left: `${i * 320}px`,
                        width: '1px',
                        background: 'linear-gradient(180deg, transparent, rgba(73,61,52,0.1), transparent)',
                      }}
                    />
                  ) : null
                )}

                {steps.map((step, index) => (
                  <FilmFrame
                    key={step.title}
                    step={step}
                    index={index}
                    scrollProgress={scrollYProgress}
                  />
                ))}
              </motion.div>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-3">
              {steps.map((_, i) => (
                <ProgressDot
                  key={i}
                  progress={scrollYProgress}
                  threshold={i / (steps.length - 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE ═══ */}
      <div className="md:hidden">
        <div className="relative py-24">
          <div className="mb-12 px-6 text-center">
            <motion.p
              className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-orange-500"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: easeOutQuint, duration: 0.8 }}
              viewport={{ once: true }}
            >
              The process
            </motion.p>
            <motion.h2
              className="font-sans text-3xl font-black tracking-tight text-brown-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: easeOutQuint, duration: 0.9, delay: 0.08 }}
              viewport={{ once: true }}
            >
              Five frames.{' '}
              <span className="text-orange-500">One rhythm.</span>
            </motion.h2>
          </div>

          <div className="relative px-6">
            <div
              className="pointer-events-none absolute inset-y-0 left-6 right-6 rounded-2xl"
              style={{
                border: '1px solid rgba(73,61,52,0.06)',
                background: 'linear-gradient(180deg, rgba(73,61,52,0.02) 0%, transparent 20%, transparent 80%, rgba(73,61,52,0.02) 100%)',
              }}
            />

            <div className="relative space-y-0">
              {steps.map((step, index) => (
                <div key={step.title}>
                  <MobileFilmFrame step={step} index={index} />
                  {index < steps.length - 1 && <MobileConnector index={index} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
