import { validatedEnv } from '@validation/env.validator';
import jwt from 'jsonwebtoken';

const EXPIRES_IN = '7d';

export function generateToken(
  payload: any,
  expiresIn: string = EXPIRES_IN
): string {
  return jwt.sign(payload, validatedEnv.JWT_ACCESS_TOKEN_HASH_KEY, {
    expiresIn: expiresIn,
  });
}

export function verifyToken(token: string, secret: string): any {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
