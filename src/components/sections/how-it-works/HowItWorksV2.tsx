'use client';

import { Fragment, useRef, useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { useInView, useScroll, useSpring } from 'motion/react';
import * as m from 'motion/react-m';
import { easeOutQuint } from '@/lib/easings';
import { steps, type Step } from './steps';

function StepSlide({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const Icon = step.icon;
  const titleWords = step.title.split(' ');
  const descWords = step.description.split(' ');

  return (
    <div
      ref={ref}
      style={{
        isolation: 'isolate',
        position: 'relative',
        padding: 'clamp(48px, 8vw, 96px) 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          zIndex: -1,
          position: 'absolute',
          fontSize: 'clamp(10rem, 20vw, 24rem)',
          fontWeight: 900,
          fontFamily: 'var(--font-mono)',
          lineHeight: 1,
          color: 'var(--color-orange-500)',
          opacity: 0.07,
          userSelect: 'none',
          pointerEvents: 'none',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon with glow */}
      <m.div
        style={{ position: 'relative', marginBottom: 32 }}
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0 }}
      >
        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            inset: -24,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,149,77,0.35) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />
        {/* Icon box */}
        <div
          style={{
            width: 'clamp(72px, 15vw, 112px)',
            height: 'clamp(72px, 15vw, 112px)',
            borderRadius: 'clamp(20px, 3vw, 32px)',
            background: 'linear-gradient(135deg, var(--color-orange-500), var(--color-orange-600))',
            boxShadow: '0 16px 48px rgba(249,149,77,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <Icon
            style={{
              width: 'clamp(36px, 7.5vw, 56px)',
              height: 'clamp(36px, 7.5vw, 56px)',
              color: 'white',
            }}
            strokeWidth={1.5}
          />
        </div>
      </m.div>

      {/* Eyebrow */}
      <m.span
        initial={{ y: 10, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          fontSize: '1rem',
          lineHeight: 1,
          fontWeight: 700,
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'var(--color-orange-500)',
          marginBottom: 12,
        }}
      >
        {step.step}
      </m.span>

      {/* Giant title — word-by-word reveal */}
      <h3
        style={{
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--color-brown-900)',
          fontFamily: 'var(--font-sans)',
          textAlign: 'center',
          maxWidth: '18ch',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 0.28em',
        }}
      >
        {titleWords.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              lineHeight: 1.1,
              padding: '0.12em',
              margin: '-0.12em',
            }}
          >
            <m.span
              style={{ display: 'inline-block' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{
                duration: 0.55,
                ease: easeOutQuint,
                delay: i * 0.1 + 0.25,
              }}
            >
              {word}
            </m.span>
          </span>
        ))}
      </h3>

      {/* Description — word-by-word reveal */}
      <p
        style={{
          marginTop: 24,
          fontSize: '1.15rem',
          lineHeight: 1.65,
          color: 'var(--color-brown-800)',
          maxWidth: 480,
          textAlign: 'center',
          display: 'flex',
          flexWrap: 'wrap' as const,
          justifyContent: 'center',
          gap: '0 0.28em',
        }}
      >
        {descWords.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              lineHeight: 1.7,
              padding: '0.12em',
              margin: '-0.12em',
            }}
          >
            <m.span
              style={{ display: 'inline-block' }}
              initial={{ y: '105%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{
                duration: 0.45,
                ease: easeOutQuint,
                delay: 0.15 + i * 0.045,
              }}
            >
              {word}
            </m.span>
          </span>
        ))}
      </p>
    </div>
  );
}

function GapConnector() {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(240);

  useEffect(() => {
    const update = () => setH(window.innerWidth >= 1024 ? 240 : 120);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 50%'],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 300, damping: 40 });

  return (
    <div
      ref={ref}
      className="h-30 lg:h-60"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}
    >
      <svg width="4" height={h} aria-hidden="true" style={{ overflow: 'visible' }}>
        <path
          d={`M 2 0 L 2 ${h}`}
          stroke="var(--color-brown-900)"
          opacity={0.5}
          strokeWidth="3"
          strokeDasharray="10 8"
          strokeLinecap="round"
          fill="none"
        />
        <m.path
          d={`M 2 0 L 2 ${h}`}
          stroke="var(--color-orange-500)"
          strokeWidth="8"
          strokeDasharray="10 8"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}

function StaticBlobs() {
  const blob: CSSProperties = {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    filter: 'blur(80px)',
  };

  return (
    <div className="max-lg:hidden" style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      {/* Top-left — large warm orange */}
      <div
        style={{
          ...blob,
          width: 560,
          height: 560,
          background: 'var(--color-orange-500)',
          opacity: 0.06,
          top: '2%',
          left: '-8%',
        }}
      />
      {/* Right side — medium peach */}
      <div
        style={{
          ...blob,
          width: 420,
          height: 420,
          background: 'var(--color-orange-200)',
          opacity: 0.18,
          top: '22%',
          right: '-6%',
        }}
      />
      {/* Center-left — soft cream-orange */}
      <div
        style={{
          ...blob,
          width: 500,
          height: 500,
          background: 'var(--color-orange-100)',
          opacity: 0.35,
          top: '48%',
          left: '-4%',
        }}
      />
      {/* Bottom-right — small punchy */}
      <div
        style={{
          ...blob,
          width: 340,
          height: 340,
          background: 'var(--color-orange-500)',
          opacity: 0.07,
          bottom: '8%',
          right: '2%',
        }}
      />
    </div>
  );
}

export function HowItWorksV2() {
  return (
    <section
      id="how-it-works"
      style={{
        paddingTop: 96,
        paddingBottom: 160,
        background: 'var(--color-cream-50)',
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <StaticBlobs />
      {steps.map((step, i) => (
        <Fragment key={step.title}>
          <StepSlide step={step} index={i} />
          {i < steps.length - 1 && <GapConnector />}
        </Fragment>
      ))}
    </section>
  );
}
