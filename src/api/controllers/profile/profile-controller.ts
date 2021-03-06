import { Request, Response, NextFunction } from 'express';
import { IProfileDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import { AccountServiceFactory } from '../../factories';
import { ProfileServiceFactory } from '../../factories/profile-service-factories';
import { RequestHeaderHandler } from '../request-header-handler';
import { RequestParamsHandler } from '../request-params-handler';

export class ProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { name } = ProfileController.getData(req);
      if (!name) throw new InvalidRequestError('NullName');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateUniqueExistenceByParentId(accountId);
      const id = await profileService.createAsync({
        name,
        accountId,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId } = ProfileController.getIds(req);
      const { name } = ProfileController.getData(req);
      if (!name) throw new InvalidRequestError('NoChangesSent');
      const profileService = ProfileServiceFactory.create();
      await profileService.updateAsync(profileId, { name, accountId });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId } = ProfileController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.deleteAsync(profileId, accountId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId } = ProfileController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      const result = await profileService.getAsync(profileId);
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
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const profileService = ProfileServiceFactory.create();
      const results = await profileService.getAllByParentIdAsync(accountId);
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const profileService = ProfileServiceFactory.create();
      const results = await profileService.getAllAsync();
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): Partial<IProfileDto> {
    const name = req.body.name;
    if (name && typeof name !== 'string')
      throw new InvalidRequestError('NameMustBeAString');
    return { name };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    return { accountId, profileId };
  }
}
