import { APIUserOauthAuthCreate, APIUserOauthAuthCreatePayload } from '@darcy/api';
import { AxiosInstance } from 'axios';

export default class AuthStructure {
  constructor(private axios: AxiosInstance) {}

  async withService({ code, service }: APIUserOauthAuthCreatePayload & { service: string }) {
    const { data } = await this.axios.post<APIUserOauthAuthCreate>(`/auth/${service}/callback`, { code });

    if ('error' in data) {
      throw new Error(data.error);
    }

    return { token: data.token };
  }
}
