import { Request, Response, NextFunction } from 'express';
import { IProfileDto } from '../entities/dtos/profiles-dtos';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory } from '../factories';
import { ProfileServiceFactory } from '../factories/profile-factories';
import { RequestParamsHandler } from './request-params-handler';

export class ProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId } = ProfileController.getIds(req);
      const { name } = ProfileController.getProfileData(req);
      if (!name) throw new InvalidRequestError('NullName');
      const accountService = AccountServiceFactory.create();
      await accountService.validateExistenceAsync(accountId);
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
      // Verify access token
      const { accountId, profileId } = ProfileController.getIds(req);
      const { name } = ProfileController.getProfileData(req);
      if (!name) throw new InvalidRequestError('NullName');
      const profileService = ProfileServiceFactory.create();
      await profileService.updateAsync(profileId, { name, accountId });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId } = ProfileController.getIds(req);
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
      const profile = await profileService.getAsync(profileId);
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const profileService = ProfileServiceFactory.create();
      const profiles = await profileService.getAllAsync();
      res.status(200).json(profiles);
    } catch (err) {
      next(err);
    }
  }

  private static getProfileData(req: Request): IProfileDto {
    return { name: req.body.name?.toString() ?? undefined };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    return { accountId, profileId };
  }
}
