import { Request, Response, NextFunction } from 'express';
import { IServiceProfileDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { ProfileServiceFactory } from '../../factories/profile-service-factories';
import { ServiceProfileServiceFactory } from '../../factories/service-profile-service-factories';
import { RequestHeaderHandler } from '../request-header-handler';
import { RequestParamsHandler } from '../request-params-handler';

export class ServiceProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId } = ServiceProfileController.getIds(req);
      const { description } = ServiceProfileController.getData(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const id = await serviceProfileService.createAsync({
        description: description ?? '',
        profileId,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId, serviceId } = ServiceProfileController.getIds(req);
      const { description } = ServiceProfileController.getData(req);
      if (description === undefined)
        throw new InvalidRequestError('NoChangesSent');
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
      await serviceProfileService.updateAsync(serviceId, {
        description,
        profileId,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId, serviceId } = ServiceProfileController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.deleteAsync(serviceId, profileId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId } = ServiceProfileController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const result = await serviceProfileService.getByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllFromParentAsync(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { profileId } = ServiceProfileController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const results = await serviceProfileService.getAllByParentIdAsync(
        profileId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const results = await serviceProfileService.getAllAsync();
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): Partial<IServiceProfileDto> {
    const description = req.body.description;
    if (description && typeof description !== 'string')
      throw new InvalidRequestError('DescriptionMustBeAString');
    return { description };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { serviceId } = RequestParamsHandler.getServiceId(req);
    return { accountId, profileId, serviceId };
  }
}
