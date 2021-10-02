import { Request } from 'express';
import { RequestHandler } from './helpers';

export abstract class BaseController {
  protected static async verifyAccessTokenAsync(req: Request) {
    const requestHandler = new RequestHandler();
    return await requestHandler.verifyAccessTokenAsync(req);
  }
}
