'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { FeedSortState, useFeedSort } from '@/hooks/useFeedSort';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { MdOutlineSettings } from 'react-icons/md';

type FilterOption = FeedSortState['sortMode'];

export default function FeedFilter() {
  const feedSort = useFeedSort();
  const currentUser = useCurrentUser();
  const t = useTranslations('Feed.FeedFilter');

  const handleFilter = useCallback((newFilter: FilterOption) => feedSort.setSortMode(newFilter), [feedSort]);

  return (
    <div className="flex items-center">
      {['foryou', 'following'].map((item) => (
        <button
          className={'h-12 w-2/4 text-base enabled:hover:bg-hoverEffect disabled:cursor-not-allowed'}
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
          disabled={!currentUser.token && item === 'following'}
        >
          <div className="m-auto w-fit">
            <span className={clsx('leading-[44px]', feedSort.sortMode === item ? 'font-bold' : 'text-textSecondary')}>{t(item)}</span>

            {/* Current sort mode indicator */}
            {feedSort.sortMode === item && <div className={clsx('h-1 mt-auto rounded-sm bg-blue')} />}
          </div>
        </button>
      ))}

      <button type="button" className="hover:bg-hoverEffect p-2 mx-2 rounded-full hidden sm:block">
        <MdOutlineSettings className="text-xl" />
      </button>
    </div>
  );
}
