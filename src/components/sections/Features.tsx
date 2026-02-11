'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimate } from 'motion/react'
import { PhoneFrame } from '@/components/PhoneFrame'

const features = [
  {
    icon: '📅',
    title: 'Weekly Meal Planning',
    description:
      "Pick meals, schedule your week in minutes — not hours. Fenne makes Monday-to-Sunday feel like a breeze, with smart suggestions that actually match what you're craving.",
    screenshot: '/screenshots/weekly-plan.png',
  },
  {
    icon: '🛒',
    title: 'Smart Grocery Lists',
    description:
      'Your meal plan becomes a perfectly organized shopping list — grouped by aisle, sorted by priority. No more wandering the store like a lost soul with a crumpled note.',
    screenshot: '/screenshots/groceries-empty.png',
  },
  {
    icon: '📖',
    title: 'Recipe Collection',
    description:
      'Save, organize, and rediscover your favorite recipes in one cozy place. Filter by mood, prep time, or whatever Tuesday night calls for.',
    screenshot: '/screenshots/recipes-list.png',
  },
]

const INTERVAL = 5000

function getFanPosition(index: number, activeTab: number) {
  if (index === activeTab) {
    return { rotateZ: 0, translateX: 0, scale: 1.05, brightness: 1, zIndex: 30 }
  }

  const diff = index - activeTab
  const isLeft =
    diff === -1 || (activeTab === 0 && index === features.length - 1)

  if (isLeft) {
    return { rotateZ: -15, translateX: -30, scale: 0.85, brightness: 0.7, zIndex: 10 }
  }
  return { rotateZ: 15, translateX: 30, scale: 0.85, brightness: 0.7, zIndex: 10 }
}

export function Features() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout>(null)
  const [scope, animateEntrance] = useAnimate()
  const isInView = useInView(scope, { once: true, margin: '-25% 0px' })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length)
    }, INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    const run = async () => {
      await animateEntrance(
        '.features-fan-header',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      )
      animateEntrance(
        '.features-fan-tabs',
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      )
      animateEntrance(
        '.features-fan-content',
        { opacity: 1, x: 0 },
        { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
      )
      await animateEntrance(
        '.features-fan-phones',
        { opacity: 1, x: 0 },
        { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
      )
    }
    run()
  }, [isInView, prefersReducedMotion, animateEntrance])

  const handleTabClick = useCallback((index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setActiveTab(index)
    intervalRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length)
    }, INTERVAL)
  }, [])

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      let newIndex = index
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        newIndex = (index + 1) % features.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        newIndex = (index - 1 + features.length) % features.length
      } else if (e.key === 'Home') {
        e.preventDefault()
        newIndex = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        newIndex = features.length - 1
      }
      if (newIndex !== index) handleTabClick(newIndex)
    },
    [handleTabClick]
  )

  const activeFeature = features[activeTab]

  return (
    <section
      ref={scope}
      id="features"
      className="features-section relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          'linear-gradient(180deg, var(--color-cream-50) 0%, var(--color-cream-100) 50%, var(--color-cream-50) 100%)',
      }}
    >
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '128px 128px',
        }}
      />

      <div className="relative z-[5] mx-auto max-w-7xl px-6 lg:px-12">
        <div
          className="features-fan-header mb-12 md:mb-16 text-center"
          style={!prefersReducedMotion ? { opacity: 0, transform: 'translateY(40px)' } : undefined}
        >
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-4">
            What&apos;s inside
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tight text-brown-900">
            Everything you need
          </h2>
        </div>

        <div
          className="features-fan-tabs mb-12 md:mb-16 flex justify-center"
          style={!prefersReducedMotion ? { opacity: 0, transform: 'translateY(30px)' } : undefined}
          role="tablist"
          aria-label="Feature tabs"
        >
          <div className="inline-flex gap-1 rounded-2xl bg-brown-900/[0.04] p-1.5">
            {features.map((feature, i) => {
              const isActive = activeTab === i
              return (
                <button
                  key={feature.title}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="features-tabpanel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleTabClick(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-brown-900 shadow-md shadow-brown-900/10'
                      : 'text-brown-700/60 hover:text-brown-700'
                  }`}
                >
                  <span className="text-lg" role="img" aria-hidden="true">
                    {feature.icon}
                  </span>
                  <span className="hidden sm:inline">{feature.title}</span>

                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-[3px] overflow-hidden rounded-full bg-orange-500/15">
                      <motion.div
                        key={activeTab}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
                        className="h-full rounded-full bg-orange-500"
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Two-column: text LEFT, phone fan RIGHT */}
        <div
          id="features-tabpanel"
          role="tabpanel"
          aria-label={activeFeature.title}
          className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16"
        >
          <div
            className="features-fan-content flex-1 text-center md:text-left"
            style={!prefersReducedMotion ? { opacity: 0, transform: 'translateX(-60px)' } : undefined}
          >
            <span
              className="text-5xl md:text-6xl block mb-4"
              role="img"
              aria-hidden="true"
            >
              {activeFeature.icon}
            </span>
            <h3 className="font-sans text-3xl md:text-4xl font-black tracking-tight text-brown-900 mb-4">
              {activeFeature.title}
            </h3>
            <p className="text-lg leading-relaxed text-brown-700 max-w-lg mx-auto md:mx-0">
              {activeFeature.description}
            </p>
            <div className="mt-6 h-1 w-20 rounded-full bg-orange-500 mx-auto md:mx-0" />
          </div>

          <div
            className="features-fan-phones flex-1 flex items-center justify-center"
            style={!prefersReducedMotion ? { opacity: 0, transform: 'translateX(80px)' } : undefined}
          >
            <div className="relative h-[420px] md:h-[500px] w-[300px] md:w-[380px]">
              {features.map((feature, i) => {
                const pos = getFanPosition(i, activeTab)
                return (
                  <motion.div
                    key={feature.title}
                    animate={prefersReducedMotion ? {
                      rotateZ: pos.rotateZ,
                      x: `${pos.translateX}%`,
                      scale: pos.scale,
                      filter: `brightness(${pos.brightness})`,
                    } : {
                      rotateZ: pos.rotateZ,
                      x: `${pos.translateX}%`,
                      scale: pos.scale,
                      filter: `brightness(${pos.brightness})`,
                    }}
                    transition={prefersReducedMotion ? { duration: 0 } : {
                      duration: 0.8,
                      ease: [0.45, 0, 0.55, 1],
                    }}
                    style={{
                      zIndex: pos.zIndex,
                      transformOrigin: 'center bottom',
                      willChange: 'transform, filter',
                    }}
                    className="features-fan-phone absolute inset-0 flex items-end justify-center"
                  >
                    <div className="w-[200px] md:w-[240px]">
                      <PhoneFrame
                        src={feature.screenshot}
                        alt={feature.title}
                        size="md"
                        priority={i === 0}
                      />
                    </div>
                  </motion.div>
                )
              })}

              {/* Glow behind active phone */}
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[60%] -z-10 rounded-full opacity-25 blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse, var(--color-orange-500) 0%, transparent 70%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
