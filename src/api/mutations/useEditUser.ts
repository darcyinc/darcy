import type { EditUserPayload, GetUserResponse } from '@/types/api/user';
import { useMutation } from '@tanstack/react-query';
import type { KyResponse } from 'ky';
import { apiClient } from '../client';

export default function useEditUser() {
  const editUser = async (json: EditUserPayload) => {
    try {
      const request = await apiClient.patch('users/@me', { json });
      const data = (await request.json()) as GetUserResponse;
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
    mutationFn: editUser
  });

  return mutation;
}
