import type { GetUserResponse } from '@/types/api/user';
import { create } from 'zustand';

type CurrentUserState = Pick<GetUserResponse, 'avatarUrl' | 'completedOnboarding' | 'displayName' | 'handle' | 'bio'> & {
  setData: (data: Partial<CurrentUserState>) => void;
  reset: () => void;
};

export const useCurrentUser = create<CurrentUserState>((set) => ({
  avatarUrl: '',
  bio: '',
  displayName: '',
  handle: '',
  completedOnboarding: false,
  setData: (data) => set(data),
  reset: () => set({ avatarUrl: '', bio: '', displayName: '', handle: '', completedOnboarding: false })
}));
