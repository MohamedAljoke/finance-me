import z, { object, string, TypeOf, number, date } from 'zod';

export const ETransactionType = z.enum(['SPENDING', 'INCOME']);
export const registerTransactionSchema = object({
  body: object({
    fromAccountId: string(),
    categoryId: string(),
    currencyId: string(),
    name: string(),
    amount: number(),
    date: date(),
    description: string().optional(),
    symbol: string().optional(),
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
    date: date(),
    description: string().optional(),
    symbol: string().optional(),
    type: ETransactionType,
  }),
});

export type RegisterTransactionBody = TypeOf<typeof registerTransactionSchema>;
export type RegisterTransferTransactionBody = TypeOf<
  typeof registerTransferTransactionSchema
>;
