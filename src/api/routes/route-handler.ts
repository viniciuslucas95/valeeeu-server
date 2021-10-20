import { Express } from 'express';
import { ErrorMiddleware } from '../middlewares';
import { AccountRouter } from './account-router';
import {
  ProfileContactRouter,
  ProfileRouter,
  ProfileRatingRouter,
  ProfilePictureRouter,
} from './profile';
import {
  ServiceProfileItemRouter,
  ServiceProfilePictureRouter,
  ServiceProfileRouter,
  ServiceProfileTagRouter,
} from './serviceProfile';

export class RouteHandler {
  static setup(server: Express) {
    const { handleError } = new ErrorMiddleware();
    server.use('/', AccountRouter.create(), handleError);

    server.use('/', ProfileRouter.create(), handleError);
    server.use('/', ProfileContactRouter.create(), handleError);
    server.use('/', ProfileRatingRouter.create(), handleError);
    server.use('/', ProfilePictureRouter.create(), handleError);

    server.use('/', ServiceProfileRouter.create(), handleError);
    server.use('/', ServiceProfileItemRouter.create(), handleError);
    server.use('/', ServiceProfileTagRouter.create(), handleError);
    server.use('/', ServiceProfilePictureRouter.create(), handleError);
  }
}
