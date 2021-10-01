import { Router } from 'express';
import { UserController } from '../controllers';

export class UserRouter {
  static create() {
    const router = Router();
    const url = '/users';
    router.post(url, UserController.create);
    router.patch(`${url}/:accessToken`, UserController.update);
    router.delete(`${url}/:accessToken`, UserController.delete);
    return router;
  }
}
