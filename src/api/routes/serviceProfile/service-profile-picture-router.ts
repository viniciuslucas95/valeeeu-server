import { Router } from 'express';
import { ServiceProfilePictureController } from '../../controllers/service-profile';

export class ServiceProfilePictureRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/pictures',
      ServiceProfilePictureController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/pictures/:pictureId',
      ServiceProfilePictureController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/services/:serviceId/pictures/:pictureId',
      ServiceProfilePictureController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/pictures/:pictureId',
      ServiceProfilePictureController.getAsync
    );
    router.get(
      '/profiles/:profileId/services/:serviceId/pictures',
      ServiceProfilePictureController.getAllAsync
    );
    return router;
  }
}
