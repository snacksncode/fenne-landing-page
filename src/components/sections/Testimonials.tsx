'use client';

import { useRef } from 'react';
import { useInView } from 'motion/react';
import * as m from 'motion/react-m';
import { easeOutQuint } from '@/lib/easings';

const testimonials = [
  {
    name: 'James',
    review:
      'We used to have the 6pm panic every night. Now we sit down Sunday with coffee and plan in 10 minutes. The fox is super cute',
    stars: 5,
    rotate: -2,
    accent: false,
  },
  {
    name: 'Friendo',
    review:
      "Had like 50 recipe tabs open as 'cook later.' Finally copy pasted them into Fenne and typed out the ingredients. Took an hour to migrate but now I actually cook them instead of hoarding links.",
    stars: 5,
    rotate: 1.5,
    accent: true,
  },
  {
    name: 'Alex',
    review:
      'I set Tuesday as my shopping day and my list sorts by aisle automatically. In and out of Lidl in 12 minutes. No more circling back because I forgot the garlic.',
    stars: 5,
    rotate: -1,
    accent: false,
  },
  {
    name: 'Sofia',
    review:
      "Thought I'd delete this in a week like every other app. It's been 2 months and I actually look forward to Sunday planning. It's just... simple",
    stars: 5,
    rotate: 2,
    accent: true,
  },
  {
    name: 'Casey',
    review:
      "No AI pushing keto bowls I didn't ask for. Just my recipes, my week, and my grocery list organized how I set it up.",
    stars: 5,
    rotate: -1.5,
    accent: false,
  },
  {
    name: 'Another friendo',
    review:
      "I plan Sunday, my boyfriend grabs groceries Tuesday after work on his way home. We both see the list update live - he checks off items at the store, I see it clear at home. No more 'did you get milk?' texts.",
    stars: 5,
    rotate: 1,
    accent: true,
  },
];

function StarIcon() {
  return (
    <svg className="star-icon h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
  },
};

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-15% 0px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-15% 0px' });

  const titleInitial = { opacity: 0, y: 30 };

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
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: '128px 128px',
        }}
      />

      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-100 w-100 rounded-full opacity-[0.15]"
        style={{
          background: 'radial-gradient(circle, var(--color-orange-500) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <m.h2
          ref={titleRef}
          className="testimonials-title mb-14 text-center font-sans text-4xl md:text-5xl font-black tracking-tight text-cream-50 md:mb-20"
          initial={titleInitial}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: easeOutQuint }}
        >
          What our <span className="text-orange-500">beta testers</span> say
        </m.h2>

        <m.div
          ref={cardsRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((t, i) => (
            <m.div key={t.name} className="testimonial-card relative" variants={cardVariants}>
              <div
                className={`relative rounded-3xl px-7 py-6 md:px-8 md:py-7 transition-all duration-300 hover:scale-[1.03] ${
                  t.accent
                    ? 'bg-orange-500 text-white border-4 border-[#D58449]'
                    : 'bg-cream-50 text-brown-900 border-4 border-[#EEE8E1]'
                } ${i % 3 === 1 ? 'md:mt-8' : ''}`}
                style={{
                  transform: `rotate(${t.rotate}deg)`,
                }}
              >
                {/* decorative quote */}
                <span
                  className={`pointer-events-none absolute top-4 right-5 font-serif text-[6rem] leading-none select-none ${
                    t.accent ? 'text-brown-900/20' : 'text-brown-900/10'
                  }`}
                  aria-hidden="true"
                >
                  ”
                </span>

                <div
                  className={`mb-3 flex gap-0.5 ${t.accent ? 'text-white' : 'text-orange-500'}`}
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <StarIcon key={si} />
                  ))}
                </div>

                <p
                  className={`mb-4 font-sans text-base leading-relaxed ${t.accent ? 'text-cream-100' : 'text-brown-900'}`}
                >
                  {t.review}
                </p>

                <p
                  className={`font-sans text-sm font-bold tracking-wide ${t.accent ? 'text-cream-50' : 'text-brown-800'}`}
                >
                  {t.name} · Beta Tester
                </p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
