'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { HiOutlineX, HiSearch } from 'react-icons/hi';

import { Container } from './styles';

interface TrendingSearchProps {
  i18nSearchPlaceholder: string;
}

export default function TrendingSearch({ i18nSearchPlaceholder }: TrendingSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      router.push(`/search?q=${encodeURIComponent(search.trim())}`);
    },
    [search, router]
  );

  return (
    <Container onReset={() => setSearch('')} onSubmit={handleSubmit}>
      <HiSearch />
      <input
        required
        autoComplete="off"
        maxLength={255}
        name="search"
        placeholder={i18nSearchPlaceholder}
        type="text"
        value={search}
        onChange={handleChange}
      />
      <button className="clear-icon" type="reset">
        <HiOutlineX />
      </button>
    </Container>
  );
}
