import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors/InvalidRequestError';
import { WorkerProfileServiceFactory } from '../factories';
import { TagServiceFactory } from '../factories/TagServiceFactory';
import { PoolProvider } from '../providers';
import { BaseController } from './BaseController';

export class WorkerController extends BaseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const { name, job, description, tags } =
        WorkerController.getRequestData(req);
      if (!name) throw new InvalidRequestError('NullName');
      if (!job) throw new InvalidRequestError('NullJob');
      if (tags.length === 0) throw new InvalidRequestError('NoTagsSent');
      const client = await PoolProvider.pool.connect();
      const workerProfileService = WorkerProfileServiceFactory.create(client);
      const tagService = TagServiceFactory.create(client);
      try {
        client.query('BEGIN');
        const workerProfileId = await workerProfileService.createAsync({
          name,
          job,
          userId,
          description,
        });
        for (let i = 0; i < tags.length; i++) {
          await tagService.createAsync({
            name: tags[i].toLocaleLowerCase(),
            workerProfileId,
          });
        }
        client.query('COMMIT');
        res.sendStatus(201);
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await BaseController.verifyAccessTokenAsync(req);
      await BaseController.checkUserIdExistanceAsync(userId);
      const { name, job, description, tags } =
        WorkerController.getRequestData(req);
      if (!name && !job && !description && tags.length === 0)
        throw new InvalidRequestError('NoChangesSent');
      const client = await PoolProvider.pool.connect();
      const workerProfileService = WorkerProfileServiceFactory.create(client);
      try {
        client.query('BEGIN');
        const workerProfileId = await workerProfileService.updateAsync(userId, {
          name,
          job,
          description,
        });
        if (tags.length > 0) {
          const tagService = TagServiceFactory.create(client);
          await tagService.deleteAllTagsAsync(workerProfileId);
          for (let i = 0; i < tags.length; i++) {
            await tagService.createAsync({
              name: tags[i].toLocaleLowerCase(),
              workerProfileId,
            });
          }
        }
        client.query('COMMIT');
        res.sendStatus(204);
      } catch (err) {
        client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  private static getRequestData(req: Request) {
    const name: string = req.body.name?.toString() ?? '';
    const job: string = req.body.job?.toString() ?? '';
    const description: string = req.body.description?.toString() ?? '';
    const tags = WorkerController.getTags(req);
    return { name, job, description, tags };
  }

  private static getTags(req: Request) {
    const tags = req.body.tags ?? [];
    if (!tags.map) throw new InvalidRequestError('WrongTagsFormat');
    const formattedTags: string[] = tags.map((tag: any) => tag.toString());
    return formattedTags;
  }
}
