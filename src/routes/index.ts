import { Response, Request, Router } from 'express';
import users from './users';
import auth from './auth';

const api = Router();

api.get('/version', (req: Request, res: Response) => {
  res.json({ version: '1.0.0' });
});

api.use('/users', users);
api.use('/auth', auth);

export default api;
