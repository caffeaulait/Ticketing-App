import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { currentUser, errorHandler, NotFoundError } from '@yangsworld/common';
import { createChargeRouter } from './routes/new';

const app = express();
// trust ingress nginx
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);
app.use(currentUser);

app.use(morgan('dev'));

app.use(createChargeRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
