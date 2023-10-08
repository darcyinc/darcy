import { sign, verify } from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  updatedAt: number;
}

export const createToken = async (email: string, updatedAt: number) => {
  return new Promise<string>((resolve, reject) => {
    sign({ email, updatedAt }, process.env.JWT_SECRET!, { noTimestamp: true }, (err, token) => {
      if (err || !token) reject(err);
      else resolve(token);
    });
  });
};

export const verifyToken = async (token: string) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err || !decoded) reject(err);
      else resolve(decoded as TokenPayload);
    });
  });
};
