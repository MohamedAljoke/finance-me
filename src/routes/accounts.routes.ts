import {
  createAccountController,
  deleteAccountController,
  getAccountByIdForUserController,
  getUserAccountsController,
  updateAccountController,
} from '@/controllers/accounts.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import validate from '@/middlewares/validate-resources';
import {
  registerAccountSchema,
  updateAccountSchema,
} from '@/validation/accounts.validator';
import { Router } from 'express';
import { Prisma, EUserRoles } from '@prisma/client';
const accounts = Router();

//user
accounts.post(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerAccountSchema),
  createAccountController
);
accounts.get(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getUserAccountsController
);
accounts.get(
  '/:accountId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getAccountByIdForUserController
);
accounts.put(
  '/:accountId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(updateAccountSchema),
  updateAccountController
);
accounts.delete(
  '/:accountId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  deleteAccountController
);

export default accounts;
