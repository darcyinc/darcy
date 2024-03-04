export type VerificationType = 'NONE' | 'PERSON' | 'ORGANIZATION' | 'GOVERNMENT';

export interface GetUserResponse {
  displayName: string;
  handle: string;
  bio: string;
  private: boolean;
  verified: VerificationType;
  avatarUrl: string;
  bannerUrl: string | null;
  createdAt: string;
  updatedAt: string;
  websiteUrl: string | null;
  location: string | null;
  jobTitle: string | null;
  birthday: string | null;
  postCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export type GetUserFollowersResponse = {
  avatarUrl: string;
  bio: string;
  displayName: string;
  handle: string;
}[];

export type GetUserFollowingResponse = GetUserFollowersResponse;

export interface EditUserPayload {
  displayName?: string;
  handle?: string;
  bio?: string;
}
