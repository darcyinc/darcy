import { useMutation } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import { apiClient } from '../client';

export default function useFollowUser(handle: string) {
  const followUser = async ({ follow }: { follow: boolean }) => {
    try {
      const request = await apiClient[follow ? 'post' : 'delete'](`users/${handle}/follow`);

      if (request.status !== 200) {
        const data = await request.json();
        return data;
      }

      return;
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
    mutationFn: followUser
  });

  return mutation;
}
