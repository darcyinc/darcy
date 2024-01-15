import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function useUser(handle: string) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as GetUserResponse);

  // biome-ignore lint/correctness/useExhaustiveDependencies: avoid infinite loop
  useEffect(() => {
    apiClient
      .get(`/users/${handle}`)
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
