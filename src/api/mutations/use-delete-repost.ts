import type { ApiResponse } from '@/types/api/api';
import type { DeleteRepostResponse } from '@/types/api/posts';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function useDeleteRepost(id: string) {
  const fetcher = async (url: string) => {
    const request = await apiClient.delete(url);

    if (request.status >= 400 && request.status <= 599) {
      const data = (await request.json()) as ApiResponse<DeleteRepostResponse>;

      if ('error' in data || !data.success) {
        throw new Error(data.error?.id ?? 'unknown_error');
      }
    }

    return;
  };

  const mutation = useSWRMutation(`posts/${id}/repost`, fetcher);

  return mutation;
}
