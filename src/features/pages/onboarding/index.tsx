'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const OnboardingPresentationPhase = dynamic(() => import('./phases/presentation'), { ssr: false });
const OnboardingUserProfilePhase = dynamic(() => import('./phases/user-profile'), { ssr: false });

export interface OnboardingUserData {
  avatarBase64: string;
  bio: string;
  displayName: string;
  handle: string;
}

export interface OnboardingPhaseProps {
  setPhase: (phase: OnboardingPhase) => void;
  setData: (data: OnboardingUserData) => void;
  data: OnboardingUserData;
}

export type OnboardingPhase = 'presentation' | 'profile';

export default function OnboardingPage() {
  const [phase, setPhase] = useState<OnboardingPhase>('presentation');
  const [data, setData] = useState<OnboardingUserData>({} as OnboardingUserData);

  return (
    <>
      {phase === 'presentation' && <OnboardingPresentationPhase {...{ data, setPhase, setData }} />}
      {phase === 'profile' && <OnboardingUserProfilePhase {...{ data, setPhase, setData }} />}
    </>
  );
}
