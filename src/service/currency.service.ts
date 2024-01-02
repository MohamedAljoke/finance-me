import prisma from '@/connections/database/prisma.datasource';
import { RegisterCurrencyBody } from '@/validation/currency.validator';

export async function adminCreateCurrencyService(
  currency: RegisterCurrencyBody['body']
) {
  const createdCurrency = await prisma.currency.create({
    data: {
      name: currency.name,
      description: currency.description,
      symbol: currency.symbol,
    },
  });
  return createdCurrency;
}

export async function fetchCurrenciesList() {
  const currencies = await prisma.currency.findMany();
  return currencies;
}
