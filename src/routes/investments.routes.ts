import { Router } from 'express';
import validate from '@/middlewares/validate-resources';
import { registerCurrencySchema } from '@/validation/currency.validator';
import {
  adminCreateCurrency,
  fetchCurrencyListController,
} from '@/controllers/currency.controller';
import { deserializeUser } from '@/middlewares/deserialize-user';
import requireUser from '@/middlewares/require-user';
import { EUserRoles } from '@prisma/client';
import { registerFixedIncomeInvestmentSchema } from '@/validation/investment.validator';
import { investmentFixedIncomeTransaction } from '@/controllers/investment.controller';

const investmentRouter = Router();

investmentRouter.post(
  '/fixed-income',
  deserializeUser,
  requireUser([EUserRoles.USER]),
  validate(registerFixedIncomeInvestmentSchema),
  investmentFixedIncomeTransaction
);
export default investmentRouter;
