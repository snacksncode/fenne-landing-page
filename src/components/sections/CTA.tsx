'use client';

import { useRef } from 'react';
import { useInView } from 'motion/react';
import * as m from 'motion/react-m';
import { easeOutCubic, easeOutQuint } from '@/lib/easings';
import { ItchBadge } from '@/components/icons/ItchBadge';
import { AppStoreBadge } from '@/components/icons/AppStoreBadge';

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const headlineInView = useInView(headlineRef, {
    once: true,
    margin: '-15% 0px',
  });
  const revealRef1 = useRef<HTMLParagraphElement>(null);
  const revealRef2 = useRef<HTMLDivElement>(null);
  const reveal1InView = useInView(revealRef1, {
    once: true,
    margin: '-10% 0px',
  });
  const reveal2InView = useInView(revealRef2, {
    once: true,
    margin: '-10% 0px',
  });
  const headlineInitial = { opacity: 0, scale: 0.92, y: 30 };

  const revealInitial = { opacity: 0, y: 20 };

  return (
    <section ref={sectionRef} id="cta" className="cta-section relative -mt-12 overflow-x-clip">
      <div className="absolute left-0 right-0 bottom-0 top-1/2 bg-brown-900" />
      <div
        className="relative py-24 md:py-32 lg:py-40"
        style={{
          background: 'linear-gradient(135deg, var(--color-orange-500) 0%, var(--color-orange-600) 100%)',
          clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)',
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 70% at 50% 60%, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-5 mx-auto max-w-4xl px-6 lg:px-12 text-center">
          <m.h2
            ref={headlineRef}
            className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-[1.05] tracking-tight text-white"
            initial={headlineInitial}
            animate={headlineInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: easeOutQuint }}
          >
            Ready to eat smarter?
          </m.h2>
          <m.p
            ref={revealRef1}
            className="cta-reveal mt-6 mx-auto font-medium max-w-lg text-lg text-cream-100 md:text-xl"
            initial={revealInitial}
            animate={reveal1InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutCubic }}
          >
            Plan your next week in just 10 minutes. <br className="max-md:hidden" />
            Shop with a list that actually makes sense.
          </m.p>
          <m.div
            ref={revealRef2}
            className="cta-reveal mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={revealInitial}
            animate={reveal2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: easeOutCubic, delay: 0.1 }}
          >
            <ItchBadge height={45} />
            <AppStoreBadge height={45} />
            {/* <GooglePlayBadge width={150} /> */}
          </m.div>
        </div>
      </div>
    </section>
  );
}
