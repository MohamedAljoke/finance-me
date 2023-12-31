import { Router } from 'express';
import validate from '@/middlewares/validate-resources';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import { EUserRoles } from '@prisma/client';
import {
  createIncomeCategory,
  fetchAllIncomeCategoriesController,
  getIncomeCategoryByIdController,
} from '@/controllers/categories.controller';
import { registerIncomeCategorySchema } from '@/validation/income-category.validator';

const incomeCategories = Router();

incomeCategories.get(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  fetchAllIncomeCategoriesController
);

incomeCategories.get(
  '/:categoryId',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  getIncomeCategoryByIdController
);

incomeCategories.post(
  '/',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerIncomeCategorySchema),
  createIncomeCategory
);
export default incomeCategories;
