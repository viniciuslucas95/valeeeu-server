import { Router } from 'express';
import { ProfileController } from '../../controllers/profile';

export class ProfileRouter {
  static create() {
    const router = Router();
    router.post('/accounts/:accountId/profiles', ProfileController.createAsync);
    router.patch(
      '/accounts/:accountId/profiles/:profileId',
      ProfileController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId',
      ProfileController.deleteAsync
    );
    router.get('/profiles/:profileId', ProfileController.getAsync);
    router.get('/profiles', ProfileController.getAllAsync);
    return router;
  }
}
