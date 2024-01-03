import { NotFoundError } from '@/errors/apiDefaultError';
import {
  createSpendingCategoryService,
  fetchUserSpendingCategoriesService,
  getSpendingCategoryByIdAndUserIdService,
} from '@/service/spending-categories.service';
import { RegisterSpendingCategoryBody } from '@/validation/spending-category.validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// Get all spending categories
export const getAllSpendingCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;
    const spendingCategories = await fetchUserSpendingCategoriesService({
      userId,
    });
    return res.status(StatusCodes.OK).json({
      message: 'spending categories fetched successfully',
      data: spendingCategories,
    });
  } catch (error) {
    return next();
  }
};

// Get a single spending category by ID
export const getSpendingCategoryByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.categoryId;
  const userId = res.locals.user.id;
  try {
    const spendingCategory = await getSpendingCategoryByIdAndUserIdService(
      categoryId,
      userId
    );
    if (!spendingCategory) {
      throw new NotFoundError('Spending category not found');
    }
    return res.status(StatusCodes.OK).json({
      message: 'got spending category successfully',
      data: spendingCategory,
    });
  } catch (error) {
    return next();
  }
};

// Create a new spending category
export const createSpendingCategory = async (
  req: Request<{}, {}, RegisterSpendingCategoryBody['body']>,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body;
    const userId = res.locals.user.id;
    const savedSpendingCategory = await createSpendingCategoryService({
      userId,
      category,
    });
    return res.status(StatusCodes.CREATED).json({
      message: 'Account created successfully',
      data: savedSpendingCategory,
    });
  } catch (error) {
    return next(error);
  }
};
