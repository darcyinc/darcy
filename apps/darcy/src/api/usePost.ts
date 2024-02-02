import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function usePost(postId: string) {
  const fetchPost = async () => {
    try {
      const request = await apiClient.get(`/post/${postId}`);
      return request.data as GetPostResponse;
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

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPost
  });

  return query;
}
