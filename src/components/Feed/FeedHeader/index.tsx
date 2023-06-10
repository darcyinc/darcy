'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './styles';

type FilterOption = 'foryou' | 'newest';

interface FeedHeaderProps {
  filter: FilterOption;
}

export default function FeedHeader({ filter }: FeedHeaderProps) {
  const [dividerWidth, setDividerWidth] = useState(0);
  const currentSort = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (currentSort.current) setDividerWidth(currentSort.current.offsetWidth);
  }, []);

  const Divider = useCallback(
    ({ active }: { active: boolean }) => {
      if (!active) return null;
      return <div className="divider" style={{ width: `${dividerWidth}px` }} />;
    },
    [dividerWidth]
  );

  const handleFilter = useCallback((newFilter: FilterOption) => {}, []);

  return (
    <Container>
      <h3>Página inicial</h3>

      {['foryou', 'newest'].map((item) => (
        <button key={item} onClick={() => handleFilter(item as FilterOption)}>
          <span ref={filter === item ? currentSort : undefined}>
            {item === 'foryou' ? 'Para você' : 'Seguindo'}
          </span>
          <Divider active={filter === item} />
        </button>
      ))}
    </Container>
  );
}
