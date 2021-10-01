import { Express } from 'express';
import { UserRouter } from './UserRouter';
import { ErrorMiddleware } from '../middlewares';
import { AuthRouter } from './AuthRouter';
import { WorkerProfileRouter } from './WorkerProfileRouter';
import { CustomerProfileRouter } from './CustomerProfileRouter';

export class Routes {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', UserRouter.create(), handleError);
    server.use('/', AuthRouter.create(), handleError);
    server.use('/', WorkerProfileRouter.create(), handleError);
    server.use('/', CustomerProfileRouter.create(), handleError);
  }
}
