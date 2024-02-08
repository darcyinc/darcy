import { GITHUB_CALLBACK_URL } from './data';

const generateAuthParams = (code: string) => ({
  client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? '',
  client_secret: process.env.GITHUB_CLIENT_SECRET ?? '',
  redirect_uri: GITHUB_CALLBACK_URL,
  code
});

interface GithubTokenResponse {
  access_token: string;
  token_type: 'bearer';
  scope: string;
  error?: string;
}

interface GithubUserData {
  id: number;
  blog: string;
  name: string;
  login: string;
  email: string;
  location: string;
}

export async function getGithubToken(code: string) {
  const request = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(generateAuthParams(code))
  });
  const data = (await request.json()) as GithubTokenResponse;

  if (data.error || !data.scope.includes('user:email')) {
    throw new Error('Invalid scope or an error ocurred.');
  }

  return data.access_token;
}

export async function getGithubUserData(token: string) {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = (await request.json()) as GithubUserData;

  return data;
}
