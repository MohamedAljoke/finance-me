import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { verifyToken } from '@/utils/jwt.utils';
import { deserializeUser } from '@/middlewares/deserialize-user';

describe('require-user', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    req = {
      cookies: {},
      headers: {},
    };
    res = {
      locals: {},
    };
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  it('Should set res.locals.user if token is valid', () => {
    req.cookies.access_token = 'validAccessToken';
    const decodedUser = { id: 1, username: 'user123' };
    const validTokenResult = { decoded: decodedUser, expired: false };
    vi.mock('../validation/env.validator', () => {
      const validatedEnv = {
        JWT_ACCESS_TOKEN_HASH_KEY: 'JWT_ACCESS_TOKEN_HASH_KEY',
      };
      return { validatedEnv };
    });
    vi.mock('../utils/jwt.utils', () => {
      const verifyToken = vi.fn();
      verifyToken.mockReturnValue(validTokenResult);
      return {
        verifyToken,
      };
    });
    // deserializeUser(req, res, next);
  });
});
