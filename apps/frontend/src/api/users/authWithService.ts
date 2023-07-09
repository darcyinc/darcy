import { api } from '../base';

interface AuthWithServiceOptions {
  code: string;
  service: string;
}

export const authWithService = async ({ code, service }: AuthWithServiceOptions) => {
  const { data, status } = await api.post<{
    token: string;
    error?: string;
  }>(`/auth/${service}/callback?code=${code}`);

  if (status !== 200) {
    return data.error == 'no_email_associated'
      ? {
          error: 'Você ainda não possui um e-mail cadastrado no serviço escolhido.',
          redirect: false
        }
      : { error: 'Unknown error.', redirect: true };
  }

  return { token: data.token };
};
