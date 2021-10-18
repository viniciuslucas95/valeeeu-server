import { Request, Response, NextFunction } from 'express';
import { IIdDto, IProfileDataDto } from '../entities/dtos';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory, ProfileServiceFactory } from '../factories';

export class ProfileController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { id: accountId } = ProfileController.getAccountId(req);
      const { name } = ProfileController.getData(req);
      if (!name) throw new InvalidRequestError('NullName');
      const profileService = ProfileServiceFactory.create();
      await profileService.checkExistenceByAccountId(accountId);
      const accountService = AccountServiceFactory.create();
      await accountService.validateExistenceByIdAsync(accountId);
      const id = await profileService.createAsync({
        name,
        accountId,
      });
      res.status(201).json({ data: id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { id: accountId } = ProfileController.getAccountId(req);
      const { id: profileId } = ProfileController.getProfileId(req);
      const { name } = ProfileController.getData(req);
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
      const { id: accountId } = ProfileController.getAccountId(req);
      const { id: profileId } = ProfileController.getProfileId(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.deleteAsync(profileId, accountId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: profileId } = ProfileController.getProfileId(req);
      const profileService = ProfileServiceFactory.create();
      const profile = await profileService.getProfileAsync(profileId);
      res.status(200).json({ data: profile });
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const profileService = ProfileServiceFactory.create();
      const profiles = await profileService.getAllProfilesAsync();
      res.status(200).json({ data: profiles });
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): Partial<IProfileDataDto> {
    return { name: req.body.name?.toString() ?? undefined };
  }

  private static getProfileId(req: Request): IIdDto {
    return { id: req.params.profileId };
  }

  private static getAccountId(req: Request): IIdDto {
    return { id: req.params.accountId };
  }
}
