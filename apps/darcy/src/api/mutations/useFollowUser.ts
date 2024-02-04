import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../client';

export default function useFollowUser(handle: string) {
  const followUser = async ({ follow }: { follow: boolean }) => {
    try {
      const request = await apiClient[follow ? 'post' : 'delete'](`/users/${handle}/follow`);
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
    mutationFn: followUser
  });

  return mutation;
}
