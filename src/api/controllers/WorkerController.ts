import { Request, Response, NextFunction } from 'express';
import { InvalidRequestError } from '../errors/InvalidRequestError';
import { WorkerProfileServiceFactory } from '../factories';
import { TagServiceFactory } from '../factories/TagServiceFactory';
import { PoolProvider } from '../providers';
import { RequestHandler } from './helpers';

export class WorkerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = await RequestHandler.verifyAccessTokenAsync(req);
      const { name, job, description, tags } =
        WorkerController.getRequestData(req);
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
      next(err);
    }
  }

  private static getRequestData(req: Request) {
    const name = req.body.name?.toString() ?? '';
    if (!name) throw new InvalidRequestError('NullName');
    const job = req.body.job?.toString() ?? '';
    if (!job) throw new InvalidRequestError('NullJob');
    const description = req.body.description?.toString() ?? '';
    const tags = WorkerController.getTags(req);
    return { name, job, description, tags };
  }

  private static getTags(req: Request) {
    const tags = req.body.tags ?? [];
    if (!tags.map) throw new InvalidRequestError('WrongTagsFormat');
    const formattedTags: string[] = tags.map((tag: any) => tag.toString());
    if (formattedTags.length === 0) throw new InvalidRequestError('NoTagsSent');
    return formattedTags ?? [];
  }
}
