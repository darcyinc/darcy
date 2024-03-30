import type { VerificationType } from './user';

export interface CreatePostPayload {
  content: string;
  parentId?: string;
}

export interface GetPostResponse {
  id: string;
  content: string;
  mediaUrls: string[];
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  commentCount: number;
  author: {
    avatarUrl: string;
    displayName: string;
    handle: string;
    private: boolean;
    verified: VerificationType;
  };
  likeCount: number;
  hasLiked: boolean;
}

export type GetPopularPostsResponse = GetPostResponse[];
export type GetPostCommentsResponse = GetPostResponse[];

export type GetUserPostResponse = Pick<
  GetPostResponse,
  'id' | 'content' | 'mediaUrls' | 'createdAt' | 'updatedAt' | 'parentId' | 'commentCount' | 'likeCount' | 'hasLiked'
>;

export type GetUserPostsResponse = GetUserPostResponse[];
