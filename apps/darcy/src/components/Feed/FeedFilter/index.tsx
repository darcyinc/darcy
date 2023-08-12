'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

type FilterOption = 'foryou' | 'following';

interface FeedFilterProps {
  currentFilter: FilterOption;
}

export default function FeedFilter({ currentFilter }: FeedFilterProps) {
  const t = useTranslations('Feed.FeedFilter');

  const handleFilter = useCallback((_newFilter: FilterOption) => {
    // TODO: change filter on context
    return;
  }, []);

  return (
    <>
      {['foryou', 'following'].map((item) => (
        <button
          className={'h-11 w-2/4 text-base hover:bg-hoverEffect'}
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
        >
          <div className="m-auto w-fit">
            <span className={clsx(currentFilter === item ? 'font-bold leading-10' : 'font-normal text-textSecondary')}>{t(item)}</span>

            <div className={clsx('h-1 rounded-sm', currentFilter === item && 'bg-blue')} />
          </div>
        </button>
      ))}
    </>
  );
}
