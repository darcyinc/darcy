import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/Button';
import Divider from '@/components/Divider';

import { Form } from '../styles';

export const metadata: Metadata = {
  title: 'Sign in | Darcy',
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function SignInPage() {
  return (
    <Form>
      <h1>Bem-vindo(a) de volta!</h1>
      <p>
        Insira seus dados para se autenticar na Darcy.{' '}
        <Link href="/auth/signup">Ainda não tem uma conta?</Link>
      </p>

      <label>
        <input
          type="email"
          placeholder="E-mail"
          autoComplete="on"
          maxLength={255}
        />
      </label>

      <Button type="submit" $size="large" $variant="blue">
        Enviar link de autenticação
      </Button>

      <Divider text="ou entre com" />
    </Form>
  );
}
