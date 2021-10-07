import { Router } from 'express';
import { UserLocationController } from '../controllers';

export class UserLocationRouter {
  static create() {
    const router = Router();
    router.patch('/users/locations', UserLocationController.setLocation);
    return router;
  }
}
