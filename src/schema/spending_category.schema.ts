import { SpendingSchema } from './spendings.schema';

export class SpendingCategorySchema {
  id: string;
  name: string;
  description?: string | null;
  symbol?: string | null;
  spendings: SpendingSchema[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    spendings: SpendingSchema[] = [],
    description: string | null = null,
    symbol: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.symbol = symbol;
    this.spendings = spendings;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
