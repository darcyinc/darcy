import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

// const updateToken = (token: string) => {
//   api.defaults.headers.Authorization = `Bearer ${token}`;
// };
