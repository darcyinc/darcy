import { useTranslations } from 'next-intl';

import UserAuthFeedback from './UserAuthFeedback';

interface CallbackPageParams {
  service: string;
}

interface CallbackPageSearchParams {
  code: string;
  state: string;
}

export default function CallbackPage({ params, searchParams }: { params: CallbackPageParams; searchParams: CallbackPageSearchParams }) {
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
