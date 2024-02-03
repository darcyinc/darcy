import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../client';

interface CreatePostData {
  content: string;
}

export default function useCreatePost() {
  const createPost = async ({ content }: CreatePostData) => {
    try {
      const request = await apiClient.post('/post', { content });
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
    mutationFn: createPost
  });

  return mutation;
}
