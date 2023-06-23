'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  const [dividerWidth, setDividerWidth] = useState(0);
  const currentSort = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (currentSort.current) setDividerWidth(currentSort.current.offsetWidth);
  }, []);

  const Divider = useCallback(
    ({ active }: { active: boolean }) => {
      if (!active) return;
      return <div className="divider" style={{ width: `${dividerWidth}px` }} />;
    },
    [dividerWidth]
  );

  const handleFilter = useCallback((_newFilter: FilterOption) => {
    return;
  }, []);

  return (
    <Container>
      <h3>{i18nTitle}</h3>

      {['foryou', 'newest'].map((item) => (
        <button key={item} onClick={() => handleFilter(item as FilterOption)}>
          <span ref={filter === item ? currentSort : undefined}>
            {item === 'foryou' ? i18nForYou : i18nFollowing}
          </span>
          <Divider active={filter === item} />
        </button>
      ))}
    </Container>
  );
}
