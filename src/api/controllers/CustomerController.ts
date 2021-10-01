import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors';
import { CustomerProfileServiceFactory } from '../factories';
import { RequestHandler } from './helpers';

export class CustomerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await RequestHandler.verifyAccessTokenAsync(req);
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

  private static getRequestData(req: Request) {
    const name = req.body.name?.toString() ?? '';
    if (!name) throw new InvalidRequestError('NullName');
    return { name };
  }
}
