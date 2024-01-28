import { useMutation } from '@tanstack/react-query';
import { apiClient } from './client';

interface CreateAuthData {
  service: string;
  code: string;
}

export default function useCreateAuth() {
  const mutation = useMutation({
    mutationFn: async ({ service, code }: CreateAuthData) => {
      return apiClient.post(`/auth/${service}/callback`, { code }).then((res) => res.data);
    }
  });

  return mutation;
}
