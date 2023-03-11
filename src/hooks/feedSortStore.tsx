import { createSignal } from 'solid-js';

export interface FeedSorterData {
  mode: 'newest' | 'popular';
  popularRange?: '1d' | '1h' | '5h' | '7d' | '30m';
}

const [signal, setSignal] = createSignal<FeedSorterData>({
  mode: 'popular',
  popularRange: '5h',
});

export const useFeedSort = () => [signal, setSignal] as const;
