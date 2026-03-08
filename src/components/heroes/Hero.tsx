'use client';

import Image from 'next/image';
import { m } from 'motion/react';
import { useScrollTo } from '@/lib/scroll-utils';
import { ItchBadge } from '@/components/icons/ItchBadge';
import { AppStoreBadge } from '@/components/icons/AppStoreBadge';
import { easeOutCubic } from '@/lib/easings';

const ease = easeOutCubic;

export function AnimatedWords({
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

export function Hero() {
  const { scrollTo } = useScrollTo();

  return (
    <section id="hero-float" className="relative flex h-screen items-center justify-center overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 sm:px-12">
        <m.div
          className="mb-6 flex items-center gap-2 text-2xl font-bold text-brown-800"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
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
          Plan your meals in advance, save your favorite recipes, and get your groceries done. All from one app! You can
          even invite someone and do it together
        </m.p>

        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease, delay: 0.4 }}
        >
          <StoreCTAs className="mt-10 flex flex-wrap justify-center gap-3 flex-row sm:gap-4" />
        </m.div>
      </div>

      <m.div
        className="z-20 absolute bottom-12 inset-x-0 flex justify-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease, delay: 0.6 }}
      >
        <button
          onClick={() => scrollTo('#features')}
          className="flex items-center gap-2 rounded-full bg-cream-100 px-6 py-3 transition-transform hover:scale-105 text-sm font-semibold text-brown-900 shadow-lg"
        >
          <span>Learn more</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </m.div>
    </section>
  );
}
