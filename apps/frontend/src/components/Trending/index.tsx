import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Container } from './styles';

const TrendingSearch = dynamic(() => import('./TrendingSearch'));

export default function Trending() {
  const t = useTranslations('Trending');
  return (
    <Container>
      <TrendingSearch i18nSearchPlaceholder={t('searchPlaceholder')} />

      <div>
        <h2>{t('trending')}</h2>
        <p>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum </p>
      </div>
    </Container>
  );
}
