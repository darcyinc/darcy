'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import OnboardingFinishedPhase from './phases/finished';

const OnboardingPresentationPhase = dynamic(() => import('./phases/presentation'), { ssr: false });
const OnboardingUserProfilePhase = dynamic(() => import('./phases/user-profile'), { ssr: false });

export interface OnboardingUserData {
  avatarBase64: string;
  bio: string;
  displayName: string;
}

export interface OnboardingPhaseProps {
  setPhase: (phase: OnboardingPhase) => void;
  setData: (data: OnboardingUserData) => void;
  data: OnboardingUserData;
}

export type OnboardingPhase = 'presentation' | 'profile' | 'finished';

export default function OnboardingPage() {
  const [phase, setPhase] = useState<OnboardingPhase>('presentation');
  const [data, setData] = useState<OnboardingUserData>({} as OnboardingUserData);

  return (
    <>
      {phase === 'finished' && <OnboardingFinishedPhase {...{ data }} />}
      {phase === 'presentation' && <OnboardingPresentationPhase {...{ setPhase }} />}
      {phase === 'profile' && <OnboardingUserProfilePhase {...{ data, setPhase, setData }} />}
    </>
  );
}
