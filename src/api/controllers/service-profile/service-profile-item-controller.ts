import { Request, Response, NextFunction } from 'express';
import { IServiceProfileItemDto } from '../../entities/dtos/service-profile-dtos';
import { InvalidRequestError } from '../../errors';
import { ProfileServiceFactory } from '../../factories/profile-factories';
import {
  ServiceProfileItemServiceFactory,
  ServiceProfileServiceFactory,
} from '../../factories/service-profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ServiceProfileItemController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId } =
        ServiceProfileItemController.getIds(req);
      const { item, price } = ServiceProfileItemController.getData(req);
      if (!item) throw new InvalidRequestError('NullItem');
      if (!price) throw new InvalidRequestError('NullPrice');
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
      const serviceProfileItemService =
        ServiceProfileItemServiceFactory.create();
      const id = await serviceProfileItemService.createAsync({
        item,
        price,
        serviceId,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId, serviceId, itemId } =
        ServiceProfileItemController.getIds(req);
      const { item, price } = ServiceProfileItemController.getData(req);
      if (!item && !price) throw new InvalidRequestError('NoChangesSent');
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
      const serviceProfileItemService =
        ServiceProfileItemServiceFactory.create();
      await serviceProfileItemService.updateAsync(itemId, {
        item,
        price,
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
      const { accountId, profileId, serviceId, itemId } =
        ServiceProfileItemController.getIds(req);
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
      const serviceProfileItemService =
        ServiceProfileItemServiceFactory.create();
      await serviceProfileItemService.deleteAsync(itemId, serviceId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId, itemId } =
        ServiceProfileItemController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfileItemService =
        ServiceProfileItemServiceFactory.create();
      const result = await serviceProfileItemService.getByIdAndParentIdAsync(
        itemId,
        serviceId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, serviceId } = ServiceProfileItemController.getIds(req);
      const serviceProfileService = ServiceProfileServiceFactory.create();
      await serviceProfileService.validateExistenceByIdAndParentIdAsync(
        serviceId,
        profileId
      );
      const serviceProfileItemService =
        ServiceProfileItemServiceFactory.create();
      const results = await serviceProfileItemService.getAllByParentIdAsync(
        serviceId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): IServiceProfileItemDto {
    return {
      item: req.body.item?.toString() ?? '',
      price: req.body.price ?? undefined,
    };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { serviceId } = RequestParamsHandler.getServiceId(req);
    const { itemId } = RequestParamsHandler.getItemId(req);
    return { accountId, profileId, serviceId, itemId };
  }
}
