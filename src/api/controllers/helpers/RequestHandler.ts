import { Request } from 'express';
import { ForbiddenError } from '../../errors';
import { AccessTokenServiceFactory, UserServiceFactory } from '../../factories';

export class RequestHandler {
  async verifyAccessTokenAsync(token: string) {
    const accessTokenService = AccessTokenServiceFactory.create();
    const id = accessTokenService.verifyToken(token);
    const userService = UserServiceFactory.create();
    await userService.checkExistanceByIdAsync(id);
    return id;
  }

  static async verifyAccessTokenAsync(req: Request): Promise<string> {
    const token =
      req.headers['authorization']?.split(' ')[1] ??
      req.params.accessToken?.toString();
    if (!token) throw new ForbiddenError('NullToken');
    const requestHandler = new RequestHandler();
    const id = await requestHandler.verifyAccessTokenAsync(token);
    return id;
  }
}
