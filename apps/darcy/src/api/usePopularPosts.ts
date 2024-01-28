import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsePopularPostsOptions {
  limit?: number;
  initialData?: GetPopularPostsResponse;
}

// TODO: implement initial data
export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const limit = options?.limit ?? 20;

  const fetchPosts = (page = 1) => {
    return apiClient.get(`/popular-posts?page=${page}&limit=${limit}`).then((res) => res.data as GetPopularPostsResponse);
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
