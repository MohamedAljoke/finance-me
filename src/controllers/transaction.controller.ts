import {
  registerTransactionService,
  transferFromAccounts,
} from '@/services/transaction.service';
import {
  RegisterTransactionBody,
  RegisterTransferTransactionBody,
} from '@/validation/transaction.validator';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function registerTransactionController(
  req: Request<{}, {}, RegisterTransactionBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const createdTransaction = await registerTransactionService({
      ...req.body,
      userId,
    });
    return res.status(StatusCodes.CREATED).json({
      message: 'transaction created, nice nice purchase',
      data: createdTransaction,
    });
  } catch (error) {
    return next(error);
  }
}
export async function transferFromAccountsController(
  req: Request<{}, {}, RegisterTransferTransactionBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const createdTransaction = await transferFromAccounts({
      ...req.body,
      userId,
    });
    return res.status(StatusCodes.CREATED).json({
      message: 'transfer created, nice nice purchase',
      data: createdTransaction,
    });
  } catch (error) {
    return next(error);
  }
}
