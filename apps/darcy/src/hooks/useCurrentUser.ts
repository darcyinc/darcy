import { User } from '@prisma/client';
import { create } from 'zustand';

type CurrentUserState = Pick<User, 'avatarUrl' | 'displayName' | 'handle' | 'bio'> & {
  token: string;
  setData: (data: Partial<CurrentUserState>) => void;
};

export const useCurrentUser = create<CurrentUserState>((set) => ({
  bio: '',
  displayName: '',
  handle: '',
  avatarUrl: '',
  token: '',
  setData: (data) => set(data)
}));
