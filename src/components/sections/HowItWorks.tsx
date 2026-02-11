'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll } from 'motion/react'

const steps = [
  {
    number: 1,
    icon: '🦊',
    title: 'Pick Your Meals',
    description:
      'Browse recipes or let Fenne suggest. Add them to your weekly plan with a tap.',
  },
  {
    number: 2,
    icon: '✨',
    title: 'Generate Your List',
    description:
      'Fenne magically creates your grocery list, organized by category.',
  },
  {
    number: 3,
    icon: '🍽️',
    title: 'Cook & Enjoy',
    description:
      "Follow easy recipes with timing and ingredient info. Dinner's ready!",
  },
]

function HiwStep({ step, index, prefersReducedMotion }: { step: typeof steps[number]; index: number; prefersReducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' })

  return (
    <motion.div
      ref={ref}
      key={step.number}
      className="hiw-step relative flex items-start gap-6 md:items-center"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    >
      <div
        className={`flex w-full flex-col items-start gap-5 pl-14 md:flex-row md:items-center md:gap-0 md:pl-0 ${
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        }`}
      >
        <div
          className={`md:w-[calc(50%-40px)] ${
            index % 2 === 0
              ? 'md:pr-10 md:text-right'
              : 'md:pl-10 md:text-left'
          }`}
        >
          <span className="mb-2 block text-3xl">{step.icon}</span>
          <h3 className="mb-2 font-sans text-2xl font-black tracking-tight text-brown-900 md:text-3xl">
            {step.title}
          </h3>
          <p className="max-w-[320px] font-sans text-base leading-relaxed text-brown-700 md:text-lg md:max-w-none">
            {step.description}
          </p>
        </div>

        <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border-[3px] border-cream-50 bg-orange-500 font-sans text-xl font-black text-white shadow-xl shadow-orange-500/25 md:relative md:left-auto md:top-auto md:mx-auto md:shrink-0" style={{ transform: `rotate(${index % 2 === 0 ? '3' : '-3'}deg)` }}>
          {step.number}
        </div>

        <div className="hidden md:block md:w-[calc(50%-40px)]" />
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ['start center', 'end center'],
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const titleInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 30 }

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="how-it-works relative overflow-x-clip py-28 md:py-36"
      style={{
        background: 'var(--color-cream-50)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          ref={titleRef}
          className="hiw-title mb-16 text-center md:mb-24"
          initial={titleInitial}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mb-3 inline-block font-mono text-xs font-medium uppercase tracking-[0.2em] text-orange-500">
            Simple as 1-2-3
          </span>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900">
            How It Works
          </h2>
        </motion.div>

        <div ref={stepsContainerRef} className="how-it-works-steps relative">
          <div
            className="absolute left-[23px] top-0 bottom-0 w-[3px] md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, var(--color-orange-500), var(--color-orange-600))',
            }}
          >
            <motion.div
              className="timeline-line absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-orange-500), var(--color-orange-600), var(--color-orange-500))',
                scaleY: prefersReducedMotion ? 1 : scrollYProgress,
                transformOrigin: 'top',
              }}
            />
          </div>

          <div className="relative flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => (
              <HiwStep key={step.number} step={step} index={i} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
