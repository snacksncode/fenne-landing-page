'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { steps } from './steps'
import { easeOutQuint, easeOutCubic } from '@/lib/easings'

const CARD_COLORS = [
  { bg: 'var(--color-orange-100)', text: 'var(--color-brown-900)', sub: 'var(--color-brown-700)', badge: 'var(--color-orange-500)', badgeBg: 'var(--color-orange-200)' },
  { bg: 'var(--color-orange-200)', text: 'var(--color-brown-900)', sub: 'var(--color-brown-800)', badge: 'var(--color-orange-600)', badgeBg: 'var(--color-orange-300)' },
  { bg: 'var(--color-orange-300)', text: 'var(--color-brown-900)', sub: 'var(--color-brown-900)', badge: 'var(--color-orange-700)', badgeBg: 'var(--color-orange-400)' },
  { bg: 'var(--color-orange-400)', text: 'white', sub: 'rgba(255,255,255,0.85)', badge: 'var(--color-orange-100)', badgeBg: 'var(--color-orange-500)' },
  { bg: 'var(--color-orange-500)', text: 'white', sub: 'rgba(255,255,255,0.8)', badge: 'var(--color-orange-100)', badgeBg: 'var(--color-orange-600)' },
]

const DESKTOP_TOP_OFFSETS = [20, 60, 100, 140, 180]
const MOBILE_TOP_OFFSETS = [12, 44, 76, 108, 140]

function StepCard({ index }: { index: number }) {
  const step = steps[index]
  const colors = CARD_COLORS[index]
  const Icon = step.icon
  const cardRef = useRef<HTMLDivElement>(null)

  const isInView = useInView(cardRef, { once: true, margin: '-5% 0px' })

  const shadowIntensity = 0.08 + index * 0.04
  const shadow = `0 ${8 + index * 4}px ${24 + index * 8}px -${4 + index * 2}px rgba(73, 61, 52, ${shadowIntensity}), 0 0 0 1px rgba(73, 61, 52, 0.04)`

  return (
    <div
      className="sticky z-[var(--z)]"
      style={{
        '--top-mobile': `${MOBILE_TOP_OFFSETS[index]}px`,
        '--top-desktop': `${DESKTOP_TOP_OFFSETS[index]}px`,
        '--z': 10 + index,
        top: `var(--top-mobile)`,
      } as React.CSSProperties}
    >
      <style>{`
        @media (min-width: 768px) {
          [data-cascade-card="${index}"] {
            top: var(--top-desktop) !important;
          }
        }
      `}</style>

      <motion.div
        ref={cardRef}
        data-cascade-card={index}
        className="mx-auto w-full max-w-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.7,
          ease: easeOutQuint,
          delay: 0.05 * index,
        }}
      >
        <div
          className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10"
          style={{
            background: colors.bg,
            boxShadow: shadow,
          }}
        >
          <div className="flex items-center gap-4 mb-5 md:mb-6">
            <div
              className="w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0"
              style={{
                background: colors.badgeBg,
                boxShadow: `0 4px 16px -4px ${colors.badgeBg}`,
              }}
            >
              <Icon
                className="w-5 h-5 md:w-7 md:h-7"
                strokeWidth={2}
                style={{ color: colors.text }}
              />
            </div>

            <div className="flex items-baseline gap-3">
              <span
                className="text-xs font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: colors.badge, opacity: 0.7 }}
              >
                Step {index + 1}
              </span>
              <span
                className="text-[10px] md:text-xs font-bold font-mono uppercase tracking-wider"
                style={{ color: colors.badge }}
              >
                {step.time}
              </span>
            </div>
          </div>

          <h3
            className="font-sans text-xl md:text-2xl lg:text-3xl font-black tracking-tight mb-2"
            style={{ color: colors.text }}
          >
            {step.title}
          </h3>
          <p
            className="text-sm md:text-base font-medium leading-relaxed max-w-lg"
            style={{ color: colors.sub }}
          >
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export function HowItWorks08() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.4])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative min-h-[300vh]"
      style={{ background: 'var(--color-cream-50)' }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: 'var(--color-orange-100)',
          opacity: bgOpacity,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
          opacity: 0.03,
        }}
      />

      <div className="relative z-[2]">
        <div className="pt-28 md:pt-36 pb-10 md:pb-16 px-6">
          <div ref={titleRef} className="mx-auto max-w-2xl text-center">
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
              Five steps, stacked
            </motion.h2>
            <motion.p
              className="mt-4 text-base md:text-lg font-medium text-brown-700/70 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.2 }}
            >
              Scroll to reveal each step of your weekly meal-planning rhythm
            </motion.p>
          </div>
        </div>

        <div className="px-4 md:px-6 pb-[40vh] space-y-[28vh] md:space-y-[32vh]">
          {steps.map((_, index) => (
            <StepCard key={steps[index].title} index={index} />
          ))}
        </div>

        <div className="sticky top-0 z-[20] flex items-center justify-center pb-28 md:pb-36 pt-8">
          <motion.p
            className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-orange-500/60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 0.8, ease: easeOutCubic }}
          >
            Repeats every week
          </motion.p>
        </div>
      </div>
    </section>
  )
}
