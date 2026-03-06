'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useScrollTo } from '@/lib/scroll-utils';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Open Source', href: '#open-source' },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="relative">{open ? <X size={28} strokeWidth={1.75} /> : <Menu size={28} strokeWidth={1.75} />}</div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { scrollTo } = useScrollTo();
  const isScrollingTo = useRef(false);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [underline, setUnderline] = useState({ x: 0, width: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];
    const visibleRatios: Record<string, number> = {};

    const pickActive = () => {
      if (isScrollingTo.current) return;
      let best: number | null = null;
      let bestRatio = 0;
      for (let i = 0; i < sectionIds.length; i++) {
        const ratio = visibleRatios[sectionIds[i]] ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = i;
        }
      }
      setActiveIndex(bestRatio > 0.15 ? best : null);
    };

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleRatios[id] = entry.intersectionRatio;
          pickActive();
        },
        { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const btn = buttonRefs.current[activeIndex];
    if (!btn) return;
    const pad = 12;
    setUnderline({ x: btn.offsetLeft + pad, width: btn.offsetWidth - pad * 2 });
  }, [activeIndex]);

  const handleNavClick = (href: string) => {
    const index = navLinks.findIndex((l) => l.href === href);
    setActiveIndex(index >= 0 ? index : null);
    setMobileOpen(false);
    isScrollingTo.current = true;
    scrollTo(href);
    setTimeout(() => {
      isScrollingTo.current = false;
    }, 1200);
  };

  return (
    <nav
      data-testid="nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream-50/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(73,61,52,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => {
            scrollTo('#hero-float');
            setActiveIndex(null);
          }}
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/icon.png"
            alt=""
            width={28}
            height={28}
            className="rounded-md transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-lg font-bold tracking-tight text-brown-900">Fenne</span>
        </button>

        <div className="hidden md:flex items-center gap-1 relative">
          <motion.div
            className="absolute bottom-0.5 left-0 h-0.5 rounded-full bg-orange-500 pointer-events-none"
            animate={{
              opacity: activeIndex !== null ? 1 : 0,
              x: underline.x,
              width: underline.width || 1,
            }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />

          {navLinks.map((link, i) => (
            <button
              key={link.href}
              ref={(el) => {
                buttonRefs.current[i] = el;
              }}
              onClick={() => handleNavClick(link.href)}
              className="group relative px-4 py-2 text-sm font-medium text-brown-800 transition-colors duration-200 hover:text-brown-900"
            >
              {link.label}
              {activeIndex !== i && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-orange-500/40 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              )}
            </button>
          ))}

          <button
            onClick={() => handleNavClick('#cta')}
            className="ml-4 px-5 py-2 text-sm font-medium rounded-full bg-brown-900 text-cream-50 transition-all duration-300 hover:bg-brown-800 hover:shadow-lg hover:shadow-brown-900/10 hover:scale-[1.04] active:scale-[0.97]"
          >
            Get Started
          </button>
        </div>

        <button
          data-testid="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-brown-900"
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="md:hidden overflow-hidden bg-cream-50/95 backdrop-blur-xl border-t border-brown-900/5"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.25,
                  }}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-3 text-left text-base font-medium text-brown-800 rounded-lg"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: navLinks.length * 0.05,
                  duration: 0.25,
                }}
                onClick={() => handleNavClick('#cta')}
                className="mt-2 px-5 py-3 text-sm font-medium rounded-full bg-brown-900 text-cream-50 text-center"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
