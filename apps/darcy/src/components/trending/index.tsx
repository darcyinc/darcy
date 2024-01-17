import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

import TrendingSearch from './trending-search';

export default function Trending() {
  const t = useTranslations('Trending');

  return (
    <aside className="sticky top-0 ml-[1.5%] hidden h-screen w-full max-w-[348px] flex-col gap-4 pt-3 lg:flex">
      <TrendingSearch />

      <Card className="border-none rounded-2xl">
        <CardHeader>
          <CardTitle>{t('trending')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
        </CardContent>
      </Card>
    </aside>
  );
}
