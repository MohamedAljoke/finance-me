import { AccountSchema } from './account.schema';
import { IncomeSchema } from './income.schema';
import { SpendingSchema } from './spendings.schema';

export class UserSchema {
  id: string;
  email: string;
  password: string;
  name?: string | null;
  accounts: AccountSchema[];
  spendings: SpendingSchema[];
  income: IncomeSchema[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    accounts: AccountSchema[] = [],
    spendings: SpendingSchema[] = [],
    income: IncomeSchema[] = [],
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = null;
    this.accounts = accounts;
    this.spendings = spendings;
    this.income = income;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
