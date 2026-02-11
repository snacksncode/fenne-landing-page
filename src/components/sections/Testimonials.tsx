'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

const testimonials = [
  {
    name: 'Sarah M.',
    review:
      'Fenne turned my chaotic meal prep into something I actually enjoy. The fox approves!',
    stars: 5,
    rotate: -2,
    accent: true,
  },
  {
    name: 'James K.',
    review:
      "I used to dread grocery shopping. Now I just follow Fenne's list and I'm done in 15 min.",
    stars: 5,
    rotate: 1.5,
    accent: false,
  },
  {
    name: 'Priya R.',
    review:
      "My family thinks I've become a chef. Really it's all Fenne doing the heavy lifting.",
    stars: 5,
    rotate: -1,
    accent: false,
  },
  {
    name: 'Alex T.',
    review:
      'The weekly planner is a game changer. I save hours every Sunday.',
    stars: 5,
    rotate: 2,
    accent: true,
  },
  {
    name: 'Maria L.',
    review:
      'Finally an app that gets meal planning right. Simple, beautiful, and actually useful.',
    stars: 5,
    rotate: -1.5,
    accent: false,
  },
  {
    name: 'David C.',
    review:
      "I've tried every meal planner out there. Fenne is the one that stuck.",
    stars: 5,
    rotate: 1,
    accent: true,
  },
]

function StarIcon() {
  return (
    <svg
      className="star-icon h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
}

const cardVariantsReduced = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' })
  const cardsInView = useInView(cardsRef, { once: true, margin: '-15% 0px' })
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

  const activeCardVariants = prefersReducedMotion ? cardVariantsReduced : cardVariants

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: 'var(--color-brown-900)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[400px] w-[400px] rounded-full opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, var(--color-orange-500) 0%, transparent 70%)',
        }}
      />


      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          ref={titleRef}
          className="testimonials-title mb-14 text-center font-sans text-4xl md:text-5xl font-black tracking-tight text-cream-50 md:mb-20"
          initial={titleInitial}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          What our <span className="text-orange-500">beta testers</span> say
        </motion.h2>

        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="testimonial-card relative"
              variants={activeCardVariants}
            >
               <div
                className={`relative rounded-3xl px-7 py-6 md:px-8 md:py-7 transition-all duration-300 hover:scale-[1.03] ${
                  t.accent
                    ? 'bg-orange-500 text-white shadow-xl shadow-orange-500/20'
                    : 'bg-cream-50 text-brown-900 shadow-[0_2px_16px_rgba(0,0,0,0.2)]'
                } ${i % 3 === 1 ? 'md:mt-8' : ''}`}
                style={{
                  transform: `rotate(${t.rotate}deg)`,
                }}
              >
                <div className={`mb-3 flex gap-0.5 ${t.accent ? 'text-white' : 'text-orange-500'}`} role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <StarIcon key={si} />
                  ))}
                </div>

                <p className={`mb-4 font-sans text-base leading-relaxed md:text-lg ${t.accent ? 'text-white/90' : 'text-brown-800'}`}>
                  &ldquo;{t.review}&rdquo;
                </p>

                <p className={`font-sans text-sm font-bold tracking-wide ${t.accent ? 'text-white/70' : 'text-brown-700'}`}>
                  {t.name} · Beta Tester
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
