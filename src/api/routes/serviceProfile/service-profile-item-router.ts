import { Router } from 'express';
import { ServiceProfileItemController } from '../../controllers/service-profile';

export class ServiceProfileItemRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/items',
      ServiceProfileItemController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/items/:itemId',
      ServiceProfileItemController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/items/:itemId',
      ServiceProfileItemController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/items/:itemId',
      ServiceProfileItemController.getAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/items',
      ServiceProfileItemController.getAllAsync
    );
    return router;
  }
}
