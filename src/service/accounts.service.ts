import prisma from '@/connections/database/prisma.datasource';
import { Prisma } from '@prisma/client';
import { ApiUnauthorizedError, NotFoundError } from '@/errors/apiDefaultError';
import {
  RegisterAccountBody,
  UpdateAccountBody,
} from '@/validation/accounts.validator';

export async function createAccountService(
  account: RegisterAccountBody['body'],
  userId: string
) {
  const newAccount = await prisma.account.create({
    data: {
      name: account.name,
      description: account.description,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      bankCode: account.bankCode,
      userId: userId,
    },
  });
  return newAccount;
}

export async function getUserAccountsService(userId: string) {
  const accounts = await prisma.account.findMany({
    where: {
      userId: userId,
    },
  });
  return accounts;
}

export async function getAccountById(accountId: string) {
  const account = await prisma.account.findFirst({
    where: {
      id: accountId,
    },
    select: {
      user: true,
    },
  });
  return account;
}

export async function getUserAccountByIdService(
  userId: string,
  accountId: string
) {
  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      id: accountId,
    },
    include: {
      spendings: true,
      incomes: true,
      senderAccount: true,
      receiverAccount: true,
    },
  });
  return account;
}

export async function updateUserAccountService(
  userId: string,
  accountId: string,
  account: UpdateAccountBody['body']
) {
  const updatedAccount = await prisma.account.update({
    where: {
      id: accountId,
    },
    data: {
      name: account.name,
      description: account.description,
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      bankCode: account.bankCode,
      userId: userId,
    },
  });
  return updatedAccount;
}
export async function deleteAccountService(accountId: string) {
  const deletedAccount = await prisma.account.delete({
    where: {
      id: accountId,
    },
  });
  return deletedAccount;
}
export async function getAccountVerifyItExistsAndBelongsToUser({
  accountId,
  userId,
}: {
  accountId: string;
  userId: string;
}) {
  const account = await getAccountById(accountId);
  if (!account) {
    throw new NotFoundError('Account not found');
  }
  if (account?.user.id !== userId) {
    throw new ApiUnauthorizedError('Account does not belong to user');
  }
  return account;
}
