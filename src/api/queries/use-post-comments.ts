import { apiClient } from '@/api/client';
import type { ApiPaginatedQuery, ApiResponse } from '@/types/api/api';
import type { GetPostComments } from '@/types/api/posts';
import useSWR from 'swr';

interface SWROptions {
  fallbackData?: GetPostComments;
}

export default function usePostComments(id: string, swrOptions?: SWROptions) {
  const fetcher = async (url: string, { arg }: { arg: ApiPaginatedQuery }) => {
    const request = await apiClient.get(url, {
      searchParams: {
        limit: arg.limit,
        page: arg.page
      }
    });
    const data = (await request.json()) as ApiResponse<GetPostComments>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useSWR(`posts/${id}/comments`, fetcher, swrOptions);

  return query;
}
