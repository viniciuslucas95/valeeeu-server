import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../../errors';
import {
  ProfileRatingServiceFactory,
  ProfileServiceFactory,
} from '../../factories/profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ProfileRatingController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId } = ProfileRatingController.getIds(req);
      const rating = req.body.rating ?? undefined;
      const comment = req.body.comment?.toString() ?? '';
      if (!rating) throw new InvalidRequestError('NullRating');
      if (isNaN(rating)) throw new InvalidRequestError('NaNRating');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileRatingService = ProfileRatingServiceFactory.create();
      const id = await profileRatingService.createAsync({
        rating,
        comment,
        profileId,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, ratingId } =
        ProfileRatingController.getIds(req);
      const rating = req.body.rating ?? undefined;
      const comment = req.body.comment?.toString() ?? undefined;
      if (!rating && !comment) throw new InvalidRequestError('NoChangesSent');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileRatingService = ProfileRatingServiceFactory.create();
      await profileRatingService.updateAsync(ratingId, {
        rating,
        comment,
        profileId,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, ratingId } =
        ProfileRatingController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileRatingService = ProfileRatingServiceFactory.create();
      await profileRatingService.deleteAsync(ratingId, profileId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, ratingId } = ProfileRatingController.getIds(req);
      const profileRatingService = ProfileRatingServiceFactory.create();
      await profileRatingService.validateExistenceByIdAndParentIdAsync(
        ratingId,
        profileId
      );
      const result = profileRatingService.getAsync(ratingId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId } = ProfileRatingController.getIds(req);
      const profileRatingService = ProfileRatingServiceFactory.create();
      const results = await profileRatingService.getAllByParentIdAsync(
        profileId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { ratingId } = RequestParamsHandler.getRatingId(req);
    return { accountId, profileId, ratingId };
  }
}
