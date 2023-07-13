import { promisify } from 'node:util';

import { sign as signSync, verify as verifySync } from 'jsonwebtoken';

export const sign = async (data: string) => {
  return promisify<string, string>(signSync)(data, process.env.JWT_TOKEN!) as unknown as string;
};

export const verify = async (data: string) => {
  return promisify<string, string>(verifySync)(data, process.env.JWT_TOKEN!) as unknown as string;
};
