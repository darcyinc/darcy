import { APIGetBasicUser, APIGetUserFollowers, APIGetUserFollowing, APIGetUserPosts } from '@darcy/api';
import { AxiosInstance } from 'axios';

export default class UserStructure {
  constructor(private axios: AxiosInstance) {}

  /**
   * Gets a user by their handle.
   * @param handle The user's handle. Defaults to `@me`.
   * @returns The requested user.
   */
  async get(handle = '@me') {
    const req = await this.axios.get<APIGetBasicUser>(`/users/${handle}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of users posts.
   * @param handle The user's handle. Defaults to `@me`.
   * @param page The page of posts to get.
   * @returns The requested user's posts.
   */
  async getPosts(handle = '@me', page = 1) {
    const req = await this.axios.get<APIGetUserPosts>(`/users/${handle}/posts?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of users followers.
   * @param handle The user's handle. Defaults to `@me`.
   * @param page The page of followers to get.
   * @returns The requested user's followers.
   */
  async getFollowers(handle = '@me', page = 1) {
    const req = await this.axios.get<APIGetUserFollowers>(`/users/${handle}/followers?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of who the user is following.
   * @param handle The user's handle. Defaults to `@me`.
   * @param page The page of following to get.
   * @returns The requested user's following.
   */
  async getFollowing(handle = '@me', page = 1) {
    const req = await this.axios.get<APIGetUserFollowing>(`/users/${handle}/followers?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }
}
