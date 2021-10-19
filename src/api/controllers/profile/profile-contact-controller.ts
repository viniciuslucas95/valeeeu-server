import { Request, Response, NextFunction } from 'express';
import { IProfileContactDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import {
  ProfileContactServiceFactory,
  ProfileServiceFactory,
} from '../../factories/profile-factories';
import { RequestParamsHandler } from '../request-params-handler';

export class ProfileContactController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId, profileId } = ProfileContactController.getIds(req);
      const { plataform, contact } =
        ProfileContactController.getProfileContactData(req);
      if (!plataform) throw new InvalidRequestError('NullPlataform');
      if (!contact) throw new InvalidRequestError('NullContact');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileContactService = ProfileContactServiceFactory.create();
      const id = await profileContactService.createAsync({
        plataform,
        contact,
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
      const { accountId, profileId, contactId } =
        ProfileContactController.getIds(req);
      const { plataform, contact } =
        ProfileContactController.getProfileContactData(req);
      if (!plataform && !contact)
        throw new InvalidRequestError('NoChangesSent');
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileContactService = ProfileContactServiceFactory.create();
      await profileContactService.updateAsync(contactId, {
        plataform,
        contact,
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
      const { accountId, profileId, contactId } =
        ProfileContactController.getIds(req);
      const profileService = ProfileServiceFactory.create();
      await profileService.validateExistenceByIdAndParentIdAsync(
        profileId,
        accountId
      );
      const profileContactService = ProfileContactServiceFactory.create();
      await profileContactService.deleteAsync(contactId, profileId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId, contactId } = ProfileContactController.getIds(req);
      const profileContactService = ProfileContactServiceFactory.create();
      await profileContactService.validateExistenceByIdAndParentIdAsync(
        contactId,
        profileId
      );
      const profileContact = profileContactService.getAsync(contactId);
      res.status(200).json(profileContact);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const profileContactService = ProfileContactServiceFactory.create();
      const profileContacts = await profileContactService.getAllAsync();
      res.status(200).json(profileContacts);
    } catch (err) {
      next(err);
    }
  }

  private static getProfileContactData(req: Request): IProfileContactDto {
    return {
      plataform: req.body.plataform?.toString() ?? undefined,
      contact: req.body.contact?.toString() ?? undefined,
    };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { contactId } = RequestParamsHandler.getContactId(req);
    return { accountId, profileId, contactId };
  }
}
