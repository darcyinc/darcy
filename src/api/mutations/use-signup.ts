import type { ApiResponse } from '@/types/api/api';
import type { CreateAccountPayload, CreateAccountResponse } from '@/types/api/auth';
import useSWRMutation from 'swr/mutation';
import { apiClient } from '../client';

export default function useSignup() {
  const fetcher = async (url: string, { arg }: { arg: CreateAccountPayload }) => {
    const request = await apiClient.post(url, { json: arg });
    const data = (await request.json()) as ApiResponse<CreateAccountResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useSWRMutation('auth/signup', fetcher);

  return mutation;
}
