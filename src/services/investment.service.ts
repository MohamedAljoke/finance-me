import prisma from '@/libs/prisma';
import { RegisterFixedIncomeInvestmentBody } from '@/validation/investment.validator';

type RegisterFixedIncomeTransactionParams =
  RegisterFixedIncomeInvestmentBody['body'] & {
    userId: string;
  };
export async function registerFixedIncomeTransactionService(
  params: RegisterFixedIncomeTransactionParams
) {
  const fixedInvestment = prisma.investmentFixedIncome.create({
    data: {
      accountId: params.fromAccountId,
      investmentStartDate: params.investmentStartDate,
      investmentDueDate: params.investmentDueDate,
      incomeTaxPercentage: params.incomeTaxPercentage,
      amount: params.amount,
      type: params.type,
    },
  });
  const removeFromAccount = prisma.account.update({
    data: {
      balance: {
        decrement: params.amount,
      },
    },
    where: {
      id: params.fromAccountId,
    },
  });
  return prisma.$transaction([removeFromAccount, fixedInvestment]);
}
