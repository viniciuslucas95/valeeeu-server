import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {
  static create() {
    const router = Router();
    const url = '/auth';
    router.get(`${url}/:refreshToken`, AuthController.createNewAccessToken);
    router.get(`${url}`, AuthController.createBothTokens);
    return router;
  }
}
