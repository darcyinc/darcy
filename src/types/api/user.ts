export type UserDMPrivacy = 'PUBLIC' | 'PRIVATE';
export type UserProfilePrivacy = 'PUBLIC' | 'ONLY_FOLLOWING' | 'NOBODY';
export type UserVerificationState = 'NONE' | 'VERIFIED';

export interface GetUserBasicInfoResponse {
  avatar_url: string | null;
  banner_url: string | null;
  bio: string | null;
  full_name: string;
  handle: string;
  dm_privacy: UserDMPrivacy;
  profile_privacy: UserProfilePrivacy;
  followers_count: number;
  following_count: number;
  post_count: number;
  comments_count: number;
  liked_posts_count: number;
  verification_state: UserVerificationState;
  created_at: string;
  updated_at: string;
  is_is_following?: boolean;
  is_self_user?: boolean;
}
