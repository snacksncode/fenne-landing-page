'use client';

import { featureFlagKeys, useFeatureFlag } from '@/lib/feature-flags';
import { HowItWorks } from './HowItWorks';
import { HowItWorksV2 } from './HowItWorksV2';

export function HowItWorksSection() {
  const useV2 = useFeatureFlag(featureFlagKeys.howItWorksV2);
  if (useV2) return <HowItWorksV2 />;
  return <HowItWorks />;
}
