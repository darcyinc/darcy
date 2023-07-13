import axios, { AxiosInstance } from 'axios';

import AuthStructure from './structures/auth';
import UserStructure from './structures/users';

export default class Client {
  private axios: AxiosInstance;

  // Structures
  auth!: AuthStructure;
  users!: UserStructure;

  constructor(url: string, token = '') {
    this.axios = axios.create({
      baseURL: url,
      headers: {
        Authorization: `Bearer ${token ?? ''}`,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Credentials': 'true'
      },
      validateStatus: () => true,
      withCredentials: true,
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
  }
}
