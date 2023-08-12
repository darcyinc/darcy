'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { HiOutlineX, HiSearch } from 'react-icons/hi';

export default function TrendingSearch() {
  const t = useTranslations('Trending');
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
        'group',
        'flex items-center gap-2 rounded-full p-3',
        'border border-solid border-transparent bg-darkGray',
        'focus-within:border-blue focus-within:bg-transparent',
        'valid:border-blue valid:bg-transparent valid:transition-colors valid:duration-1000 valid:ease-in-out'
      )}
      onReset={() => setSearch('')}
      onSubmit={handleSubmit}
    >
      <HiSearch className="ml-2 flex-shrink-0 text-xl text-textSecondary" />

      <input
        required
        autoComplete="off"
        className="w-full bg-transparent text-sm outline-none placeholder:text-textSecondary"
        maxLength={255}
        minLength={1}
        name="search"
        placeholder={t('searchPlaceholder')}
        type="text"
        value={search}
        onChange={handleChange}
      />

      <button
        className={clsx(
          'flex h-5 w-5 items-center justify-center rounded-full bg-blue p-0.5',
          'opacity-100 transition-opacity duration-200 ease-in-out',
          'hover:opacity-80 group-invalid:hidden'
        )}
        type="reset"
      >
        <HiOutlineX className="text-lg" />
      </button>
    </form>
  );
}
