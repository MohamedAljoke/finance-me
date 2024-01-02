import { StatusCodes } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';
import { RegisterUserBody } from '@/validation/users.validator';
import { createUser } from '@/service/users.service';

export async function registerUser(
  req: Request<{}, {}, RegisterUserBody['body']>,
  res: Response,
  next: NextFunction
) {
  const user = req.body;
  try {
    const createdUser = await createUser(user);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully', data: createdUser });
  } catch (error) {
    next(error);
  }
}

export async function getLoggedUserData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = res.locals.user;
  try {
    return res
      .status(StatusCodes.OK)
      .json({ message: 'User data fetched correctly', data: user });
  } catch (error) {
    next(error);
  }
}
