import type { ApiResponse } from '@/types/api/api';
import type { CreateAccountResponse } from '@/types/api/auth';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

interface RefreshSessionOptions {
  accessToken: string;
  refreshToken: string;
}

export default function useRefreshSession() {
  const fetcher = async (url: string, { arg }: { arg: RefreshSessionOptions }) => {
    const request = await apiClient.post(url, { json: arg });
    const data = (await request.json()) as ApiResponse<CreateAccountResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useSWRMutation('sessions/refresh', fetcher);

  return mutation;
}
