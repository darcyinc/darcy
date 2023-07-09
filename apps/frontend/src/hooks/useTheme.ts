import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ITheme {
  theme: 'dark' | 'light' | 'slate';
  setTheme: (theme: ITheme['theme']) => void;
}

export const useTheme = create(
  persist<ITheme>(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
