import { Router } from 'express';
import validate from '@/middlewares/validate-resources';
import { registerCurrencySchema } from '@/validation/currency.validator';
import {
  adminCreateCurrency,
  fetchCurrencyListController,
} from '@/controller/currency.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import { EUserRoles } from '@prisma/client';

const currency = Router();

currency.post(
  '/admin-create',
  deserializeUser,
  requireUser([EUserRoles.ADMIN]),
  validate(registerCurrencySchema),
  adminCreateCurrency
);

currency.get(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  fetchCurrencyListController
);
export default currency;
