import { NotFoundError } from '@/errors/apiDefaultError';
import {
  createAccountService,
  deleteAccountService,
  getAccountVerifyItExistsAndBelongsToUser,
  getUserAccountByIdService,
  getUserAccountsService,
  updateUserAccountService,
} from '@/services/accounts.service';
import {
  RegisterAccountBody,
  UpdateAccountBody,
} from '@/validation/accounts.validator';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function createAccountController(
  req: Request<{}, {}, RegisterAccountBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const createdAccount = await createAccountService(req.body, userId);
    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Account created successfully', data: createdAccount });
  } catch (error) {
    next(error);
  }
}

export async function getUserAccountsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const userAccounts = await getUserAccountsService(userId);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Accounts list fetched correctly', data: userAccounts });
  } catch (error) {
    next(error);
  }
}

export async function getAccountByIdForUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const accountId = req.params.accountId;
    const userAccount = await getUserAccountByIdService(userId, accountId);
    if (!userAccount) {
      throw new NotFoundError('Account not found');
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account fetched correctly', data: userAccount });
  } catch (error) {
    next(error);
  }
}

export async function updateAccountController(
  req: Request<UpdateAccountBody['params'], {}, UpdateAccountBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const requestAccount = req.body;
    const userId = res.locals.user.id;
    const accountId = req.params.accountId;
    const account = await getAccountVerifyItExistsAndBelongsToUser({
      accountId,
      userId,
    });
    const updatedAccount = await updateUserAccountService(
      userId,
      accountId,
      requestAccount
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account updated correctly', data: updatedAccount });
  } catch (error) {
    next(error);
  }
}

export async function deleteAccountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const accountId = req.params.accountId;
    const account = await getAccountVerifyItExistsAndBelongsToUser({
      accountId,
      userId,
    });
    const deletedAccount = await deleteAccountService(accountId);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Account deleted correctly', data: deletedAccount });
  } catch (error) {
    next(error);
  }
}
