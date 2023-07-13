import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '@darcy/api';
import { AxiosInstance } from 'axios';

export default class AuthStructure {
  constructor(private axios: AxiosInstance) {}

  async withService({ code, service }: APIUserOauthAuthCreatePayload & { service: string }) {
    const { data } = await this.axios.post<APIUserOauthAuthCreate>(`/auth/${service}/callback`, { code });

    if ('error' in data) {
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
