import { APIGetBasicPost, APIGetPostLikes, APIGetPostReplies, APIGetPostReposts } from '@darcy/api';
import { AxiosInstance } from 'axios';

export default class PostStructure {
  constructor(private axios: AxiosInstance) {}

  /**
   * Gets a post by its ID.
   * @param handle The post's ID.
   * @returns The requested post.
   */
  async get(id: string) {
    const req = await this.axios.get<APIGetBasicPost>(`/posts/${id}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of users that liked the post.
   * @param handle The post's ID.
   * @param page The page of likes to get.
   * @returns The requested post's likes.
   */
  async getLikes(id: string, page = 1) {
    const req = await this.axios.get<APIGetPostLikes>(`/posts/${id}/likes?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of users that reposted the post.
   * @param handle The post's ID.
   * @param page The page of reposts to get.
   * @returns The requested post's reposts.
   */
  async getReposts(id: string, page = 1) {
    const req = await this.axios.get<APIGetPostReposts>(`/posts/${id}/reposts?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Returns a list of users that replied to the post.
   * @param handle The post's ID.
   * @param page The page of replies to get.
   * @returns The requested post's replies.
   */
  async getReplies(id: string, page = 1) {
    const req = await this.axios.get<APIGetPostReplies>(`/posts/${id}/replies?page=${page}`);

    if ('error' in req.data) {
      throw new Error(req.data.error);
    }

    return req.data;
  }

  /**
   * Likes a post.
   * @param handle The post's ID.
   */
  async like(id: string) {
    await this.axios.post(`/posts/${id}/like`);
  }

  /**
   * Unlikes a post.
   * @param handle The post's ID.
   */
  async unlike(id: string) {
    await this.axios.delete(`/posts/${id}/like`);
  }

  /**
   * Reposts a post.
   * @param handle The post's ID.
   */
  async repost(id: string) {
    await this.axios.post(`/posts/${id}/repost`);
  }

  /**
   * Unreposts a post.
   */
  async unrepost(id: string) {
    await this.axios.delete(`/posts/${id}/repost`);
  }
}
