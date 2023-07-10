'use client';

import clsx from 'clsx';
import { useCallback } from 'react';

type FilterOption = 'foryou' | 'newest';

interface FeedHeaderProperties {
  filter: FilterOption;
  i18nTitle: string;
  i18nForYou: string;
  i18nFollowing: string;
}

export default function FeedHeader({ filter, i18nTitle, i18nForYou, i18nFollowing }: FeedHeaderProperties) {
  const handleFilter = useCallback((_newFilter: FilterOption) => {
    return;
  }, []);

  return (
    <header className="w-full border-b border-grayBorder">
      <h3 className="select-none p-1 px-5 text-lg font-bold">{i18nTitle}</h3>

      {['foryou', 'newest'].map((item) => (
        <button
          className={clsx('h-10 w-2/4 cursor-pointer hover:bg-hoverEffect')}
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
        >
          <div className="text-secondary m-auto w-fit">
            <span className={clsx(filter === item ? 'font-bold leading-9 text-textPrimary' : 'text-textSecondary')}>
              {item === 'foryou' ? i18nForYou : i18nFollowing}
            </span>

            <div className={clsx('h-1 rounded-sm', filter === item && 'bg-blue')} />
          </div>
        </button>
      ))}
    </header>
  );
}
