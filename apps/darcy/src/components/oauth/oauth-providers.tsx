import Divider from '@/components/divider';
import EmailAuthForm from '@/features/forms/email-auth';
import OAuthButton from './oauth-button';

export default function OAuthProviders({ error }: { error?: string }) {
  return (
    <>
      <EmailAuthForm error={error} />

      <Divider text="ou entre com" />

      <OAuthButton service="discord">Entrar com Discord</OAuthButton>
      <OAuthButton service="google">Entrar com Google</OAuthButton>
      <OAuthButton service="github">Entrar com GitHub</OAuthButton>
    </>
  );
}
