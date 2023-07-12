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

export type APIGetUser = APIUser | APIError;
export type APIUserUpdate = Partial<APIUser>;
