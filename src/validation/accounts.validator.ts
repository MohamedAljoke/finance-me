import { object, string, TypeOf } from 'zod';

export const accountBodySchema = {
  body: object({
    name: string(),
    description: string().optional(),
    accountNumber: string().optional(),
    accountName: string().optional(),
    bankCode: string().optional(),
  }),
};

const params = {
  params: object({
    accountId: string({
      required_error: 'AccountId is required',
    }),
  }),
};

export const registerAccountSchema = object({
  ...accountBodySchema,
});

export const updateAccountSchema = object({
  ...accountBodySchema,
  ...params,
});

export type RegisterAccountBody = TypeOf<typeof registerAccountSchema>;
export type UpdateAccountBody = TypeOf<typeof updateAccountSchema>;
