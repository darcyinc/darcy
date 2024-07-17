import type { ApiResponse } from '@/types/api/api';
import type { LoginAccountPayload, LoginAccountResponse } from '@/types/api/auth';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function useSignin() {
  const fetcher = async (url: string, { arg }: { arg: LoginAccountPayload }) => {
    const request = await apiClient.post(url, { json: arg });
    const data = (await request.json()) as ApiResponse<LoginAccountResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useSWRMutation('auth/signin', fetcher);

  return mutation;
}
