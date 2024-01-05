import { ApiUnauthorizedError } from '@/errors/apiDefaultError';
import { EUserRoles } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

function requireUser(permittedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    try {
      if (user?.role === EUserRoles.ADMIN) {
        return next();
      }
      if (!user || !permittedRoles.includes(user.role)) {
        throw new ApiUnauthorizedError('Unauthorized');
      }
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  };
}

export default requireUser;
