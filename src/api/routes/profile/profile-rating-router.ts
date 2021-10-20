import { Router } from 'express';
import { ProfileRatingController } from '../../controllers/profile';

export class ProfileRatingRouter {
  static create() {
    const router = Router();
    router.post(
      '/accounts/:accountId/profiles/:profileId/ratings',
      ProfileRatingController.createAsync
    );
    router.patch(
      '/accounts/:accountId/profiles/:profileId/ratings/:ratingId',
      ProfileRatingController.updateAsync
    );
    router.delete(
      '/accounts/:accountId/profiles/:profileId/ratings/:ratingId',
      ProfileRatingController.deleteAsync
    );
    router.get(
      '/profiles/:profileId/ratings/:ratingId',
      ProfileRatingController.getAsync
    );
    router.get(
      '/profiles/:profileId/ratings',
      ProfileRatingController.getAllAsync
    );
    return router;
  }
}
