import { Router } from 'express';
import { UserController } from '../controllers';

export class UserRouter {
  static create() {
    const router = Router();
    const url = '/users';
    router.post('/users', UserController.create);
    router.patch('/users/:accessToken', UserController.update);
    router.delete('/users/:accessToken', UserController.delete);
    return router;
  }
}
