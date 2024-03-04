import { create } from 'zustand';

export interface FeedSortState {
  sortMode: 'foryou' | 'following';
  setSortMode: (mode: FeedSortState['sortMode']) => void;
}

export const useFeedSort = create<FeedSortState>((set) => ({
  sortMode: 'foryou',
  setSortMode: (sortMode) => set({ sortMode })
}));
