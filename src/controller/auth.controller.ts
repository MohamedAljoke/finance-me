import { StatusCodes } from 'http-status-codes';
import { findUserByEmail } from '@/service/users.service';
import { compareHashedElements } from '@/utils/hash-element';
import { generateToken } from '@/utils/jwt.utils';
import { LoginBody } from '@/validation/login.validator';
import { Response, Request, NextFunction } from 'express';
import { ApiUnauthorizedError, NotFoundError } from '@/errors/apiDefaultError';

export async function loginUser(
  req: Request<{}, {}, LoginBody['body']>,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail({ email });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const isPasswordValid = await compareHashedElements(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ApiUnauthorizedError('User or password incorrect');
    }
    const userPayLoad = { ...user, password: '' };
    const accessToken = generateToken(userPayLoad);
    const refreshToken = generateToken(userPayLoad);
    res.cookie('access_token', accessToken, { httpOnly: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true });

    return res.status(StatusCodes.OK).json({
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
}
