import { Router } from 'express';
import { loginUser } from '@/controllers/auth.controller';
import validate from '@/middlewares/validate-resources';
import { loginUserSchema } from '@/validation/login.validator';

const auth = Router();

auth.post('/login', validate(loginUserSchema), loginUser);
export default auth;
