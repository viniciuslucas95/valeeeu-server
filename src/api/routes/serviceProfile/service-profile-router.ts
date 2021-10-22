import { Router } from 'express';
import { ServiceProfileController } from '../../controllers/service-profile';

export class ServiceProfileRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/services',
      ServiceProfileController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId',
      ServiceProfileController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId',
      ServiceProfileController.deleteAsync
    );
    router.get('/profiles/services', ServiceProfileController.getAllAsync);
    router.get(
      '/profiles/:profileId/services',
      ServiceProfileController.getAllFromParentAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId',
      ServiceProfileController.getAsync
    );
    return router;
  }
}
