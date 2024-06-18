import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/responses';
import type { GetUserFollowingResponse } from '@/types/api/user';
import { useInfiniteQuery } from '@tanstack/react-query';

interface UseUserFollowingOptions {
  limit?: number;
}

// TODO: implement initial data
export default function useUserFollowing(handle: string, options?: UseUserFollowingOptions) {
  const limit = options?.limit ?? 20;

  const fetchFollowing = async (page = 1) => {
    const request = await apiClient.get(`users/${handle}/following`, {
      searchParams: {
        page,
        limit
      }
    });
    const data = (await request.json()) as ApiResponse<GetUserFollowingResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
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
