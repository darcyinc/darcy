import type { ApiResponse } from '@/types/api/api';
import type { CreateRepostPayload, CreateRepostResponse } from '@/types/api/posts';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function usePostRepost(id: string) {
  const fetcher = async (url: string, { arg }: { arg: CreateRepostPayload }) => {
    const request = await apiClient.post(url, { json: arg });

    if (request.status >= 400 && request.status <= 599) {
      const data = (await request.json()) as ApiResponse<CreateRepostResponse>;

      if ('error' in data || !data.success) {
        throw new Error(data.error?.id ?? 'unknown_error');
      }
    }

    return;
  };

  const mutation = useSWRMutation(`posts/${id}/repost`, fetcher);

  return mutation;
}
