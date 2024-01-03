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
import {
  createSpendingCategory,
  getAllSpendingCategoriesController,
  getSpendingCategoryByIdController,
} from '@/controller/spending-category.controller';
import { registerSpendingCategorySchema } from '@/validation/spending-category.validator';

const currency = Router();

currency.get(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getAllSpendingCategoriesController
);

currency.get(
  '/:categoryId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getSpendingCategoryByIdController
);

currency.post(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerSpendingCategorySchema),
  createSpendingCategory
);
export default currency;
