import { Request, Response, NextFunction } from 'express';
import { IServiceProfilePictureDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { ProfileServiceFactory } from '../../factories/profile-factories';
import {
  ServiceProfilePictureServiceFactory,
  ServiceProfileServiceFactory,
} from '../../factories/service-profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ServiceProfilePictureController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId } =
        ServiceProfilePictureController.getIds(req);
      const { picture } = ServiceProfilePictureController.getData(req);
      if (!picture) throw new InvalidRequestError('NullPicture');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfilePictureService =
        ServiceProfilePictureServiceFactory.create();
      const id = await serviceProfilePictureService.createAsync({
        picture,
        serviceId: profileId,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId, pictureId } =
        ServiceProfilePictureController.getIds(req);
      const { picture } = ServiceProfilePictureController.getData(req);
      if (!picture) throw new InvalidRequestError('NoChangesSent');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfilePictureService =
        ServiceProfilePictureServiceFactory.create();
      await serviceProfilePictureService.updateAsync(pictureId, {
        picture,
        serviceId,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId, pictureId } =
        ServiceProfilePictureController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfilePictureService =
        ServiceProfilePictureServiceFactory.create();
      await serviceProfilePictureService.deleteAsync(pictureId, serviceId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId, pictureId } =
        ServiceProfilePictureController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfilePictureService =
        ServiceProfilePictureServiceFactory.create();
      const result = await serviceProfilePictureService.getByIdAndParentIdAsync(
        pictureId,
        serviceId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId } =
        ServiceProfilePictureController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfilePictureService =
        ServiceProfilePictureServiceFactory.create();
      const results = await serviceProfilePictureService.getAllByParentIdAsync(
        serviceId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): IServiceProfilePictureDto {
    return {
      picture: req.body.picture?.toString() ?? undefined,
    };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { serviceId } = RequestParamsHandler.getServiceId(req);
    const { pictureId } = RequestParamsHandler.getPictureId(req);
    return { accountId, profileId, serviceId, pictureId };
  }
}
