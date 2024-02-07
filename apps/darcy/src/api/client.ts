import ky from 'ky';

export const apiClient = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});
