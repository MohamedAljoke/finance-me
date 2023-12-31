import { verifyToken } from '@/utils/jwt.utils';
import { validatedEnv } from '@/validation/env.validator';
import { Request, Response, NextFunction } from 'express';

export interface ResponseWithUser extends Response {
  locals: {
    user: any;
  };
}
export const deserializeUser = async (
  req: Request,
  res: ResponseWithUser,
  next: NextFunction
) => {
  const accessToken = req.cookies?.jwt;
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyToken(
    accessToken,
    validatedEnv.JWT_ACCESS_TOKEN_HASH_KEY
  );
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  // TODO: deal with refresh token
  next();
};
