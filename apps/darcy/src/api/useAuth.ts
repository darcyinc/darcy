import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from './client';

interface CreateAuthData {
  service: string;
  code: string;
}

export default function useCreateAuth() {
  const authCallback = async ({ service, code }: CreateAuthData) => {
    try {
      const request = await apiClient.post(`/auth/${service}/callback`, { code }).then((res) => res.data);
      return request.data as { token: string };
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          // throw the error code
          throw new Error(err.response.data.error);
        }
      }

      throw new Error('unknown_error');
    }
  };

  const mutation = useMutation({
    mutationFn: authCallback
  });

  return mutation;
}
