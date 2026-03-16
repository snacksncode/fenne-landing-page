'use client';

import Image from 'next/image';
import * as m from 'motion/react-m';
import { useScrollTo } from '@/lib/scroll-utils';
import { ItchBadge } from '@/components/icons/ItchBadge';
import { AppStoreBadge } from '@/components/icons/AppStoreBadge';
import { easeOutCubic } from '@/lib/easings';

const ease = easeOutCubic;

/* ── Shared Components ─────────────────────────────────────────────── */

function HeroIntro() {
  return (
    <>
      <span>
        Hi! My name is <span className="text-orange-600">Fenne</span>
      </span>
      <Image
        src="/icon.png"
        alt="Fenne logo"
        width={128}
        height={128}
        priority
        className="w-10 aspect-square rounded-sm"
      />
    </>
  );
}

export function StoreCTAs({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ItchBadge height={45} />
      <AppStoreBadge height={45} />
      {/* <GooglePlayBadge width={150} />  */}
    </div>
  );
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-[400%] lg:w-[200%] bg-[linear-gradient(to_right,#f96f4d,#f9954d,#ec8032,#f9ae4d,#f9864d,#f9bd4d,#f96f4d)] animate-[gradient-scroll-mobile_15s_ease-in-out_infinite_alternate] lg:animate-[gradient-scroll-desktop_15s_ease-in-out_infinite_alternate]" />
      <div
        className="absolute inset-0 z-1"
        style={{
          background: `linear-gradient(180deg, var(--color-cream-100) 70%, transparent 100%)`,
        }}
      />
    </div>
  );
}

function ScrollButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-full bg-cream-100 px-6 py-3 transition-transform hover:scale-105 text-sm font-semibold text-brown-900 shadow-lg"
    >
      <span>Learn more</span>
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>
  );
}

const HERO_DESCRIPTION =
  'Plan your meals in advance, save your favorite recipes, and get your groceries done. All from one app! You can even invite someone and do it together';

const ctaClasses = 'mt-10 flex flex-wrap justify-center gap-3 flex-row sm:gap-4';

/* ── Desktop-only: word-by-word reveal ─────────────────────────────── */

function AnimatedWords({
  text,
  className = '',
  baseDelay = 0,
  stagger = 50,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <m.span
          key={i}
          className={className}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease,
            delay: (baseDelay + i * stagger) / 1000,
          }}
        >
          {word}
          {'\u00A0'}
        </m.span>
      ))}
    </>
  );
}

/* ── Mobile Hero (static, no JS animation) ─────────────────────────── */

function MobileHero({ onScrollClick }: { onScrollClick: () => void }) {
  return (
    <section className="lg:hidden relative flex h-screen items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 sm:px-12">
        <div className="mb-6 flex items-center gap-2 text-2xl font-bold text-brown-800">
          <HeroIntro />
        </div>

        <h1 className="text-center text-[clamp(3rem,8vw,6rem)] font-black leading-[1.05] tracking-tight text-brown-900">
          Stop asking
          <br />
          <span className="text-orange-500 max-md:mt-1 inline-block">What&apos;s for dinner?</span>
        </h1>

        <p className="text-pretty mt-6 max-w-3xl text-center text-[clamp(1.125rem,2vw,1.25rem)] font-medium leading-relaxed text-brown-800">
          {HERO_DESCRIPTION}
        </p>

        <StoreCTAs className={ctaClasses} />
      </div>

      <div className="z-20 absolute bottom-12 inset-x-0 flex justify-center">
        <ScrollButton onClick={onScrollClick} />
      </div>
    </section>
  );
}

/* ── Desktop Hero (full animation) ─────────────────────────────────── */

function DesktopHero({ onScrollClick }: { onScrollClick: () => void }) {
  return (
    <section className="max-lg:hidden relative flex h-screen items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 sm:px-12">
        <m.div
          className="mb-6 flex items-center gap-2 text-2xl font-bold text-brown-800"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <HeroIntro />
        </m.div>

        <h1 className="text-center text-[clamp(3rem,8vw,6rem)] font-black leading-[1.05] tracking-tight text-brown-900">
          <AnimatedWords text="Stop asking" className="inline-block" stagger={40} />
          <br />
          <span className="text-orange-500 max-md:mt-1 inline-block">
            <AnimatedWords text="What's for dinner?" className="inline-block" baseDelay={100} stagger={40} />
          </span>
        </h1>

        <m.p
          className="text-pretty mt-6 max-w-3xl text-center text-[clamp(1.125rem,2vw,1.25rem)] font-medium leading-relaxed text-brown-800"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          {HERO_DESCRIPTION}
        </m.p>

        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease, delay: 0.4 }}
        >
          <StoreCTAs className={ctaClasses} />
        </m.div>
      </div>

      <m.div
        className="z-20 absolute bottom-12 inset-x-0 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.6 }}
      >
        <ScrollButton onClick={onScrollClick} />
      </m.div>
    </section>
  );
}

/* ── Public Hero ───────────────────────────────────────────────────── */

export function Hero() {
  const { scrollTo } = useScrollTo();
  const handleScroll = () => scrollTo('#features');

  return (
    <div id="hero-float">
      <MobileHero onScrollClick={handleScroll} />
      <DesktopHero onScrollClick={handleScroll} />
    </div>
  );
}
