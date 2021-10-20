import { Request, Response, NextFunction } from 'express';
import { IProfilePictureDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import {
  ProfilePictureServiceFactory,
  ProfileServiceFactory,
} from '../../factories/profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ProfilePictureController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId } = ProfilePictureController.getIds(req);
      const { picture } = ProfilePictureController.getData(req);
      if (!picture) throw new InvalidRequestError('NullPicture');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profilePictureService = ProfilePictureServiceFactory.create();
      const id = await profilePictureService.createAsync({
        picture,
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
      const { accountId, profileId, pictureId } =
        ProfilePictureController.getIds(req);
      const { picture } = ProfilePictureController.getData(req);
      if (!picture) throw new InvalidRequestError('NullChangesSent');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profilePictureService = ProfilePictureServiceFactory.create();
      await profilePictureService.updateAsync(pictureId, {
        picture,
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
      const { accountId, profileId, pictureId } =
        ProfilePictureController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profilePictureService = ProfilePictureServiceFactory.create();
      await profilePictureService.deleteAsync(pictureId, profileId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, pictureId } = ProfilePictureController.getIds(req);
      const profilePictureService = ProfilePictureServiceFactory.create();
      await profilePictureService.validateExistenceByIdAndParentIdAsync(
        pictureId,
        profileId
      );
      const result = profilePictureService.getAsync(pictureId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId } = ProfilePictureController.getIds(req);
      const profilePictureService = ProfilePictureServiceFactory.create();
      const results = await profilePictureService.getAllByParentIdAsync(
        profileId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): IProfilePictureDto {
    const picture = req.body.picture?.toString() ?? '';
    return { picture };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { pictureId } = RequestParamsHandler.getPictureId(req);
    return { accountId, profileId, pictureId };
  }
}
