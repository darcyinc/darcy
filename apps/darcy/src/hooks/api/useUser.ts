import { apiClient } from '@/api/client';
import { GetUserResponse } from '@/app/api/users/[handle]/route';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function useUser(handle: string) {
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({} as GetUserResponse);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    if (!loading) setLoading(true);
    setError(undefined);

    apiClient
      .get(`/users/${handle}`)
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

  return { data, setData, error, loading, refetch: fetchData };
}
