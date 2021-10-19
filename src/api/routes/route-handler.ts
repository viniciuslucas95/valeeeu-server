import { Express } from 'express';
import { ErrorMiddleware } from '../middlewares';
import { AccountRouter } from './account-router';
import {
  ProfileContactRouter,
  ProfileRouter,
  ProfileRatingRouter,
} from './profile';

export class RouteHandler {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', AccountRouter.create(), handleError);
    server.use('/', ProfileRouter.create(), handleError);
    server.use('/', ProfileContactRouter.create(), handleError);
    server.use('/', ProfileRatingRouter.create(), handleError);
  }
}
