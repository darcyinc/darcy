import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/types/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import { KyResponse } from 'ky';

interface UsePopularPostsOptions {
  limit?: number;
  initialData?: GetPopularPostsResponse;
}

// TODO: implement initial data
export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const limit = options?.limit ?? 20;

  const fetchPosts = async (page = 1) => {
    try {
      const request = await apiClient.get(`popular-posts?page=${page}&limit=${limit}`);
      const data = (await request.json()) as GetPopularPostsResponse;
      return data;
    } catch (err) {
      const error = err as {
        name: string;
        response: KyResponse;
      };
      if (error.name === 'HTTPError') {
        // throw the error code
        const errorJson = (await error.response.json()) as { error: string };
        throw new Error(errorJson.error);
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
