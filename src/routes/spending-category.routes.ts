import { Router } from 'express';
import validate from '@/middlewares/validate-resources';
import { registerCurrencySchema } from '@/validation/currency.validator';
import {
  adminCreateCurrency,
  fetchCurrencyListController,
} from '@/controllers/currency.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import { EUserRoles } from '@prisma/client';
import {
  createSpendingCategory,
  getAllSpendingCategoriesController,
  getSpendingCategoryByIdController,
} from '@/controllers/spending-category.controller';
import { registerSpendingCategorySchema } from '@/validation/spending-category.validator';

const spendingCategories = Router();

spendingCategories.get(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getAllSpendingCategoriesController
);

spendingCategories.get(
  '/:categoryId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getSpendingCategoryByIdController
);

spendingCategories.post(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerSpendingCategorySchema),
  createSpendingCategory
);
export default spendingCategories;
