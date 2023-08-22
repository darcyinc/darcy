import { promisify } from 'node:util';

import { sign, verify } from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  updatedAt: number;
}

const signAsync = promisify<TokenPayload, string>(sign);
const verifyAsync = promisify<string, string>(verify);

export const createToken = async (email: string, updatedAt: number): Promise<string> => {
  try {
    const token = (await signAsync({ email, updatedAt }, process.env.JWT_SECRET!)) as unknown as string;
    return token;
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  const decoded = (await verifyAsync(token, process.env.JWT_SECRET!)) as unknown as TokenPayload;
  return decoded;
};
