'use client';

import { useCallback } from 'react';

import { Container } from './styles';

type FilterOption = 'foryou' | 'newest';

interface FeedHeaderProperties {
  filter: FilterOption;
  i18nTitle: string;
  i18nForYou: string;
  i18nFollowing: string;
}

export default function FeedHeader({
  filter,
  i18nTitle,
  i18nForYou,
  i18nFollowing,
}: FeedHeaderProperties) {
  const handleFilter = useCallback((_newFilter: FilterOption) => {
    return;
  }, []);

  return (
    <Container>
      <h3>{i18nTitle}</h3>

      {['foryou', 'newest'].map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => handleFilter(item as FilterOption)}
        >
          <div>
            <span>{item === 'foryou' ? i18nForYou : i18nFollowing}</span>
            {filter === item && <div className="divider" />}
          </div>
        </button>
      ))}
    </Container>
  );
}
