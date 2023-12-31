import { StatusCodes } from 'http-status-codes';
import { Response, Request } from 'express';
import { RegisterUserBody } from '@/validation/users.validator';
import { createUser } from '@/service/user.service';
import { ApiDefaultError } from '@/errors/apiDefaultError';

const filename = 'users.controller.ts';
export async function registerUser(
  req: Request<{}, {}, RegisterUserBody['body']>,
  res: Response
) {
  const user = req.body;
  try {
    const createdUser = await createUser(user);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'User created successfully', data: createdUser });
  } catch (error) {
    console.error(`${filename} > registerUser > error:`, error);
    if (
      error.statusCode &&
      error.statusCode !== StatusCodes.INTERNAL_SERVER_ERROR
    ) {
      return res.status(error.statusCode).send(error.message);
    }
    throw new ApiDefaultError();
  }
}
