import { StatusCodes } from 'http-status-codes';
import { findUserByEmail } from '@/service/user.service';
import { compareHashedElements } from '@/utils/hash-element';
import { generateToken } from '@/utils/jwt.utils';
import { LoginBody } from '@/validation/login.validator';
import { Response, Request } from 'express';

export async function loginUser(
  req: Request<{}, {}, LoginBody['body']>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: 'user not found',
    });
  }
  const isPasswordValid = await compareHashedElements(password, user.password);
  if (!isPasswordValid) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'invalid credentials',
    });
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
}
