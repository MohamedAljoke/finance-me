import { StatusCodes } from 'http-status-codes';
import { Response, Request, NextFunction } from 'express';
import { RegisterUserBody } from '@/validation/users.validator';
import { createUser } from '@/service/user.service';

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
  try {
  } catch (error) {
    next(error);
  }
}
