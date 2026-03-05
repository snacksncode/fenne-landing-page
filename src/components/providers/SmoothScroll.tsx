'use client'

import { ReactLenis } from 'lenis/react'
import { featureFlagKeys, useFeatureFlag } from '@/lib/feature-flags'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const useSmooth = useFeatureFlag(featureFlagKeys.smoothScroll)
  if (!useSmooth) return <>{children}</>
  return <ReactLenis root>{children}</ReactLenis>
}
