import { Response, Request, Router } from 'express';
import users from './users.routes';
import auth from './auth.routes';
import accounts from './accounts.routes';
import currency from './currency.routes';
import incomeCategories from './categories.routes';
import transactionRouter from './transactions.routes';
import investmentRouter from './investments.routes';

const api = Router();

api.get('/version', (req: Request, res: Response) => {
  res.json({ version: '1.0.0' });
});

api.use('/auth', auth);
api.use('/users', users);
api.use('/accounts', accounts);
api.use('/currency', currency);
api.use('/categories', incomeCategories);
api.use('/payment', transactionRouter);
api.use('/investment', investmentRouter);

export default api;
