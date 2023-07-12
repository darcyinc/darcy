import Client from '@darcy/api-wrapper';

export const client = new Client(process.env.NEXT_PUBLIC_API_URL ?? '');

export const updateToken = (token = '') => client.setToken(token);
