import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const TrendingSearch = dynamic(() => import('./TrendingSearch'));

export default function Trending() {
  const t = useTranslations('Trending');

  return (
    <section className="flex w-full max-w-[348px] flex-col gap-4 pt-3">
      <TrendingSearch i18nSearchPlaceholder={t('searchPlaceholder')} />

      <div className="rounded-2xl bg-darkGray p-5">
        <h2 className="text-xl font-bold">{t('trending')}</h2>
        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
      </div>
    </section>
  );
}
