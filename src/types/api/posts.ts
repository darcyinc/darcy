import type { UserProfilePrivacy, UserVerificationState } from './user';

export type PostReplyPrivacy = 'PUBLIC' | 'ONLY_FOLLOWERS';

export interface CreatePostPayload {
  content?: string;
  mediaUrls?: string[];
  replyingTo?: string;
  replyPrivacy?: PostReplyPrivacy;
}

export interface CreatePostResponse {
  id: string;
  content: string;
  deleted: boolean;
  media_urls: string[];
  likes_count: number;
  replies_count: number;
  reposts_count: number;
  reposting_post_id: string | null;
  reply_privacy: PostReplyPrivacy;
  replying_to: string | null;
  created_at: string;
  updated_at: string;
}

export type DeletePostResponse = never;

export interface GetPostResponse extends CreatePostResponse {
  author: {
    id: string;
    handle: string;
    full_name: string;
    avatar_url: string | null;
    banner_url: string | null;
    bio: string | null;
    privacy: UserProfilePrivacy;
    verification_state: UserVerificationState;
    post_count: number;
    following_count: number;
    followers_count: number;
    created_at: string;
    updated_at: string;
  };
  has_liked: boolean;
  has_reposted: boolean;
  is_following_post_owner: boolean;
  can_reply: boolean;
}

interface PostComment extends GetPostResponse {
  comment_visible_to_user: boolean;
}

export type GetPostComments = PostComment[];

export interface CreateRepostPayload {
  content?: string;
  mediaUrls?: string[];
}

export type CreateRepostResponse = never;
export type DeleteRepostResponse = never;

export type AddPostLikeResponse = never;
export type RemovePostLikeResponse = never;
