import type { ApiResponse } from '@/types/api/api';
import type { CreatePostPayload, CreatePostResponse } from '@/types/api/posts';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function useCreatePost() {
  const fetcher = async (url: string, { arg }: { arg: CreatePostPayload }) => {
    const request = await apiClient.post(url, { json: arg });
    const data = (await request.json()) as ApiResponse<CreatePostResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useSWRMutation('posts', fetcher);

  return mutation;
}
