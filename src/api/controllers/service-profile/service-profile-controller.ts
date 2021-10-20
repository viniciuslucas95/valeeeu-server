import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../../errors';
import { ProfileServiceFactory } from '../../factories/profile-factories';
import { ServiceProfileServiceFactory } from '../../factories/service-profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ServiceProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId } = ServiceProfileController.getIds(req);
      const description = req.body.description?.toString() ?? '';
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const id = await serviceProfileService.createAsync({
        description,
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
      const { accountId, profileId, serviceId } =
        ServiceProfileController.getIds(req);
      const description = req.body.description?.toString() ?? undefined;
      if (!description) throw new InvalidRequestError('NoChangesSent');
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
      // Verify access token
      const { accountId, profileId, serviceId } =
        ServiceProfileController.getIds(req);
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

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceProfileService = ServiceProfileServiceFactory.create();
      const results = await serviceProfileService.getAllAsync();
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { serviceId } = RequestParamsHandler.getServiceId(req);
    return { accountId, profileId, serviceId };
  }
}
