import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/api';
import type { GetPostResponse } from '@/types/api/posts';
import useSWR from 'swr';

interface SWROptions {
  fallbackData?: GetPostResponse;
}

export default function usePost(id: string, swrOptions?: SWROptions) {
  const fetcher = async (url: string) => {
    const request = await apiClient.get(url);
    const data = (await request.json()) as ApiResponse<GetPostResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useSWR(`posts/${id}`, fetcher, swrOptions);

  return query;
}
