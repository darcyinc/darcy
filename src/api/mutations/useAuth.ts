import type { CreateAuthPayload, CreateAuthResponse } from '@/types/api/auth';
import { useMutation } from '@tanstack/react-query';
import type { KyResponse } from 'ky';
import { apiClient } from '../client';

export default function useCreateAuth() {
  const authCallback = async ({ service, code }: CreateAuthPayload & { service: string }) => {
    try {
      const request = await apiClient.post(`auth/${service}/callback`, { json: { code } });
      const data = (await request.json()) as CreateAuthResponse;
      return data;
    } catch (err) {
      const error = err as {
        name: string;
        response: KyResponse;
      };
      if (error.name === 'HTTPError') {
        // throw the error code
        const errorJson = (await error.response.json()) as { error: string };
        throw new Error(errorJson.error);
      }

      throw new Error('unknown_error');
    }
  };

  const mutation = useMutation({
    mutationFn: authCallback
  });

  return mutation;
}
