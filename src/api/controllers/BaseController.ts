import { Request } from 'express';
import { UserServiceFactory } from '../factories';
import { RequestHandler } from './helpers';

export abstract class BaseController {
  protected static async verifyAccessTokenAsync(req: Request) {
    const requestHandler = new RequestHandler();
    return await requestHandler.verifyAccessTokenAsync(req);
  }

  protected static async checkUserIdExistanceAsync(userId: string) {
    const userService = UserServiceFactory.create();
    await userService.checkExistanceByIdAsync(userId);
  }
}
