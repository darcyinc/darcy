import { apiClient } from '@/api/client';
import type { GetUserPostsResponse } from '@/types/api/post';
import type { ApiResponse } from '@/types/api/responses';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseUserPostsOptions {
  limit?: number;
  type?: 'posts' | 'replies';
  initialData?: GetUserPostsResponse;
}

// TODO: implement initial data
export default function useUserPosts(handle: string, options?: UseUserPostsOptions) {
  const queryClient = useQueryClient();
  const limit = options?.limit ?? 20;

  const fetchPosts = async (page = 1) => {
    const request = await apiClient.get(`users/${handle}/posts`, {
      searchParams: {
        page,
        limit
      }
    });
    const data = (await request.json()) as ApiResponse<GetUserPostsResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useInfiniteQuery({
    queryKey: ['users', handle, 'posts'],
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

  // Add initial data to query
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (options?.initialData) {
      queryClient.setQueryData(['users', handle, 'posts'], () => ({
        pages: [options.initialData],
        pageParams: [1]
      }));
    }
  }, []);

  return query;
}
