import { Nav } from '@/components/Nav'
import { Hero } from '@/components/heroes/Hero'
import { BentoGrid } from '@/components/sections/features/index'
import { HowItWorksSection } from '@/components/sections/how-it-works'
import { Footer } from '@/components/sections/Footer'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'
import { OpenSource } from '@/components/sections/OpenSource'
import Link from 'next/link'

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
  )
}
