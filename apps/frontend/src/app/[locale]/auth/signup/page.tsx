/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Metadata } from 'next';
import Link from 'next/link';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import OAuth2Button from '@/components/OAuth2Button';

export const metadata: Metadata = {
  title: 'Sign up | Darcy'
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function SignUpPage() {
  return (
    <form className="m-auto flex max-w-md animate-fade-in flex-col justify-center gap-2 p-5">
      <h1 className="text-3xl font-bold">Olá! Bem-vindo(a).</h1>
      <p>
        Você está prestes a criar uma conta na Darcy. <Link href="/auth/signin">Já possui uma conta?</Link>
      </p>

      <label className="mt-1 w-full">
        <input
          autoComplete="on"
          className="w-full rounded-2xl border border-grayBorder bg-transparent p-2.5 text-sm outline-none placeholder:text-textSecondary focus:border-blue"
          maxLength={255}
          placeholder="E-mail"
          type="email"
        />
      </label>

      <Button className="my-2.5" size="large" type="submit" variant="blue">
        Enviar link de autenticação
      </Button>

      <Divider text="ou entre com" />

      <OAuth2Button link={process.env.NEXT_PUBLIC_DISCORD_AUTH_URL!} service="discord">
        Entrar com Discord
      </OAuth2Button>

      <OAuth2Button link={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!} service="google">
        Entrar com Google
      </OAuth2Button>

      <OAuth2Button link={process.env.NEXT_PUBLIC_GITHUB_AUTH_URL!} service="github">
        Entrar com GitHub
      </OAuth2Button>
    </form>
  );
}
