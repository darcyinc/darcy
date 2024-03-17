'use client';

import { useState } from 'react';
import OnboardingPresentationPhase from './phases/presentation';

export interface OnboardingUserData {
  handle: string;
  displayName: string;
  bio: string;
}

export interface OnboardingPhaseProps {
  setPhase: (phase: OnboardingPhase) => void;
  setData: (data: OnboardingUserData) => void;
}

export type OnboardingPhase = 'presentation' | 'profile';

export default function OnboardingPage() {
  const [phase, setPhase] = useState<OnboardingPhase>('presentation');
  const [, setData] = useState<OnboardingUserData>();

  return <>{phase === 'presentation' && <OnboardingPresentationPhase setPhase={setPhase} setData={setData} />}</>;
}
