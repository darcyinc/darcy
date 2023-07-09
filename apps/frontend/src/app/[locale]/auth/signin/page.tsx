/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import OAuth2Button from '@/components/OAuth2Button';

import { Form } from '../styles';

export const metadata: Metadata = {
  title: 'Sign in | Darcy'
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function SignInPage() {
  return (
    <Form>
      <h1>Bem-vindo(a) de volta!</h1>
      <p>
        Insira seus dados para se autenticar na Darcy. <Link href="/auth/signup">Ainda não tem uma conta?</Link>
      </p>

      <label>
        <input autoComplete="on" maxLength={255} placeholder="E-mail" type="email" />
      </label>

      <Button size="large" type="submit" variant="blue">
        Enviar link de autenticação
      </Button>

      <Divider text="ou entre com" />

      <OAuth2Button link={process.env.NEXT_PUBLIC_DISCORD_AUTH_URL!} service="discord">
        Entrar com Discord
      </OAuth2Button>
    </Form>
  );
}
