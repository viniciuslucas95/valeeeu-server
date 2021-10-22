import { Request, Response, NextFunction } from 'express';
import { IProfileContactDto } from '../../entities/dtos/profile-dtos';
import { InvalidRequestError } from '../../errors';
import {
  ProfileContactServiceFactory,
  ProfileServiceFactory,
} from '../../factories/profile-service-factories';
import { RequestHeaderHandler } from '../request-header-handler';
import { RequestParamsHandler } from '../request-params-handler';

export class ProfileContactController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId } = ProfileContactController.getIds(req);
      const { plataform, contact } = ProfileContactController.getData(req);
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
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId, contactId } = ProfileContactController.getIds(req);
      const { plataform, contact } = ProfileContactController.getData(req);
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
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { profileId, contactId } = ProfileContactController.getIds(req);
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
      const result = await profileContactService.getByIdAndParentIdAsync(
        contactId,
        profileId
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const { profileId } = ProfileContactController.getIds(req);
      const profileContactService = ProfileContactServiceFactory.create();
      const results = await profileContactService.getAllByParentIdAsync(
        profileId
      );
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): Partial<IProfileContactDto> {
    const plataform = req.body.plataform;
    const contact = req.body.contact;
    if (plataform && typeof plataform !== 'string')
      throw new InvalidRequestError('PlataformMustBeAString');
    if (contact && typeof contact !== 'string')
      throw new InvalidRequestError('ContactMustBeAString');
    return { plataform, contact };
  }

  private static getIds(req: Request) {
    const { accountId } = RequestParamsHandler.getAccountId(req);
    const { profileId } = RequestParamsHandler.getProfileId(req);
    const { contactId } = RequestParamsHandler.getContactId(req);
    return { accountId, profileId, contactId };
  }
}
