import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors/InvalidRequestError';
import { UserLocationServiceFactory } from '../factories';
import { BaseController } from './BaseController';

export class UserLocationController extends BaseController {
  static async setLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const service = UserLocationServiceFactory.create();
      const latitude = req.body.latitude?.toString() ?? '';
      const longitude = req.body.longitude?.toString() ?? '';
      if (!latitude || !longitude)
        throw new InvalidRequestError('NullCoordinates');
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);
      if (isNaN(parsedLatitude) || isNaN(parsedLongitude))
        throw new InvalidRequestError('WrongCoordinatesFormat');
      await service.setLocationAsync(userId, {
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
