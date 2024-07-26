import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/api';
import type { GetRecentPosts } from '@/types/api/posts';
import useSWR from 'swr';

interface SWROptions {
  fallbackData?: GetRecentPosts;
}

export default function useRecentPosts(swrOptions?: SWROptions) {
  const fetcher = async (url: string) => {
    const request = await apiClient.get(url);
    const data = (await request.json()) as ApiResponse<GetRecentPosts>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useSWR('posts/recent', fetcher, swrOptions);

  return query;
}
