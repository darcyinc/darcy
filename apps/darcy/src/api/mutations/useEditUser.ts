import { useMutation } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import { apiClient } from '../client';

interface EditUserOptions {
  displayName?: string;
  handle?: string;
  bio?: string;
}

export default function useEditUser() {
  const editUser = async ({ displayName, handle, bio }: EditUserOptions) => {
    try {
      const request = await apiClient.patch('users/@me', { json: { displayName, handle, bio } });
      const data = (await request.json()) as { token: string };
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
