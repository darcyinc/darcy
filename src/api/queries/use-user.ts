import { apiClient } from '@/api/client';
import type { ApiResponse } from '@/types/api/api';
import type { GetUserBasicInfoResponse } from '@/types/api/user';
import useSWR from 'swr';

interface SWROptions {
  fallbackData?: GetUserBasicInfoResponse;
}

export default function useUser(swrOptions?: SWROptions) {
  const fetcher = async (url: string) => {
    const request = await apiClient.get(url);
    const data = (await request.json()) as ApiResponse<GetUserBasicInfoResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const query = useSWR('users/@me', fetcher, swrOptions);

  return query;
}
