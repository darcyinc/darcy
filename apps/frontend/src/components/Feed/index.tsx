import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const FeedHeader = dynamic(() => import('./FeedHeader'));
const FeedPost = dynamic(() => import('./FeedPost'));

export default function Feed() {
  const t = useTranslations('FeedHeader');

  return (
    <section className="max-w-[600px] pb-14 sm:border-r sm:border-grayBorder sm:pb-0">
      <FeedHeader filter="foryou" i18nFollowing={t('following')} i18nForYou={t('forYou')} i18nTitle={t('titles.home')} />

      <FeedPost
        stats={{
          comments: 54,
          likes: 594,
          reposts: 2,
          views: '1.2k',
          hasLiked: true,
          hasReposted: false
        }}
        user={{
          avatar: 'https://via.placeholder.com/40',
          handle: 'johndoe',
          username: 'John Doe'
        }}
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        media={['https://via.placeholder.com/600x600.png']}
      />
    </section>
  );
}
