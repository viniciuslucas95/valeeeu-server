import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors/InvalidRequestError';
import { UserServiceFactory } from '../factories';

export class UserController {
  private static readonly nullIdError = new InvalidRequestError('NullId');

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const service = UserServiceFactory.create();
      const email = req.body.email?.toString() ?? '';
      const password = req.body.password?.toString() ?? '';
      if (!email || !password) throw new InvalidRequestError('NullCredentials');
      const id = await service.createAsync({
        email,
        password,
      });
      res.status(201).json({ id });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = UserServiceFactory.create();
      const id = req.params.id;
      const email = req.body.email?.toString() ?? '';
      const password = req.body.password?.toString() ?? '';
      if (!id) throw UserController.nullIdError;
      if (!email && !password) throw new InvalidRequestError('NullChanges');
      await service.updateAsync(id, { email, password });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const service = UserServiceFactory.create();
      const id = req.params.id;
      if (!id) throw UserController.nullIdError;
      await service.deleteAsync(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
