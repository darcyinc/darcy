import { apiClient } from '@/api/client';
import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function usePost(postId: string) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as GetPostResponse);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    if (!loading) setLoading(true);
    setError(undefined);

    apiClient
      .get(`/post/${postId}`)
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
