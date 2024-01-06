import { generateToken, verifyToken } from '@utils/jwt.utils';
import { validatedEnv } from '@validation/env.validator';
import { Request, Response, NextFunction } from 'express';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    req.cookies?.access_token ||
    req.headers?.authorization?.replace('Bearer ', '');
  const refreshToken = req.cookies?.refresh_token || req.headers['x-refresh'];

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
  if (expired && refreshToken) {
    const { decodedRefresh, expiredRefresh } = verifyToken(
      refreshToken,
      validatedEnv.JWT_ACCESS_TOKEN_HASH_KEY
    );
    if (expiredRefresh) {
      next();
    }
    const newAccessToken = generateToken(decoded);
    const newRefreshToken = generateToken(decoded);
    res.cookie('access_token', newAccessToken, { httpOnly: true });
    res.cookie('refresh_token', newRefreshToken, { httpOnly: true });
    res.locals.user = decoded;
    return next();
  }
  next();
};
