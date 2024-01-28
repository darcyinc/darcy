import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { useQuery } from '@tanstack/react-query';

export default function usePost(postId: string) {
  const fetchPost = () => {
    return apiClient.get(`/post/${postId}`).then((res) => res.data as GetPostResponse);
  };

  const query = useQuery({
    queryKey: ['posts', postId],
    queryFn: fetchPost
  });

  return query;
}
