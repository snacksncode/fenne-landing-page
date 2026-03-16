import dynamic from 'next/dynamic';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/heroes/Hero';
import { BentoGrid } from '@/components/sections/features/index';
import Link from 'next/link';

const HowItWorksSection = dynamic(() =>
  import('@/components/sections/how-it-works').then((m) => ({ default: m.HowItWorksSection }))
);
const Testimonials = dynamic(() =>
  import('@/components/sections/Testimonials').then((m) => ({ default: m.Testimonials }))
);
const OpenSource = dynamic(() => import('@/components/sections/OpenSource').then((m) => ({ default: m.OpenSource })));
const CTA = dynamic(() => import('@/components/sections/CTA').then((m) => ({ default: m.CTA })));
const Footer = dynamic(() => import('@/components/sections/Footer').then((m) => ({ default: m.Footer })));

export default function Home() {
  return (
    <div className="relative">
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
      >
        Skip to main content
      </Link>
      <Nav />
      <main id="main-content">
        <Hero />
        <BentoGrid />
        <HowItWorksSection />
        <Testimonials />
        <OpenSource />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
