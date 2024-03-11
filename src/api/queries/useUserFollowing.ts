import { apiClient } from '@/api/client';
import type { GetUserFollowingResponse } from '@/types/api/user';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { KyResponse } from 'ky';

interface UseUserFollowingOptions {
  limit?: number;
}

// TODO: implement initial data
export default function useUserFollowing(handle: string, options?: UseUserFollowingOptions) {
  const limit = options?.limit ?? 20;

  const fetchFollowing = async (page = 1) => {
    try {
      const request = await apiClient.get(`users/${handle}/following?page=${page}&limit=${limit}`);
      const data = (await request.json()) as GetUserFollowingResponse;
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
    queryKey: ['users', handle, 'following'],
    queryFn: ({ pageParam }) => fetchFollowing(pageParam),
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
