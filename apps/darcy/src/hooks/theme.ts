import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ITheme {
  theme: 'dark' | 'light';
  setTheme: (theme: ITheme['theme']) => void;
}

export const useTheme = create(
  persist<ITheme>(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
