import { apiClient } from '@/api/client';
import type { GetPopularPostsResponse } from '@/types/api/post';
import type { ApiResponse } from '@/types/api/responses';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsePopularPostsOptions {
  limit?: number;
  initialData?: GetPopularPostsResponse;
}

// TODO: implement initial data
export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const limit = options?.limit ?? 20;

  const fetchPosts = async (page = 1) => {
    const request = await apiClient.get('popular-posts', {
      searchParams: {
        page,
        limit
      }
    });
    const data = (await request.json()) as ApiResponse<GetPopularPostsResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useInfiniteQuery({
    queryKey: ['popularPosts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    }
  });

  return query;
}
