import { ApiError } from '@/errors/apiDefaultError';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const globalErrorHandler = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('globalErrorHandler > error:', error);
  const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};
