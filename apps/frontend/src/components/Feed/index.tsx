import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import { Container } from './styles';

const FeedHeader = dynamic(() => import('./FeedHeader'));
const FeedPost = dynamic(() => import('./FeedPost'));

export default function Feed() {
  const t = useTranslations('FeedHeader');

  return (
    <Container>
      <FeedHeader
        filter="foryou"
        i18nTitle={t('titles.home')}
        i18nFollowing={t('following')}
        i18nForYou={t('forYou')}
      />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </Container>
  );
}
