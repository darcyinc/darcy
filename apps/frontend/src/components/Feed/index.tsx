import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Container } from './styles';

const FeedHeader = dynamic(() => import('./FeedHeader'));
const FeedPost = dynamic(() => import('./FeedPost'));

export default function Feed() {
  const t = useTranslations('FeedHeader');

  return (
    <Container>
      <FeedHeader filter="foryou" i18nFollowing={t('following')} i18nForYou={t('forYou')} i18nTitle={t('titles.home')} />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Container>
  );
}
