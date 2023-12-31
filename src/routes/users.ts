import { registerUser } from '@/controller/users.controller';
import validate from '@/middlewares/validate-resources';
import { registerUserSchema } from '@/validation/users.validator';
import { Router } from 'express';

const users = Router();

//public
users.post('/register', validate(registerUserSchema), registerUser);

export default users;
