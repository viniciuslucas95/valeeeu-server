import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory, ProfileServiceFactory } from '../factories';
import { RequestParamsHandler } from './request-params-handler';

export class ProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const { name } = ProfileController.getProfileData(req);
      if (!name) throw new InvalidRequestError('NullName');
      const profileService = ProfileServiceFactory.create();
      await profileService.checkExistenceByAccountId(accountId);
      const accountService = AccountServiceFactory.create();
      await accountService.validateExistenceByIdAsync(accountId);
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
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const { profileId } = RequestParamsHandler.getProfileId(req);
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
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const { profileId } = RequestParamsHandler.getProfileId(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.deleteAsync(profileId, accountId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId } = RequestParamsHandler.getProfileId(req);
      const profileService = ProfileServiceFactory.create();
      const profile = await profileService.getProfileAsync(profileId);
      res.status(200).json(profile);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const profileService = ProfileServiceFactory.create();
      const profiles = await profileService.getAllProfilesAsync();
      res.status(200).json(profiles);
    } catch (err) {
      next(err);
    }
  }

  private static getProfileData(req: Request) {
    return { name: req.body.name?.toString() ?? undefined };
  }
}
