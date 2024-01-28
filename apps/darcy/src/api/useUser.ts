import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { useQuery } from '@tanstack/react-query';

export default function useUser(handle: string) {
  const fetchUser = async () => {
    const request = await apiClient.get(`/users/${handle}`);

    if (request.data.error || request.data.errorCode) {
      throw new Error(request.data.errorCode);
    }

    return request.data as GetUserResponse;
  };

  const query = useQuery({
    queryKey: ['users', handle],
    queryFn: fetchUser
  });

  return query;
}
