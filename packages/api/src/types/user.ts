import { APIUserOauthAuthCreate } from './auth';
import { APIBaseEntity } from './entity';
import { APIError } from './errors';
import { APIPost } from './post';

export interface APIUser extends APIBaseEntity {
  // The user's display name
  displayName: string;
  // The user's handle (always without @)
  handle: string;
  // The user's bio. Empty string if none.
  bio: string;
  // Whether the user's account is private
  private: boolean;

  // The user's avatar and banner URLs.
  avatar?: string;
  banner?: string;

  followersCount: number;
  followingCount: number;
  postsCount: number;

  followers: APIUser[];
  following: APIUser[];
  posts: APIPost[];
}

export interface APIGetUserPayload {
  handle: string;
}

export type APIGetBasicUser = Omit<APIUser, 'posts' | 'followers' | 'following'> | APIError;

export interface APIUserCreatePayload {
  email: string;
  name?: string;
}

export type APIUserCreate = APIUserOauthAuthCreate;

export interface APIUserDeletePayload {
  email: string;
}

export type APIUserDelete = APIError | { done: boolean };

export type APIUserUpdate = Partial<APIUser> | APIError;

export type APIGetUserPosts = APIPost[] | APIError;

export type APIGetUserFollowers = APIUser[] | APIError;
export type APIGetUserFollowing = APIUser[] | APIError;
