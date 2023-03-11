import { BsFilterRight } from 'solid-icons/bs';
import { RiSystemFilter2Line } from 'solid-icons/ri';
import { WiTime4 } from 'solid-icons/wi';
import { createSignal } from 'solid-js';
import { FeedHeader, SortOptions } from './styles';
import type { FeedSorterData } from '~/hooks/feedSortStore';
import { useFeedSort } from '~/hooks/feedSortStore';
import type { SyntheticEvent } from '~/types/events';

export default function FeedSorter() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [sort, setSort] = useFeedSort();

  const handleSortChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    const target = event.currentTarget;
    setSort((sort) => ({
      ...sort,
      mode: target.value as FeedSorterData['mode'],
    }));
  };

  const handlePopularRangeChange = (
    event: SyntheticEvent<HTMLSelectElement>
  ) => {
    const target = event.currentTarget;
    setSort((sort) => ({
      ...sort,
      popularRange: target.value as FeedSorterData['popularRange'],
    }));
  };

  return (
    <FeedHeader>
      <RiSystemFilter2Line
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        tabIndex={0}
      />

      {isMenuOpen() && (
        <SortOptions>
          <div>
            <label for="filter">
              <BsFilterRight />
              Filtrar publicações
            </label>
            <select id="filter" name="filter" onChange={handleSortChange}>
              <option value="popular">Mais populares</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>

          {sort().mode === 'popular' && (
            <div>
              <label for="time-range">
                <WiTime4 />
                Faixa de tempo
              </label>
              <select
                id="time-range"
                name="time-range"
                value={sort().popularRange ?? '5h'}
                onChange={handlePopularRangeChange}
              >
                <option value="30m">30 minutos atrás</option>
                <option value="1h">1 hora atrás</option>
                <option value="5h">5 horas atrás</option>
                <option value="1d">1 dia atrás</option>
                <option value="7d">7 dias atrás</option>
              </select>
            </div>
          )}
        </SortOptions>
      )}
    </FeedHeader>
  );
}
