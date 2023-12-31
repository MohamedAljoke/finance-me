import { IncomeSchema } from './income.schema';

export class IncomeCategorySchema {
  id: string;
  name: string;
  description?: string | null;
  symbol?: string | null;
  income: IncomeSchema[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    income: IncomeSchema[] = [],
    description: string | null = null,
    symbol: string | null = null,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.symbol = symbol;
    this.income = income;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
