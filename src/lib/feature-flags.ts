'use client';

import { useLocalStorage } from '@/lib/useLocalStorage';

export const featureFlagKeys = {
  oldHowItWorks: 'old_how_it_works',
  smoothScroll: 'smooth_scroll',
} as const;

export const featureFlags = [
  {
    key: featureFlagKeys.oldHowItWorks,
    label: 'Old How It Works',
    description: `Use the old How It Works layout instead of the new vertical-scroll version.`,
    defaultValue: false,
  },
  {
    key: featureFlagKeys.smoothScroll,
    label: 'Smooth Scroll',
    description: `Lenis smooth scrolling across the entire site.`,
    defaultValue: true,
  },
];

export const useFeatureFlag = (key: FeatureFlagKey) => {
  const defaultVal = featureFlags.find((ff) => ff.key === key)?.defaultValue;
  const [value] = useLocalStorage(key, defaultVal != null ? String(defaultVal) : null);
  return value === 'true';
};

export type FeatureFlagKey = (typeof featureFlags)[number]['key'];
