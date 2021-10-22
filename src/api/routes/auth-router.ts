import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {
  static create() {
    const router = Router();
    router.get(
      '/auth/refresh/:refreshToken',
      AuthController.getNewAccessTokenAsync
    );
    router.get(
      '/auth/verify/:accessToken',
      AuthController.verifyAccessTokenAsync
    );
    router.get('/auth', AuthController.getTokensAsync);
    return router;
  }
}
