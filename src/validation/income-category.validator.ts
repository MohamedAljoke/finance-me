import { object, string, TypeOf } from 'zod';

export const registerIncomeCategorySchema = object({
  body: object({
    name: string(),
    description: string().optional(),
    symbol: string().optional(),
  }),
});

export type RegisterIncomeCategoryBody = TypeOf<
  typeof registerIncomeCategorySchema
>;
