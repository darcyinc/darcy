import { Metadata } from 'next';
import Link from 'next/link';

import { OAuth } from '@/components/OAuth';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Sign in | Darcy'
};

export default function Home() {
  const t = useTranslations('Auth');

  return (
    <form className="m-auto flex max-w-md animate-fade-in flex-col justify-center gap-2 p-5">
      <h1 className="text-3xl font-bold">{t('greeting')}</h1>
      <p>
        {t('loginTip')}
      </p>

      <OAuth.Providers />
    </form>
  );
}
