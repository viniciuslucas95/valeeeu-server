import { Router } from 'express';
import { CustomerController } from '../controllers';

export class CustomerProfileRouter {
  static create() {
    const router = Router();
    router.post('/customers', CustomerController.create);
    router.patch('/customers', CustomerController.update);
    return router;
  }
}
