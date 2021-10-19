import { Request, Response, NextFunction } from 'express';
import { IAccountCredentialsDto } from '../entities/dtos';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory } from '../factories';
import { RequestParamsHandler } from './request-params-handler';

export class AccountController {
  static async createAsync(req: Request, res: Response, next: NextFunction) {
    try {
      const service = AccountServiceFactory.create();
      const { email, password } = AccountController.getCredentials(req);
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
      // Verify access token
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const { email, password } = AccountController.getCredentials(req);
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
      // Verify access token
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const service = AccountServiceFactory.create();
      await service.deleteAsync(accountId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { accountId } = RequestParamsHandler.getAccountId(req);
      const service = AccountServiceFactory.create();
      const account = await service.getAccountAsync(accountId);
      res.status(200).json(account);
    } catch (err) {
      next(err);
    }
  }

  private static getCredentials(req: Request): Partial<IAccountCredentialsDto> {
    const email = req.body.email?.toString() ?? undefined;
    const password = req.body.password?.toString() ?? undefined;
    return { email, password };
  }
}
