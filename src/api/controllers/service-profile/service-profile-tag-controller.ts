import { Request, Response, NextFunction } from 'express';
import { IServiceProfileTagDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { ProfileServiceFactory } from '../../factories/profile-factories';
import {
  ServiceProfileServiceFactory,
  ServiceProfileTagServiceFactory,
} from '../../factories/service-profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ServiceProfileTagController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId } =
        ServiceProfileTagController.getIds(req);
      const { tag } = ServiceProfileTagController.getData(req);
      if (!tag) throw new InvalidRequestError('NullTag');
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
      const serviceProfileTagService = ServiceProfileTagServiceFactory.create();
      const id = await serviceProfileTagService.createAsync({
        tag,
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
      const { accountId, profileId, serviceId, tagId } =
        ServiceProfileTagController.getIds(req);
      const { tag } = ServiceProfileTagController.getData(req);
      if (!tag) throw new InvalidRequestError('NoChangesSent');
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
      const serviceProfileTagService = ServiceProfileTagServiceFactory.create();
      await serviceProfileTagService.updateAsync(tagId, {
        tag,
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
      const { accountId, profileId, serviceId, tagId } =
        ServiceProfileTagController.getIds(req);
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
      const serviceProfileTagService = ServiceProfileTagServiceFactory.create();
      await serviceProfileTagService.deleteAsync(tagId, serviceId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId, tagId } =
        ServiceProfileTagController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfileTagService = ServiceProfileTagServiceFactory.create();
      const result = await serviceProfileTagService.getByIdAndParentIdAsync(
        tagId,
        serviceId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId } = ServiceProfileTagController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfileTagService = ServiceProfileTagServiceFactory.create();
      const results = await serviceProfileTagService.getAllByParentIdAsync(
        serviceId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): IServiceProfileTagDto {
    return {
      tag: req.body.item?.toString() ?? undefined,
    };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { serviceId } = RequestParamsHandler.getServiceId(req);
    const { tagId } = RequestParamsHandler.getTagId(req);
    return { accountId, profileId, serviceId, tagId };
  }
}
