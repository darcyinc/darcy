import { GetPostResponse } from '@/app/api/post/[postId]/route';
import { useMutation } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import { apiClient } from '../client';

interface CreatePostData {
  content: string;
}

export default function useCreatePost() {
  const createPost = async ({ content }: CreatePostData) => {
    try {
      const request = await apiClient.post('post', { json: { content } });
      const data = (await request.json()) as GetPostResponse;
      return data;
    } catch (err) {
      const error = err as {
        name: string;
        response: KyResponse;
      };
      if (error.name === 'HTTPError') {
        // throw the error code
        const errorJson = (await error.response.json()) as { error: string };
        throw new Error(errorJson.error);
      }

      throw new Error('unknown_error');
    }
  };

  const mutation = useMutation({
    mutationFn: createPost
  });

  return mutation;
}
