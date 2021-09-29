import { Express } from 'express';
import { UserRouter } from './UserRouter';
import { ErrorMiddleware } from '../middlewares';
import { AuthRouter } from './AuthRouter';

export class Routes {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', UserRouter.create(), handleError);
    server.use('/', AuthRouter.create(), handleError);
  }
}
