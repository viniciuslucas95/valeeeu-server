import { Router } from 'express';
import { ServiceProfileTagController } from '../../controllers/service-profile';

export class ServiceProfileTagRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/tags',
      ServiceProfileTagController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/tags/:tagId',
      ServiceProfileTagController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/tags/:tagId',
      ServiceProfileTagController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/tags/:tagId',
      ServiceProfileTagController.getAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/tags',
      ServiceProfileTagController.getAllAsync
    );
    return router;
  }
}
