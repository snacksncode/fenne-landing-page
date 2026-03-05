import { useLocalStorage } from '@uidotdev/usehooks'

export const featureFlagKeys = {
  howItWorksV2: 'how_it_works_v2',
  smoothScroll: 'smooth_scroll',
} as const

export const featureFlags = [
  {
    key: featureFlagKeys.howItWorksV2,
    label: 'How It Works V2',
    description: `Experimental vertical-scroll layout with big type and parallax blobs.`,
    defaultValue: false,
  },
  {
    key: featureFlagKeys.smoothScroll,
    label: 'Smooth Scroll',
    description: `Lenis smooth scrolling across the entire site.`,
    defaultValue: true,
  },
]

export const useFeatureFlag = (key: FeatureFlagKey) => {
  const [value] = useLocalStorage(
    key,
    featureFlags.find((ff) => ff.key === key)?.defaultValue
  )
  return value
}

export type FeatureFlagKey = (typeof featureFlags)[number]['key']
