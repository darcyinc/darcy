import { APIBaseEntity } from './entity';
import { APIError } from './errors';
import { APIUser } from './user';

export interface APIPost extends APIBaseEntity {
  author: APIUser;
  content: string;
  // The post's media URLs. Empty array if none.
  mediaUrls: string[];

  likesCount: number;
  repostsCount: number;
  repliesCount: number;

  likes: APIUser[];
  reposts: APIUser[];
  replies: APIPost[];
}

export type APIGetBasicPost = Omit<APIPost, 'likes' | 'reposts' | 'replies'> | APIError;

export type APIGetPostLikes = APIUser[] | APIError;
export type APIGetPostReposts = APIUser[] | APIError;
export type APIGetPostReplies = APIPost[] | APIError;

export type APICreatePost = Pick<APIPost, 'content' | 'mediaUrls'> | APIError;
export type APIUpdatePost = boolean | APIError;

export type APILikePost = undefined | APIError;
export type APIRepostPost = undefined | APIError;
export type APIReplyPost = APIGetBasicPost | APIError;
