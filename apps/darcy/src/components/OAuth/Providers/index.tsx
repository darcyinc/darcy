import Button from '@/components/Button';
import Divider from '@/components/Divider';

import { OAuth } from '..';

export default function LoginProviders() {
  return (
    <>
      <label className="mt-1 w-full">
        <input
          autoComplete="on"
          className="w-full rounded-2xl border border-grayBorder bg-transparent p-2.5 text-sm outline-none placeholder:text-textSecondary focus:border-blue"
          maxLength={255}
          placeholder="E-mail"
          type="email"
        />
      </label>

      <Button disabled className="my-2.5" color="blue" size="lg" type="submit">
        <p className="font-semibold text-lg">Enviar link de autenticação</p>
      </Button>

      <Divider text="ou entre com" />

      <OAuth.Button service="discord">Entrar com Discord</OAuth.Button>
      <OAuth.Button service="google">Entrar com Google</OAuth.Button>
      <OAuth.Button service="github">Entrar com GitHub</OAuth.Button>
    </>
  );
}
