'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

const pillars = [
  {
    icon: '📅',
    title: 'Plan Your Week',
    description: 'Weekly and monthly meal plans, tailored to your taste',
  },
  {
    icon: '🛒',
    title: 'Shop Smarter',
    description: 'Auto-generated grocery lists, organized by aisle',
  },
  {
    icon: '🍳',
    title: 'Cook with Joy',
    description: 'Curated recipes with timing, ingredients, and love',
  },
]

const pillarRotations = [-1, 0, 1]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

export function ValueProp() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })
  const pillarsInView = useInView(pillarsRef, { once: true, margin: '-15% 0px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

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

  const pillarItemVariants = (rotate: number) => ({
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, rotate }
      : { opacity: 0, y: 40, rotate },
    visible: {
      opacity: 1,
      y: 0,
      rotate,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  })

  return (
    <section
      ref={sectionRef}
      id="value-prop"
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background: 'var(--color-cream-100)',
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

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          ref={titleRef}
          className="value-prop-title mb-16 text-center font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900 md:mb-20"
          initial={titleInitial}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Why <span className="text-orange-500">Fenne</span>?
        </motion.h2>

        <motion.div
          ref={pillarsRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={pillarsInView ? 'visible' : 'hidden'}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={`pillar relative rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
                i === 1
                  ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20 md:-translate-y-4'
                  : 'bg-cream-50 text-brown-900 shadow-lg shadow-brown-900/5 border-2 border-orange-500/10'
              }`}
              variants={pillarItemVariants(pillarRotations[i])}
            >
              <span
                className="mb-5 block text-5xl md:text-6xl"
                role="img"
                aria-hidden="true"
              >
                {pillar.icon}
              </span>

              <h3 className={`mb-3 font-sans text-xl font-black tracking-tight md:text-2xl ${i === 1 ? 'text-white' : 'text-brown-900'}`}>
                {pillar.title}
              </h3>

              <p className={`font-sans text-base leading-relaxed ${i === 1 ? 'text-white/80' : 'text-brown-700'}`}>
                {pillar.description}
              </p>

              <div className={`mt-6 h-1 w-12 rounded-full ${i === 1 ? 'bg-white/40' : 'bg-orange-500'}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
