'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const HeroFloat = dynamic(() =>
  import('./heroes/HeroFloat').then((m) => ({ default: m.HeroFloat }))
)
const HeroTriptych = dynamic(() =>
  import('./heroes/HeroTriptych').then((m) => ({ default: m.HeroTriptych }))
)
const HeroStage = dynamic(() =>
  import('./heroes/HeroStage').then((m) => ({ default: m.HeroStage }))
)
const HeroCascade = dynamic(() =>
  import('./heroes/HeroCascade').then((m) => ({ default: m.HeroCascade }))
)
const HeroMosaic = dynamic(() =>
  import('./heroes/HeroMosaic').then((m) => ({ default: m.HeroMosaic }))
)

type HeroVariant = 'float' | 'triptych' | 'stage' | 'cascade' | 'mosaic'

const HERO_OPTIONS: { value: HeroVariant; label: string }[] = [
  { value: 'float', label: 'Float' },
  { value: 'triptych', label: 'Triptych' },
  { value: 'stage', label: 'Stage' },
  { value: 'cascade', label: 'Cascade' },
  { value: 'mosaic', label: 'Mosaic' },
]

export function HeroSwitcher() {
  const [activeVariant, setActiveVariant] = useState<HeroVariant>('float')

  return (
    <>
      {activeVariant === 'float' && <HeroFloat />}
      {activeVariant === 'triptych' && <HeroTriptych />}
      {activeVariant === 'stage' && <HeroStage />}
      {activeVariant === 'cascade' && <HeroCascade />}
      {activeVariant === 'mosaic' && <HeroMosaic />}

      <div
        className="fixed bottom-6 right-6 z-50 flex gap-2 rounded-full bg-brown-900/95 p-2 shadow-xl backdrop-blur-sm"
        role="toolbar"
        aria-label="Hero variant switcher"
      >
        {HERO_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveVariant(value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeVariant === value
                ? 'bg-orange-500 text-white'
                : 'text-cream-100 hover:bg-brown-800'
            }`}
            aria-pressed={activeVariant === value}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  )
}
