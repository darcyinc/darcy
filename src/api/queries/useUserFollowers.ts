import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/responses';
import type { GetUserFollowersResponse } from '@/types/api/user';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseUserFollowersOptions {
  limit?: number;
}

// TODO: implement initial data
export default function useUserFollowers(handle: string, options?: UseUserFollowersOptions) {
  const limit = options?.limit ?? 20;

  const fetchFollowers = async (page = 1) => {
    const request = await apiClient.get(`users/${handle}/followers`, {
      searchParams: {
        page,
        limit
      }
    });
    const data = (await request.json()) as ApiResponse<GetUserFollowersResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useInfiniteQuery({
    queryKey: ['users', handle, 'followers'],
    queryFn: ({ pageParam }) => fetchFollowers(pageParam),
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
