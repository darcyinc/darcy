import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../client';

interface EditUserOptions {
  displayName?: string;
  handle?: string;
  bio?: string;
}

export default function useEditUser() {
  const editUser = async ({ displayName, handle, bio }: EditUserOptions) => {
    try {
      const request = await apiClient.patch('/users/@me', { displayName, handle, bio });
      return request.data;
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
    mutationFn: editUser
  });

  return mutation;
}
