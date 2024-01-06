import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as jwt from '@/utils/jwt.utils';
import * as envValidator from '@/validation/env.validator';
import { deserializeUser } from '@/middlewares/deserialize-user';

vi.mock('../../validation/env.validator', () => ({
  validatedEnv: {
    JWT_ACCESS_TOKEN_HASH_KEY: 'JWT_ACCESS_TOKEN_HASH_KEY',
  },
}));
vi.mock('../validation/env.validator', () => {
  const validatedEnv = {
    JWT_ACCESS_TOKEN_HASH_KEY: 'JWT_ACCESS_TOKEN_HASH_KEY',
  };
  return { validatedEnv };
});
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

    vi.spyOn(jwt, 'verifyToken').mockReturnValue(validTokenResult);

    deserializeUser(req, res, next);
    expect(res.locals.user).toEqual(decodedUser);
  });
  it('Should not set user if there is no token', () => {
    const decodedUser = { id: 1, username: 'user123' };
    const validTokenResult = { decoded: decodedUser, expired: false };

    vi.spyOn(jwt, 'verifyToken').mockReturnValue(validTokenResult);

    deserializeUser(req, res, next);
    expect(res.locals.user).toEqual(undefined);
  });
});
