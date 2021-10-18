import { Router } from 'express';
import { AccountController } from '../controllers';

export class AccountRouter {
  static create() {
    const router = Router();
    router.post('/accounts', AccountController.createAsync);
    router.patch('/accounts/:id', AccountController.updateAsync);
    router.delete('/accounts/:id', AccountController.deleteAsync);
    router.get('/accounts/:id', AccountController.getAsync);
    return router;
  }
}
