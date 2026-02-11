'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const headlineInView = useInView(headlineRef, { once: true, margin: '-15% 0px' })
  const revealRef1 = useRef<HTMLParagraphElement>(null)
  const revealRef2 = useRef<HTMLDivElement>(null)
  const revealRef3 = useRef<HTMLParagraphElement>(null)
  const reveal1InView = useInView(revealRef1, { once: true, margin: '-10% 0px' })
  const reveal2InView = useInView(revealRef2, { once: true, margin: '-10% 0px' })
  const reveal3InView = useInView(revealRef3, { once: true, margin: '-10% 0px' })
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  const headlineInitial = prefersReducedMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : { opacity: 0, scale: 0.92, y: 30 }

  const revealInitial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 20 }

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="cta-section relative overflow-x-clip"
    >
      <div
        className="relative py-24 md:py-32 lg:py-40"
        style={{
          background: 'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
          clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '128px 128px',
          }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 70% at 50% 60%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-[5] mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <motion.h2
            ref={headlineRef}
            className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
            initial={headlineInitial}
            animate={headlineInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Ready to eat better?
          </motion.h2>

          <motion.p
            ref={revealRef1}
            className="cta-reveal mt-6 mx-auto max-w-lg text-lg text-white/80 md:text-xl"
            initial={revealInitial}
            animate={reveal1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            Start planning meals the cozy way. It&apos;s free!
          </motion.p>

          <motion.div
            ref={revealRef2}
            className="cta-reveal mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={revealInitial}
            animate={reveal2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
          >
            <a
              href="#"
              data-magnetic
              className="app-badge group flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-brown-900 shadow-xl shadow-black/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            >
              <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-medium uppercase tracking-wider text-brown-700">
                  Download on the
                </span>
                <span className="text-base font-bold leading-tight">App Store</span>
              </div>
            </a>

            <a
              href="#"
              data-magnetic
              className="app-badge group flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-brown-900 shadow-xl shadow-black/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
            >
              <svg className="h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.77C2.84 23.77 2.5 23.65 2.23 23.42C1.83 23.08 1.61 22.56 1.61 22.01V1.99C1.61 1.34 1.92 0.76 2.43 0.44C2.72 0.26 3.05 0.17 3.38 0.17C3.62 0.17 3.87 0.22 4.1 0.33L13.55 5.41L4.46 14.5L3.18 23.77ZM14.54 12.21L5.84 20.91L13.55 16.66L14.54 12.21ZM19.1 10.5L14.61 7.87L5.84 3.09L14.54 11.79L19.1 10.5ZM21.38 11.41L15.96 8.49L15.1 12L15.96 15.51L21.38 12.59C21.74 12.41 21.97 12.11 21.97 11.77V12.23C21.97 11.89 21.74 11.59 21.38 11.41Z" />
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-medium uppercase tracking-wider text-brown-700">
                  Get it on
                </span>
                <span className="text-base font-bold leading-tight">Google Play</span>
              </div>
            </a>
          </motion.div>

          <motion.p
            ref={revealRef3}
            className="cta-reveal mt-8 text-sm text-white/50"
            initial={revealInitial}
            animate={reveal3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
          >
            Free forever. No credit card needed.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
