import { Request, Response, NextFunction } from 'express';
import {
  UserServiceFactory,
  WorkerProfileImageServiceFactory,
  WorkerProfileServiceFactory,
} from '../factories';
import { PoolProvider } from '../providers';
import { RequestHandler } from './helpers';

export class WorkerImageController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await WorkerImageController.verifyAccessTokenAsync(req);
      const userService = UserServiceFactory.create();
      await userService.checkExistanceByIdAsync(userId);
      const workerProfileService = WorkerProfileServiceFactory.create();
      const workerProfileId = await workerProfileService.getIdByUserIdAsync(
        userId
      );
      const client = await PoolProvider.pool.connect();
      const workerProfileImageService =
        WorkerProfileImageServiceFactory.create(client);
      try {
        client.query('BEGIN');
        await workerProfileImageService.createAsync(workerProfileId, req);
        client.query('COMMIT');
        res.sendStatus(201);
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      next(err);
    }
  }

  private static async verifyAccessTokenAsync(req: Request) {
    const requestHandler = new RequestHandler();
    return await requestHandler.verifyAccessTokenAsync(req);
  }
}
