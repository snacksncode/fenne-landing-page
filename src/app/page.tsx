import { Nav } from '@/components/Nav'
import { HeroSwitcher } from '@/components/HeroSwitcher'
import { ValueProp } from '@/components/sections/ValueProp'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Footer } from '@/components/sections/Footer'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { DecorativeElements } from '@/components/DecorativeElements'
import { MagneticCursor } from '@/components/MagneticCursor'

export default function Home() {
  return (
    <div className="relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <HeroSwitcher />
        <ValueProp />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <DecorativeElements />
      <MagneticCursor />
    </div>
  );
}
