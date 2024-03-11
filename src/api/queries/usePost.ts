import { apiClient } from '@/api/client';
import type { GetPostResponse } from '@/types/api/post';
import { useQuery } from '@tanstack/react-query';
import type { KyResponse } from 'ky';

export default function usePost(postId: string) {
  const fetchPost = async () => {
    try {
      const request = await apiClient.get(`post/${postId}`);
      const data = (await request.json()) as GetPostResponse;
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

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPost
  });

  return query;
}
