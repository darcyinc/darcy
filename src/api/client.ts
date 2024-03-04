import ky from 'ky';

export const apiClient = ky.extend({
  // if api client is created on server and app is running on Docker, SERVER_API_URL will be defined.
  prefixUrl: process.env.SERVER_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage?.getItem('darcy-token') ?? '';
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    ]
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});
