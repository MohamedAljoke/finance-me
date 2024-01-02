//ensure dotenv inits before
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import api from './routes';
import { validatedEnv } from '@validation/env.validator';
import { globalErrorHandler } from '@middlewares/global-error-handler';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use('/v1', api);
app.use(globalErrorHandler);
app.listen(validatedEnv.PORT, () => {
  console.log(`Server is running on port ${validatedEnv.PORT}`);
});
