import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@yangsworld/common';

const app = express();
// trust ingress nginx
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);
app.use(morgan('dev'));

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
