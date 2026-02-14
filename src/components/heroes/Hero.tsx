'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useAnimate, stagger } from 'motion/react'
import { easeOutCubic } from '@/lib/easings'
import { StripeGradientBackground } from './StripeGradient'
import { useScrollTo } from '@/lib/scroll-utils'
import { ItchBadge } from '@/components/icons/ItchBadge'

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/**
 * AnimatedWords - Splits text into words and wraps each in a span
 * Accepts className for variant-specific styling (e.g., 'marquee-hero-word')
 */
export function AnimatedWords({
  text,
  className = '',
}: {
  text: string
  className?: string
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className={className}
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {word}
          {'\u00A0'}
        </span>
      ))}
    </>
  )
}

export function StoreCTAs({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ItchBadge width={150} />
      {/* <AppStoreBadge width={150} />
      <GooglePlayBadge width={150} /> */}
    </div>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 translate-y-1/5">
        <StripeGradientBackground />
      </div>
      <div
        className="absolute inset-0 z-1"
        style={{
          background: `linear-gradient(180deg, var(--color-cream-100) 70%, transparent 100%)`,
        }}
      />
    </div>
  )
}

export function Hero() {
  const [scope, animate] = useAnimate()
  const { scrollTo } = useScrollTo()

  useEffect(() => {
    const runEntryAnimation = async () => {
      animate(
        '.float-hero-badge',
        { opacity: 1, y: 0 },
        { duration: 0.5, ease: easeOutCubic }
      )

      await wait(150)

      animate(
        '.float-hero-word',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: easeOutCubic, delay: stagger(0.05) }
      )

      await wait(400)

      animate(
        '.float-hero-subheading',
        { opacity: 1, y: 0 },
        { duration: 0.7, ease: easeOutCubic }
      )

      await wait(300)

      animate(
        '.float-hero-cta',
        { opacity: 1, scale: 1 },
        { duration: 0.6, ease: easeOutCubic }
      )

      animate(
        '.learn-more',
        { opacity: 1, y: 0 },
        { duration: 0.6, ease: easeOutCubic }
      )
    }

    runEntryAnimation()
  }, [animate])

  return (
    <section
      ref={scope}
      id="hero-float"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 sm:px-12">
        <div
          className="float-hero-badge mb-6 flex items-center gap-2 text-2xl font-bold text-brown-800"
          style={{ opacity: 0, transform: 'translateY(16px)' }}
        >
          <span>
            Hi! My name is <span className="text-orange-600">Fenne</span>
          </span>
          <Image
            src="/icon.png"
            alt="Fenne logo"
            width={1024}
            height={1025}
            className="w-10 aspect-square rounded-sm"
          />
        </div>
        <h1 className="text-center text-[clamp(3rem,8vw,6rem)] font-black leading-[1.05] tracking-tight text-brown-900">
          <AnimatedWords
            text="Stop asking"
            className="float-hero-word inline-block"
          />
          <br />
          <span className="text-orange-500">
            <AnimatedWords
              text="What’s for dinner?"
              className="float-hero-word inline-block"
            />
          </span>
        </h1>

        <p
          className="float-hero-subheading text-pretty mt-6 max-w-3xl text-center text-[clamp(1.125rem,2vw,1.25rem)] font-medium leading-relaxed text-brown-800"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          Plan your meals in advance, save your favorite recipes, and get your
          groceries done. All from one app! You can even invite someone and do
          it together
        </p>

        <div
          className="float-hero-cta"
          style={{ opacity: 0, transform: 'scale(0.8)' }}
        >
          <StoreCTAs className="mt-10 flex flex-wrap justify-center gap-3 flex-row sm:gap-4" />
        </div>
      </div>

      <div
        className="learn-more z-20 -translate-x-1/2 absolute bottom-12 left-1/2"
        style={{ opacity: 0, transform: 'translateY(16px)' }}
      >
        <button
          onClick={() => scrollTo('#features')}
          className="flex items-center gap-2 rounded-full bg-cream-100 px-6 py-3 transition-transform hover:scale-105 text-sm font-semibold text-brown-900 shadow-lg"
        >
          <span>Learn more</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  )
}
