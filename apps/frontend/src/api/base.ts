import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  },
  validateStatus: () => true,
  withCredentials: true,
  responseType: 'json',
});

export const updateToken = (token: string | null) => {
  api.defaults.headers.Authorization = `Bearer ${token ?? ''}`;
};
