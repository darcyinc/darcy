import { AxiosInstance } from 'axios';

import { APIGetBasicUser, APIGetUserPosts, APIGetUserFollowers, APIGetUserFollowing } from '../types/user';

export default class UserStructure {
  constructor(private axios: AxiosInstance) {}

  /**
   * Gets a user by their handle.
   * @param handle The user's handle. Defaults to `@me`.
   * @returns The requested user.
   */
  async get(handle = '@me') {
    const req = await this.axios.get<APIGetBasicUser>(`/users/${handle}`);

    if ('message' in req.data) {
      throw new Error(req.data.message);
    }

    return req.data;
  }

  /**
   * Returns a list of users posts.
   * @param handle The user's handle.
   * @param page The page of posts to get.
   * @returns The requested user's posts.
   */
  async getPosts(handle: string, page = 1) {
    const req = await this.axios.get<APIGetUserPosts>(`/users/${handle}/posts?page=${page}`);

    if ('message' in req.data) {
      throw new Error(req.data.message);
    }

    return req.data;
  }

  /**
   * Returns a list of users followers.
   * @param handle The user's handle.
   * @param page The page of followers to get.
   * @returns The requested user's followers.
   */
  async getFollowers(handle: string, page = 1) {
    const req = await this.axios.get<APIGetUserFollowers>(`/users/${handle}/followers?page=${page}`);

    if ('message' in req.data) {
      throw new Error(req.data.message);
    }

    return req.data;
  }

  /**
   * Returns a list of who the user is following.
   * @param handle The user's handle.
   * @param page The page of following to get.
   * @returns The requested user's following.
   */
  async getFollowing(handle: string, page = 1) {
    const req = await this.axios.get<APIGetUserFollowing>(`/users/${handle}/followers?page=${page}`);

    if ('message' in req.data) {
      throw new Error(req.data.message);
    }

    return req.data;
  }
}
