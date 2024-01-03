import { getLoggedUserData, registerUser } from '@/controller/users.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import validate from '@/middlewares/validate-resources';
import { registerUserSchema } from '@/validation/users.validator';
import { EUserRoles } from '@prisma/client';
import { Router } from 'express';

const users = Router();

//public
users.post('/register', validate(registerUserSchema), registerUser);

//private
users.get(
  '/me',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getLoggedUserData
);

export default users;
