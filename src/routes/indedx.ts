import { Response, Request, Router } from 'express';

const api = Router();

api.get('/healthcheck', (req: Request, res: Response) => {
  res.sendStatus(200);
});
export default api;
