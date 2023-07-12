import { AxiosInstance } from 'axios';

interface AuthWithServiceOptions {
  code: string;
  service: string;
}

export default class AuthStructure {
  constructor(private axios: AxiosInstance) {}

  async withService({ code, service }: AuthWithServiceOptions) {
    const { data, status } = await this.axios.post<{
      token: string;
      error?: string;
    }>(`/auth/${service}/callback?code=${code}`);

    if (status !== 200) {
      if (data.error == 'no_email_associated')
        return {
          error: 'Você ainda não possui um e-mail cadastrado no serviço escolhido.',
          redirect: false
        };

      return { error: 'Unknown error.', redirect: true };
    }
    
    return { token: data.token };
  }
}
