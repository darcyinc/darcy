import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useUser(handle: string) {
  const fetchUser = async () => {
    try {
      const request = await apiClient.get(`/users/${handle}`);
      return request.data as GetUserResponse;
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

  const query = useQuery({
    queryKey: ['users', handle],
    queryFn: fetchUser
  });

  return query;
}
