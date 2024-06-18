import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/responses';
import type { GetUserResponse } from '@/types/api/user';
import { useQuery } from '@tanstack/react-query';

export default function useUser(handle: string) {
  const fetchUser = async () => {
    const request = await apiClient.get(`users/${handle}`);
    const data = (await request.json()) as ApiResponse<GetUserResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useQuery({
    queryKey: ['users', handle],
    queryFn: fetchUser
  });

  return query;
}
