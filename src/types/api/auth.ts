export interface CreateAccountPayload {
  fullName: string;
  email: string;
  password: string;
  captchaToken: string;
}

export interface LoginAccountPayload {
  email: string;
  password: string;
  captchaToken: string;
}

export interface CreateAccountResponse {
  access_token: string;
  refresh_token: string;
}

export type LoginAccountResponse = CreateAccountResponse;
