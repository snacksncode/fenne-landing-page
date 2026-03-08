'use client';

import { featureFlagKeys, useFeatureFlag } from '@/lib/feature-flags';
import { HowItWorks } from './HowItWorks';
import { HowItWorksV2 } from './HowItWorksV2';

export function HowItWorksSection() {
  const useOld = useFeatureFlag(featureFlagKeys.oldHowItWorks);
  if (useOld) return <HowItWorks />;
  return <HowItWorksV2 />;
}
