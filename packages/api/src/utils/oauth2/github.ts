import { URLSearchParams } from 'node:url';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, WEBSITE_URL } = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !WEBSITE_URL) {
  throw new Error('Missing environment variables for GitHub OAuth.');
}

export const GITHUB_CALLBACK_URL = `${WEBSITE_URL}/auth/callback/github`;
export const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${GITHUB_CLIENT_ID}`;

const generateAuthParams = (code: string) =>
  new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    redirect_uri: GITHUB_CALLBACK_URL,
    code
  });

export interface GitHubTokenResponse {
  access_token: string;
  scope: string;
  token_type: string;
}

export async function getGithubToken(code: string) {
  const request = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: generateAuthParams(code)
  });
  const data = (await request.json()) as GitHubTokenResponse;

  if (!data.scope.includes('user:email')) {
    throw new Error('Invalid scope or an error ocurred.');
  }

  return data.access_token;
}

export async function getGithubUserData(token: string) {
  const request = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = (await request.json()) as Record<string, unknown>;

  return data;
}

export async function userEmailIsVerified(token: string, email: string) {
  const request = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  });
  const data = (await request.json()) as Record<string, unknown>[];

  return data.some((emailData) => emailData.email === email && emailData.verified);
}
