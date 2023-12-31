import { StatusCodes } from 'http-status-codes';

export class ApiDefaultError extends Error {
  statusCode: number;
  constructor() {
    super('Internal server error');
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
