import { AccountSchema } from './account.schema';
import { CurrencySchema } from './currency.schema';
import { SpendingCategorySchema } from './spending_category.schema';
import { UserSchema } from './user.schema';

export class SpendingSchema {
  id: string;
  name: string;
  description?: string | null;
  symbol?: string | null;
  amount: number;
  date: Date;
  userId: string;
  isScheduled: boolean;
  scheduleDate?: Date | null;
  user: UserSchema;
  categoryId: string;
  category: SpendingCategorySchema;
  accountId: string;
  account: AccountSchema;
  currencyId: string;
  currency: CurrencySchema;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    amount: number,
    date: Date,
    userId: string,
    isScheduled: boolean = false,
    categoryId: string,
    accountId: string,
    currencyId: string,
    user: UserSchema,
    category: SpendingCategorySchema,
    account: AccountSchema,
    currency: CurrencySchema,
    description: string | null = null,
    symbol: string | null = null,
    scheduleDate: Date | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.symbol = symbol;
    this.amount = amount;
    this.date = date;
    this.userId = userId;
    this.isScheduled = isScheduled;
    this.scheduleDate = scheduleDate;
    this.user = user;
    this.categoryId = categoryId;
    this.category = category;
    this.accountId = accountId;
    this.account = account;
    this.currencyId = currencyId;
    this.currency = currency;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
