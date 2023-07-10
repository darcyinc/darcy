'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { HiOutlineX, HiSearch } from 'react-icons/hi';

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
    <form
      className={clsx(
        'group flex items-center gap-2 rounded-[30px] border border-solid border-transparent bg-darkGray p-3 focus-within:border-blue focus-within:bg-transparent',
        search.length > 0 && 'bg-transparent transition-colors duration-1000 ease-in-out'
      )}
      onReset={() => setSearch('')}
      onSubmit={handleSubmit}
    >
      <HiSearch className="ml-2 text-xl text-textSecondary" />

      <input
        required
        autoComplete="off"
        className="w-full appearance-none border-none bg-transparent text-[15px] outline-none placeholder:text-textSecondary"
        maxLength={255}
        name="search"
        placeholder={i18nSearchPlaceholder}
        type="text"
        value={search}
        onChange={handleChange}
      />

      <button
        className={clsx(
          'visible flex h-5 w-5 cursor-pointer appearance-none items-center justify-center rounded-full border-none bg-blue p-[2px] opacity-100 transition-opacity duration-200 ease-in-out hover:opacity-80',
          search.length === 0 && 'hidden cursor-default opacity-0 hover:opacity-0'
        )}
        type="reset"
      >
        <HiOutlineX className="text-lg" />
      </button>
    </form>
  );
}
