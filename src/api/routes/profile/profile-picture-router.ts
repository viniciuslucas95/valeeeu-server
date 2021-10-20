import { Router } from 'express';
import { ProfilePictureController } from '../../controllers/profile';

export class ProfilePictureRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/pictures',
      ProfilePictureController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/pictures/:pictureId',
      ProfilePictureController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/pictures/:pictureId',
      ProfilePictureController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/pictures/:pictureId',
      ProfilePictureController.getAsync
    );
    router.get(
      '/profiles/:profileId/pictures',
      ProfilePictureController.getAllAsync
    );
    return router;
  }
}
