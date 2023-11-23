import { useTranslations } from 'next-intl';

import TrendingSearch from './TrendingSearch';

export default function Trending() {
  const t = useTranslations('Trending');

  return (
    <aside className="sticky top-0 ml-[1.5%] hidden h-screen w-full max-w-[348px] flex-col gap-4 pt-3 lg:flex">
      <TrendingSearch />

      <div className="rounded-2xl bg-darkGray p-5">
        <h2 className="text-xl font-bold">{t('trending')}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
      </div>
    </aside>
  );
}
