import { Router } from "express";
import HTTPStatus from 'http-status';

import User from './user.routes';

const routes = new Router();

import APIError from '../services/error';

// Middlewares
import logErrorService from '../services/log';

routes.use('/users', User);



const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';


if (isDev || isTest) {
  // routes.use('/seeds', SeedRoutes);
}

routes.all('*', (req, res, next) => {
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true))
});


routes.use(logErrorService);

export default routes;
