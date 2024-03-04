import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/types/api/user';
import { useQuery } from '@tanstack/react-query';
import { KyResponse } from 'ky';

export default function useUser(handle: string) {
  const fetchUser = async () => {
    try {
      const request = await apiClient.get(`users/${handle}`);
      const data = (await request.json()) as GetUserResponse;
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

  const query = useQuery({
    queryKey: ['users', handle],
    queryFn: fetchUser
  });

  return query;
}
