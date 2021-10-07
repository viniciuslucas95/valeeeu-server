import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors';
import { CustomerProfileServiceFactory } from '../factories';
import { BaseController } from './BaseController';

export class CustomerController extends BaseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const { name } = CustomerController.getRequestData(req);
      const customerProfileService = CustomerProfileServiceFactory.create();
      await customerProfileService.createAsync({
        name,
        userId,
      });
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const { name } = CustomerController.getRequestData(req);
      const customerProfileService = CustomerProfileServiceFactory.create();
      await customerProfileService.updateAsync(userId, {
        name,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  private static getRequestData(req: Request) {
    const name = req.body.name?.toString() ?? '';
    if (!name) throw new InvalidRequestError('NullName');
    return { name };
  }
}
