'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { MdOutlineSettings } from 'react-icons/md';

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
    <div className="flex items-center">
      {['foryou', 'following'].map((item) => (
        <button
          className={'h-12 w-2/4 text-base hover:bg-hoverEffect'}
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
        >
          <div className="m-auto w-fit">
            <span className={clsx(currentFilter === item ? 'font-bold leading-[44px]' : 'font-normal text-textSecondary')}>{t(item)}</span>

            <div className={clsx('h-1 mt-auto rounded-sm', currentFilter === item && 'bg-blue')} />
          </div>
        </button>
      ))}

      <button type="button" className="hover:bg-hoverEffect p-2 mx-2 rounded-full hidden md:block">
        <MdOutlineSettings className="text-xl" />
      </button>
    </div>
  );
}
