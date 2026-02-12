'use client'

import { useState, useEffect } from 'react'
import { HowItWorks01 } from './HowItWorks01'
import { HowItWorks02 } from './HowItWorks02'
import { HowItWorks03 } from './HowItWorks03'
import { HowItWorks04 } from './HowItWorks04'
import { HowItWorks05 } from './HowItWorks05'
import { HowItWorks06 } from './HowItWorks06'
import { HowItWorks07 } from './HowItWorks07'
import { HowItWorks08 } from './HowItWorks08'
import { HowItWorks09 } from './HowItWorks09'
import { HowItWorks10 } from './HowItWorks10'

export function HowItWorksSwitcher() {
  const [activeVariant, setActiveVariant] = useState(1)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActiveVariant(prev => prev > 1 ? prev - 1 : 10)
      } else if (e.key === 'ArrowRight') {
        setActiveVariant(prev => prev < 10 ? prev + 1 : 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Conditionally render active variant */}
      {activeVariant === 1 && <HowItWorks01 />}
      {activeVariant === 2 && <HowItWorks02 />}
      {activeVariant === 3 && <HowItWorks03 />}
      {activeVariant === 4 && <HowItWorks04 />}
      {activeVariant === 5 && <HowItWorks05 />}
      {activeVariant === 6 && <HowItWorks06 />}
      {activeVariant === 7 && <HowItWorks07 />}
      {activeVariant === 8 && <HowItWorks08 />}
      {activeVariant === 9 && <HowItWorks09 />}
      {activeVariant === 10 && <HowItWorks10 />}

      {/* Fixed toolbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-2 bg-cream-50 px-4 py-2 rounded-full shadow-lg">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <button
              key={n}
              onClick={() => setActiveVariant(n)}
              className={`w-8 h-8 rounded-full font-sans text-sm font-bold transition-colors ${
                activeVariant === n
                  ? 'bg-orange-500 text-white'
                  : 'bg-cream-100 text-brown-700 hover:bg-orange-100'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
