import { Prisma, Account } from '@prisma/client';

export function accountFactory(account: Partial<Account>): Account {
  return {
    id: 'any_id',
    name: 'any_name',
    userId: 'any_userId',
    description: 'any_description',
    accountNumber: 'any_accountNumber',
    accountName: 'any_accountName',
    bankCode: 'any_bankCode',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...account,
  };
}
