import { loginUser } from '@/controller/auth.controller';
import { Router } from 'express';

const auth = Router();

auth.post('/login', loginUser);
export default auth;
