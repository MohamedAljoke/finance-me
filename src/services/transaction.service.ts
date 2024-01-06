import prisma from '@/libs/prisma';
import {
  RegisterTransactionBody,
  RegisterTransferTransactionBody,
} from '@/validation/transaction.validator';

type RegisterTransactionParams = RegisterTransactionBody['body'] & {
  userId: string;
};
export async function registerTransactionService(
  params: RegisterTransactionParams
) {
  const addSpending = prisma.incomesAndSpendings.create({
    data: {
      name: params.name,
      description: params.description,
      symbol: params.symbol,
      amount: params.amount,
      date: params.date,
      userId: params.userId,
      categoryId: params.categoryId,
      currencyId: params.currencyId,
      accountId: params.fromAccountId,
      isScheduled: params.isScheduled,
      scheduleDate: params.scheduleDate,
      type: params.type,
    },
  });
  const subtractAccountBalance = prisma.account.update({
    where: {
      id: params.fromAccountId,
    },
    data: {
      ...(params.type === 'INCOME'
        ? {
            balance: {
              increment: params.amount,
            },
          }
        : {
            balance: {
              decrement: params.amount,
            },
          }),
    },
  });
  const transfer = prisma.transaction.create({
    data: {
      name: params.name,
      description: params.description,
      amount: params.amount,
      date: params.date,
      ...(params.type === 'INCOME'
        ? { receiverAccountId: params.fromAccountId }
        : {
            senderAccountId: params.fromAccountId,
          }),
    },
  });
  return prisma.$transaction([addSpending, subtractAccountBalance, transfer]);
}

type TransferFromAccountsParams = RegisterTransferTransactionBody['body'] & {
  userId: string;
};
export async function transferFromAccounts(params: TransferFromAccountsParams) {
  const subtractAccountBalance = prisma.account.update({
    where: {
      id: params.fromAccountId,
    },
    data: {
      balance: {
        decrement: params.amount,
      },
    },
  });
  const addToAccountBalance = prisma.account.update({
    where: {
      id: params.toAccountId,
    },
    data: {
      balance: {
        increment: params.amount,
      },
    },
  });
  const transfer = prisma.transaction.create({
    data: {
      name: params.name,
      description: params.description,
      amount: params.amount,
      date: params.date,
      senderAccountId: params.fromAccountId,
      receiverAccountId: params.toAccountId,
    },
  });
  return prisma.$transaction([
    transfer,
    addToAccountBalance,
    subtractAccountBalance,
  ]);
}
