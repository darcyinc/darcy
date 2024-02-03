import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UsePopularPostsOptions {
  limit?: number;
  initialData?: GetPopularPostsResponse;
}

// TODO: implement initial data
export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const limit = options?.limit ?? 20;

  const fetchPosts = async (page = 1) => {
    try {
      const request = await apiClient.get(`/popular-posts?page=${page}&limit=${limit}`);
      return request.data as GetPopularPostsResponse;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          // throw the error code
          throw new Error(err.response.data.error);
        }
      }

      throw new Error('unknown_error');
    }
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
