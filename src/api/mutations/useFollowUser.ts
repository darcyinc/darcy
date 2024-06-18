import type { ApiResponse } from '@/types/api/responses';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';

export default function useFollowUser(handle: string) {
  const followUser = async ({ follow }: { follow: boolean }) => {
    const request = await apiClient[follow ? 'post' : 'delete'](`users/${handle}/follow`);

    if (request.status !== 204) {
      const data = (await request.json()) as ApiResponse<null>;

      if ('error' in data || !data.success) {
        throw new Error(data.error?.id ?? 'unknown_error');
      }
    }
  };

  const mutation = useMutation({
    mutationFn: followUser
  });

  return mutation;
}
