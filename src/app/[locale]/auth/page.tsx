import OAuthProviders from '@/components/oauth/oauth-providers';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Sign in'
};

export default function Home({ searchParams }: { searchParams: { error: string } }) {
  const t = useTranslations('Auth');

  return (
    <section className="m-auto flex max-w-md animate-fade-in flex-col justify-center gap-2 p-5">
      <h1 className="text-3xl font-bold">{t('greeting')}</h1>
      <p>{t('loginTip')}</p>

      <OAuthProviders error={searchParams.error} />
    </section>
  );
}
