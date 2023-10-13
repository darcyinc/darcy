import Divider from '@/components/Divider';

import { OAuth } from '..';

import EmailForm from './EmailForm';

export default function LoginProviders({ error }: { error?: string }) {
  return (
    <>
      <EmailForm error={error} />

      <Divider text="ou entre com" />

      <OAuth.Button service="discord">Entrar com Discord</OAuth.Button>
      <OAuth.Button service="google">Entrar com Google</OAuth.Button>
      <OAuth.Button service="github">Entrar com GitHub</OAuth.Button>
    </>
  );
}
