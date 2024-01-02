import {
  createAccountController,
  deleteAccountController,
  getAccountByIdForUserController,
  getUserAccountsController,
  updateAccountController,
} from '@/controller/accounts.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import validate from '@/middlewares/validate-resources';
import {
  registerAccountSchema,
  updateAccountSchema,
} from '@/validation/accounts.validator';
import { Router } from 'express';

const accounts = Router();

//public
accounts.post(
  '/',
  deserializeUser,
  requireUser,
  validate(registerAccountSchema),
  createAccountController
);
accounts.get('/', deserializeUser, requireUser, getUserAccountsController);
accounts.get(
  '/:accountId',
  deserializeUser,
  requireUser,
  getAccountByIdForUserController
);
accounts.put(
  '/:accountId',
  deserializeUser,
  requireUser,
  validate(updateAccountSchema),
  updateAccountController
);
accounts.delete(
  '/:accountId',
  deserializeUser,
  requireUser,
  deleteAccountController
);

export default accounts;
