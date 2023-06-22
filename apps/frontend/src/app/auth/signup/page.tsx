import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/Button';
import Divider from '@/components/Divider';

import { Form } from '../styles';

export const metadata: Metadata = {
  title: 'Sign up | Darcy',
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function SignInPage() {
  return (
    <Form>
      <h1>Olá! Bem-vindo(a).</h1>
      <p>
        Você está prestes a criar uma conta na Darcy.{' '}
        <Link href="/auth/signin">Já possui uma conta?</Link>
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
