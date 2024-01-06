import {
  registerTransactionController,
  transferFromAccountsController,
} from '@/controllers/transaction.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import validate from '@/middlewares/validate-resources';
import {
  registerTransactionSchema,
  registerTransferTransactionSchema,
} from '@/validation/transaction.validator';
import { EUserRoles } from '@prisma/client';
import { Router } from 'express';

const transactionRouter = Router();

transactionRouter.post(
  '/transaction',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerTransactionSchema),
  registerTransactionController
);

transactionRouter.post(
  '/transfer',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerTransferTransactionSchema),
  transferFromAccountsController
);

export default transactionRouter;
