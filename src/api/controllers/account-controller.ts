import { Request, Response, NextFunction } from 'express';
import { IAccountCredentialsDto, IIdDto } from '../entities/dtos';
import { InvalidRequestError } from '../errors';
import { AccountServiceFactory } from '../factories';

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
      res.status(201).json({ data: id });
    } catch (err) {
      next(err);
    }
  }

  static async updateAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { id } = AccountController.getAccountId(req);
      const { email, password } = AccountController.getCredentials(req);
      const service = AccountServiceFactory.create();
      if (!email && !password) throw new InvalidRequestError('NoChangesSent');
      await service.updateAsync(id, { email, password });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async deleteAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { id } = AccountController.getAccountId(req);
      const service = AccountServiceFactory.create();
      await service.deleteAsync(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async getAsync(req: Request, res: Response, next: NextFunction) {
    try {
      // Verify access token
      const { id } = AccountController.getAccountId(req);
      const service = AccountServiceFactory.create();
      const account = await service.getAccountAsync(id);
      res.status(200).json({ data: account });
    } catch (err) {
      next(err);
    }
  }

  private static getCredentials(req: Request): Partial<IAccountCredentialsDto> {
    const email = req.body.email?.toString() ?? undefined;
    const password = req.body.password?.toString() ?? undefined;
    return { email, password };
  }

  private static getAccountId(req: Request): IIdDto {
    return { id: req.params.accountId };
  }
}
