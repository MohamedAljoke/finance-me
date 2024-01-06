import { registerFixedIncomeTransactionService } from '@/services/investment.service';
import { RegisterFixedIncomeInvestmentBody } from '@/validation/investment.validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function investmentFixedIncomeTransaction(
  req: Request<{}, {}, RegisterFixedIncomeInvestmentBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    const createdTransaction = await registerFixedIncomeTransactionService({
      ...req.body,
      userId,
    });
    return res.status(StatusCodes.CREATED).json({
      message: 'investment created, nice purchase',
      data: createdTransaction,
    });
  } catch (error) {
    return next(error);
  }
}
