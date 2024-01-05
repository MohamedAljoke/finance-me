import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/jwt.utils';
import requireUser from '@/middlewares/require-user';
import { ApiUnauthorizedError } from '@/errors/apiDefaultError';
import { EUserRoles } from '@prisma/client';

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
  it('Should pass if user is admin even if roles permitted is user and call the next function', () => {
    res.locals.user = { role: EUserRoles.ADMIN };
    const requiredUser = requireUser([EUserRoles.USER])(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
  it('Should pass if user is has permitted role', () => {
    res.locals.user = { role: EUserRoles.USER };
    const requiredUser = requireUser([EUserRoles.USER])(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith();
  });
  it('Should throw ApiUnauthorizedError if there is no user', () => {
    const res: any = {
      locals: {},
    };
    requireUser([])(req, res, next);
    expect(next).toHaveBeenCalledWith(new ApiUnauthorizedError('Unauthorized'));
  });
  it('Should throw ApiUnauthorizedError if user has no permission', () => {
    const res: any = {
      locals: {
        user: {
          role: 'any_role',
        },
      },
    };
    requireUser([EUserRoles.USER])(req, res, next);
    expect(next).toHaveBeenCalledWith(new ApiUnauthorizedError('Unauthorized'));
  });
});
