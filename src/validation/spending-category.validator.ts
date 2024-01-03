import { object, string, TypeOf } from 'zod';

export const registerSpendingCategorySchema = object({
  body: object({
    name: string(),
    description: string().optional(),
    symbol: string().optional(),
  }),
});

export type RegisterSpendingCategoryBody = TypeOf<
  typeof registerSpendingCategorySchema
>;
