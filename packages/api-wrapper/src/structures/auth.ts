import { AxiosInstance } from 'axios';

import { APIUserOauthAuthCreatePayload, APIUserOauthAuthCreate } from '../types/auth';

export default class AuthStructure {
  constructor(private axios: AxiosInstance) {}

  async withService({ code, service }: APIUserOauthAuthCreatePayload & { service: string }) {
    const { data } = await this.axios.post<APIUserOauthAuthCreate>(`/auth/${service}/callback`, { code });

    if ('message' in data) {
      if (data.message === 'no_email_associated')
        return {
          error: 'Você ainda não possui um e-mail cadastrado no serviço escolhido.',
          redirect: false
        };

      return { error: 'Unknown error.', redirect: true };
    }

    return { token: data.token };
  }
}
