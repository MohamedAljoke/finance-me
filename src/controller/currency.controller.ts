import {
  adminCreateCurrencyService,
  fetchCurrenciesList,
} from '@/service/currency.service';
import { RegisterCurrencyBody } from '@/validation/currency.validator';
import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function adminCreateCurrency(
  req: Request<{}, {}, RegisterCurrencyBody['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const createdCurrency = await adminCreateCurrencyService(req.body);

    return res.status(StatusCodes.CREATED).json({
      message: 'Account created successfully',
      data: createdCurrency,
    });
  } catch (error) {
    next(error);
  }
}
export async function fetchCurrencyListController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const currencies = await fetchCurrenciesList();
    return res.status(StatusCodes.OK).json({
      message: 'currencies fetched successfully',
      data: currencies,
    });
  } catch (error) {
    next(error);
  }
}
