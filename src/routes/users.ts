import { Response, Request, Router } from 'express';
import { deserializeUser } from '../middlewares/deserialize-user';

const users = Router();

users.use(deserializeUser);
users.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from users' }).status(200);
});
export default users;
