import { useTranslations } from 'next-intl';

import UserAuthFeedback from './UserAuthFeedback';

export default function CallbackPage({
  params,
  searchParams
}: {
  params: { service: string };
  searchParams: { code: string; state: string };
}) {
  const t = useTranslations('AuthCallback');
  const { service } = params;
  const { code, state } = searchParams;

  return (
    <UserAuthFeedback
      i18n={{
        goBack: t('goBack'),
        authenticating: t('authenticating')
      }}
      code={code}
      service={service}
      state={state}
    />
  );
}
