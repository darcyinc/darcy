import type { CreateAuthPayload, CreateAuthResponse } from '@/types/api/auth';
import type { ApiResponse } from '@/types/api/responses';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';

export default function useCreateAuth() {
  const authCallback = async ({ service, code }: CreateAuthPayload & { service: string }) => {
    const request = await apiClient.post(`auth/${service}/callback`, { json: { code } });
    const data = (await request.json()) as ApiResponse<CreateAuthResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useMutation({
    mutationFn: authCallback
  });

  return mutation;
}
