import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const FeedHeader = dynamic(() => import('./FeedHeader'));
const FeedPost = dynamic(() => import('./FeedPost'));

export default function Feed() {
  const t = useTranslations('FeedHeader');

  return (
    <section className="max-w-[600px] pb-[48px] sm:border-r sm:border-grayBorder sm:pb-0">
      <FeedHeader filter="foryou" i18nFollowing={t('following')} i18nForYou={t('forYou')} i18nTitle={t('titles.home')} />
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </section>
  );
}
