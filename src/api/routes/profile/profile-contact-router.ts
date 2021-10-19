import { Router } from 'express';
import { ProfileContactController } from '../../controllers/profile';

export class ProfileContactRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/contacts',
      ProfileContactController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/contacts/:contactId',
      ProfileContactController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/contacts/:contactId',
      ProfileContactController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/contacts/:contactId',
      ProfileContactController.getAsync
    );
    router.get(
      '/profiles/:profileId/contacts',
      ProfileContactController.getAllAsync
    );
    return router;
  }
}
