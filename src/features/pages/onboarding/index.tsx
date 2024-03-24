'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
  const user = useCurrentUser();
  const [phase, setPhase] = useState<OnboardingPhase>('presentation');
  const [data, setData] = useState({} as OnboardingUserData);

  useEffect(() => {
    setData({
      avatarBase64: '',
      bio: user.bio,
      displayName: user.displayName
    });
  }, [user]);

  return (
    <>
      {phase === 'presentation' && <OnboardingPresentationPhase {...{ setPhase }} />}
      {phase === 'profile' && <OnboardingUserProfilePhase {...{ data, setPhase, setData }} />}
      {phase === 'finished' && <OnboardingFinishedPhase {...{ data }} />}
    </>
  );
}
