import { Response, Request, Router } from 'express';
import users from './users';
import requireUser from '../middlewares/require-user';

const api = Router();

api.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
});
api.use('/users', requireUser, users);

export default api;
