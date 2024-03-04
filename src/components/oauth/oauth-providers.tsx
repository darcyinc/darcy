import Divider from '@/components/divider';
import EmailAuthForm from '@/features/forms/email-auth';
import { useTranslations } from 'next-intl';
import OAuthButton from './oauth-button';

export default function OAuthProviders({ error }: { error?: string }) {
  const t = useTranslations('Auth.AuthProviders');

  return (
    <>
      <EmailAuthForm error={error} />

      <Divider text={t('providersSuggestion')} />

      <OAuthButton service="discord">{t('joinWith', { provider: 'Discord' })}</OAuthButton>
      <OAuthButton service="google">{t('joinWith', { provider: 'Google' })}</OAuthButton>
      <OAuthButton service="github">{t('joinWith', { provider: 'GitHub' })}</OAuthButton>
    </>
  );
}
