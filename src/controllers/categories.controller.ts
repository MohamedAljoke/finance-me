import { NotFoundError } from '@/errors/apiDefaultError';
import {
  createIncomeCategoryService,
  fetchUserIncomeCategoriesService,
  getIncomeCategoryByIdAndUserIdService,
} from '@/services/categories.service';

import { RegisterIncomeCategoryBody } from '@/validation/income-category.validator';

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const fetchAllIncomeCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;
    const incomeCategories = await fetchUserIncomeCategoriesService({
      userId,
    });
    return res.status(StatusCodes.OK).json({
      message: 'income categories fetched successfully',
      data: incomeCategories,
    });
  } catch (error) {
    return next();
  }
};

// Get a single income category by ID
export const getIncomeCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;
  const userId = res.locals.user.id;
  try {
    const spendingCategory = await getIncomeCategoryByIdAndUserIdService(
      categoryId,
      userId
    );
    if (!spendingCategory) {
      throw new NotFoundError('income category not found');
    }
    return res.status(StatusCodes.OK).json({
      message: 'got income category successfully',
      data: spendingCategory,
    });
  } catch (error) {
    return next();
  }
};

// Create a new income category
export const createIncomeCategory = async (
  req: Request<{}, {}, RegisterIncomeCategoryBody['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body;
    const userId = res.locals.user.id;
    const savedSpendingCategory = await createIncomeCategoryService({
      userId,
      category,
    });
    return res.status(StatusCodes.CREATED).json({
      message: 'income category created successfully',
      data: savedSpendingCategory,
    });
  } catch (error) {
    return next(error);
  }
};
