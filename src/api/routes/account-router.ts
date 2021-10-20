import { Router } from 'express';
import { AccountController } from '../controllers';

export class AccountRouter {
  static create() {
    const router = Router();
    router.post('/accounts', AccountController.createAsync);
    router.patch('/accounts/:accountId', AccountController.updateAsync);
    router.delete('/accounts/:accountId', AccountController.deleteAsync);
    router.get('/accounts/:accountId', AccountController.getAsync);
    return router;
  }
}
