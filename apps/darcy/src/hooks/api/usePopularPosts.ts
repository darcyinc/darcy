import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UsePopularPostsOptions {
  page?: number;
  limit?: number;
  initialData?: GetPopularPostsResponse;
}

// TODO: implement initial data
export default function usePopularPostsReactQuery(options?: UsePopularPostsOptions) {
  const limit = options?.limit ?? 20;

  const fetchPosts = async (page = 1) => {
    const request = await apiClient.get(`/popular-posts?page=${page}&limit=${limit}`);

    if (request.data.error || request.data.errorCode) {
      throw new Error(request.data.errorCode);
    }

    return request.data as GetPopularPostsResponse;
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
