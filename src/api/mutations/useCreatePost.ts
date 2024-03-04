import { useMutation } from '@tanstack/react-query';
import { KyResponse } from 'ky';
import { apiClient } from '../client';
import { CreatePostPayload, GetPostResponse } from '@/types/api/post';

export default function useCreatePost() {
  const createPost = async ({ parentId, content }: CreatePostPayload) => {
    try {
      const request = await apiClient.post('post', { json: { content, parentId } });
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
