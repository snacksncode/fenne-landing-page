'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';

export const featureFlagKeys = {
  howItWorksV2: 'how_it_works_v2',
  smoothScroll: 'smooth_scroll',
  stripeGradient: 'stripe_gradient',
} as const;

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
  {
    key: featureFlagKeys.stripeGradient,
    label: 'Stripe Gradient',
    description: `Animated WebGL stripe gradient in the hero. When off, uses a simple orange gradient.`,
    defaultValue: true,
  },
];

export const useFeatureFlag = (key: FeatureFlagKey) => {
  const defaultVal = featureFlags.find((ff) => ff.key === key)?.defaultValue;
  const [value] = useLocalStorage(key, defaultVal != null ? String(defaultVal) : null);
  return value === 'true';
};

export type FeatureFlagKey = (typeof featureFlags)[number]['key'];
