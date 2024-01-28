import { useMutation } from '@tanstack/react-query';
import { apiClient } from './client';

interface CreateAuthData {
  service: string;
  code: string;
}

export default function useCreateAuth() {
  const mutation = useMutation({
    mutationFn: async ({ service, code }: CreateAuthData) => {
      const request = await apiClient.post(`/auth/${service}/callback`, { code });
      if (request.data.error) throw new Error(request.data.error);
      return request.data;
    }
  });

  return mutation;
}
