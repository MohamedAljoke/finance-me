import { Request, Response, NextFunction } from 'express';
import { ResponseWithUser } from './deserialize-user';

const requireUser = (
  req: Request,
  res: ResponseWithUser,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requireUser;
