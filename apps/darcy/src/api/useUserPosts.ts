import { apiClient } from '@/api/client';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UseUserPostsOptions {
  limit?: number;
  type?: 'posts' | 'replies';
  initialData?: GetUserPostsResponse[];
}

// TODO: implement initial data
export default function useUserPosts(handle: string, options?: UseUserPostsOptions) {
  const queryClient = useQueryClient();
  const limit = options?.limit ?? 20;

  const fetchPosts = (page = 1) => {
    return apiClient.get(`/users/${handle}/posts?page=${page}&limit=${limit}`).then((res) => res.data as GetUserPostsResponse[]);
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
