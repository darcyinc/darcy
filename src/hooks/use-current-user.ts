import type { GetUserBasicInfoResponse } from '@/types/api/user';
import { create } from 'zustand';

interface CurrentUser extends GetUserBasicInfoResponse {
  setCurrentUser: (user: Omit<CurrentUser, 'setCurrentUser'>) => void;
  _ready: boolean;
}

export const useCurrentUser = create<CurrentUser>((setCurrentUser) => ({
  setCurrentUser,
  avatar_url: '',
  created_at: '',
  full_name: '',
  updated_at: '',
  username: '',
  _ready: false
}));
