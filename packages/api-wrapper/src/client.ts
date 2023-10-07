import axios, { AxiosInstance } from 'axios';

import AuthStructure from './structures/auth';
import PostStructure from './structures/posts';
import UserStructure from './structures/users';

export default class Client {
  private axios: AxiosInstance;

  // Structures
  auth!: AuthStructure;
  users!: UserStructure;
  posts!: PostStructure;

  constructor(url: string, token = '') {
    this.axios = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token ?? ''}`,
        Accept: 'application/json'
      },
      validateStatus: () => true,
      responseType: 'json'
    });

    this.setupStructures();
  }

  setToken(token: string) {
    this.axios.defaults.headers.Authorization = `Bearer ${token ?? ''}`;
  }

  setUrl(url: string) {
    this.axios.defaults.baseURL = url;
  }

  setupStructures() {
    this.auth = new AuthStructure(this.axios);
    this.users = new UserStructure(this.axios);
    this.posts = new PostStructure(this.axios);
  }
}
