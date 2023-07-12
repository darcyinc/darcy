import { APIGetUser } from '@darcy/api';
import { AxiosInstance } from 'axios';

export default class UserStructure {
  constructor(private axios: AxiosInstance) {}

  async get(handle: string) {
    const req = await this.axios.patch<APIGetUser>(`/users/${handle}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }
}
