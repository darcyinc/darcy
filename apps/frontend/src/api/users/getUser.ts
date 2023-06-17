import type { User } from '@darcy/api';

import { api } from '../base';

export const getUser = async (handle: string) => {
  const request = await api.get(`/users/${handle}`);
  return request.data as User;
};
