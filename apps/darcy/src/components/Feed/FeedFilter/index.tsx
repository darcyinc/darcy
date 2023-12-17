'use client';

import { FeedSortState, useFeedSort } from '@/hooks/useFeedSort';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { MdOutlineSettings } from 'react-icons/md';

type FilterOption = FeedSortState['sortMode'];

export default function FeedFilter() {
  const t = useTranslations('Feed.FeedFilter');
  const feedSort = useFeedSort();

  const handleFilter = useCallback((newFilter: FilterOption) => feedSort.setSortMode(newFilter), [feedSort]);

  return (
    <div className="flex items-center">
      {['foryou', 'following'].map((item) => (
        <button
          className={'h-12 w-2/4 text-base hover:bg-hoverEffect'}
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
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
