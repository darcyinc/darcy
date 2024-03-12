import type { GetUserResponse } from '@/types/api/user';
import { create } from 'zustand';

type CurrentUserState = Pick<GetUserResponse, 'avatarUrl' | 'displayName' | 'handle' | 'bio'> & {
  setData: (data: Partial<CurrentUserState>) => void;
  reset: () => void;
};

export const useCurrentUser = create<CurrentUserState>((set) => ({
  bio: '',
  displayName: '',
  handle: '',
  avatarUrl: '',
  setData: (data) => set(data),
  reset: () => set({ bio: '', displayName: '', handle: '', avatarUrl: '' })
}));
