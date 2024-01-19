'use client';

import clsx from 'clsx';
import { Search, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function TrendingSearch() {
  const t = useTranslations('Trending');
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchRef.current) return;
    router.push(`/search?q=${encodeURIComponent(searchRef.current.value.trim())}`);
  };

  return (
    <form
      className={clsx(
        'group',
        'flex items-center gap-2 rounded-full p-1 px-2',
        'border border-solid border-transparent bg-card',
        'focus-within:border-primary focus-within:bg-transparent',
        'valid:border-primary valid:bg-transparent valid:transition-colors valid:duration-1000 valid:ease-in-out'
      )}
      onSubmit={handleSubmit}
    >
      <Search className="ml-2 flex-shrink-0 text-xl text-muted-foreground" />

      <Input
        required
        name="searchapp"
        minLength={1}
        maxLength={255}
        className="!ring-transparent !border-transparent bg-transparent"
        placeholder={t('searchPlaceholder')}
      />

      <Button className="rounded-full bg-primary w-5 h-5 group-invalid:hidden" size="icon" aria-label={'Clear search'} type="reset">
        <XCircle size={20} />
      </Button>
    </form>
  );
}
