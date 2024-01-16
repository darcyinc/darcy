import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface UsePopularPostsOptions {
  page?: number;
  limit?: number;
}

export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetPopularPostsResponse>([]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => fetchData(), [options?.page]);

  const fetchData = () => {
    if (!loading) setLoading(true);
    setError(undefined);

    apiClient
      .get(`/popular-posts?page=${options?.page ?? 1}&limit=${options?.limit ?? 20}`)
      .then((response) => {
        if (response.status >= 400) setError(response.data.error);
        else setData(response.data);
      })
      .catch((error) => {
        if (error instanceof AxiosError) setError(error.response?.data.error);
        else setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  return { data, error, loading, refetch: fetchData };
}
