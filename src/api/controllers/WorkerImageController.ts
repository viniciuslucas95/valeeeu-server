import { Request, Response, NextFunction } from 'express';
import { WorkerProfileServiceFactory } from '../factories';
import {
  WorkerProfileImageDatabaseServiceFactory,
  WorkerProfileImageDiskServiceFactory,
} from '../factories/workerProfileImageServiceFactories';
import { BaseController } from './BaseController';

export class WorkerImageController extends BaseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const workerProfileService = WorkerProfileServiceFactory.create();
      const workerProfileId = await workerProfileService.getIdByUserIdAsync(
        userId
      );
      const workerProfileImageDatabaseService =
        WorkerProfileImageDatabaseServiceFactory.create();
      const workerProfileImageDiskService =
        WorkerProfileImageDiskServiceFactory.create();
      const { id } = await workerProfileImageDatabaseService.createAsync(
        workerProfileId
      );
      await workerProfileImageDiskService.createAsync(id, req);
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
}
