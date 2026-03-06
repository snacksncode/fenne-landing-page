'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
];

export function Footer() {
  return (
    <footer id="footer" className="relative bg-brown-900 text-cream-50 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/icon.png" alt="Fenne fox logo" width={36} height={36} loading="lazy" className="rounded-lg" />
            <span className="text-2xl font-bold tracking-tight text-cream-50">Fenne</span>
          </div>

          <p className="text-cream-50/60 font-mono text-sm tracking-wide mb-10">Meal planning, minus the headache</p>

          <div className="w-full max-w-xs h-px bg-cream-50/10 mb-8" />

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-cream-50/40">
            <span>&copy; {new Date().getFullYear()} Fenne. All rights reserved.</span>
            <div className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 hover:text-cream-50/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
