import { Metadata } from 'next';
import Link from 'next/link';

import { OAuth } from '@/components/OAuth';

export const metadata: Metadata = {
  title: 'Sign in | Darcy'
};

// const _EMAIL_REGEX =
//   /^[\w!#$%&'*+./=?^`{|}~-]+@[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?(?:\.[\dA-Za-z](?:[\dA-Za-z-]{0,61}[\dA-Za-z])?)*$/;

export default function Home() {
  return (
    <form className="m-auto flex max-w-md animate-fade-in flex-col justify-center gap-2 p-5">
      <h1 className="text-3xl font-bold">Bem-vindo(a) de volta!</h1>
      <p>
        Insira seus dados para se autenticar na Darcy. <Link href="/auth/signup">Ainda não tem uma conta?</Link>
      </p>

      <OAuth.Providers />
    </form>
  );
}
