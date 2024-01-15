import { apiClient } from '@/api/client';
import { GetUserPostsResponse } from '@/app/api/users/[handle]/posts/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface UseUserPostsOptions {
  page?: number;
  type?: 'posts' | 'replies';
}

export default function useUserPosts(handle: string, options?: UseUserPostsOptions) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetUserPostsResponse[]>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    apiClient
      .get(`/users/${handle}/posts?page=${options?.page ?? 1}&type=${options?.type ?? 'posts'}`)
      .then((response) => {
        if (response.status >= 400) setError(response.data.error);
        setData(response.data);
      })
      .catch((error) => {
        if (error instanceof AxiosError) setError(error.response?.data.error);
        else setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
}
