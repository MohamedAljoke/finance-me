import { StatusCodes } from 'http-status-codes';

export class ApiDefaultError extends Error {
  statusCode: number;
  constructor() {
    super('Internal server error');
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ApiUnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
export class DataConflictError extends ApiError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}
