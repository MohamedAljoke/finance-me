//ensure dotenv inits before
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import api from './routes/indedx';
import { validatedEnv } from './validation/env.validator';

const app = express();

app.use('/v1', api);
app.listen(validatedEnv.PORT, () => {
  console.log(`Server is running on port ${validatedEnv.PORT}`);
});
