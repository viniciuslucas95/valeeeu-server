import { Request, Response, NextFunction } from 'express';
import { IAccountDto } from '../entities/dtos';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory } from '../factories';
import { RequestHeaderHandler } from './request-header-handler';

export class AccountController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const service = AccountServiceFactory.create();
      const { email, password } = AccountController.getData(req);
      if (!email) throw new InvalidRequestError('NullEmail');
      if (!password) throw new InvalidRequestError('NullPassword');
      const id = await service.createAsync({
        email,
        password,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const { email, password } = AccountController.getData(req);
      const service = AccountServiceFactory.create();
      if (!email && !password) throw new InvalidRequestError('NoChangesSent');
      await service.updateAsync(accountId, { email, password });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const service = AccountServiceFactory.create();
      await service.deleteAsync(accountId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = await RequestHeaderHandler.verifyAccessTokenAsync(req);
      const service = AccountServiceFactory.create();
      const result = await service.getAsync(accountId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  private static getData(req: Request): Partial<IAccountDto> {
    const email = req.body.email;
    const password = req.body.password;
    if (email && typeof email !== 'string')
      throw new InvalidRequestError('EmailMustBeAString');
    if (password && typeof password !== 'string')
      throw new InvalidRequestError('PasswordMustBeAString');
    return { email, password };
  }
}
