import { Router } from 'express';
import { AccountController } from '../controllers';

export class AccountRouter {
  static create() {
    const router = Router();
    router.post('/accounts', AccountController.create);
    return router;
  }
}
