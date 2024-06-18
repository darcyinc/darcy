import type { ApiResponse } from '@/types/api/responses';
import type { EditUserPayload, GetUserResponse } from '@/types/api/user';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../client';

export default function useEditUser() {
  const editUser = async (json: EditUserPayload) => {
    const request = await apiClient.patch('users/@me', { json });
    const data = (await request.json()) as ApiResponse<GetUserResponse>;

    if ('error' in data || !data.success) {
      throw new Error(data.error?.id ?? 'unknown_error');
    }

    return data.data;
  };

  const mutation = useMutation({
    mutationFn: editUser
  });

  return mutation;
}
