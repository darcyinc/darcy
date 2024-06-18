import type { CreatePostPayload, GetPostResponse } from '@/types/api/post';
import type { ApiResponse } from '@/types/api/responses';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';

export default function useCreatePost() {
  const createPost = async ({ parentId, content }: CreatePostPayload) => {
    const request = await apiClient.post('post', { json: { content, parentId } });
    const data = (await request.json()) as ApiResponse<GetPostResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useMutation({
    mutationFn: createPost
  });

  return mutation;
}
