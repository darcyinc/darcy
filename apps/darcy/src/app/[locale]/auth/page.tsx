import { OAuth } from '@/components/oauth';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Sign in | Darcy'
};

export default function Home({ searchParams }: { searchParams: { error: string } }) {
  const t = useTranslations('Auth');

  return (
    <section className="m-auto flex max-w-md animate-fade-in flex-col justify-center gap-2 p-5">
      <h1 className="text-3xl font-bold">{t('greeting')}</h1>
      <p>{t('loginTip')}</p>

      <OAuth.Providers error={searchParams.error} />
    </section>
  );
}
