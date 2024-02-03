import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from './client';

export default function usePostLike(postId: string) {
  const postLike = async ({ like }: { like: boolean }) => {
    try {
      const request = await apiClient[like ? 'post' : 'delete'](`/post/${postId}/like`);
      return request.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) {
          // throw the error code
          throw new Error(err.response.data.error);
        }
      }

      throw new Error('unknown_error');
    }
  };

  const mutation = useMutation({
    mutationFn: postLike
  });

  return mutation;
}
