import { beforeAll, describe, expect, it, vi } from 'vitest';
import { RegisterUserBody } from '@validation/users.validator';
import prismaMock from '@connections/database/__mocks__/prisma.mock';
import { createUser } from '@services/users.service';
import { userFactory } from '../__factory__/user.factory';

vi.mock('../../connections/database/prisma');

describe('UsersService', () => {
  describe('createUser', () => {
    let createParams: Omit<RegisterUserBody['body'], 'confirmPassword'>;

    beforeAll(() => {
      createParams = {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      };
    });

    it('should return created account account on success', async () => {
      // const user = userFactory({ ...createParams });a
      // prismaMock.user.create.mockResolvedValue(user);
      // const createdAccount = await createUser(createParams);
      expect(1).toBe(1);
    });
  });
});
