import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('GenericNotFoundPage');

  return (
    <section className="flex flex-col gap-2 items-center justify-center p-4 h-screen-no-header">
      <h1 className="text-4xl font-bold">{t('friendlyTitle')}</h1>
      <h1 className="text-xl">{t('description')}</h1>
      <Link className="btn btn-primary mt-4" href="/">
        {t('backToHome')}
      </Link>
    </section>
  );
}
