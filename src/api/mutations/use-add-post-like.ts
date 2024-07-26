import type { ApiResponse } from '@/types/api/api';
import type { AddPostLikeResponse } from '@/types/api/posts';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function useAddPostLike(id: string) {
  const fetcher = async (url: string) => {
    const request = await apiClient.post(url);
    const data = (await request.json()) as ApiResponse<AddPostLikeResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useSWRMutation(`posts/${id}/like`, fetcher);

  return mutation;
}
