import type { ApiResponse } from '@/types/api/responses';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';

export default function usePostLike(postId: string) {
  const postLike = async ({ like }: { like: boolean }) => {
    const request = await apiClient[like ? 'post' : 'delete'](`post/${postId}/like`);

    if (request.status !== 204) {
      const data = (await request.json()) as ApiResponse<null>;

      if ('error' in data || !data.success) {
        throw new Error(data.error?.id ?? 'unknown_error');
      }
    }
  };

  const mutation = useMutation({
    mutationFn: postLike
  });

  return mutation;
}
