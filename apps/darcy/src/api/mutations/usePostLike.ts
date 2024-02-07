import { useMutation } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import { apiClient } from '../client';

export default function usePostLike(postId: string) {
  const postLike = async ({ like }: { like: boolean }) => {
    try {
      const request = await apiClient[like ? 'post' : 'delete'](`post/${postId}/like`);
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
    mutationFn: postLike
  });

  return mutation;
}
