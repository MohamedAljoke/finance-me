import { Response, Request, Router } from 'express';
import users from './users';
import auth from './auth';
import accounts from './accounts';
import currency from './currency';

const api = Router();

api.get('/version', (req: Request, res: Response) => {
  res.json({ version: '1.0.0' });
});

api.use('/auth', auth);
api.use('/users', users);
api.use('/accounts', accounts);
api.use('/currency', currency);

export default api;
