import { User } from '@prisma/client';
import { object, string, TypeOf } from 'zod';

export const registerCurrencySchema = object({
  body: object({
    name: string(),
    description: string().optional(),
    symbol: string().optional(),
  }),
});

export type RegisterCurrencyBody = TypeOf<typeof registerCurrencySchema>;
