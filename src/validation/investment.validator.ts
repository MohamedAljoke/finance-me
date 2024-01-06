import { FixedIncomeTypes } from '@prisma/client';
import z, { number, object, string, TypeOf, nativeEnum } from 'zod';

export const registerFixedIncomeInvestmentSchema = object({
  body: object({
    fromAccountId: string(),
    name: string(),
    description: string().optional(),
    amount: number(),
    date: string(),
    investmentStartDate: string(),
    investmentDueDate: string(),
    incomeTaxPercentage: number(),
    type: nativeEnum(FixedIncomeTypes),
  }),
});

export type RegisterFixedIncomeInvestmentBody = TypeOf<
  typeof registerFixedIncomeInvestmentSchema
>;
