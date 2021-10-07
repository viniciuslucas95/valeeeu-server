import { Router } from 'express';
import { AuthController } from '../controllers';

export class AuthRouter {
  static create() {
    const router = Router();
    router.get('/auth', AuthController.createBothTokens);
    router.get(
      '/auth/refresh/:refreshToken',
      AuthController.createNewAccessToken
    );
    router.get('/auth/verify', AuthController.verifyTokens);
    return router;
  }
}
