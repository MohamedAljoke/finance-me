import { createUser } from '../../services/users.service';
import prisma from '../../libs/__mocks__/prisma';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { userFactory } from '../__factory__/user.factory';
import * as crypt from '@/utils/hash-element';
import { serverErrorMessage } from '@/errors/apiDefaultError';

vi.mock('../../libs/prisma');

describe('UsersService', () => {
  describe('createUser', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
    let createParams: any;
    beforeAll(() => {
      createParams = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };
    });
    it('should return created user on success', async () => {
      const user = userFactory({ ...createParams });
      prisma.user.create.mockResolvedValueOnce(user);
      const createdAccount = await createUser({ ...createParams });

      expect(createdAccount).toStrictEqual(user);
    });
    it('should call the hash function', async () => {
      const hashElement = vi.spyOn(crypt, 'hashElement');
      const user = userFactory({ ...createParams });
      prisma.user.create.mockResolvedValueOnce(user);
      await createUser({ ...createParams });
      expect(hashElement).toBeCalledTimes(1);
    });
    it('should throw DataConflictError if error code P2002', async () => {
      prisma.user.create.mockRejectedValueOnce({
        code: 'P2002',
        meta: {
          target: ['email'],
        },
      });
      expect(createUser({ ...createParams })).rejects.toThrowError(
        'User already exists'
      );
    });
    it('should throw ApiDefaultError if is general error', async () => {
      prisma.user.create.mockRejectedValueOnce({
        code: 'any_random',
        meta: {
          target: ['email'],
        },
      });
      expect(createUser({ ...createParams })).rejects.toThrowError(
        serverErrorMessage
      );
    });
  });
});
