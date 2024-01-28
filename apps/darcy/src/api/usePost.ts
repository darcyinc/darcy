import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { useQuery } from '@tanstack/react-query';

export default function usePost(postId: string) {
  const fetchPost = async () => {
    const request = await apiClient.get(`/post/${postId}`);

    if (request.data.error || request.data.errorCode) {
      throw new Error(request.data.errorCode);
    }

    return request.data as GetPostResponse;
  };

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPost
  });

  return query;
}
