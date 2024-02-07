import { apiClient } from '@/api/client';
import { GetUserFollowingResponse } from '@/app/api/users/[handle]/following/route';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface UseUserFollowingOptions {
  limit?: number;
}

// TODO: implement initial data
export default function useUserFollowing(handle: string, options?: UseUserFollowingOptions) {
  const limit = options?.limit ?? 20;

  const fetchFollowing = async (page = 1) => {
    try {
      const request = await apiClient.get(`/users/${handle}/following?page=${page}&limit=${limit}`);
      return request.data as GetUserFollowingResponse;
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
