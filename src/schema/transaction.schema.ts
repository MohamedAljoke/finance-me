import { AccountSchema } from './account.schema';

export class TransactionSchema {
  id: string;
  name: string;
  description?: string | null;
  amount: number;
  date: Date;
  sender: AccountSchema;
  senderAccountId: string;
  receiver: AccountSchema;
  receiverAccountId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    amount: number,
    date: Date,
    sender: AccountSchema,
    senderAccountId: string,
    receiver: AccountSchema,
    receiverAccountId: string,
    description: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.sender = sender;
    this.senderAccountId = senderAccountId;
    this.receiver = receiver;
    this.receiverAccountId = receiverAccountId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
