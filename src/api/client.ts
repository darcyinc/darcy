import ky from 'ky';

export const apiClient = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  throwHttpErrors: false,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('_DO_NOT_SHARE_access-token') : '';
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    ]
  },
  headers: {
    Accept: 'application/json'
  }
});
