import { apiClient } from '@/api/client';
import type { GetPostResponse } from '@/types/api/post';
import type { ApiResponse } from '@/types/api/responses';
import { useQuery } from '@tanstack/react-query';

export default function usePost(postId: string) {
  const fetchPost = async () => {
    const request = await apiClient.get(`post/${postId}`);
    const data = (await request.json()) as ApiResponse<GetPostResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPost
  });

  return query;
}
