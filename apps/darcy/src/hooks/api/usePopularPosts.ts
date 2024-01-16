import { apiClient } from '@/api/client';
import { GetPopularPostsResponse } from '@/app/api/popular-posts/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface UsePopularPostsOptions {
  page?: number;
}

export default function usePopularPosts(options?: UsePopularPostsOptions) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<GetPopularPostsResponse[]>([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    if (!loading) setLoading(true);
    setError(undefined);

    apiClient
      .get(`/popular-posts?page=${options?.page ?? 1}`)
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
