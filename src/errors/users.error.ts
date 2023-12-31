import { StatusCodes } from 'http-status-codes';

export class UserExistsError extends Error {
  statusCode: number;
  constructor() {
    super('User already exists');
    this.statusCode = StatusCodes.CONFLICT;
  }
}
