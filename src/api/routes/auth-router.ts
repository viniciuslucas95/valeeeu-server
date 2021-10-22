import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {
  static create() {
    const router = Router();
    router.get('/auth', AuthController.getTokensAsync);
    router.get(
      '/auth/refresh/:refresh-token',
      AuthController.getNewAccessTokenAsync
    );
    router.get(
      '/auth/verify/:access-token',
      AuthController.verifyAccessTokenAsync
    );
    return router;
  }
}
