import { IncomeSchema } from './income.schema';
import { SpendingSchema } from './spendings.schema';
import { TransactionSchema } from './transaction.schema';
import { UserSchema } from './user.schema';

export class AccountSchema {
  id: string;
  name: string;
  description?: string | null;
  accountNumber?: string | null;
  accountName?: string | null;
  bankCode?: string | null;
  userId: string;
  user: UserSchema;
  spendings: SpendingSchema[];
  income: IncomeSchema[];
  senderAccountTransactions: TransactionSchema[];
  receiverAccountTransactions: TransactionSchema[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    userId: string,
    user: UserSchema,
    spendings: SpendingSchema[] = [],
    income: IncomeSchema[] = [],
    senderAccountTransactions: TransactionSchema[] = [],
    receiverAccountTransactions: TransactionSchema[] = [],
    description: string | null = null,
    accountNumber: string | null = null,
    accountName: string | null = null,
    bankCode: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.accountNumber = accountNumber;
    this.accountName = accountName;
    this.bankCode = bankCode;
    this.userId = userId;
    this.user = user;
    this.spendings = spendings;
    this.income = income;
    this.senderAccountTransactions = senderAccountTransactions;
    this.receiverAccountTransactions = receiverAccountTransactions;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
