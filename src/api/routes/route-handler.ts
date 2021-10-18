import { Express } from 'express';
import { ErrorMiddleware } from '../middlewares';
import { AccountRouter } from './account-router';
import { ProfileRouter } from './profile-router';

export class RouteHandler {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', AccountRouter.create(), handleError);
    server.use('/', ProfileRouter.create(), handleError);
  }
}
