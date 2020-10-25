import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { currentUser, errorHandler, NotFoundError } from '@yangsworld/common';

import { deleteOrderRouter } from './routes/delete';
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';

const app = express();
// trust ingress nginx
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);
app.use(currentUser);

app.use(deleteOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);

app.use(morgan('dev'));

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
