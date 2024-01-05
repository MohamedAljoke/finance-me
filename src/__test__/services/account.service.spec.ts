import { getAccountVerifyItExistsAndBelongsToUser } from '@/services/accounts.service';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { accountFactory } from '../__factory__/account.factory';
import prisma from '@/libs/__mocks__/prisma';

vi.mock('../../libs/prisma');

describe('AccountService', () => {
  describe('getAccountVerifyItExistsAndBelongsToUser', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
    const accountId = 'account_id';
    const userId = 'user_id';
    it('Should return account if belongs to user', async () => {
      const fakeAccount = accountFactory({ id: accountId, userId: userId });
      prisma.account.findFirst.mockResolvedValueOnce(fakeAccount);
      const account = await getAccountVerifyItExistsAndBelongsToUser({
        accountId: accountId,
        userId: userId,
      });
      expect(account).toStrictEqual(fakeAccount);
    });
    it('Should throw NotFoundError if account does not exist', () => {
      prisma.account.findFirst.mockResolvedValueOnce(null);
      expect(
        getAccountVerifyItExistsAndBelongsToUser({
          accountId: accountId,
          userId: userId,
        })
      ).rejects.toThrowError('Account not found');
    });
    it('Should throw ApiUnauthorizedError if account does not belong to user', () => {
      const fakeAccount = accountFactory({
        id: accountId,
        userId: 'random_id',
      });
      prisma.account.findFirst.mockResolvedValueOnce(fakeAccount);
      expect(
        getAccountVerifyItExistsAndBelongsToUser({
          accountId: accountId,
          userId: userId,
        })
      ).rejects.toThrowError('Account does not belong to user');
    });
  });
});
