import z, { object, string, TypeOf, number, date, boolean } from 'zod';

export const ETransactionType = z.enum(['SPENDING', 'INCOME']);
export const registerTransactionSchema = object({
  body: object({
    fromAccountId: string(),
    categoryId: string(),
    currencyId: string(),
    name: string(),
    amount: number(),
    date: string(),
    description: string().optional(),
    symbol: string().optional(),
    isScheduled: boolean().optional(),
    scheduleDate: string().optional(),
    spendingNecessiteGrade: number().optional(),
    type: ETransactionType,
  }),
});
export const registerTransferTransactionSchema = object({
  body: object({
    toAccountId: string(),
    fromAccountId: string(),
    categoryId: string(),
    currencyId: string(),
    name: string(),
    amount: number(),
    date: string(),
    description: string().optional(),
    symbol: string().optional(),
    type: ETransactionType,
  }),
});

export type RegisterTransactionBody = TypeOf<typeof registerTransactionSchema>;
export type RegisterTransferTransactionBody = TypeOf<
  typeof registerTransferTransactionSchema
>;
